import zrender from 'zrender'
import Image from './Image.js'
import { merge } from './utils.js'
import PolygonConfig from './config/PolygonConfig.js'
import EditPolygon from './config/EditPolygon.js'

/**
 * @constructor
 * @extends module:PolygonOverlay
 * @param {Object} args
 * @param {Object} opts
 */
export default class RectOverlay extends Image {
    constructor(args, opts) {
        super()
        this.zr = args.zr;
        this.group = args.group;
        this.image = args.image;
        this._option = merge(args._option, opts);

        this.type = 'RECTANGLE'
        //是否开启绘制模式
        this.isOpen = opts.isOpen || false;

        this._mousemove = opts.event.mousemove
        this._mouseout = opts.event.mouseout
        this._onCreateComplete = opts.event.onCreateComplete
        this._onRectDrag = opts.event.onRectDrag
        this._onRectDragComplete = opts.event.onRectDragComplete
        this._onEditNodeDrag = opts.event.onEditNodeDrag
        this._onEditNodeDragComplete = opts.event.onEditNodeDragComplete
        this._onSelected = opts.event.onSelected
        this._unSelect = opts.event.unSelect

        this.data = opts.data;

        this._createLimit = 10 //创建的图形宽高最小限制
        this._editWidth = EditPolygon.shape.width //拖拽按钮的宽高限制
        this._styleConfig = PolygonConfig.style;
        this._unknownStroke = 'red'

        this._isMouseDown = false
        this._canDrawShape = false

        this._startPoint = []
        this._endPoint = []

        this._areaShape = [] //所有的标注图形集合
        this._edgePoint = []
        this._editNode = []
        this._editRectStart = []
        this.origin = []
        this.dragList = [];

        this.graphic = this._createGraphicGroup();

        this.image.on('drag', (e) => {
            //拖动图片与多边形同步
            if (this.getDrag() === true) {
                let array = [
                    e.target.position[0],
                    e.target.position[1],
                ]
                this.graphic.attr({
                    position: array
                });
            }
        });
        // console.log(typeof this.data)
        if (typeof this.data === 'object' && this.data.length > 0) {
            this.setData(this.data);
        }

        if (this.isOpen) {
            this.open();
        } else {
            this.close();
        }
    }
    _createGraphicGroup(points, shape) {
        //创建编辑图形
        let group = new zrender.Group();
        group.data = {
            type: 'graphicGroup'
        }

        return group;
    }
    open() {
        //开启绘制模式
        this.isOpen = true;

        this._bindEvent();

        this.setEdit(true);

        this.group.eachChild((item) => {
            if (item.data.type === 'IMAGE') {
                item.attr({
                    'cursor': 'crosshair'
                });
            }
        })
    }
    close() {
        //关闭绘制模式
        this.isOpen = false;

        this.dispose();

        this.setEdit(false);

        this.group.eachChild((item) => {
            if (item.data.type === 'IMAGE') {
                item.attr({
                    'cursor': 'default'
                });
            }
        })
    }
    setEdit(blean) {
        if (blean) {
            //初始化显示编辑
            this._areaShape.forEach(item => {
                item.attr({
                    draggable: true
                })
                if (item.bound) {
                    item.bound.eachChild(edit => {
                        edit.hide();
                    })
                }
            })
        } else {
            this._areaShape.forEach(item => {
                item.attr({
                    draggable: false
                })

                if (item.bound) {
                    item.bound.eachChild(edit => {
                        edit.hide();
                    })
                }
            })
        }
    }
    _zrClick(e) {
        if (e.target && e.target.data.type === "IMAGE") {
            this.resetShapeStyle()
        }
    }
    _zrMouseDown(e) {
        // debugger;


        this.origin = this._getDrawPoint(e);
        if (e.target && e.target.data.type === "IMAGE") {
            //图形左上角坐标
            console.log(e.event.offsetX, e.event.offsetY, e)
            this._startPoint = this.origin;
            this._isMouseDown = true
            this.currShape = null
            this.resetShapeStyle()
        }
    }
    _getDrawPoint(e) {
        //移动背景图片的偏移
        let x, y;
        let zoom = this.group.scale[0];
        if (e.target && e.target.transform) {
            if (e.target.transform[4] > 0) {
                x = e.offsetX / zoom - (Math.abs(e.target.transform[4]) / zoom);
            } else {
                x = e.offsetX / zoom + (Math.abs(e.target.transform[4]) / zoom);
            }
            if (e.target.transform[5] > 0) {
                y = e.offsetY / zoom - (Math.abs(e.target.transform[5]) / zoom);
            } else {
                y = e.offsetY / zoom + (Math.abs(e.target.transform[5]) / zoom);
            }
            // x = e.offsetX / zoom + (Math.abs(e.target.transform[4]) / zoom);
            // y = e.offsetY / zoom + (Math.abs(e.target.transform[5]) / zoom);
        } else {
            x = e.offsetX / zoom;
            y = e.offsetY / zoom;
        }
        return [x, y]
    }
    _zrMouseMove(e) {
        if (this._isMouseDown) {
            const xLong = Math.abs(this._startPoint[0] - e.event.offsetX)
            const yLong = Math.abs(this._startPoint[1] - e.event.offsetY)

            //创建的图形最小限制
            if (xLong < this._createLimit && yLong < this._createLimit) {
                this._canDrawShape = false
            } else {
                this._canDrawShape = true
                //图形右下角坐标

                this._endPoint = this._getDrawPoint(e);

                //支持放大缩小
                let scale = this.group.scale[0];
                let points = this._changeToFourScalePoints(this._startPoint.concat(this._endPoint), scale)
                // let points = this._startPoint.concat(this._endPoint)
                //直线
                // points = [
                //     [this._startPoint[0] / scale, this._startPoint[1] / scale],
                //     [this._endPoint[0] / scale, this._endPoint[1] / scale]
                // ]
                if (!this.currShape) {
                    //如果不存在 则创建一个新的
                    this.currShape = this._createShape(points, {
                        notes: '-1'
                    })
                    this.graphic.add(this.currShape)
                    this._areaShape.push(this.currShape)
                } else {
                    //否则鼠标移动更新当前数据
                    // this.currShape.setShape({
                    //     points: points
                    // })
                    let x
                    if (scale !== 1) {
                        x = this._toGlobal(points, this.currShape)
                    } else {
                        x = points
                    }

                    this.currShape.attr({
                        shape: {
                            points: x
                        }
                    })
                }
            }
        }
    }
    _zrMouseUp(e) {
        //新增图形回调函数
        if (this._isMouseDown && this._canDrawShape && this.currShape) {
            const index = this._areaShape.length - 1
            const shapePoints = this.currShape.shape.points
            const points = this._changeToPoints(shapePoints);
            const data = {
                type: 'Rectangle',
                notes: '-1',
                id: window.btoa(Math.random()) //编码加密
            }
            this._areaShape[index].attr({
                style: this._styleConfig.selected,
                data: {
                    ...data
                }
            })
            if (typeof this._onCreateComplete === 'function') {
                this._createEditGroup(shapePoints, this.currShape);

                this._onCreateComplete(e, {
                    ...data,
                    coordinates: points
                })
                this.selectedSub = e.target;
            }
        }
        this._isMouseDown = false
        this._canDrawShape = false
        this._startPoint = []
        this._endPoint = []
    }
    /**
     * @description 给id为某个值的标记物存入数据
     * @params {Array} data
     */
    setData(data) {
        this.showMarkers(data);
    }
    /**
     * @description 删除图形，保留图片
     */
    _filterImage() {
        this._areaShape.splice(0);
        let save = [];
        this.group.eachChild((x) => {
            if (x.data.type === 'IMAGE') {
                save.push(x);
            }
        })
        this.group.removeAll();
        this.group.add(save[0]);
        this.zr.add(this.group);
    }
    /**
     * @description 遍历数据，用边框标记主体内容
     */
    showMarkers(data) {
        this._filterImage();
        if (data.length > 0) {
            data.forEach((item) => {
                //矩形
                // debugger;
                if (item.type === 'Rectangle') {

                    if (typeof item.coordinates === 'object') {
                        const points = this._calculateToRelationpix(item.coordinates);
                        const shape = this._createShape(points, {
                            id: item.id,
                            type: item.type,
                            notes: item.notes
                        })
                        //注释可以打开
                        this._createEditGroup(points, shape);

                        this._areaShape.push(shape);
                        this.graphic.add(shape);
                    }
                }
            })

            this.group.add(this.graphic)
        }
    }
    setSelectedStyle(shape) {
        shape.attr({
            style: this._styleConfig.selected
        })
        if (this.isOpen) {

            this.polygonMouseDown = true;
            shape.attr({
                draggable: true
            });

            shape.bound && shape.bound.eachChild(x => {
                x.show();
                x.attr({
                    zlevel: 3
                })
            })
        }
    }
    selected(item) {
        this.resetShapeStyle();
        this._areaShape.forEach(x => {
            if (x.data.id === item.id) {
                this.setSelectedStyle(x);
            }
        })
    }
    _createEditGroup(points, shape) {
        //创建编辑图形
        // if (shape.bound) {
        //     this.group.remove(shape.bound);
        // }
        let group = new zrender.Group();
        group.data = {
            type: 'EditGroup'
        }

        group.bound = shape;

        this._createEditPoint(points, group);
        shape.bound = group;
        this.graphic.add(group);
        return group;
    }
    /**
     * @description 画边框标--生成单个边框
     * @param {arr} [[378,230],[378,230],[378,230],[378,230]]
     */
    _createShape(points, data, scale) {
        if (data.notes == 'Unknown') {
            stroke = this._unknownStroke
        }
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
        })

        let oldGroup = [];
        shape.on('drag', (e) => {

            //拖动多边形与编辑同步
            if (this.polygonMouseDown) {}

            let group = shape.bound;
            group.attr({
                position: group.bound.position
            })
            group.eachChild(item => {
                item.hide();
            })


            // shape.bound && shape.bound.eachChild(item => {
            //     item.attr({
            //         // origin: [e.offsetX, e.offsetY],
            //         // origin: this.origin,
            //         position: e.target.position
            //     });
            //     item.show();
            // })

            this.currShape = e.target;

            let shapePoints = this._toGlobal(e.target.shape.points, shape);
            const rPoints = this._changeToPoints(shapePoints);
            this._onRectDrag(e, {
                ...e.target.data,
                coordinates: rPoints
            })
        })
        shape.on('dragend', (e) => {
            this.dragList.push(e.target);
            this.currShape = e.target;
        })
        shape.on('mousemove', (e) => {
            if (this.isOpen) {

                shape.attr({
                    cursor: 'default',
                });

                if (this._canDrawShape === false) {
                    this.dispose();
                }
            }

        })
        shape.on('mouseover', (e) => {
            if (this.isOpen) {
                shape.attr({
                    cursor: 'default',
                });
                if (this._canDrawShape === false) {
                    this.dispose();
                }
            }
        })
        shape.on('mouseout', (e) => {
            if (this.isOpen) {
                this._bindEvent();
            }
        })
        shape.on('mousedown', (e) => {
            //选中某个框
            // this.currShape = e.target;
            this.selectedSub = shape;
            this.resetShapeStyle();

            this.setSelectedStyle(e.target);
            let shapePoints = this._toGlobal(e.target.shape.points, shape);
            const rPoints = this._changeToPoints(shapePoints);
            this._onSelected(e, {
                ...e.target.data,
                coordinates: rPoints
            })

        })

        shape.on('mouseup', (e) => {
            if (this.isOpen) {
                shape.bound && shape.bound.eachChild(item => {
                    item.show();
                })

                this.currShape = e.target;

                //保存
                let shapePoints = this._toGlobalSave(e.target.shape.points, shape);
                const rPoints = this._changeToPoints(shapePoints);
                this._onRectDragComplete(e, {
                    ...e.target.data,
                    coordinates: rPoints
                })

                if (!this.currShape) {
                    if (oldGroup.length > 0) {
                        oldGroup.forEach(item => {
                            item.removeAll();
                            this.graphic.remove(item)
                        })
                        oldGroup.shift();
                    }
                    //注释可以打开
                    let group = this._createEditGroup(shape.shape.points, shape);
                    oldGroup.push(group);
                }
                this._bindEvent();
            }
        })

        return shape
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
        })
        editNode.on('mouseout', (e) => {
            // this.zr.removeHover(shape)
        })

        editNode.on('mouseup', (e) => {

        })
        editNode.on("dragstart", (e) => {
            let shape = group.bound;
            this.currShape = shape;

            let point = group.bound.shape.points;
            let shapePoints = this._toGlobal(point, shape);
            this._editRectStart = shapePoints;
        })
        editNode.on("drag", (e) => {
            const oldPoints = zrender.util.clone(this._editRectStart);
            const _side = e.target.data._side;
            let newPoints = [];
            let offsetX = 0;
            let offsetY = 0;
            switch (_side) {
                case 'tl':
                    offsetX = e.event.offsetX
                    offsetY = e.event.offsetY
                    newPoints = [
                        [offsetX, offsetY],
                        [oldPoints[1][0], offsetY],
                        oldPoints[2],
                        [offsetX, oldPoints[3][1]],
                    ]
                    break
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
                    offsetX = e.event.offsetX
                    offsetY = e.event.offsetY
                    newPoints = [
                        [oldPoints[0][0], offsetY],
                        [offsetX, offsetY],
                        [offsetX, oldPoints[3][1]],
                        oldPoints[3]
                    ]
                    break
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
                    offsetX = e.event.offsetX
                    offsetY = e.event.offsetY
                    newPoints = [
                        oldPoints[0],
                        [offsetX, oldPoints[1][1]],
                        [offsetX, offsetY],
                        [oldPoints[3][0], offsetY]
                    ]
                    break
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
                    offsetX = e.event.offsetX
                    offsetY = e.event.offsetY
                    newPoints = [
                        [offsetX, oldPoints[0][1]],
                        oldPoints[1],
                        [oldPoints[2][0], offsetY],
                        [offsetX, offsetY]
                    ]
                    break
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
            let shape = group.bound;
            let x = this._toLocal(newPoints, shape)
            this.currShape.attr({
                // scale:this.group.scale,
                shape: {
                    points: x,
                }
            })
            this._editNode = x;
            this._newPoints = newPoints;
            const rPoints = this._changeToPoints(x);

            this._onEditNodeDrag(e, {
                ...shape.data,
                coordinates: rPoints
            })

            this._createEditPoint(x, group);

        })
        editNode.on("dragend", (e) => {
            let shape = group.bound;
            // let shapePoints = this._toGlobal(this._editNode, this.currShape);
            const rPoints = this._changeToPoints(this._editNode);

            this._onEditNodeDragComplete(e, {
                ...group.bound.data,
                coordinates: rPoints
            })
        })
    }
    /**
     * @description 缩放标记
     */
    _createEditPoint(points, group) {
        let eightPoint = [],
            eightPointElement = [];
        eightPoint.push({
            _side: 'tl',
            points: points[0]
        })
        // eightPoint.push({
        //     _side: 't',
        //     points: [(points[1][0] + points[0][0]) / 2, points[0][1]]
        // })

        eightPoint.push({
            _side: 'tr',
            points: points[1],
        })
        // eightPoint.push({
        //     _side: 'r',
        //     points: [points[1][0], (points[2][1] + points[1][1]) / 2]
        // })

        eightPoint.push({
            _side: 'br',
            points: points[2]
        })
        // eightPoint.push({
        //     _side: 'b',
        //     points: [(points[1][0] + points[0][0]) / 2, points[2][1]]
        // })

        eightPoint.push({
            _side: 'bl',
            points: points[3]
        })
        // eightPoint.push({
        //     _side: 'l',
        //     points: [points[3][0], (points[3][1] + points[0][1]) / 2]
        // })

        group.attr({
            position: group.bound.position
        })
        eightPoint.forEach((item) => {
            let editNode = new zrender.Rect(merge(EditPolygon, {
                shape: {
                    x: item.points[0] - this._editWidth / 2,
                    y: item.points[1] - this._editWidth / 2,
                    width: this._editWidth / this.group.scale[0],
                    height: this._editWidth / this.group.scale[0]
                },
                data: {
                    _side: item._side
                },
                zlevel: 3
            }))
            this._editElementEvent(editNode, group);

            eightPointElement.push(editNode);

            group.add(editNode);
        })
    }

    setSilent(bol) {}
    /**
     * @description 重置标记样式
     */
    resetShapeStyle() {
        let stroke = this._styleConfig.default.stroke;
        this._areaShape.forEach(item => {
            // if (this.isOpen) {
            if (item.data.type === 'Rectangle') {
                item.attr({
                    style: {
                        ...this._styleConfig.default,
                        stroke: stroke
                    },
                    draggable: false
                })

                item.bound.eachChild(x => {
                    x.hide();
                })
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
            this._areaShape.forEach((item, index) => {
                if (item.data.id === this.selectedSub.data.id) {
                    obj = item;
                    this._areaShape.splice(index, 1);
                }
            })
            if (obj) {
                this.graphic.remove(obj.bound);
                this.graphic.remove(this.selectedSub);
            }

            return obj;
        }
    }
    /**
     * @description 删除某个对象标记
     * @param {Object} data
     */
    removeSub(data) {
        const id = data.id;
        let index;
        this._areaShape.forEach((sub, i) => {
            if (sub.data.id === id) {
                index = i;
            }
        });
        const sub = this._areaShape[index];
        this._areaShape.splice(index, 1);

        sub && this.graphic.remove(sub);
        sub && this.graphic.remove(sub.bound);
    }
    /**
     * @删除所有标记
     */
    removeAll() {
        if (this._areaShape.length > 0) {
            // debugger;
            this._areaShape.forEach(item => {
                this.graphic.remove(item)
            })
        }
        this._areaShape = [];

        this.deleteEdgePoint();
    }
    /**
     * @删除编辑标记
     */
    deleteEdgePoint() {
        if (this._edgePoint.length > 0) {
            // debugger;
            this._edgePoint.forEach(item => {
                this.graphic.remove(item)
            })
        }
        this._edgePoint = [];
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
            array.push([x, y])
        })
        return array
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
        ]

        return pointsData
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
            array.push([(item[0] - this._option.offsetX) / this._option.setRate, (item[1] - this._option.offsetY) / this._option.setRate])
        })
        return array
    }

    /**
     * @description 根据左上角坐标和右下角坐标，组合成四个顶点（坐上角开始顺时针旋转的四个点）坐标集合
     * 
     */
    _changeToFourScalePoints(points, scale) {
        let currData = []
        currData[0] = [points[0] / scale, points[1] / scale]
        currData[1] = [points[2] / scale, points[1] / scale]
        currData[2] = [points[2] / scale, points[3] / scale]
        currData[3] = [points[0] / scale, points[3] / scale]
        return currData;

    }
    /**
     * @description 根据左上角坐标和右下角坐标，组合成四个顶点（坐上角开始顺时针旋转的四个点）坐标集合
     *
     */
    _changeToFourPoints(points) {
        let currData = []
        currData[0] = [points[0], points[1]]
        currData[1] = [points[2], points[1]]
        currData[2] = [points[2], points[3]]
        currData[3] = [points[0], points[3]]
        return currData;

    }


    /**
     * @description 高亮标记物 唯一标示为ID
     * @param {obj} {id:123,style:{fill:'red'}}
     * @example Polygon.addHover({id:123,style:{fill:'red'}})
     */
    addHover(data) {
        for (let i = 0; i < this._areaShape.length; i++) {
            const curr = this._areaShape[i]
            if (curr.data.id == data.id) {
                this.zr.addHover(curr, data.style)
                break
            }
        }
    }

    /**
     * @description 移除高亮标记物 唯一标示为ID
     * @param {obj} {id:123}
     * @example Polygon.addHover({id:123})
     */
    removeHover(data) {
        for (let i = 0; i < this._areaShape.length; i++) {
            const curr = this._areaShape[i]
            if (curr.data.id == data.id) {
                this.zr.removeHover(curr)
                break
            }
        }
    }

    /**
     * @description 获取标注数据
     * @param {obj} {id:123}
     * @example Polygon.addHover({id:123})
     */
    getData() {
        let markInfo = [];

        this._areaShape.forEach(item => {
            // debugger;
            const shapePoints = item.shape.points
            const twoPoint = this._changeToPoints(shapePoints);

            markInfo.push({
                "id": item.data.id,
                "type": item.data.type,
                "notes": item.data.notes,
                "coordinates": twoPoint
            })
        })
        return markInfo
    }
    reset() {}
}