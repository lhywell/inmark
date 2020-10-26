import zrender from 'zrender';
import { merge, calcHypotenuse, cosA } from '../common/utils.js';
import Tools from '../common/Tools';
import ImageConfig from '../config/ImageConfig.js';
import EditRect from '../config/EditRect.js';
import Init from './Init';

let ImageOption, image, group;
let count = 0;
let degree_out = 0,
    radian_out = 0,
    remainder = 0, //余数
    remainder_h = 0; //余数弧度
/**
 * @constructor
 * @param {Object} opts
 */
export default class BImage extends Init {
    constructor(opts) {
        super(opts, ImageOption);
        if (opts) {
            this._option = {};
            this._option.id = opts && opts.id;
            this._option.imgUrl = opts && opts.imgUrl;
            this._option.offsetX = 0; //auto模式图片等比例缩放后在画布中横轴位移
            this._option.offsetY = 0; //auto模式图片等比例缩放后在画布中纵轴位移

            this._option.imgZoom = 2; //图片放大限制
            this._option.setRate = 0; //auto模式图片的缩放比例
            this._option.widthImg = 0;
            this._option.heightImg = 0;
            this._option.scale = 1; //original模式图片的缩放比例
            this._option.origin = [0, 0]; //旋转和缩放的原点
            this._option.offsetM = 0; //original模式画布中横轴位移
            this._option.offsetN = 0; //original模式画布中纵轴位移
            this._option.draggable = false;
            this._option.rotateTime = 0;
            this._option.center = [];
            this._option.rotate = {
                radians: 0,
                degrees: 0
            };
            this._option.mode = opts && opts.mode || 'auto';

            if (opts.style) {
                this._imgConfig = merge(ImageConfig.style, opts.style);
            } else {
                this._imgConfig = ImageConfig.style;
            }

            ImageOption = this._option;
        } else {
            this._option = ImageOption;
        }

        this.type = 'IMAGE';
        this.image = null;
        this._editWidth = EditRect.shape.width;

        // 回调函数
        this._imageDrag = opts && opts.event.onImageDrag;
        this._imageDragEnd = opts && opts.event.onImageDragEnd;
        this._onComplete = opts && opts.event.onLoadComplete;
        this._onRotate = opts && opts.event.onRotate;
        // console.log(this)

        this.initialize();
    }
    initialize() {
        this.renderImg(this.imgUrl);
        // let toos = new Tools();
    }
    getZrender() {
        return this.zr;
    }
    getImage() {
        return this.image;
    }
    getGroup() {
        return this.group;
    }
    setDrag(bol) {
        this._option.draggable = bol;
        // console.log(this.group, this.group.children())

        //解决window平台下，设置false,框还可以移动bug
        this.group && this.group.eachChild(item => {
            if (item.data.type === 'IMAGE') {
                item.attr({
                    'draggable': bol,
                    'cursor': 'pointer'
                });
            }
        });
    }
    getDrag() {
        return this._option.draggable;
    }
    /**
     * @description 在画布中渲染图片
     * @params {Array} url 支持http,https图片路径
     */
    renderImg(url) {
        if (!url) {
            return;
        }
        //加载图片
        group = new zrender.Group();
        this.group = group;
        this._option.group = group;

        let img = new Image();
        img.setAttribute('crossorigin', 'anonymous');
        img.src = url;
        img.onload = () => {
            if (this._option.mode === 'auto') {
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
            } else if (this._option.mode === 'auto-rotate') {
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

                group.add(circle);
                group.add(refresh);

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
            image = new zrender.Image({
                style: {
                    image: url,
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

            this._option.image = image;

            group.add(image);
            this.zr.add(group);

            this.image.on('drag', (e) => {
                this._imageDrag && this._imageDrag(e);
            });
            this.image.on('dragend', (e) => {
                this._imageDragEnd && this._imageDragEnd(e);
            });

            this._onComplete && this._onComplete();

            this._bindEvent();
        };
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

                this._option.rotate = {
                    radians: radians,
                    degrees: outValue.toFixed(2)
                };
                this._onRotate && this._onRotate(this.getRotate());
            }

        }
    }
    _zrMouseDown(e) {}
    _zrMouseUp(e) {
        if (this._option.mode === 'auto-rotate') {
            this.image.attr({
                cursor: 'default'
            });

            this._option.rotateListen = false;
        }
    }
    _zrDBClick() {}
    _reSetCenter() {
        const box = this.image.getBoundingRect();
        this._option.widthImg = box.width * this._option.scale;
        this._option.heightImg = box.height * this._option.scale;

        this._option.offsetX = this._option.offsetM;
        this._option.offsetY = this._option.offsetN;
        this._option.center = [this._option.offsetX + (this._option.widthImg / 2), this._option.offsetY + (this._option.heightImg / 2)];

        return this._option.center;
    }
    getRotate() {
        //返回弧度制，角度制
        return this._option.rotate;
    }
    resetRotate() {
        this.rotate(0);
    }
    getOrigin() {
        // const box = this.image.getBoundingRect();
        this._option.widthImg = this._option.widthImg * this.group.scale[0];
        this._option.heightImg = this._option.heightImg * this.group.scale[0];

        this._option.offsetX = (this.ctx.canvasWidth - this._option.widthImg) / 2;
        this._option.offsetY = (this.ctx.canvasHeight - this._option.heightImg) / 2;

        if (this._option.mode === 'auto' || this._option.mode === 'auto-rotate') {
            this._option.origin = [(this._option.widthImg / 2) + this._option.offsetX, (this._option.heightImg / 2) + this._option.offsetY];
        } else if (this._option.mode === 'original') {
            this._option.origin = [(this._option.widthImg / 2), (this._option.heightImg / 2)];
        }
        return this._option.origin;
    }
    getCenter() {
        return this._reSetCenter();
    }
    _getOffset() {
        const origin = this.getOrigin();

        if (this._option.mode === 'auto' || this._option.mode === 'auto-rotate') {
            return [0, 0];
        } else {
            let x = -origin[0] * this._option.scale + origin[0];
            let y = -origin[1] * this._option.scale + origin[1];

            return [-x, -y];
        }
    }
    _reSetPosition() {
        const offset = this._getOffset();

        if (this._option.mode === 'auto' || this._option.mode === 'auto-rotate') {
            return offset;
        } else {
            return [offset[0] + this._option.offsetM, offset[1] + this._option.offsetN];
        }
    }
    rotate(degree) {

        //正值代表逆时针旋转，负值代表顺时针旋转
        const oldScale = this.group.scale[0];

        //等于0拖拽会发生飘移，所以设定0.003度，无限接近于0
        const zero = 0.003 / 180 * Math.PI;

        if (degree === 0) {
            // this._option.rotateTime = 0;
            this.group.attr({
                rotation: zero,
                position: this._reSetPosition(),
                origin: this.getOrigin()
            });
            this._option.rotate = {
                radians: 0,
                degrees: 0
            };
            return;
        }

        let degreePi = degree / 180 * Math.PI;

        let result;
        let oldDegree = this._option.rotate.degrees;
        let oldDegreePi = this._option.rotate.radians;

        oldDegree -= degree;
        oldDegreePi -= degreePi;

        if (oldDegree === 0) {
            radian_out = 0;
            result = zero;
        } else {
            let dg = oldDegree;
            let ra = oldDegreePi;

            if (Math.abs(dg) >= 360 || Math.abs(degree_out - degree) >= 360) {
                count++;
            }

            if (degree > 0) {
                degree_out = remainder + dg + (count * 360);
                radian_out = remainder_h + ra + (count * (360 / 180 * Math.PI));
            } else {
                degree_out = remainder + dg - (count * 360);
                radian_out = remainder_h + ra - (count * (360 / 180 * Math.PI));
            }


            if (degree_out % degree != 0 && count === 1) {
                remainder = degree_out;
                remainder_h = radian_out;
            }

            result = radian_out;

            if (radian_out === 0) {
                result = zero;
            }

            count = 0;
        }

        this.group.attr({
            rotation: result,
            position: this._reSetPosition(),
            origin: this.getOrigin()
        });

        this._option.rotate = {
            radians: this.group.rotation,
            degrees: this.group.rotation / Math.PI * 180
        };

        this._onRotate && this._onRotate(this.getRotate());
    }
    _limitAttributes(newAttrs) {
        const box = this.image.getBoundingRect();

        const minX = -box.width + this.ctx.canvasWidth / 2;
        const maxX = this.ctx.canvasWidth / 2;

        const x = Math.max(minX, Math.min(newAttrs.x, maxX));

        const minY = -box.height + this.ctx.canvasHeight / 2;
        const maxY = this.ctx.canvasHeight / 2;

        const y = Math.max(minY, Math.min(newAttrs.y, maxY));

        const scale = Math.max(0.05, newAttrs.scale);

        return { x, y, scale };
    }
    zoomIn(times = 1.109) {
        // zoomOut取0.8,zoomIn取1.25，执行出错，先放大再缩小，拖动图片会触发无限放大或缩小
        this.zoomStage(times);
    }
    zoomOut(times = 0.9) {
        this.zoomStage(times);
    }
    zoomStage(scaleBy) {
        const oldScale = this.group.scale[0];
        const pos = {
            x: this.ctx.canvasWidth / 2,
            y: this.ctx.canvasHeight / 2
        };

        const mousePointTo = {
            x: pos.x / oldScale - this.group.position[0] / oldScale,
            y: pos.y / oldScale - this.group.position[1] / oldScale
        };
        const newScale = Math.max(0.05, oldScale * scaleBy);

        const newPos = {
            x: -(mousePointTo.x - pos.x / newScale) * newScale,
            y: -(mousePointTo.y - pos.y / newScale) * newScale
        };

        const newAttrs = this._limitAttributes({ ...newPos, scale: newScale });

        this.group.attr({
            position: [0, 0],
            scale: [newAttrs.scale, newAttrs.scale],
            origin: this.getOrigin(),
        });

        let d = this.group.getLocalTransform();

        this._option.offsetM = d[4];
        this._option.offsetN = d[5];

        this._option.scale = newAttrs.scale;

        return this;
    }
    getOffCanvas() {
        // 获取离屏canvas
        return this.zr.painter.getRenderedCanvas({
            backgroundColor: '#fff'
        });
    }
    getType() {
        return this.zr.painter.getType();
    }
    _convertImageToCanvas(img) {
        let canvas = document.createElement('canvas');
        canvas.width = 1000;
        canvas.height = 1000;

        let ctx = canvas.getContext('2d');
        let rectCenterPoint = { x: this._option.widthImg / 2, y: this._option.heightImg / 2 };

        let degree = this._option.rotate.degrees;
        // canvas修改后的宽高
        canvas.width = 6000;
        canvas.height = 6000;

        ctx.rect(0, 0, 6000, 6000);

        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        // ctx.globalAlpha = 0;
        ctx.fill();
        ctx.strokeStyle = 'green';
        ctx.strokeRect(0, 0, 6000, 6000);

        // 以中心点旋转角度
        ctx.translate(rectCenterPoint.x, rectCenterPoint.y);
        ctx.rotate(-this._option.rotate.radians);

        ctx.translate(-rectCenterPoint.x, -rectCenterPoint.y);

        if (degree >= 0 && degree < 90) {
            ctx.drawImage(img, 0, -this._option.heightImg);
        } else if (degree >= 90 && degree < 180) {
            ctx.drawImage(img, -this._option.widthImg, -this._option.heightImg);
        } else if (degree >= 180 && degree < 270) {
            ctx.drawImage(img, -this._option.widthImg, 0);
        } else if (degree >= 270 && degree < 360) {
            ctx.drawImage(img, -this._option.widthImg, 0);
        }
        // ctx.drawImage(img, 0, 0, this._option.widthImg, this._option.heightImg);

        return canvas;
    }
    exportOut() {
        let img = new Image();
        img.setAttribute('crossorigin', 'anonymous');
        img.src = this._option.imgUrl;
        img.width = this._option.widthImg;
        img.height = this._option.heightImg;
        img.style.background = '#fff';

        img.onload = () => {
            let canvas = this._convertImageToCanvas(img);
            let imgUrl = canvas.toDataURL('image/jpeg');
            this.exportImages(imgUrl);
        };
    }
    base64ToBlob(code) {
        let parts = code.split(';base64,');
        let contentType = parts[0].split(':')[1];

        let raw = window.atob(parts[1]);
        let rawLength = raw.length;

        let uInt8Array = new Uint8Array(rawLength);

        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], { type: contentType });
    }
    exportImages(datas) {
        let aLink = document.createElement('a');
        let blob = this.base64ToBlob(datas);

        let evt = document.createEvent('HTMLEvents');
        evt.initEvent('click', true, true);
        aLink.download =
            'test' + '.jpg';
        aLink.href = URL.createObjectURL(blob);
        aLink.dispatchEvent(
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            })
        );
    }
    exportSimple() {
        this.zr.painter.getRenderedCanvas({
            backgroundColor: '#fff'
        }).toBlob((blob) => {
            let url = window.URL.createObjectURL(blob);
            window.open(url);
        }, 'image/png');
    }
    export () {
        //离屏渲染导出
        //https://github.com/ecomfe/zrender/issues/363
        let { x, y, width, height } = this.group.getBoundingRect();
        let zr = zrender.init(document.createElement('div'), {
            width,
            height
        });
        let group = new zrender.Group();
        group.position = [0 - x, 0 - y];

        this.group.eachChild((child) => {
            // 此处会堆栈溢出, 目前解决办法是用原始数据重新创建新的shape, 再加入到新group中
            // var _child = zrender.util.clone(child);
            group.add(child);
        });

        zr.add(group);
        zr.refreshImmediately();

        return zr.painter.getRenderedCanvas({
            backgroundColor: '#fff'
        }).toBlob((blob) => {
            let url = window.URL.createObjectURL(blob);
            window.open(url);
        }, 'image/png');
    }
}