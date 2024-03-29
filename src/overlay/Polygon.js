import zrender from 'zrender';
import { merge } from '../common/utils.js';
import PolygonRect from '../config/PolygonRect.js';
import EditRect from '../config/EditRect.js';
import AbstractRender from './AbstractRender.js';

export default class Polygon extends AbstractRender {
    /**
     * @constructor
     * @extends module:PolygonOverlay
     * @param {Object} opts
     */
    constructor(opts) {
        super(opts);

        this.group = this.getGroup();
        this.image = this.getImage();

        this.type = 'POLYGON';

        this._option = this.getOption();

        let mode = this.getRenderMode();
        this._option.mode = mode || 'auto';

        this._option.currentShape = null;

        //是否开启绘制模式
        this._option.isOpen = opts.isOpen || false;

        this._option.exportData = [];

        // 回调函数
        this._onCreate = opts && opts.event && opts.event.onCreate;
        this._onCreateComplete = opts && opts.event && opts.event.onCreateComplete;
        this._onRectDrag = opts && opts.event && opts.event.onRectDrag;
        this._onRectDragComplete = opts && opts.event && opts.event.onRectDragComplete;
        this._onEditNodeDrag = opts && opts.event && opts.event.onEditNodeDrag;
        this._onEditNodeDragComplete = opts && opts.event && opts.event.onEditNodeDragComplete;
        this._onSelected = opts && opts.event && opts.event.onSelected;
        this._onHover = opts && opts.event && opts.event.onHover;
        this._unSelect = opts && opts.event && opts.event.unSelect;
        this._onImageDrag = opts && opts.event && opts.event.onImageDrag;
        this._onImageDragEnd = opts && opts.event && opts.event.onImageDragEnd;

        this.data = opts.data;

        this._editWidth = EditRect.shape.width; //拖拽按钮的宽高限制
        if (opts.style) {
            this._styleConfig = merge(PolygonRect.style, opts.style);
        } else {
            this._styleConfig = PolygonRect.style;
        }
        this._isMouseDown = false;

        this._startPoint = [];
        this._endPoint = [];

        this._areaShapes = []; //所有的标注图形集合
        this._editNode = [];
        this._editRectStart = [];
        this.position = [0, 0];
        this.bgDrag = [];
        this.graphic = this._createGraphicGroup();
        // this._option.currentShape = {};
        this.tempShape = [];
        this.creatCount = 0;
        this.handlers = {}; //存储事件的对象 

        this.zlevel = this._styleConfig.default.zlevel;
        this.DIYStyle = {};

        if (this.image) {
            this.image.on('drag', (e) => {
                //拖动图片与多边形同步
                this._onImageDrag && this._onImageDrag(e);
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
            });
        }
        if (typeof this.data === 'object') {
            this.setData(this.data);
        } else {
            new Error('请传入数组类型');
        }

    }
    open() {
        // if (this._option.drawingType !== INMARK_DRAWING_POLYGON) {
        //     this.close();
        // }
        //开启绘制模式
        this._option.isOpen = true;

        this.resetAllStyle();

        this.setDrawingMode(window.INMARK_DRAWING_POLYGON);

        this._bindEvent();

        this.setEdit(true);

        this.group.eachChild((item) => {
            if (item.data.type === 'IMAGE') {
                item.attr({
                    'cursor': 'crosshair'
                });
            }
        });
        // if (this._option.currentShape && this._option.currentShape.position) {
        //     this.setSelectedStyle(this._option.currentShape);
        // }
    }
    close() {
        //关闭绘制模式
        this._option.isOpen = false;

        this.creatCount = 0;

        this.setEdit(false);

        this.group.eachChild((item) => {
            if (item.data.type === 'IMAGE') {
                item.attr({
                    'cursor': 'default'
                });
            }
        });

        if (this.getDrawingMode() === 'hander') {
            return;
        }

        this.setDrawingMode('hander');
    }
    setEdit(blean) {
        if (blean) {
            //初始化显示编辑
            this._areaShapes.forEach(item => {
                item.attr({
                    draggable: true
                });
                if (item.bound) {
                    item.bound.eachChild(edit => {
                        edit.hide();
                    });
                }
            });
        } else {
            this._areaShapes.forEach(item => {
                item.attr({
                    draggable: false
                });

                if (item.bound) {
                    item.bound.eachChild(edit => {
                        edit.hide();
                    });
                }
            });
        }
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
            type: 'graphicGroup'
        };

        return group;
    }
    _zrClick(e) {

        if (e.target && e.target.data.type === 'IMAGE') {
            this.resetShapeStyle();
        }
    }
    _zrMouseDown(e) {
        // debugger;
        if (e.which === 1 && e.target && this._option.isOpen && this.getDrawingMode() === window.INMARK_DRAWING_POLYGON) {
            //创建多边形第一个点
            if (this.creatCount !== 0 && this._isMouseDown === true) {
                this.creatCount++;
                this._startPoint.push(this._getDrawPoint(e));
            }

            if (this.creatCount === 0 && this._isMouseDown === false && e.target.data.type === 'IMAGE') {
                this.resetShapeStyle();

                this._startPoint[this.creatCount] = this._getDrawPoint(e);

                this.creatCount++;
                this._isMouseDown = true;
                this._option.currentShape = null;
            }

        }
    }
    _zrMouseMove(e) {
        //e.target=undefined 禁止拖动到浏览器外边
        if (this._isMouseDown && this._startPoint && e.target) {

            this._endPoint = this._getDrawPoint(e);

            let points;
            if (this.creatCount === 1) {
                //直线
                points = [
                    [(this._startPoint[0][0]) / this._option.setRate, (this._startPoint[0][1]) / this._option.setRate],
                    [(this._endPoint[0]) / this._option.setRate, (this._endPoint[1]) / this._option.setRate]
                ];
            } else {
                //多边形
                let newPoints = zrender.util.clone(this._startPoint);

                let len = newPoints.length - 1;
                if (JSON.stringify(newPoints[len]) !== JSON.stringify(this._endPoint)) {
                    newPoints.push(this._endPoint);
                }

                points = this._changeToPoints(newPoints);


            }

            if (!this._option.currentShape) {
                //如果不存在 则创建一个新的
                this._option.currentShape = this._createShape(points, {
                    notes: '',
                    type: 'Polygon'
                });
                this.graphic.add(this._option.currentShape);
                this._areaShapes.push(this._option.currentShape);
            } else {
                //否则鼠标移动更新当前数据
                this._option.currentShape.attr({
                    shape: {
                        points: points
                    }
                });
            }
            const rPoints = this._changeToPoints(points);

            this.handlers['_onCreate'] && this.handlers['_onCreate'][0](e, {
                notes: '',
                coordinates: rPoints
            });

            this._onCreate && this._onCreate(e, {
                notes: '',
                coordinates: rPoints
            });
        }

    }
    _zrDBClick(e) {
        // 避免两点双击
        if (this.creatCount <= 3 && this._isMouseDown === true) {
            this.creatCount--;
            this._startPoint.splice(this._startPoint.length - 1);
            return;
        }
        //创建多边形结束
        if (e.target && this._isMouseDown && this._option.currentShape) {
            const index = this._areaShapes.length - 1;
            const shapePoints = this._option.currentShape.shape.points;
            const points = this._changeToPoints(shapePoints);
            const data = {
                type: 'Polygon',
                notes: '',
                id: window.btoa(Math.random()) //编码加密
            };
            this._areaShapes[index].attr({
                style: this._styleConfig.selected,
                data: {
                    ...data
                }
            });
            this._editNode = points;
            if (points.length > 0) {
                this._createEditGroup(points, this._option.currentShape);

                this._option.exportData.push({
                    ...data,
                    coordinates: points
                });

                this.setSelectedSub(e.target);

                this._onCreateComplete && this._onCreateComplete(e, {
                    ...data,
                    coordinates: points
                });

                this.handlers['_onCreateComplete'] && this.handlers['_onCreateComplete'][0](e, {
                    ...data,
                    coordinates: points
                });

            }
            this._isMouseDown = false;
            this._startPoint = [];
            this._endPoint = [];
            this.creatCount = 0;
        }

    }
    _zrMouseUp(e) {
        //新增图形回调函数

    }
    _resetPoints(points) {
        // 顺时针输出
        if (points[0][0] <= points[1][0]) {
            return points;
        } else {
            let i = 0;
            let p = points[0];
            let ary = [];
            for (let i = points.length - 1, len = points.length - 1; i > 0; i--) {
                ary.push(points[i]);
            }
            ary.unshift(p);
            return ary;
        }
    }
    _getDrawPoint(e) {
        //移动背景图片的偏移
        let x, y;
        let zoom = this.group.scale[0];

        let m = e.target && e.target.transform;
        if (e.target && m) {
            zoom = m[0];
            this.group.scale = [zoom, zoom];
            if (m[4] > 0) {
                x = e.offsetX / zoom - (Math.abs(m[4]) / zoom);
            } else {
                x = e.offsetX / zoom + (Math.abs(m[4]) / zoom);
            }
            if (m[5] > 0) {
                y = e.offsetY / zoom - (Math.abs(m[5]) / zoom);
            } else {
                y = e.offsetY / zoom + (Math.abs(m[5]) / zoom);
            }
        } else {
            x = e.offsetX / zoom;
            y = e.offsetY / zoom;
        }
        return [x, y];
    }
    /**
     * @description 给id为某个值的标记物存入数据
     * @params {Array} data
     */
    setData(data) {
        this.setMarkers(data);

        this.saveInstance(window.INMARK_DRAWING_POLYGON);
    }

    getData() {
        return this._option.exportData;
    }

    /**
     * @description 设置当前的图层的zlevel值,值相同的在同一个图层
     * @params {Number} index
     */
    setZIndex(index) {
        this.zlevel = index;
    }
    /**
     * @description 删除图形，保留图片
     */
    _filterImage() {
        this._areaShapes.splice(0);
        let save = [];
        this.group.eachChild((x) => {
            if (x.data.type === 'IMAGE') {
                save.push(x);
            }
        });
        this.group.removeAll();
        this.group.add(save[0]);
        this.zr.add(this.group);
    }
    /**
     * @description 遍历数据，用边框标记主体内容
     */
    setMarkers(data) {
        this.removeAll();

        this._option.exportData = zrender.util.clone(data);

        if (data.length > 0) {
            data.forEach((item) => {
                //多边形
                // debugger;
                if (item.type === 'Polygon') {

                    if (typeof item.coordinates === 'object') {
                        const points = this._calculateToRelationpix(item.coordinates);
                        const shape = this._createShape(points, item);
                        //注释可以打开
                        if (points.length === 0) {
                            throw new Error('此图形没有坐标数据,请删除此图形' + JSON.stringify(item));
                        }
                        if (points.length > 0) {
                            this._createEditGroup(points, shape);

                            this._areaShapes.push(shape);
                            this.graphic.add(shape);
                        }
                    }
                }
            });
        }
        this.group.add(this.graphic);
        this.setEdit(false);
    }
    setSelectedStyle(shape, options = {}) {
        //选中某个框设置样式
        shape.attr({
            style: merge(this._styleConfig.selected, options)
        });
        if (this._option.isOpen) {
            shape.attr({
                draggable: true
            });

            //选中某个框，编辑框设置样式,放大缩小后编辑框大小， 位置调整ß
            let w = this._editWidth / this.group.scale[0];

            shape.bound && shape.bound.eachChild((x, i) => {
                x.show();
                x.attr({
                    shape: {
                        x: shape.shape.points[i][0] - w / 2,
                        y: shape.shape.points[i][1] - w / 2,
                        width: w,
                        height: w
                    },
                    zlevel: this.zlevel + 1
                });
            });
        }
    }
    selected(item, options = {}) {
        if (this._option.isOpen) {
            return;
        }
        this.resetAllStyle();
        this._areaShapes.forEach(x => {
            if (x.data.id === item.id) {
                this._option.currentShape = x;

                const shapePoints = this._option.currentShape.shape.points;
                const points = this._changeToPoints(shapePoints);
                this._editNode = points;

                this.setSelectedStyle(x, options);
            }
        });
    }
    setPosition(item) {
        if (this._option.isOpen) {
            return;
        }
        if (item.coordinates.length === 0) {
            return;
        }

        let point = this._calculateToRelationpix(item.coordinates);

        let minWidth = 0,
            maxWidth = 0,
            minHeight = 0,
            maxHeight = 0;
        point.forEach(x => {
            if (maxWidth <= x[0]) {
                maxWidth = x[0];
            }
            if (maxHeight <= x[1]) {
                maxHeight = x[1];
            }
        });

        minWidth = maxWidth;
        minHeight = maxHeight;
        point.forEach(x => {
            if (x[0] < minWidth) {
                minWidth = x[0];
            }
            if (x[1] < minHeight) {
                minHeight = x[1];
            }
        });

        let point_center = [(maxWidth + minWidth) / 2, (maxHeight + minHeight) / 2];

        let scale = this.group.scale[0];
        let canvas_width = this.zr.painter._width;
        let canvas_height = this.zr.painter._height;

        let bgDragX;
        let bgDragY;
        if (this.bgDrag.length === 0) {
            bgDragX = 0;
            bgDragY = 0;
        } else {
            bgDragX = this.bgDrag[0];
            bgDragY = this.bgDrag[1];
        }
        this.group.attr({
            position: [(-point_center[0] - bgDragX) * scale + canvas_width / 2 * scale, (-point_center[1] - bgDragY) * scale + canvas_height / 2 * scale]
        });
    }
    _createEditGroup(points, shape) {
        //创建编辑图形
        let group = new zrender.Group();
        group.data = {
            type: 'EditGroup'
        };
        //新建属性group.bound
        group.bound = shape;

        this._createEditPoint(points, group);
        //新建属性shape.bound
        shape.bound = group;

        this.graphic.add(group);
        return group;
    }
    _toShapeDragEnd(e, shape) {
        let array = [];

        let points = zrender.util.clone(e.target.shape.points);
        let bgDragX, bgDragY;

        let m = e.target.transform;
        if (this.bgDrag.length === 0) {
            bgDragX = 0;
            bgDragY = 0;
        } else {
            bgDragX = this.bgDrag[0];
            bgDragY = this.bgDrag[1];
        }
        let offsetM = this.getOffsetM();
        let offsetN = this.getOffsetN();

        points.forEach(item => {
            let x;
            if (m) {
                if (m[4] - offsetM > 0) {
                    item[0] = item[0] + (Math.abs(m[4] - offsetM) / m[0]);
                } else {
                    item[0] = item[0] - (Math.abs(m[4] - offsetM) / m[0]);
                }
                if (m[5] - offsetN > 0) {
                    item[1] = item[1] + (Math.abs(m[5] - offsetN) / m[0]);
                } else {
                    item[1] = item[1] - (Math.abs(m[5] - offsetN) / m[0]);
                }
            }

            x = [item[0] - bgDragX, item[1] - bgDragY];
            array.push(x);
        });
        return array;
    }
    /**
     * @description 画边框标--生成单个边框
     * @param {Array} points
     * @param {Object} data
     */
    _createShape(points, data) {
        let shape = new zrender.Polygon({
            shape: {
                points: points,
                smooth: this._styleConfig.smooth,
                smoothConstraint: this._styleConfig.constraint
            },
            data: data,
            cursor: 'default',
            draggable: false,
            style: this._styleConfig.default,
            zlevel: this.zlevel
        });

        let oldGroup = [];
        shape.on('click', (e) => {
            if (this.getDrawingMode() !== 'polygon') {
                return;
            }
            if (e.which === 1) {
                this._editNode = this._toShapeDragEnd(e, e.target);
            }
        });
        shape.on('dragstart', (e) => {
            if (this.getDrawingMode() !== 'polygon') {
                return;
            }
            if (e.which === 1) {
                this._option.currentShape = shape;

                this.tempShape = e.target;
            }
        });
        shape.on('drag', (e) => {
            if (this.getDrawingMode() !== 'polygon') {
                return;
            }
            //拖动多边形与编辑同步
            if (this._isMouseDown === false) {

                let group = shape.bound;
                group.attr({
                    position: group.bound.position
                });
                group.eachChild(item => {
                    item.hide();
                });

                //移动过程中，重新记录坐标点
                this._editNode = this._toShapeDragEnd(e, e.target);

                this._option.currentShape = e.target;

                let shapePoints = this._toGlobal(e.target.shape.points, shape);
                const rPoints = this._changeToPoints(shapePoints);

                this.handlers['_onRectDrag'] && this.handlers['_onRectDrag'][0](e, {
                    ...e.target.data,
                    coordinates: rPoints
                });

                this._onRectDrag && this._onRectDrag(e, {
                    ...e.target.data,
                    coordinates: rPoints
                });
            }
        });

        shape.on('dragend', (e) => {
            if (this.getDrawingMode() !== 'polygon') {
                return;
            }
            if (e.which === 1 && this._isMouseDown === false) {
                let shape = e.target;

                this.position = zrender.util.clone(shape.position);
                //拖动后点坐标
                let shapePoints = this._toShapeDragEnd(e, shape);

                this._option.currentShape = shape;
                //拖拽完之后，删除原有框，重新创建一个框，避免画框重叠飞框
                this._reCreatePoints(shapePoints);

                const rPoints = this._changeToPoints(shapePoints);

                this._option.exportData.forEach(item => {
                    if (item.id === e.target.data.id) {
                        item.coordinates = rPoints;
                    }
                });

                this.handlers['_onRectDragComplete'] && this.handlers['_onRectDragComplete'][0](e, {
                    ...e.target.data,
                    coordinates: rPoints
                });

                this._onRectDragComplete && this._onRectDragComplete(e, {
                    ...e.target.data,
                    coordinates: rPoints
                });

            }
        });
        shape.on('mousemove', (e) => {
            if (this.getDrawingMode() !== 'polygon') {
                return;
            }
            if (this._option.isOpen) {

                shape.attr({
                    cursor: 'default',
                });

                this.tempShape = e.target;
            }
        });
        shape.on('mouseover', (e) => {
            if (this.getDrawingMode() !== 'polygon') {
                return;
            }
            if (this._option.isOpen) {
                shape.attr({
                    cursor: 'default',
                });

                if (this._isMouseDown === false) {

                    this.tempShape = e.target;

                    this._unBindEvent();
                }

                return;
            }

            let shapePoints = this._toGlobal(e.target.shape.points, shape);
            const rPoints = this._changeToPoints(shapePoints);

            this.handlers['_onHover'] && this.handlers['_onHover'][0](e, {
                ...e.target.data,
                coordinates: rPoints
            });

            this._onHover && this._onHover(e, {
                ...e.target.data,
                coordinates: rPoints
            });
        });
        shape.on('mouseout', (e) => {
            if (this.getDrawingMode() !== 'polygon') {
                return;
            }
            if (this._option.isOpen) {
                this._bindEvent();
            }
        });

        shape.on('mousedown', (e) => {
            if (this.getDrawingMode() === 'rectangle') {
                return;
            }
            // OCRMARK-149右键移动已标注的框，在原位置重新标注，新标注框与之前移动过的标注框重合，出现飞框情况
            if (e.which === 3) {
                shape.attr({
                    draggable: false
                })
                return;
            }
            if (e.which === 1 && this._isMouseDown === false) {
                //选中某个框
                this._option.currentShape = e.target;
                this.tempShape = e.target;

                this.setSelectedSub(shape);
                this.resetAllStyle();

                this.setSelectedStyle(e.target);
                let shapePoints = this._toGlobal(e.target.shape.points, shape);
                const rPoints = this._changeToPoints(shapePoints);

                this.handlers['_onSelected'] && this.handlers['_onSelected'][0](e, {
                    ...e.target.data,
                    coordinates: rPoints
                });

                this._onSelected && this._onSelected(e, {
                    ...e.target.data,
                    coordinates: rPoints
                });
            }
        });
        shape.on('dblclick', (e) => {
            if (this.getDrawingMode() !== 'polygon') {
                return;
            }
        });
        shape.on('mouseup', (e) => {
            if (this.getDrawingMode() !== 'polygon') {
                return;
            }
            //开启编辑，选中某个框
            let sub = this.getSelectedSub();
            if (this._option.isOpen && sub && e.which === 1) {

                this._option.currentShape.bound && this._option.currentShape.bound.eachChild(item => {
                    item.show();
                });

                this._bindEvent();
            }
        });

        return shape;
    }
    _reCreatePoints(points) {
        let shape = this._createShape(points, this._option.currentShape.data);
        this.graphic.remove(this._option.currentShape.bound);
        this.graphic.remove(this._option.currentShape);
        this._areaShapes.forEach((item, index) => {
            if (item.data.id === this._option.currentShape.data.id) {
                this._areaShapes.splice(index, 1);
            }
        });
        this._option.currentShape = shape;

        this._createEditGroup(points, shape);

        this.setSelectedSub(shape);

        this._areaShapes.push(shape);
        this.graphic.add(shape);

        this.setSelectedStyle(shape);

        this._startPoint = [];
    }
    _editElementEvent(editNode, group) {
        editNode.on('mouseover', (e) => {});
        editNode.on('mouseout', (e) => {});

        editNode.on('mouseup', (e) => {});
        editNode.on('dragstart', (e) => {
            //e.which鼠标左键，禁止鼠标右键拖动框
            if (e.which === 3) {
                group.eachChild(item => {
                    item.hide();
                });
                return;
            }
            if (e.which === 1) {
                let m = this._option.currentShape.transform;
                let point = this._option.currentShape.shape.points;
                const oldPoints = zrender.util.clone(point);

                this.oldPoint = oldPoints;

                this.m = zrender.util.clone(this._option.currentShape.transform || []);
            }
        });

        editNode.on('drag', (e) => {
            //禁止编辑画框到canvas外
            if (e.event.target.tagName === 'CANVAS' && e.which === 1) {
                //框拖拽移动之后，取记录点坐标
                let oldPoints = zrender.util.clone(this._option.currentShape.shape.points);

                let m = this.m;
                const _side = e.target.data._side;
                const _index = e.target.data._index;
                const _afterIndex = e.target.data._afterIndex;
                const _beforeIndex = e.target.data._beforeIndex;

                if (!m[0]) {
                    m[0] = 1;
                    m[4] = 0;
                    m[5] = 0;
                }

                let bgDragX, bgDragY;
                if (this.bgDrag.length === 0) {
                    bgDragX = 0;
                    bgDragY = 0;
                } else {
                    bgDragX = this.bgDrag[0];
                    bgDragY = this.bgDrag[1];
                }

                let newPoints = [];
                let offsetX = 0;
                let offsetY = 0;

                offsetX = e.event.offsetX;
                offsetY = e.event.offsetY;
                let offsetM = this.getOffsetM();
                let offsetN = this.getOffsetN();

                oldPoints[_index] = [(offsetX - offsetM) / m[0] - bgDragX, (offsetY - offsetN) / m[0] - bgDragY];

                newPoints = oldPoints;

                group.removeAll();

                group.attr({
                    position: [0, 0],
                    scale: [1, 1]
                });

                this._option.currentShape.attr({
                    scale: [1, 1],
                    shape: {
                        points: newPoints,
                    },
                    position: [0, 0]
                });

                this._editNode = newPoints;

                const rPoints = this._changeToPoints(newPoints);

                this.handlers['_onEditNodeDrag'] && this.handlers['_onEditNodeDrag'][0](e, {
                    ...group.bound.data,
                    coordinates: rPoints
                });

                this._onEditNodeDrag && this._onEditNodeDrag(e, {
                    ...group.bound.data,
                    coordinates: rPoints
                });

                this._createEditPoint(newPoints, group);
            }

        });
        editNode.on('dragend', (e) => {
            //双击框会消失
            if (this._editNode.length > 0) {

                //拖拽完之后，重新创建一个框，删除原有框，原有框在拖拽完之后拖拽事件没有同步
                this._reCreatePoints(this._editNode);

                const rPoints = this._changeToPoints(this._editNode);

                this._option.exportData.forEach(item => {
                    if (item.id === group.bound.data.id) {
                        item.coordinates = rPoints;
                    }
                });

                this.handlers['_onEditNodeDragComplete'] && this.handlers['_onEditNodeDragComplete'][0](e, {
                    ...group.bound.data,
                    coordinates: rPoints
                });

                this._onEditNodeDragComplete && this._onEditNodeDragComplete(e, {
                    ...group.bound.data,
                    coordinates: rPoints
                });
            }

        });
    }
    /**
     * @description 缩放标记
     */
    _createEditPoint(points, group) {
        let editPoint = [];

        //创建多个编辑点
        points.forEach((item, index) => {
            let x = index;
            editPoint.push({
                _side: 'editNode_' + index,
                _index: index,
                _beforeIndex: index === 0 ? (points.length - 1) : --x,
                _afterIndex: index === (points.length - 1) ? 0 : ++x,
                points: points[index]
            });
        });

        editPoint.forEach((item) => {
            let width = this._editWidth / this.group.scale[0];
            let editNode = new zrender.Rect(merge(EditRect, {
                shape: {
                    x: item.points[0] - width / 2,
                    y: item.points[1] - width / 2,
                    width: width,
                    height: width
                },
                data: {
                    _side: item._side,
                    _index: item._index,
                    _beforeIndex: item._beforeIndex,
                    _afterIndex: item._afterIndex,
                },
                zlevel: this.zlevel + 1
            }));
            this._editElementEvent(editNode, group);

            group.add(editNode);
        });
    }

    setSilent(bol) {}
    /**
     * @description 设置当前样式
     */
    setOptionStyle(style, selectedStyle) {
        this.DIYStyle = style;

        if (selectedStyle) {
            this._styleConfig.selected = selectedStyle;
        }
        this._areaShapes.forEach(item => {
            if (item.data.type === 'POLYGON') {
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
        this._areaShapes.forEach((item) => {
            if (item.data.type === 'Polygon') {
                item.attr({
                    style: {
                        ...this._styleConfig.default,
                        ...this.DIYStyle
                    },
                    draggable: false
                });

                item.bound && item.bound.eachChild(x => {
                    x.hide();
                });
            }
        });
    }

    /**
     * @description 删除当前标记
     * @return {Object} 删除的对象
     */
    removeAnnotation() {
        let sub = this.getSelectedSub();
        if (sub) {
            let obj;
            this._areaShapes.forEach((item, index) => {
                if (item.data.id === sub.data.id) {
                    obj = item;
                    this._areaShapes.splice(index, 1);
                }
            });
            if (obj) {
                this.graphic.remove(obj.bound);
                obj.bound = null;
                this.graphic.remove(sub);
                this.setSelectedSub(null);
            }

            this._option.removeItem = obj;

            return this._option.removeItem;
        }
    }
    /**
     * @description 删除某个对象标记
     * @param {Object} data
     */
    removeSub(data) {
        const id = data.id;
        let index;
        this._areaShapes.forEach((sub, i) => {
            if (sub.data.id === id) {
                index = i;
            }
        });
        const sub = this._areaShapes[index];
        if (sub) {
            this._areaShapes.splice(index, 1);

            this.graphic.remove(sub.bound);
            sub.bound = null;
            this.graphic.remove(sub);
        }
    }
    /**
     * @删除所有标记
     */
    removeAll() {
        if (this._areaShapes.length > 0) {
            // debugger;
            this._areaShapes.forEach(item => {
                if (item.bound) {
                    this.graphic.remove(item.bound);
                    item.bound = null;
                }
                this.graphic.remove(item);
                item = null;
            });
        }
        this._areaShapes.splice(0);

        this._option.exportData.splice(0);
    }

    /**
     * @description 图片的绝对位置 换算 图中标记位置
     * @param points  [Array] [14.3503923416, 200.4595489502, 65.8221206665, 290.9818115234] 数组前两个 代表左上角的点，后两个代表右下角的点
     * @return [Array] [
     * [270.99741856543324,76.257258115704],
     * [311.7303565951263,76.257258115704],
     * [311.7303565951263,152.82686694864623],
     * [270.99741856543324,152.82686694864623]
     * ]
     * 标注的多个顶点在 canvas中的相对位置
     */
    _calculateToRelationpix(points) {
        let array = [];
        points.forEach(item => {
            let x = item[0] * this._option.setRate + this._option.offsetX;
            let y = item[1] * this._option.setRate + this._option.offsetY;
            array.push([x, y]);
        });
        return array;
    }
    _changeToPoints(points) {
        // const pointsData = [
        //     (points[0][0] - this._option.offsetX) / this._option.setRate,
        //     (points[0][1] - this._option.offsetY) / this._option.setRate,
        //     (points[2][0] - this._option.offsetX) / this._option.setRate,
        //     (points[2][1] - this._option.offsetY) / this._option.setRate,
        // ]
        let array = [];
        points.forEach(item => {
            array.push([(item[0] - this._option.offsetX) / this._option.setRate, (item[1] - this._option.offsetY) / this._option.setRate]);
        });

        return this._resetPoints(array);
    }

    /**
     * @description 高亮标记物 唯一标示为ID
     * @param {obj} {id:123,style:{fill:'red'}}
     * @example Polygon.addHover({id:123,style:{fill:'red'}})
     */
    addHover(data) {
        for (let i = 0; i < this._areaShapes.length; i++) {
            const curr = this._areaShapes[i];
            if (curr.data.id == data.id) {
                this.zr.addHover(curr, data.style);
                break;
            }
        }
    }

    /**
     * @description 移除高亮标记物 唯一标示为ID
     * @param {obj} {id:123}
     * @example Polygon.addHover({id:123})
     */
    removeHover(data) {
        for (let i = 0; i < this._areaShapes.length; i++) {
            const curr = this._areaShapes[i];
            if (curr.data.id == data.id) {
                this.zr.removeHover(curr);
                break;
            }
        }
    }
    reset() {}
}