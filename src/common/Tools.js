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
    // 抽象方法
    open() {}
    close() {}
    setEdit(blean) {}

    // 非抽象方法
    resetAllStyle() {
        Tools.prototype.polygonOverlay && Tools.prototype.polygonOverlay.resetShapeStyle();
        Tools.prototype.recOverlay && Tools.prototype.recOverlay.resetShapeStyle();
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

        // const oldScale = this.group.scale[0];

        // const pos = {
        //     x: this.ctx.canvasWidth / 2,
        //     y: this.ctx.canvasHeight / 2
        // };

        // const mousePointTo = {
        //     x: pos.x / oldScale - this.group.position[0] / oldScale,
        //     y: pos.y / oldScale - this.group.position[1] / oldScale
        // };
        // const newScale = Math.max(0.05, oldScale * scaleBy);

        // const newPos = {
        //     x: -(mousePointTo.x - pos.x / newScale) * newScale,
        //     y: -(mousePointTo.y - pos.y / newScale) * newScale
        // };
        // const newAttrs = this._limitAttributes({ ...newPos, scale: newScale });

        if (scaleBy === 1) {
            // 先放大再还原到100%比例，拖动图片会触发无限放大或缩小
            this.group.attr({
                scale: [1.001, 1.001],
                origin: this.getOrigin()
            });
        } else {
            this.group.attr({
                position: [0, 0],
                scale: [scaleBy, scaleBy],
                origin: this.getOrigin(),
            });
        }

        let d = this.group.getLocalTransform();
        this.setOffsetM(d[4]);
        this.setOffsetN(d[5]);

        // this._option.offsetM = d[4];
        // this._option.offsetN = d[5];

        // this._option.scale = newAttrs.scale;
        this.setScale(newAttrs.scale);

        return this;
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
        this.setScale(scale);

        return this;
    }
    rotate(degree) {
        this.setDrawingMode('hander');

        //正值代表逆时针旋转，负值代表顺时针旋转
        const oldScale = this.group.scale[0];
        // debugger;
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
    _getOffset() {
        const origin = this.getOrigin();
        let scale = this.getScale();

        let mode = this.getRenderMode();
        if (mode === 'auto' || mode === 'auto-rotate') {
            return [0, 0];
        } else {
            let x = -origin[0] * scale + origin[0];
            let y = -origin[1] * scale + origin[1];

            return [-x, -y];
        }
    }
    _reSetPosition() {
        const offset = this._getOffset();

        let mode = this.getRenderMode();
        let offsetM = this.getOffsetM();
        let offsetN = this.getOffsetN();

        if (mode === 'auto' || mode === 'auto-rotate') {
            return offset;
        } else {
            return [offset[0] + offsetM, offset[1] + offsetN];
        }
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
        // 实例方法
        Tools.prototype.polygonOverlay && Tools.prototype.polygonOverlay.removeAnnotation();
        Tools.prototype.recOverlay && Tools.prototype.recOverlay.removeAnnotation();

        this._option.exportData.forEach((item, index) => {
            if (item.id === this._option.removeItem.data.id) {
                this._option.exportData.splice(index, 1);
            }
        });

        this.setDrawingMode('hander');

        return this._option.removeItem;
    }
    removeAll() {
        // 实例方法
        Tools.prototype.polygonOverlay && Tools.prototype.polygonOverlay.removeAll();
        Tools.prototype.recOverlay && Tools.prototype.recOverlay.removeAll();

        this.setDrawingMode('hander');
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
    getOrigin() {
        let mode = this.getRenderMode();
        if (mode === 'auto' || mode === 'auto-rotate') {
            this._option.widthImg = this._option.widthImg * this.group.scale[0];
            this._option.heightImg = this._option.heightImg * this.group.scale[0];

            this._option.offsetX = (this.ctx.canvasWidth - this._option.widthImg) / 2;
            this._option.offsetY = (this.ctx.canvasHeight - this._option.heightImg) / 2;

            this._option.origin = [(this.ctx.canvasWidth / 2), (this.ctx.canvasHeight / 2)];
        } else if (mode === 'original') {
            const box = this.image.getBoundingRect();
            this._option.widthImg = box.width * this.group.scale[0];
            this._option.heightImg = box.height * this.group.scale[0];

            this._option.origin = [(this.ctx.canvasWidth / 2), (this.ctx.canvasHeight / 2)];
        }
        return this._option.origin;
    }
    resetRotate() {
        this.rotate(0);
    }
    _convertImageToCanvas(img) {
        let canvas = document.createElement('canvas');
        canvas.width = 1000;
        canvas.height = 1000;

        let ctx = canvas.getContext('2d');
        let rectCenterPoint = { x: this._option.widthImg / 2, y: this._option.heightImg / 2 };

        let degree = this._option.rotate.degrees;
        // canvas修改后的宽高
        canvas.width = 6000;
        canvas.height = 6000;

        ctx.rect(0, 0, 6000, 6000);

        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        // ctx.globalAlpha = 0;
        ctx.fill();
        ctx.strokeStyle = 'green';
        ctx.strokeRect(0, 0, 6000, 6000);

        // 以中心点旋转角度
        ctx.translate(rectCenterPoint.x, rectCenterPoint.y);
        ctx.rotate(-this._option.rotate.radians);

        ctx.translate(-rectCenterPoint.x, -rectCenterPoint.y);

        if (degree >= 0 && degree < 90) {
            ctx.drawImage(img, 0, -this._option.heightImg);
        } else if (degree >= 90 && degree < 180) {
            ctx.drawImage(img, -this._option.widthImg, -this._option.heightImg);
        } else if (degree >= 180 && degree < 270) {
            ctx.drawImage(img, -this._option.widthImg, 0);
        } else if (degree >= 270 && degree < 360) {
            ctx.drawImage(img, -this._option.widthImg, 0);
        }
        // ctx.drawImage(img, 0, 0, this._option.widthImg, this._option.heightImg);

        return canvas;
    }
    exportOut() {
        let img = new Image();
        img.setAttribute('crossorigin', 'anonymous');
        img.src = this._option.imgUrl;
        img.width = this._option.widthImg;
        img.height = this._option.heightImg;
        img.style.background = '#fff';

        img.onload = () => {
            let canvas = this._convertImageToCanvas(img);
            let imgUrl = canvas.toDataURL('image/jpeg');
            this.exportImages(imgUrl);
        };
    }
    base64ToBlob(code) {
        let parts = code.split(';base64,');
        let contentType = parts[0].split(':')[1];

        let raw = window.atob(parts[1]);
        let rawLength = raw.length;

        let uInt8Array = new Uint8Array(rawLength);

        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], { type: contentType });
    }
    exportImages(datas) {
        let aLink = document.createElement('a');
        let blob = this.base64ToBlob(datas);

        let evt = document.createEvent('HTMLEvents');
        evt.initEvent('click', true, true);
        aLink.download =
            'test' + '.jpg';
        aLink.href = URL.createObjectURL(blob);
        aLink.dispatchEvent(
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            })
        );
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
    // set,get方法
    setDrawingMode(drawingType) {
        this._setDrawingMode(drawingType);
    }
    getDrawingMode() {
        return Tools.prototype.drawingType;
    }
    _setDrawingMode(drawingType) {
        this.setDrag(false);

        Tools.prototype.drawingType = drawingType;

        this.saveInstance(drawingType);
    }
    saveInstance(drawingType) {
        switch (drawingType) {
            case window.INMARK_DRAWING_POLYGON:
                Tools.prototype.polygonOverlay = this;
                break;
            case window.INMARK_DRAWING_RECTANGLE:
                Tools.prototype.recOverlay = this;
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
    getRotate() {
        //返回弧度制，角度制
        return this._option.rotate;
    }
    getOffCanvas() {
        // 获取离屏canvas
        return this.zr.painter.getRenderedCanvas({
            backgroundColor: '#fff'
        });
    }
    getType() {
        return this.zr.painter.getType();
    }
}