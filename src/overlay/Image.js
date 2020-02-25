import zrender from 'zrender'
import { merge } from '../common/utils.js'
import Tools from '../common/Tools'
import ImageConfig from '../config/ImageConfig.js'
import EditPolygon from '../config/EditPolygon.js'
import Init from './Init'
let zr, image, group;

/**
 * @constructor
 * @param {Object} opts
 */
export default class BImage extends Init {
    constructor(opts) {
        super(opts)

        this._option = {};
        this._option.offsetX = 0 //图片等比例缩放后在画布中左右的位移
        this._option.offsetY = 0 //图片等比例缩放后在画布中左右的位移

        this._option.imgZoom = 2 //图片放大限制
        this._option.setRate = 0 //图片的缩放比例
        this._option.widthImg = 0
        this._option.heightImg = 0
        this._option.scale = 1;
        this._option.x = 0;
        this._option.y = 0;
        this._option.draggable = false;
        this._option.rotation = 0;
        this._option.rotateTime = 1;
        this.type = 'IMAGE'
        this._editWidth = EditPolygon.shape.width
        this._onComplete = opts && opts.event.onLoadComplete;
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
        this.group && this.group.eachChild(item => {
            item.attr({
                'draggable': bol,
                'cursor': 'pointer'
            });
        })
    }
    getDrag() {
        return this._option.draggable;
    }
    /**
     * @description 在画布中渲染图片
     * @params {Array} url 支持http,https图片路径
     */
    renderImg(url) {
        if (url.length === 0) {
            new Error('请填入图片url');
            return;
        }
        //加载图片
        group = new zrender.Group();
        this.group = group;

        let img = new Image();
        img.src = url;
        img.onload = () => {
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
                data: { type: 'IMAGE' },
                zlevel: 1
            })

            this.image = image;

            group.add(image);
            this.zr.add(group);

            this._onComplete && this._onComplete();

            this._bindEvent();
        }
    }
    _zrClick() {}
    _zrMouseMove() {}
    _zrMouseDown() {}
    _zrMouseUp() {}
    rotate(direction = 'clockwise') {
        //正值代表逆时针旋转，负值代表顺时针旋转
        let center = [this._option.widthImg / 2, this._option.heightImg / 2];
        let nine = Math.PI / 2;

        this.group.attr({
            rotation: -nine * this._option.rotateTime,
            origin: center
        })
        this._option.rotateTime++;
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
    zoomIn(times = 1.2) {
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
            position: [newPos.x, newPos.y],
            scale: [newAttrs.scale, newAttrs.scale]
        })

        this._option.scale = newAttrs.scale;
        this._option.x = newPos.x;
        this._option.y = newPos.y;

        return this;
    }
    _toGlobal(points, shape) {
        let newPoints = zrender.util.clone(points);
        // newPoints.forEach(item => {
        //     item[0] += position[0];
        //     item[1] += position[1];
        // })
        let array = [];
        newPoints.forEach(item => {
            let x;
            x = shape.transformCoordToGlobal(item[0], item[1])
            array.push(x);
        })
        // return newPoints;
        return array;
    }
    _toGlobalSave(points, shape) {
        let newPoints = zrender.util.clone(points);
        let array = [];
        newPoints.forEach(item => {
            let x, scale = this.group.scale[0];
            if (scale === 1) {
                x = shape.transformCoordToGlobal(item[0], item[1])
            } else {
                x = shape.transformCoordToGlobal(item[0], item[1])
                x = [x[0] / scale, x[1] / scale];
            }
            array.push(x);
        })
        return array;
    }
    _toLocal(points, shape) {
        let newPoints = zrender.util.clone(points);
        let array = [];
        newPoints.forEach(item => {
            let x, scale = this.group.scale[0];
            x = shape.transformCoordToLocal(item[0], item[1]);
            array.push(x);
        })
        return array;
    }
    clear() {
        this.group && this.group.removeAll();
        this.dispose();
        this.zr.clear();
        this.reset();
    }
    reset() {
        this.zr = null;
        this.image = null;
        this.group = null;
        this.polygon = null;
    }
    disposeMove() {
        this.zr.off('mousedown', this._zrMouseDown);
        this.zr.off('mousemove', this._zrMouseMove);
        this.zr.off('click', this._zrClick);
    }
    close() {}
    dispose() {
        //注销事件
        this.zr.off('click', this._zrClick);
        this.zr.off('mousemove', this._zrMouseMove);
        this.zr.off('mousedown', this._zrMouseDown);
        this.zr.off('mouseup', this._zrMouseUp);
    }
}