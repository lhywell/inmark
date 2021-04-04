import zrender from 'zrender';
import { merge, calcHypotenuse, cosA } from '../common/utils.js';
import Tools from '../common/Tools';
import ImageConfig from '../config/ImageConfig.js';
import EditRect from '../config/EditRect.js';
import AbstractRender from './AbstractRender';

/**
 * @constructor
 * @param {Object} opts
 */
export default class BImage extends AbstractRender {
    constructor(opts) {
        super(opts);
        if (opts) {
            if (opts && opts.imgUrl) {
                this.imgUrl = opts.imgUrl;
            } else {
                new Error('请填入imgUrl属性,仅支持http或者https');
            }

            this._option = {};
            this._option.id = opts && opts.id;
            this._option.imgUrl = opts && opts.imgUrl;

            let mode = opts && opts.mode || 'auto';
            this.setRenderMode(opts.id, mode);

            if (mode === 'auto') {
                this._option.offsetX = 0; //auto模式图片等比例缩放后在画布中横轴位移
                this._option.offsetY = 0; //auto模式图片等比例缩放后在画布中纵轴位移
                this._option.setRate = 0; //auto模式图片的缩放比例

                this._option.imgZoom = 2; //图片放大限制
            } else if (mode === 'auto-rotate') {
                this._option.offsetX = 0; //auto模式图片等比例缩放后在画布中横轴位移
                this._option.offsetY = 0; //auto模式图片等比例缩放后在画布中纵轴位移
                this._option.setRate = 0; //auto模式图片的缩放比例
            } else {
                this.setScale(1); //original模式图片的缩放比例
                this.setOffsetM(0); //original模式画布中横轴位移
                this.setOffsetN(0); //original模式画布中纵轴位移
            }


            this._option.widthImg = 0;
            this._option.heightImg = 0;

            this._option.origin = [0, 0]; //旋转和缩放的原点

            this._option.draggable = false;
            // this._option.rotateTime = 0;
            this._option.center = [];
            this._option.rotate = {
                radians: 0,
                degrees: 0
            };
            this._option.currentShape = {};

            this._option.exportData = [];

            if (opts.style) {
                this._imgConfig = merge(ImageConfig.style, opts.style);
            } else {
                this._imgConfig = ImageConfig.style;
            }

            // ImageOption = this._option;
        }

        this.type = 'IMAGE';
        this.image = null;
        // this.group = null;
        this._editWidth = EditRect.shape.width;

        // 回调函数
        this._onImageDrag = opts && opts.event && opts.event.onImageDrag;
        this._onImageDragEnd = opts && opts.event && opts.event.onImageDragEnd;
        this._onLoadComplete = opts && opts.event && opts.event.onLoadComplete;
        this._onRotate = opts && opts.event && opts.event.onRotate;

        this.initialize();
        this.setOption(this._option);
    }
    initialize() {
        this.renderImg(this.imgUrl);
    }
    /**
     * @description 在画布中渲染图片
     * @params {Array} url 支持http,https图片路径
     */
    renderImg(url) {
        if (!url) {
            return;
        }
        // 创建组
        this.setGroup(this._option.id);

        //加载图片
        let img = new Image();
        img.setAttribute('crossorigin', 'anonymous');
        img.src = url;
        img.onload = () => {
            let mode = this.getRenderMode(this._option.id);
            console.log(mode, 2)
            if (mode === 'auto') {
                //auto模式图片自动适应屏幕大小
                const xRate = this.ctx.canvasWidth / img.width;
                const yRate = this.ctx.canvasHeight / img.height;
                this._option.setRate = xRate < yRate ? xRate : yRate;

                if (this._option.setRate > this._option.imgZoom) {
                    this._option.setRate = this._option.imgZoom;
                }
                this._option.widthImg = img.width * this._option.setRate;
                this._option.heightImg = img.height * this._option.setRate;
                this._option.offsetX = (this.ctx.canvasWidth - this._option.widthImg) / 2;
                this._option.offsetY = (this.ctx.canvasHeight - this._option.heightImg) / 2;
            } else if (mode === 'auto-rotate') {
                //auto-rotate，旋转模式，增加中心点参考线

                //auto模式图片自动适应屏幕大小
                const xRate = this.ctx.canvasWidth / img.width;
                const yRate = this.ctx.canvasHeight / img.height;
                this._option.setRate = xRate < yRate ? xRate : yRate;

                if (this._option.setRate > this._option.imgZoom) {
                    this._option.setRate = this._option.imgZoom;
                }
                this._option.widthImg = img.width * this._option.setRate;
                this._option.heightImg = img.height * this._option.setRate;

                this._option.padding = 20;
                this._option.offsetX = (this.ctx.canvasWidth - this._option.widthImg) / 2;

                // 解决图片中心点偏移
                let y = ((this.ctx.canvasHeight - this._option.heightImg) / 2);
                if (y === 0) {
                    this._option.offsetY = this._option.padding;
                } else {
                    this._option.offsetY = parseFloat(y.toFixed(2)) + this._option.padding;
                }

                this._option.heightImg -= this._option.padding * 2;

                let xLine = new zrender.Line({
                    shape: {
                        x1: 0,
                        y1: this.ctx.canvasHeight / 2,
                        x2: this.ctx.canvasWidth,
                        y2: this.ctx.canvasHeight / 2
                    },
                    data: {
                        type: 'LINE'
                    },
                    style: this._imgConfig.line,
                    zlevel: 2
                });

                let yLine = new zrender.Line({
                    shape: {
                        x1: this.ctx.canvasWidth / 2,
                        y1: 0,
                        x2: this.ctx.canvasWidth / 2,
                        y2: this.ctx.canvasHeight,
                    },
                    data: {
                        type: 'LINE'
                    },
                    style: this._imgConfig.line,
                    zlevel: 2
                });

                let circle = new zrender.Circle({
                    shape: {
                        cx: this.ctx.canvasWidth / 2,
                        cy: this._option.padding,
                        r: this._imgConfig.circle.r,
                    },
                    data: {
                        type: 'CIRCLE'
                    },
                    style: this._imgConfig.circle,
                    cursor: 'crosshair',
                    draggable: false,
                    zlevel: 2
                });

                let refresh = new zrender.Image({
                    style: {
                        image: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjAyOTM4OTgzNjkxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEwODUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNOTM0LjQgMjA2LjkzM2MtMTcuMDY3LTQuMjY2LTM0LjEzMyA2LjQtMzguNCAyMy40NjdsLTIzLjQ2NyA4Ny40NjdDNzk3Ljg2NyAxODMuNDY3IDY1NC45MzMgOTYgNDk3LjA2NyA5NmMtMjMyLjUzNCAwLTQyMi40IDE4NS42LTQyMi40IDQxNnMxODkuODY2IDQxNiA0MjIuNCA0MTZjMTc5LjIgMCAzMzkuMi0xMTAuOTMzIDM5OC45MzMtMjc1LjIgNi40LTE3LjA2Ny0yLjEzMy0zNC4xMzMtMTkuMi00MC41MzMtMTcuMDY3LTYuNC0zNC4xMzMgMi4xMzMtNDAuNTMzIDE5LjJDNzg1LjA2NyA3NzAuMTMzIDY0OC41MzMgODY0IDQ5Ny4wNjcgODY0Yy0xOTguNCAwLTM1OC40LTE1Ny44NjctMzU4LjQtMzUyczE2Mi4xMzMtMzUyIDM1OC40LTM1MmMxNDUuMDY2IDAgMjc3LjMzMyA4Ny40NjcgMzMwLjY2NiAyMTcuNmwtMTI4LTM2LjI2N2MtMTcuMDY2LTQuMjY2LTM0LjEzMyA2LjQtMzguNCAyMy40NjctNC4yNjYgMTcuMDY3IDYuNCAzNC4xMzMgMjMuNDY3IDM4LjRsMTg1LjYgNDkuMDY3YzIuMTMzIDAgNi40IDIuMTMzIDguNTMzIDIuMTMzIDYuNCAwIDEwLjY2Ny0yLjEzMyAxNy4wNjctNC4yNjcgNi40LTQuMjY2IDEyLjgtMTAuNjY2IDE0LjkzMy0xOS4yTDk2MCAyNDUuMzMzYzAtMTcuMDY2LTguNTMzLTM0LjEzMy0yNS42LTM4LjR6IiBmaWxsPSIjZmZmZmZmIiBwLWlkPSIxMDg2Ij48L3BhdGg+PC9zdmc+',
                        x: this.ctx.canvasWidth / 2 - this._imgConfig.circle.r * 1.2 / 2,
                        y: this._option.padding - this._imgConfig.circle.r * 1.2 / 2,

                        width: this._imgConfig.circle.r * 1.2,
                        height: this._imgConfig.circle.r * 1.2,
                        ...this._imgConfig.circle,
                    },
                    data: {
                        type: 'ROTATEIMAGE'
                    },
                    cursor: 'crosshair',
                    draggable: false,
                    zlevel: 3
                });

                // 不放到group,旋转的时候脱离group
                this.zr.add(xLine);
                this.zr.add(yLine);

                let rotateMouse = new zrender.Group();
                rotateMouse.add(circle);
                rotateMouse.add(refresh);
                this._option.rotateMouse = rotateMouse;
                this.zr.add(rotateMouse);

                refresh.on('mousedown', (e) => {
                    this._option.rotateListen = true;
                });
                circle.on('mousedown', (e) => {
                    this._option.rotateListen = true;
                });

            } else {
                //original模式，1:1展示图片
                this._option.setRate = 1;
                this._option.widthImg = img.width;
                this._option.heightImg = img.height;
                this._option.offsetX = 0;
                this._option.offsetY = 0;
            }

            // this._option.offsetY = 0
            let image = new zrender.Image({
                style: {
                    image: img,
                    x: this._option.offsetX,
                    y: this._option.offsetY,
                    width: this._option.widthImg,
                    height: this._option.heightImg
                },
                cursor: 'default',
                data: {
                    type: 'IMAGE',
                    origin_width: img.width,
                    origin_height: img.height,
                    rate_width: this._option.widthImg,
                    rate_height: this._option.heightImg
                },
                zlevel: 1
            });
            this._option.center = [this._option.offsetX + (this._option.widthImg / 2), this._option.offsetY + this._option.heightImg / 2];

            this.image = image;
            // this.image.setAttribute('data-name', 'sssss');

            this.setImage(this._option.id, image);

            this.group = this.getGroup(this._option.id);
            this.group.add(image);

            // zrender渲染group
            this.zr.add(this.group);

            this.image.on('drag', (e) => {
                this._onImageDrag && this._onImageDrag(e);
                this.handlers['_onImageDrag'] && this.handlers['_onImageDrag'][0](e);
            });
            this.image.on('dragend', (e) => {
                this._onImageDragEnd && this._onImageDragEnd(e);
                this.handlers['_onImageDragEnd'] && this.handlers['_onImageDragEnd'][0](e);
            });

            this.handlers['_onLoadComplete'] && this.handlers['_onLoadComplete'][0]();
            this._onLoadComplete && this._onLoadComplete();

            this._bindEvent();

            // 设置默认为'手势'可拖动
            this.setDrag(true);
        };

    }
    getData() {
        return this._option.exportData;
    }
    _zrClick() {}
    _zrMouseMove(e) {
        // e.target确保在画布内
        if (!e.event.target) {
            this._option.rotate = {
                radians: 0,
                degrees: 0
            };

            this._onRotate && this._onRotate(this.getRotate());
            this.handlers['_onRotate'] && this.handlers['_onRotate'][0](this.getRotate());

            return;
        }
        if (this._option.rotateListen === true) {
            this.image.attr({
                cursor: 'crosshair'
            });
            let center = this.getOrigin();

            let centerX = center[0];
            let position = [];

            if (e.event.offsetX >= centerX) {
                position[0] = e.event.offsetX - centerX;
            } else {
                position[0] = -(centerX - e.event.offsetX);
            }

            position[1] = e.event.offsetY - this._option.padding;
            // 旋转监听

            let a1 = position[0];
            let b1 = position[1];

            //求对角线长度
            let a = calcHypotenuse(Math.abs(a1), Math.abs(b1));

            let b = center[1] - this._option.padding;

            let c = calcHypotenuse(Math.abs(a1), Math.abs(b - b1));

            // 避免鼠标移动到画布外
            if (!window.isNaN(a) && !window.isNaN(b) && !window.isNaN(c)) {
                // cosA = (b²+c²-a²)/2bc
                let cosA_value = cosA(Math.abs(a), Math.abs(b), Math.abs(c));
                let radians = Math.acos(cosA_value);
                let degree = Math.acos(cosA_value) * 180 / Math.PI;
                let outValue;

                if (a1 <= 0) {
                    outValue = 360 - degree;
                    radians = -Math.PI - (Math.PI - radians);
                } else {
                    outValue = degree;
                    radians = -radians;
                }

                this.group.attr({
                    rotation: radians,
                    position: this._reSetPosition(),
                    origin: this.getOrigin()
                });

                this._option.rotateMouse.attr({
                    rotation: radians,
                    position: this._reSetPosition(),
                    origin: this.getOrigin()
                });

                this._option.rotate = {
                    radians: radians,
                    degrees: outValue.toFixed(2)
                };
                this._onRotate && this._onRotate(this.getRotate());
                this.handlers['_onRotate'] && this.handlers['_onRotate'][0](this.getRotate());
            }

        }
    }
    _zrMouseDown(e) {}
    _zrMouseUp(e) {
        let mode = this.getRenderMode(this._option.id);
        if (mode === 'auto-rotate') {
            this.image.attr({
                cursor: 'default'
            });

            this._option.rotateListen = false;
        }
    }
    _zrDBClick() {}
    _reSetCenter() {
        let scale = this.getScale();
        const box = this.image.getBoundingRect();
        this._option.widthImg = box.width * scale;
        this._option.heightImg = box.height * scale;

        this._option.offsetX = this.getOffsetM();
        this._option.offsetY = this.getOffsetN();
        this._option.center = [this._option.offsetX + (this._option.widthImg / 2), this._option.offsetY + (this._option.heightImg / 2)];

        return this._option.center;
    }
    getCenter() {
        return this._reSetCenter();
    }
}