import zrender from 'zrender';
import { merge } from '../common/utils.js';
import Tools from '../common/Tools';
let zr;

/**
 * @constructor
 * @param {Object} opts
 */
export default class Init {
    constructor(opts, obj) {
        if (opts) {
            this.zr = zrender.init(document.getElementById(opts.id));
            zr = this.zr;
            if (opts && opts.imgUrl) {
                this.imgUrl = opts.imgUrl;
            } else {
                new Error('请填入imgUrl属性,仅支持http或者https');
            }
            // console.log('初始化', opts)
            this._option = opts;
        } else {
            this.zr = zr;
            this._option = obj;
        }
        //屏蔽浏览器的右击事件
        this.zr.dom.oncontextmenu = function() {
            return false;
        };
        this.ctx = {};
        this.ctx.canvasWidth = this.zr.getWidth();
        this.ctx.canvasHeight = this.zr.getHeight();
        this._zrClick = this._zrClick;
        this._zrMouseMove = this._zrMouseMove;
        this._zrMouseDown = this._zrMouseDown;
        this._zrMouseUp = this._zrMouseUp;
    }
    _bindEvent() {
        this.zr.on('click', this._zrClick, this);
        this.zr.on('mousemove', this._zrMouseMove, this);
        this.zr.on('mousedown', this._zrMouseDown, this);
        this.zr.on('mouseup', this._zrMouseUp, this);
        this.zr.on('dblclick', this._zrDBClick, this);
    }
    _unBindEvent() {
        //注销事件
        if (this.zr) {
            this.zr.off('click', this._zrClick);
            this.zr.off('mousemove', this._zrMouseMove);
            this.zr.off('mousedown', this._zrMouseDown);
            this.zr.off('mouseup', this._zrMouseUp);
            this.zr.off('dblclick', this._zrDBClick);
        }
    }
    _zrClick() {}
    _zrMouseMove() {}
    _zrMouseDown() {}
    _zrMouseUp() {}
    _toGlobal(points, shape) {
        let newPoints = zrender.util.clone(points);
        // newPoints.forEach(item => {
        //     item[0] += position[0];
        //     item[1] += position[1];
        // })
        let array = [];
        newPoints.forEach(item => {
            let x;
            x = shape.transformCoordToGlobal(item[0], item[1]);
            array.push(x);
        });
        // return newPoints;
        return array;
    }
    _toGlobalSave(points, shape) {
        let newPoints = zrender.util.clone(points);
        let array = [];
        newPoints.forEach(item => {
            let x, scale = this.group.scale[0];
            if (scale === 1) {
                x = shape.transformCoordToGlobal(item[0], item[1]);
            } else {
                x = shape.transformCoordToGlobal(item[0], item[1]);
                x = [x[0] / scale, x[1] / scale];
            }
            array.push(x);
        });
        return array;
    }
    _toLocal(points, shape) {
        let newPoints = zrender.util.clone(points);
        let array = [];
        newPoints.forEach(item => {
            let x, scale = this.group.scale[0];
            x = shape.transformCoordToLocal(item[0], item[1]);
            array.push(x);
        });
        return array;
    }
    disposeMove() {
        this.zr.off('mousedown', this._zrMouseDown);
        this.zr.off('mousemove', this._zrMouseMove);
        this.zr.off('click', this._zrClick);
    }
    reset() {
        this.zr = null;
        this.image = null;
        this.group = null;
        this.polygon = null;
    }
    clear() {
        // 清除所有对象和画布。
        this.group && this.group.removeAll();
        this._unBindEvent();
        this.zr && this.zr.clear();
    }
    dispose() {
        // 移除自身。当不再需要使用该实例时，调用该方法以释放内存。
        this.zr && this.zr.dispose();
        this.reset();
    }
}