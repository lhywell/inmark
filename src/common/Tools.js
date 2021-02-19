let count = 0;
let degree_out = 0,
    radian_out = 0,
    remainder = 0, //余数
    remainder_h = 0; //余数弧度
export default class Tools {
    constructor(opts, type) {
        /**
         * 定义常量, 绘制的模式
         * @final {String} DrawingType
         */
        window.INMARK_DRAWING_RECTANGLE = 'rectangle'; // 鼠标画矩形模式
        window.INMARK_DRAWING_POLYGON = 'polygon'; // 鼠标画多边形模式
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
    setEdit(blean) {}
    setDrawingMode(drawingType) {
        this._setDrawingMode(drawingType);
    }
    _setDrawingMode(drawingType) {
        this.setDrag(false);

        this._option.drawingType = drawingType;

        this.saveInstance(drawingType);
    }
    saveInstance(drawingType) {
        switch (drawingType) {
            case window.INMARK_DRAWING_POLYGON:
                Tools.prototype.polygonOverlay = this;
                this._bindPolylineOrPolygon();
                break;
            case window.INMARK_DRAWING_RECTANGLE:
                Tools.prototype.recOverlay = this;
                this._bindRectangle();
                break;
            case 'hander':
                Tools.prototype.polygonOverlay && Tools.prototype.polygonOverlay.resetShapeStyle();
                Tools.prototype.polygonOverlay && Tools.prototype.polygonOverlay.close();
                Tools.prototype.recOverlay && Tools.prototype.recOverlay.resetShapeStyle();
                Tools.prototype.recOverlay && Tools.prototype.recOverlay.close();

                this.setDrag(true);
                break;
        }
    }
    _bindPolylineOrPolygon() {}
    _bindRectangle() {}
    getDrawingMode() {
        return this._option.drawingType;
    }
    resetAllStyle() {
        Tools.prototype.polygonOverlay && Tools.prototype.polygonOverlay.resetShapeStyle();
        Tools.prototype.recOverlay && Tools.prototype.recOverlay.resetShapeStyle();
    }
    setDrag(bol) {
        this._option.draggable = bol;

        if (Tools.prototype.polygonOverlay) {
            Tools.prototype.polygonOverlay._option.draggable = bol;
        }
        if (Tools.prototype.recOverlay) {
            Tools.prototype.recOverlay._option.draggable = bol;
        }

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
    getOrigin() {
        if (this._option.mode === 'auto' || this._option.mode === 'auto-rotate') {
            this._option.widthImg = this._option.widthImg * this.group.scale[0];
            this._option.heightImg = this._option.heightImg * this.group.scale[0];

            this._option.offsetX = (this.ctx.canvasWidth - this._option.widthImg) / 2;
            this._option.offsetY = (this.ctx.canvasHeight - this._option.heightImg) / 2;

            this._option.origin = [(this.ctx.canvasWidth / 2), (this.ctx.canvasHeight / 2)];
        } else if (this._option.mode === 'original') {
            const box = this.image.getBoundingRect();
            this._option.widthImg = box.width * this.group.scale[0];
            this._option.heightImg = box.height * this.group.scale[0];

            this._option.origin = [(this.ctx.canvasWidth / 2), (this.ctx.canvasHeight / 2)];
        }
        return this._option.origin;
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
        this.setDrawingMode('hander');

        const oldScale = this.group.scale[0];
        console.log(oldScale)
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

        this.setOffsetM(d[4]);
        this.setOffsetN(d[5]);

        // this._option.offsetM = d[4];
        // this._option.offsetN = d[5];

        // this._option.scale = newAttrs.scale;
        this.setScale(newAttrs.scale);

        return this;
    }
    setScale(scale) {
        Tools.prototype.scale = scale;
    }
    getScale() {
        return Tools.prototype.scale;
    }
    setOffsetM(offsetM) {
        Tools.prototype.offsetM = offsetM;
    }
    getOffsetM() {
        return Tools.prototype.offsetM;
    }
    setOffsetN(OffsetN) {
        Tools.prototype.OffsetN = OffsetN;
    }
    getOffsetN() {
        return Tools.prototype.OffsetN;
    }
    zoomSlider(scale) {
        this.setDrawingMode('hander');

        if (scale === 1) {
            // 先放大再还原到100%比例，拖动图片会触发无限放大或缩小
            this.group.attr({
                scale: [1.001, 1.001],
                origin: this.getOrigin()
            });
        } else {
            this.group.attr({
                position: [0, 0],
                scale: [scale, scale],
                origin: this.getOrigin()
            });
        }

        let d = this.group.getLocalTransform();

        // this._option.offsetM = d[4];
        // this._option.offsetN = d[5];
        this.setOffsetM(d[4]);
        this.setOffsetN(d[5]);

        // this._option.scale = scale;
        this.setScale(newAttrs.scale);

        return this;
    }
    rotate(degree) {
        this.setDrawingMode('hander');

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

            if (this._option.rotateMouse) {
                this._option.rotateMouse.attr({
                    rotation: zero,
                    position: this._reSetPosition(),
                    origin: this.getOrigin()
                });
            }

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
            radians: this.group.rotation === zero ? 0 : this.group.rotation,
            degrees: (this.group.rotation === zero ? 0 : this.group.rotation) / Math.PI * 180
        };

        this._onRotate && this._onRotate(this.getRotate());
        this.handlers['_onRotate'] && this.handlers['_onRotate'][0](this.getRotate());
    }
    removeSub(item) {
        this.setDrawingMode('hander');

        // 实例方法
        Tools.prototype.polygonOverlay && Tools.prototype.polygonOverlay.removeSub(item);
        Tools.prototype.recOverlay && Tools.prototype.recOverlay.removeSub(item);

        this._option.exportData.forEach((sub, index) => {
            if (sub.id === item.id) {
                this._option.exportData.splice(index, 1);
            }
        });
    }
    removeAnnotation() {
        this.setDrawingMode('hander');

        // 实例方法
        Tools.prototype.polygonOverlay && Tools.prototype.polygonOverlay.removeAnnotation();
        Tools.prototype.recOverlay && Tools.prototype.recOverlay.removeAnnotation();

        this._option.exportData.forEach((item, index) => {
            if (item.id === this._option.removeItem.data.id) {
                this._option.exportData.splice(index, 1);
            }
        });

        return this._option.removeItem;
    }
    removeAll() {
        this.setDrawingMode('hander');
        // 实例方法
        Tools.prototype.polygonOverlay && Tools.prototype.polygonOverlay.removeAll();
        Tools.prototype.recOverlay && Tools.prototype.recOverlay.removeAll();
    }
    selected(item, options = {}) {
        if (item.type === 'Rectangle') {
            Tools.prototype.recOverlay && Tools.prototype.recOverlay.selected(item, options);
        } else if (item.type === 'Polygon') {
            Tools.prototype.polygonOverlay && Tools.prototype.polygonOverlay.selected(item, options);
        }
    }
    setPosition(item) {
        if (item.type === 'Rectangle') {
            Tools.prototype.recOverlay && Tools.prototype.recOverlay.setPosition(item);
        } else if (item.type === 'Polygon') {
            Tools.prototype.polygonOverlay && Tools.prototype.polygonOverlay.setPosition(item);
        }
    }
}