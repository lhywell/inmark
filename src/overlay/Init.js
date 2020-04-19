import zrender from 'zrender'
import { merge } from '../common/utils.js'
import Tools from '../common/Tools'
let zr, image, group;

/**
 * @constructor
 * @param {Object} opts
 */
export default class Init {
    constructor(opts) {
        if (opts) {
            this.zr = zrender.init(document.getElementById(opts.id))
            zr = this.zr;
            if (opts && opts.imgUrl) {
                this.imgUrl = opts.imgUrl;
            } else {
                new Error('请填入imgUrl属性,仅支持http或者https')
            }
            // console.log('初始化', this.zr)
            this._option = opts;
        } else {
            this.zr = zr;
            this.group = group;
        }
        //屏蔽浏览器的右击事件
        this.zr.dom.oncontextmenu = function() {
            return false
        };
        this.ctx = {};
        this.ctx.canvasWidth = this.zr.getWidth()
        this.ctx.canvasHeight = this.zr.getHeight()
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
    _zrClick() {}
    _zrMouseMove() {}
    _zrMouseDown() {}
    _zrMouseUp() {}
}