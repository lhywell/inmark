import zrender from 'zrender';
import { merge } from '../common/utils.js';
import Tools from '../common/Tools';

let inMarkGroup = {};
let inMarkMode = {};
let inMarkImage = {};
let inMarkSelectedSub = {};
let inMarkOption = {};
Tools.prototype.inMarkOption = {};

export default class AbstractRender extends Tools {
    /**
     * @constructor
     * @param {Object} opts
     */
    constructor(opts) {
        super();
        if (opts) {
            this.setZrender(opts.id)

            this._option = opts;
        } else {
            this.zr = this.getZrender();
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

        this.handlers = {}; //存储事件的对象

        this.image = null;

        this.tools = new Tools();
    }

    // 抽象方法，需要子类实现
    _zrClick() {}
    _zrMouseMove() {}
    _zrMouseDown() {}
    _zrMouseUp() {}
    _zrDBClick() {}
    setData() {}
    getData() {}

    // 非抽象方法
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
    addEventListener(type, handler) {
        let x = '_' + type;
        if (typeof this.handlers[x] == 'undefined') {
            this.handlers[x] = [];
        }

        this.handlers[x].push(handler); //将要触发的函数压入事件函数命名的数组中
    }
    removeEventListener(type, handler) {
        let x = '_' + type;
        if (!this.handlers[x]) return;
        var handlers = this.handlers[x];
        if (handler == undefined) {
            handlers.length = 0; //不传某个具体函数时，解绑所有
        } else if (handlers.length) {
            for (var i = 0; i < handlers.length; i++) {
                if (handlers[i] == handler) {
                    //解绑单个
                    this.handlers[x].splice(i, 1);
                }
            }
        }
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

        Tools.prototype.inMarkOption = {};
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
    // get,set方法
    setZrender(id) {
        if (id) {
            this.zr = zrender.init(document.getElementById(id));
            AbstractRender.prototype.zr = this.zr;
        }
    }
    getZrender() {
        return AbstractRender.prototype.zr;
    }
    setRenderMode(id, mode) {
        inMarkMode[id] = mode;
    }
    getRenderMode(id) {
        return inMarkMode[id];
    }
    setGroup(id) {
        let group = new zrender.Group();
        inMarkGroup[id] = group;
    }
    getGroup(id) {
        return inMarkGroup[id];
    }
    setImage(id, image) {
        inMarkImage[id] = image;
    }
    getImage(id) {
        // 注意：在loadComplete里执行
        return inMarkImage[id];
    }
    setSelectedSub(id, selectedSub) {
        inMarkSelectedSub[id] = selectedSub;
    }
    getSelectedSub(id) {
        return inMarkSelectedSub[id];
    }
    setOption(id, option) {
        Tools.prototype.inMarkOption[id] = option;
    }
    getOption(id) {
        return Tools.prototype.inMarkOption[id];
    }

}