import zrender from 'zrender';
import {
    merge,
    isNumber
} from '../common/utils.js';

import TextConfig from '../config/TextConfig.js';
import Image from './Image.js';
import Init from './Init.js';

let TextOption, image, group;

/**
 * @constructor
 * @extends module:RectOverlay
 * @param {Object} args
 * @param {Object} opts
 */
export default class TextOverlay extends Image {
    constructor(opts) {
        super();

        this.group = this._option.group;
        this.image = this._option.image;

        this.type = 'TextOverlay';
        //是否开启绘制模式
        this._option.isOpen = opts.isOpen || false;
        this.graphic = this._createGraphicGroup();
        this._areaShapes = [];
        // 回调函数
        // this._mousemove = opts && opts.event && opts.event.mousemove;
        // this._mouseout = opts && opts.event && opts.event.mouseout;        this._onSelected = opts && opts.event && opts.event.onSelected;
        this._onHover = opts && opts.event && opts.event.onHover;
        this._onImageDrag = opts && opts.event && opts.event.onImageDrag;
        this._onImageDragEnd = opts && opts.event && opts.event.onImageDragEnd;
        this._onSelected = opts && opts.event && opts.event.onSelected;

        this.data = opts.data;
        if (opts.style) {
            this._styleConfig = merge(TextConfig.style.default, opts.style);
        } else {
            this._styleConfig = TextConfig.style.default;
        }
        this.zlevel = this._styleConfig.zlevel;

        this.handlers = {}; //存储事件的对象 
        this.DIYStyle = {};

        if (this.image) {
            this.image.on('drag', (e) => {
                //拖动图片与多边形同步
                this._onImageDrag && this._onImageDrag(e);

                this.handlers['_onImageDrag'] && this.handlers['_onImageDrag'][0](e);

                if (this.getDrag() === true) {
                    let array = e.target.position;
                    this.graphic.attr({
                        position: array
                    });
                    this.bgDrag = array;
                }
            });
            this.image.on('dragend', (e) => {
                //拖动图片与多边形同步
                this._onImageDragEnd && this._onImageDragEnd(e);

                this.handlers['_onImageDragEnd'] && this.handlers['_onImageDragEnd'][0](e);
            });
        }
        if (typeof this.data === 'object') {
            this.setData(this.data);
        } else {
            new Error('请传入数组类型');
        }
    }
    open() {
        //开启绘制模式
        this._option.isOpen = true;

        this.resetAllStyle();

        this.setDrawingMode(window.INMARK_DRAWING_RECTANGLE);

        this._bindEvent();

        this.setEdit(true);

        this.group.eachChild((item) => {
            if (item.data.type === 'IMAGE') {
                item.attr({
                    'cursor': 'crosshair'
                });
            }
        });
    }
    close() {
        //关闭绘制模式
        this._option.isOpen = false;

        this.setEdit(false);

        this.group.eachChild((item) => {
            if (item.data.type === 'IMAGE') {
                item.attr({
                    'cursor': 'default'
                });
            }
        });

        if (this._option.drawingType === 'hander') {
            return;
        }

        this.setDrawingMode('hander');
    }
    addEventListener(type, handler) {
        let x = '_' + type;
        if (typeof this.handlers[x] == 'undefined') {
            this.handlers[x] = [];
        }

        this.handlers[x].push(handler); //将要触发的函数压入事件函数命名的数组中
    }
    //事件解绑
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
    _createGraphicGroup(points, shape) {
        //创建编辑图形
        let group = new zrender.Group();
        group.data = {
            type: 'TextGroup'
        };

        return group;
    }
    /**
     * @description 给id为某个值的标记物存入数据
     * @params {Array} data
     */
    setData(data) {
        this._setTexts(data);
    }
    _setTexts(data) {
        this.removeAll();

        data.forEach(item => {
            if (item.type === 'Text') {

                let shape = this._setShapeWidth(item);

                shape.on('mouseover', (e) => {
                    this.handlers['_onHover'] && this.handlers['_onHover'][0](e, {
                        ...e.target.data
                    });
                    this._onHover && this._onHover(e, {
                        ...e.target.data
                    });
                });
                shape.on('mousedown', (e) => {
                    this.handlers['_onSelected'] && this.handlers['_onSelected'][0](e, {
                        ...e.target.data
                    });

                    this._onSelected && this._onSelected(e, {
                        ...e.target.data
                    });
                });

                this._setShapeHeight(shape, item);

                this._areaShapes.push(shape);
                this.graphic.add(shape);
            }
        })
        this.group.add(this.graphic);
        this.zr.add(this.group);
    }
    /**
     * @description 设置当前的图层的zlevel值,值相同的在同一个图层
     * @params {Number} index
     */
    setZIndex(index) {
        this.zlevel = index;
    }
    /**
     * @删除所有文字
     */
    removeAll() {
        if (this._areaShapes.length > 0) {
            // debugger;
            this._areaShapes.forEach(item => {
                this.graphic.remove(item);
                item = null;
            });
        }
        this._areaShapes.splice(0);

        this._option.exportData.splice(0);
    }
    /**
     * @description 设置当前样式
     */
    setOptionStyle(style) {
        this.DIYStyle = style;
        this._areaShapes.forEach(item => {
            console.log(item)
            if (item.data.type === 'Text') {
                item.attr({
                    style: {
                        ...this._styleConfig.default,
                        ...style
                    }
                });
            }
        });
    }
    /**
     * @description 重置标记样式
     */
    resetShapeStyle() {
        this._areaShapes.forEach(item => {
            if (item.data.type === 'Text') {
                item.attr({
                    style: {
                        ...this._styleConfig.default,
                        ...this.DIYStyle
                    },
                    draggable: false
                });
            }
        });
    }
    _setShapeHeight(shape, item) {
        let obj = shape.getBoundingRect();
        // 横坐标不变，纵坐标垂直居中
        let p = shape.position;
        if (item.height >= obj.height) {
            shape.attr({
                position: [p[0], p[1] + (item.height - obj.height) / 2]
            })
        }
    }
    _setShapeWidth(item, type) {
        // 解决超出框的问题
        let size = this._computeFontSize(item, type);
        item.fontSize = size;

        let shape = this._createText(item);
        let obj = shape.getBoundingRect();

        if (obj.width >= item.width) {
            // 如果生成文字包围盒宽度超过框的大小，递归减小字号，直到文字的包围盒宽度适中
            return this._setShapeWidth(item, 'minus');
        } else {
            return shape;
        }
    }
    _computeFontSize(obj, type) {
        // 默认字符大小 = 框的高度
        if (type) {
            obj.tHeight--;
            return obj.tHeight;
        }
        if (obj.height && obj.word) {

            obj.tHeight = obj.height;
            return obj.height
        }
    }
    _createText(obj) {
        let t = new zrender.Text({
            style: {
                ...this._styleConfig,
                text: obj.word,
                fontSize: obj.fontSize
            },
            data: obj,
            position: obj.position,
            zlevel: this.zlevel
        });
        return t;
    }
}