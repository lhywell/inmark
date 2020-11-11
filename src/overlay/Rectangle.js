import zrender from 'zrender';
import {
    merge
} from '../common/utils.js';
import PolygonRect from '../config/PolygonRect.js';
import EditRect from '../config/EditRect.js';
import Image from './Image.js';

/**
 * @constructor
 * @extends module:RectOverlay
 * @param {Object} args
 * @param {Object} opts
 */
export default class RectOverlay extends Image {
    constructor(opts) {
        super();

        this.group = this._option.group;
        this.image = this._option.image;

        this.type = 'RECTANGLE';
        //是否开启绘制模式
        this._option.isOpen = opts.isOpen || false;

        // 回调函数
        this._mousemove = opts.event.mousemove;
        this._mouseout = opts.event.mouseout;
        this._onCreate = opts.event.onCreate;
        this._onCreateComplete = opts.event.onCreateComplete;
        this._onRectDrag = opts.event.onRectDrag;
        this._onRectDragComplete = opts.event.onRectDragComplete;
        this._onEditNodeDrag = opts.event.onEditNodeDrag;
        this._onEditNodeDragComplete = opts.event.onEditNodeDragComplete;
        this._onSelected = opts.event.onSelected;
        this._onHover = opts.event.onHover;
        this._unSelect = opts.event.unSelect;
        this._imageDrag = opts.event.onImageDrag;
        this._imageDragEnd = opts.event.onImageDragEnd;

        this.data = opts.data;

        this._createLimit = 6; //创建的图形宽高最小限制
        this._editWidth = EditRect.shape.width; //拖拽按钮的宽高限制
        if (opts.style) {
            this._styleConfig = merge(PolygonRect.style, opts.style);
        } else {
            this._styleConfig = PolygonRect.style;
        }

        this._isMouseDown = false;
        this._canDrawShape = false;

        this._startPoint = [];
        this._endPoint = [];

        this._areaShapes = []; //所有的标注图形集合
        this._editNode = [];
        this._editRectStart = [];
        this.position = [0, 0];
        this.bgDrag = [];
        this.graphic = this._createGraphicGroup();
        // this._option.currentShape = {};
        this.tempShape = {};

        if (this.image) {
            this.image.on('drag', (e) => {
                //拖动图片与多边形同步
                this._imageDrag && this._imageDrag(e);
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
                this._imageDragEnd && this._imageDragEnd(e);
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
        // if (this._option.currentShape && this._option.currentShape.position) {
        //     this.setSelectedStyle(this._option.currentShape);
        // }
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
        //e.which鼠标左键，禁止鼠标右键创建框
        // 创建框
        if (e.which === 1 && e.target && e.target.data.type === 'IMAGE' && this._option.isOpen && this._option.drawingType === window.INMARK_DRAWING_RECTANGLE) {
            //图形左上角坐标
            this.resetShapeStyle();
            this._startPoint = this._getDrawPoint(e);
            this._isMouseDown = true;
            this._option.currentShape = null;
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
    _zrMouseMove(e) {
        //e.target=undefined 禁止拖动到浏览器外边
        if (this._isMouseDown && this._startPoint && e.target) {
            let p = this._getDrawPoint(e);

            const xLong = Math.abs(this._startPoint[0] - p[0]);
            const yLong = Math.abs(this._startPoint[1] - p[1]);

            if (xLong < this._createLimit && yLong < this._createLimit) {
                this._canDrawShape = false;
                this.selectedSub = null;

                return;
            }
            this._endPoint = this._getDrawPoint(e);

            this._canDrawShape = true;
            //图形右下角坐标

            //支持放大缩小
            let scale = this.group.scale[0];
            // let points = this._changeToFourScalePoints(this._startPoint.concat(this._endPoint), scale)
            let points = this._changeToFourPoints(this._startPoint.concat(this._endPoint));
            // let points = this._startPoint.concat(this._endPoint)
            //直线
            // points = [
            //     [this._startPoint[0] / scale, this._startPoint[1] / scale],
            //     [this._endPoint[0] / scale, this._endPoint[1] / scale]
            // ]
            if (!this._option.currentShape) {
                //如果不存在 则创建一个新的
                this._option.currentShape = this._createShape(points, {
                    notes: '-1',
                    type: 'Rectangle'
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
                // console.log('mosemove', this._option.currentShape)
            }
            const rPoints = this._changeToPoints(points);
            this._onCreate && this._onCreate(e, {
                notes: '-1',
                coordinates: rPoints
            });

        }
    }
    _zrMouseUp(e) {
        //新增图形回调函数
        if (this._isMouseDown && this._option.currentShape) {
            const index = this._areaShapes.length - 1;
            const shapePoints = this._option.currentShape.shape.points;
            // console.log(e, this._option.currentShape)
            const points = this._changeToPoints(shapePoints);
            const data = {
                type: 'Rectangle',
                notes: '-1',
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
                this._createEditGroup(shapePoints, this._option.currentShape);

                this._option.exportData.push({
                    ...data,
                    coordinates: points
                });

                this.selectedSub = e.target;

                this._onCreateComplete && this._onCreateComplete(e, {
                    ...data,
                    coordinates: points
                });

            }
        }
        this._isMouseDown = false;
        this._canDrawShape = false;
        this._startPoint = [];
        this._endPoint = [];
    }
    /**
     * @description 给id为某个值的标记物存入数据
     * @params {Array} data
     */
    setData(data) {
        this.setMarkers(data);

        this.saveInstance(window.INMARK_DRAWING_RECTANGLE);
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
                //矩形
                // debugger;
                if (item.type === 'Rectangle') {

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
                    zlevel: 3
                });
            });
        }
    }
    selected(item, options = {}) {
        if (this._option.isOpen) {
            return;
        }
        this.resetShapeStyle();
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
        if (item.coordinates.length !== 4) {
            return;
        }
        let point = this._calculateToRelationpix(item.coordinates);
        let point_center = [(point[0][0] + point[1][0]) / 2, (point[0][1] + point[3][1]) / 2];

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
        // if (shape.bound) {
        //     this.group.remove(shape.bound);
        // }
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
        // let points = e.target.shape.points;

        let points = zrender.util.clone(e.target.shape.points);
        //console.log(2222, this.bgDrag)
        let bgDragX, bgDragY;

        let m = e.target.transform;
        // console.log('m',m,points,points[0][0] - this._option.offsetX) / this._option.setRate)
        if (this.bgDrag.length === 0) {
            bgDragX = 0;
            bgDragY = 0;
        } else {
            bgDragX = this.bgDrag[0];
            bgDragY = this.bgDrag[1];
        }
        // console.log('m', m, bgDragX, bgDragY, points, this._option.offsetM, this._option.offsetN)
        points.forEach(item => {
            let x;
            if (m) {
                if (m[4] - this._option.offsetM > 0) {
                    item[0] = item[0] + (Math.abs(m[4] - this._option.offsetM) / m[0]);
                } else {
                    item[0] = item[0] - (Math.abs(m[4] - this._option.offsetM) / m[0]);
                }
                if (m[5] - this._option.offsetN > 0) {
                    item[1] = item[1] + (Math.abs(m[5] - this._option.offsetN) / m[0]);
                } else {
                    item[1] = item[1] - (Math.abs(m[5] - this._option.offsetN) / m[0]);
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
                smooth: 0,
            },
            data: data,
            cursor: 'default',
            draggable: false,
            style: this._styleConfig.default,
            // scale: scale,
            zlevel: 2
        });

        let oldGroup = [];
        shape.on('click', (e) => {
            if (e.which === 1) {
                // console.log('click', e.target)
                //点击重新设置坐标点
                this._editNode = this._toShapeDragEnd(e, e.target);
            }

        });
        shape.on('dragstart', (e) => {
            if (e.which === 1) {
                this._option.currentShape = shape;

                this.tempShape = e.target;
            }
            // console.log('start', e.target.position, JSON.stringify(e.target.shape.points));
        });
        shape.on('drag', (e) => {
            //拖动多边形与编辑同步
            let group = shape.bound;
            group.attr({
                position: group.bound.position
            });
            group.eachChild(item => {
                item.hide();
            });

            // shape.bound && shape.bound.eachChild(item => {
            //     item.attr({
            //         // origin: [e.offsetX, e.offsetY],
            //         // origin: this.origin,
            //         position: e.target.position
            //     });
            //     item.show();
            // })
            //移动过程中，重新记录坐标点
            this._editNode = this._toShapeDragEnd(e, e.target);

            this._option.currentShape = e.target;
            // console.log('guocheng', JSON.stringify(this.currPoint));
            // console.log('drag', this._option.currentShape)
            let shapePoints = this._toGlobal(e.target.shape.points, shape);
            const rPoints = this._changeToPoints(shapePoints);
            this._onRectDrag && this._onRectDrag(e, {
                ...e.target.data,
                coordinates: rPoints
            });

        });
        // shape.on('dragstart', (e) => {

        // })
        shape.on('dragend', (e) => {
            if (e.which === 1) {
                let shape = e.target;

                this.position = zrender.util.clone(shape.position);
                //拖动后点坐标
                let shapePoints = this._toShapeDragEnd(e, shape);

                this._option.currentShape = shape;

                //拖拽完之后，删除原有框，重新创建一个框，避免画框重叠飞框
                this._reCreatePoints(shapePoints);

                // console.log('end', this.position, JSON.stringify(e.target.shape.points), JSON.stringify(shapePoints));

                const rPoints = this._changeToPoints(shapePoints);

                this._option.exportData.forEach(item => {
                    if (item.id === e.target.data.id) {
                        item.coordinates = rPoints;
                    }
                });

                this._onRectDragComplete && this._onRectDragComplete(e, {
                    ...e.target.data,
                    coordinates: rPoints
                });

            }

        });
        shape.on('mousemove', (e) => {

            if (this._option.isOpen) {
                shape.attr({
                    cursor: 'default',
                });

                this.tempShape = e.target;
                // if (this._canDrawShape === false) {
                //     this._unBindEvent();
                // }

            }

        });
        shape.on('mouseover', (e) => {
            if (this._option.isOpen) {

                shape.attr({
                    cursor: 'default',
                });

                if (this._canDrawShape === false && this._isMouseDown === false) {
                    this.tempShape = e.target;

                    this._unBindEvent();
                }

                return;
            }
            // if (this.getDrag() === true) {
            //     shape.attr({
            //         cursor: 'pointer',
            //     });
            //     return;
            // }
            // this._option.currentShape = e.target;
            // this.tempShape = e.target;

            // this.selectedSub = shape;
            // this.resetShapeStyle();

            // this.setSelectedStyle(e.target, PolygonRect.style.hover);

            let shapePoints = this._toGlobal(e.target.shape.points, shape);
            const rPoints = this._changeToPoints(shapePoints);
            this._onHover && this._onHover(e, {
                ...e.target.data,
                coordinates: rPoints
            });
        });
        shape.on('mouseout', (e) => {
            if (this._option.isOpen) {
                this._bindEvent();
            }
        });
        shape.on('mousedown', (e) => {
            // 创建多边形，与矩形重叠引起问题
            if (this._option.polygonOverlay && this._option.polygonOverlay._isMouseDown) {
                return;
            }
            if (e.which === 1) {
                //选中某个框
                // this._option.currentShape = e.target;
                this._option.currentShape = e.target;
                this.tempShape = e.target;
                // console.log(this._option.currentShape, JSON.stringify(this._option.currentShape.shape.points))

                this.selectedSub = shape;
                this.resetAllStyle();

                this.setSelectedStyle(e.target);
                // if (this.getDrag() === true) {
                //     shape.attr({
                //         draggable: false
                //     })

                //     this.cover = new zrender.Polygon({
                //         shape: {
                //             points: [
                //                 [0, 0],
                //                 [0, 2000],
                //                 [2000, 9000],
                //                 [9000, 0]
                //             ],
                //             smooth: 0,
                //         },
                //         cursor: 'pointer',
                //         draggable: true,
                //         style: {
                //             fill: 'rgba(24,151,117,0)',
                //             lineWidth: 0,
                //             lineDash: [0, 0],
                //         },
                //         zlevel: 3
                //     })
                //     this.zr.add(this.cover);

                //     this.cover.on('drag', (e) => {
                //         let array = e.target.position;

                //         this.group.attr({
                //             position: array
                //         });
                //     })
                //     this.cover.on('dragend', (e) => {
                //         this.zr.remove(this.cover);
                //     })
                // }
                let shapePoints = this._toGlobal(e.target.shape.points, shape);
                const rPoints = this._changeToPoints(shapePoints);
                this._onSelected && this._onSelected(e, {
                    ...e.target.data,
                    coordinates: rPoints
                });
            }
        });

        shape.on('mouseup', (e) => {
            //开启编辑，选中某个框
            // console.log('shap-mouseup', this._option.currentShape, this._option.isOpen, this.selectedSub, this.tempShape.id, this._option.currentShape.id)
            if (this._option.isOpen && this.selectedSub && e.which === 1) {
                this._startPoint = [];

                this._option.currentShape.bound && this._option.currentShape.bound.eachChild(item => {
                    item.show();
                });
                // this.temp = zrender.util.clone(this._option.currentShape.shape.points);

                // this._option.currentShape = e.target;

                // this.temp = e.target;
                // console.log('mouseup', this._option.currentShape)
                // if (!this._option.currentShape) {
                //     if (oldGroup.length > 0) {
                //         oldGroup.forEach(item => {
                //             item.removeAll();
                //             this.graphic.remove(item)
                //         })
                //         oldGroup.shift();
                //     }
                //     //注释可以打开
                //     let group = this._createEditGroup(shape.shape.points, shape);
                //     oldGroup.push(group);
                // }
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

        this.selectedSub = shape;

        this._areaShapes.push(shape);
        this.graphic.add(shape);

        this.setSelectedStyle(shape);

        this._startPoint = [];
    }
    _editElementEvent(editNode, group) {
        editNode.on('mouseover', (e) => {
            // if (e.target._side === 'br') {
            // this.zr.addHover(shape, {
            //     cursor: 'move',
            //     style: {
            //         fill: '#000000',

            //     }
            // })
            // }
        });
        editNode.on('mouseout', (e) => {
            // this.zr.removeHover(shape)
        });

        editNode.on('mouseup', (e) => {

        });
        editNode.on('dragstart', (e) => {
            // console.log(JSON.stringify(this._option.currentShape.shape.points));
            // let shape = group.bound;
            // this._option.currentShape = shape;
            // 创建多边形，与矩形重叠引起问题
            if (this._option.polygonOverlay && this._option.polygonOverlay._isMouseDown) {
                return;
            }

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
                // console.log(this._option.currentShape, JSON.stringify(oldPoints))

                this.oldPoint = oldPoints;
                let width = oldPoints[1][0] - oldPoints[0][0];
                let height = oldPoints[2][1] - oldPoints[1][1];
                // let bgDragX, bgDragY;
                this.obj = {
                    width,
                    height
                };
                this.m = zrender.util.clone(this._option.currentShape.transform || []);
            }

        });

        editNode.on('drag', (e) => {
            // 创建多边形，与矩形重叠引起问题
            if (this._option.polygonOverlay && this._option.polygonOverlay._isMouseDown) {
                return;
            }

            //禁止编辑画框到canvas外
            if (e.event.target.tagName === 'CANVAS' && e.which === 1) {
                //框拖拽移动之后，取记录点坐标
                // let oldPoints = zrender.util.clone(this._editNode);

                // //框非移动，取拖拽坐标
                // if (oldPoints.length === 0) {
                //     oldPoints = zrender.util.clone(this._option.currentShape.shape.points);
                // }
                let oldPoints = zrender.util.clone(this._option.currentShape.shape.points);

                let m = this.m;
                const _side = e.target.data._side;

                if (!m[0]) {
                    m[0] = 1;
                    m[4] = 0;
                    m[5] = 0;
                }
                // if (m[4] === this.position[0]) {

                // }

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
                let width = this.obj.width;
                let height = this.obj.height;

                switch (_side) {
                    case 'tl':
                        offsetX = e.event.offsetX;
                        offsetY = e.event.offsetY;
                        newPoints = [
                            [(offsetX - this._option.offsetM) / m[0] - bgDragX, (offsetY - this._option.offsetN) / m[0] - bgDragY],
                            [oldPoints[1][0], (offsetY - this._option.offsetN) / m[0] - bgDragY],
                            oldPoints[2],
                            [(offsetX - this._option.offsetM) / m[0] - bgDragX, oldPoints[3][1]],
                        ];
                        break;
                        // case 't':
                        //     offsetY = e.event.offsetY
                        //     newPoints = [
                        //         [oldPoints[0][0], offsetY],
                        //         [oldPoints[1][0], offsetY],
                        //         oldPoints[2],
                        //         oldPoints[3]
                        //     ]
                        //     break
                    case 'tr':
                        offsetX = e.event.offsetX;
                        offsetY = e.event.offsetY;

                        newPoints = [
                            [oldPoints[0][0], (offsetY - this._option.offsetN) / m[0] - bgDragY],
                            [(offsetX - this._option.offsetM) / m[0] - bgDragX, (offsetY - this._option.offsetN) / m[0] - bgDragY],
                            [(offsetX - this._option.offsetM) / m[0] - bgDragX, oldPoints[3][1]],
                            oldPoints[3]
                        ];
                        break;
                        // case 'r':
                        //     offsetX = e.event.offsetX
                        //     newPoints = [
                        //         oldPoints[0],
                        //         [offsetX, oldPoints[1][1]],
                        //         [offsetX, oldPoints[2][1]],
                        //         oldPoints[3]
                        //     ]
                        //     break
                    case 'br':
                        offsetX = e.event.offsetX;
                        offsetY = e.event.offsetY;

                        // newPoints = [
                        //     oldPoints[0],
                        //     [offsetX, oldPoints[1][1]],
                        //     [offsetX, offsetY],
                        //     [oldPoints[3][0], offsetY/m[0]]
                        // ]
                        newPoints = [
                            oldPoints[0],
                            [(offsetX - this._option.offsetM) / m[0] - bgDragX, oldPoints[0][1]],
                            [(offsetX - this._option.offsetM) / m[0] - bgDragX, (offsetY - this._option.offsetN) / m[0] - bgDragY],
                            [oldPoints[0][0], (offsetY - this._option.offsetN) / m[0] - bgDragY]
                        ];
                        break;
                        // case 'b':
                        //     offsetY = e.event.offsetY
                        //     newPoints = [
                        //         oldPoints[0],
                        //         oldPoints[1],
                        //         [oldPoints[2][0], offsetY],
                        //         [oldPoints[3][0], offsetY]
                        //     ]
                        //     break
                    case 'bl':
                        offsetX = e.event.offsetX;
                        offsetY = e.event.offsetY;

                        newPoints = [
                            [(offsetX - this._option.offsetM) / m[0] - bgDragX, oldPoints[0][1]],
                            oldPoints[1],
                            [oldPoints[2][0], (offsetY - this._option.offsetN) / m[0] - bgDragY],
                            [(offsetX - this._option.offsetM) / m[0] - bgDragX, (offsetY - this._option.offsetN) / m[0] - bgDragY]
                        ];
                        break;
                        // case 'l':
                        //     offsetX = e.event.offsetX
                        //     newPoints = [
                        //         [offsetX, oldPoints[0][1]],
                        //         oldPoints[1],
                        //         oldPoints[2],
                        //         [offsetX, oldPoints[3][1]]
                        //     ]
                        //     break
                }
                group.removeAll();
                // console.log(this.group.scale)
                group.attr({
                    position: [0, 0],
                    scale: [1, 1]
                });

                // let x = this._toLocal(newPoints, group.bound)
                // console.log('new', JSON.stringify(newPoints), this.zr)
                this._option.currentShape.attr({
                    scale: [1, 1],
                    shape: {
                        points: newPoints,
                    },
                    position: [0, 0]
                });

                this._editNode = newPoints;
                // this._array = x;
                const rPoints = this._changeToPoints(newPoints);

                this._onEditNodeDrag && this._onEditNodeDrag(e, {
                    ...group.bound.data,
                    coordinates: rPoints
                });

                this._createEditPoint(newPoints, group);
            }
        });
        editNode.on('dragend', (e) => {
            // 创建多边形，与矩形重叠引起问题
            if (this._option.polygonOverlay && this._option.polygonOverlay._isMouseDown) {
                return;
            }

            // let shape = group.bound;
            //双击框会消失
            if (this._editNode.length > 0) {

                //拖拽完之后，删除原有框,重新创建一个框，原有框在拖拽完之后拖拽事件没有同步
                this._reCreatePoints(this._editNode);

                // let shapePoints = this._toGlobal(this._editNode, this._option.currentShape);
                const rPoints = this._changeToPoints(this._editNode);

                this._option.exportData.forEach(item => {
                    if (item.id === group.bound.data.id) {
                        item.coordinates = rPoints;
                    }
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
        editPoint.push({
            _side: 'tl',
            points: points[0]
        });

        editPoint.push({
            _side: 'tr',
            points: points[1],
        });

        editPoint.push({
            _side: 'br',
            points: points[2]
        });

        editPoint.push({
            _side: 'bl',
            points: points[3]
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
                    _side: item._side
                },
                zlevel: 3
            }));
            this._editElementEvent(editNode, group);

            group.add(editNode);
        });
    }

    setSilent(bol) {}
    /**
     * @description 重置标记样式
     */
    resetShapeStyle() {
        let stroke = this._styleConfig.default.stroke;

        this._areaShapes.forEach(item => {
            if (item.data.type === 'Rectangle') {
                item.attr({
                    style: {
                        ...this._styleConfig.default,
                        stroke: stroke
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
        if (this.selectedSub) {
            let obj;
            this._areaShapes.forEach((item, index) => {
                if (item.data.id === this.selectedSub.data.id) {
                    obj = item;
                    this._areaShapes.splice(index, 1);
                }
            });
            if (obj) {
                this.graphic.remove(obj.bound);
                obj.bound = null;
                this.graphic.remove(this.selectedSub);
                this.selectedSub = null;
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
     * 标注的四个顶点在 canvas中的相对位置
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

    /**
     * @description 图中标记位置 换算 图中标记位置图片的绝对位置
     * @param [Array] [
     * [270.99741856543324,76.257258115704],
     * [311.7303565951263,76.257258115704],
     * [311.7303565951263,152.82686694864623],
     * [270.99741856543324,152.82686694864623]
     * ]
     * @return points  [Array] [14.3503923416, 200.4595489502, 65.8221206665, 290.9818115234] 数组前两个 代表左上角的点，后两个代表右下角的点
     * 标注的四个顶点在图片中的绝对位置
     */
    _changeToTowPoints(points) {
        const pointsData = [
            (points[0][0] - this._option.offsetX) / this._option.setRate,
            (points[0][1] - this._option.offsetY) / this._option.setRate,
            (points[2][0] - this._option.offsetX) / this._option.setRate,
            (points[2][1] - this._option.offsetY) / this._option.setRate,
        ];

        return pointsData;
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
        return array;
    }

    /**
     * @description 根据左上角坐标和右下角坐标，组合成四个顶点（左上角开始顺时针旋转的四个点）坐标集合
     * 
     */
    _changeToFourScalePoints(points, scale) {
        let currData = [];
        currData[0] = [points[0] / scale, points[1] / scale];
        currData[1] = [points[2] / scale, points[1] / scale];
        currData[2] = [points[2] / scale, points[3] / scale];
        currData[3] = [points[0] / scale, points[3] / scale];
        return currData;

    }
    /**
     * @description 根据左上角坐标和右下角坐标，组合成四个顶点（左上角开始顺时针旋转的四个点）坐标集合
     *
     */
    _changeToFourPoints(points) {
        let currData = [];
        if (points[0] <= points[2] && points[1] <= points[3]) {
            currData[0] = [points[0], points[1]];
            currData[1] = [points[2], points[1]];
            currData[2] = [points[2], points[3]];
            currData[3] = [points[0], points[3]];
        } else if (points[0] >= points[2] && points[1] <= points[3]) {
            currData[0] = [points[2], points[1]];
            currData[1] = [points[0], points[1]];
            currData[2] = [points[0], points[3]];
            currData[3] = [points[2], points[3]];
        } else if (points[0] > points[2] && points[1] > points[3]) {
            currData[0] = [points[2], points[3]];
            currData[1] = [points[0], points[3]];
            currData[2] = [points[0], points[1]];
            currData[3] = [points[2], points[1]];
        } else if (points[0] < points[2] && points[1] > points[3]) {
            currData[0] = [points[0], points[3]];
            currData[1] = [points[2], points[3]];
            currData[2] = [points[2], points[1]];
            currData[3] = [points[0], points[1]];
        }

        return currData;

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