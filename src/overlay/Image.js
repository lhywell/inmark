import zrender from 'zrender';
import { merge } from '../common/utils.js';
import Tools from '../common/Tools';
import ImageConfig from '../config/ImageConfig.js';
import EditRect from '../config/EditRect.js';
import Init from './Init';
let ImageOption, image, group;

/**
 * @constructor
 * @param {Object} opts
 */
export default class BImage extends Init {
    constructor(opts) {
        super(opts, ImageOption);
        if (ImageOption) {
            this._option = ImageOption;
        } else {
            this._option = {};
            this._option.offsetX = 0; //图片等比例缩放后在画布中左右的位移
            this._option.offsetY = 0; //图片等比例缩放后在画布中左右的位移

            this._option.imgZoom = 2; //图片放大限制
            this._option.setRate = 0; //图片的缩放比例
            this._option.widthImg = 0;
            this._option.heightImg = 0;
            this._option.scale = 1;
            this._option.origin = [0, 0]; //旋转和缩放的原点
            this._option.x = 0;
            this._option.y = 0;
            this._option.draggable = false;
            this._option.rotateTime = 0;
            this._option.center = [];
            this._option.rotate = {};
            this._option.mode = opts && opts.mode || 'auto';
        }

        this.type = 'IMAGE';
        this.image = null;
        this._editWidth = EditRect.shape.width;

        // 回调函数
        this._imageDrag = opts && opts.event.onImageDrag;
        this._imageDragEnd = opts && opts.event.onImageDragEnd;
        this._onComplete = opts && opts.event.onLoadComplete;
        // console.log(this)

        this.initialize();

        ImageOption = this._option;
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
        img.src = url;
        img.setAttribute('crossorigin', 'anonymous');
        img.onload = () => {
            if (this._option.mode === 'auto') {
                //图片自动适应屏幕大小
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
            } else {
                //1:1展示图片
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
    _zrMouseMove() {}
    _zrMouseDown() {}
    _zrMouseUp() {}
    _zrDBClick() {}
    _reSetCenter() {
        const box = this.image.getBoundingRect();
        this._option.widthImg = box.width * this._option.scale;
        this._option.heightImg = box.height * this._option.scale;

        this._option.offsetX = this._option.x;
        this._option.offsetY = this._option.y;
        this._option.center = [this._option.offsetX + (this._option.widthImg / 2), this._option.offsetY + (this._option.heightImg / 2)];

        return this._option.center
    }
    getRotate() {
        //返回弧度制，角度制
        return this._option.rotate;
    }
    resetRotate() {
        this.rotate(0);
    }
    getOrigin() {
        const box = this.image.getBoundingRect();
        this._option.widthImg = box.width * this._option.scale;
        this._option.heightImg = box.height * this._option.scale;

        this._option.origin = [(this._option.widthImg / 2), (this._option.heightImg / 2)];

        return this._option.origin;
    }
    getCenter() {
        return this._reSetCenter();
    }
    _getOffset() {
        const origin = this.getOrigin();

        let x = -origin[0] * this._option.scale + origin[0];
        let y = -origin[1] * this._option.scale + origin[1];

        return [-x, -y];
    }
    _reSetPosition() {
        const offset = this._getOffset();

        return [offset[0] + this._option.x, offset[1] + this._option.y];
    }
    rotate(degree) {

        //正值代表逆时针旋转，负值代表顺时针旋转
        const oldScale = this.group.scale[0];

        //等于0拖拽会发生飘移，所以设定0.003度，无限接近于0
        const zero = 0.003 / 180 * Math.PI;

        if (degree === 0) {
            this._option.rotateTime = 0;
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
        if (degree > 0) {
            this._option.rotateTime++;

            let result;
            if (this._option.rotateTime === 0) {
                result = zero;
            } else {
                result = -degreePi * this._option.rotateTime;
            }

            this.group.attr({
                rotation: result,
                position: this._reSetPosition(),
                origin: this.getOrigin()
            });

            this._option.rotate = {
                radians: -degreePi * this._option.rotateTime,
                degrees: -degree * this._option.rotateTime
            };
        } else {
            this._option.rotateTime--;

            let result;
            if (this._option.rotateTime === 0) {
                result = zero;
            } else {
                result = degreePi * this._option.rotateTime;
            }

            this.group.attr({
                rotation: result,
                position: this._reSetPosition(),
                origin: this.getOrigin()
            });
            this._option.rotate = {
                radians: degreePi * this._option.rotateTime,
                degrees: degree * this._option.rotateTime
            };
        }
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
    zoomIn(times = 1.25) {
        this.zoomStage(times);
    }
    zoomOut(times = 0.8) {
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
            origin: this.getOrigin()
        });

        let d = this.group.getLocalTransform();

        this._option.x = d[4];
        this._option.y = d[5];

        this._option.scale = newAttrs.scale;

        return this;
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