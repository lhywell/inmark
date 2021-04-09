# 快速上手

> 构建图片标注


## CDN 引入 inmark
``` bash

<script type="text/javascript" src="http://unpkg.com/inmark/dist/inmark.min.js"></script>
```


## NPM 安装
推荐使用 npm 来安装，享受生态圈和工具带来的便利，更好地和 webpack 配合使用，当然，我们也推荐使用 ES2015。

``` bash
$ npm install inmark --save
```

## 文档说明

通过zrender库封装的支持图片标注js


###  图片

```html
<!-- 第一步，html页面增加一个dom标签，附上属性id，保证唯一 -->
<div class="imageAnnotate" id="inmarkDOM"></div>

<style>
.imageAnnotate{
   width:100%;
   height:100%;
}
</style>
```

```
<!-- 生成实例 -->
let id = 'inmarkDOM';
let image = new inMark.Image({
    id: id,
    mode: 'original', //original or auto or auto-rotate
    imgUrl: 'http://url',
    event: {
        onLoadComplete: loadComplete,
        onImageDrag: imageDrag,
        onImageDragEnd: onImageDragEnd_image,
    }
});

let zr = image.getZrender();//返回zrender实例
let group = image.getGroup(id);//返回group,zrender.group
let img = image.getImage(id);//返回zrender图片实例
```
#### 配置属性

| 参数  |  说明 |  类型  |  是否必填  |
| ------------ | ------------ | ------------ | ------------ |
|  id |  Dom依赖唯一的名称id,用来生成canvas容器 | String  | 必填  |
|  mode | 设置渲染模式，默认为‘auto’。<br> 'auto'进行图片大小等比例缩放适应canvas容器；<br>'original'不进行图片缩放，加载原图片大小；<br>'auto-rotate' 旋转模式，支持图片旋转 | String  |  必填 |
| imgUrl  | 设置图片的url访问地址，可以是http,https,cdn方式。如果需要图片强制刷新，可在图片url后增加时间戳  |  String |  必填 |
| event  | 参见回调方法  |  Object |  选填 |


#### 回调方法 or 事件监听方法

| 回调方法  |  说明 |  是否必填  |
| ------------ | ------------ | ------------ |
|  onLoadComplete |  图片加载完毕，执行渲染矩形等图形 | 选填  |
| onImageDrag|  图片拖拽开始 | 选填  |
|  onLoadComplete | 图片拖拽结束 | 选填  |

```
image.addEventListener('onLoadComplete', function(e) {});
image.addEventListener('onImageDrag', function(e) {});
image.addEventListener('onImageDragEnd', function(e) {});
```

####  生命周期
1.清除所有对象和画布。
```
image.clear()
```

2.移除自身。当不再需要使用该实例时，调用该方法以释放内存。
```
image.dispose();
```

#### 实例方法

1. 拖拽

```
image.setDrag(true);//开启拖拽

image.setDrag(false);//关闭拖拽
```

2. 放大缩小
```
<!-- 放大 -->
image.zoomIn();
<!-- 缩小 -->
image.zoomOut();
```

3. 旋转

###### 设置旋转角度

```
<!-- 顺时针旋转90度 -->
image.rotate(90);

<!-- 逆时针旋转-0.2度 -->
image.rotate(-0.2);
```

###### 得到旋转返回对象
```
let obj = image.getRotate();//返回对象

obj = {
    degrees: 0//度
    radians: 0//弧度
}
```

###### 旋转重置，恢复初始位置
```
image.resetRotate();
```

4. 得到最新创建，编辑，拖拽标注后的数据
```
image.getData();
```

5. 点击选中某个标注，删除当前标记，返回删除的对象
```
image.removeAnnotation();
```

6. 删除指定对象标注
```
/* 对象类型
*item = {
    coordinates: [[558.3230798626577,41.847382529992984],[664.28253473271,41.847382529992984],[664.28253473271,70.51483886948435],[558.3230798626577,70.51483886948435]],//左上角，右上角，左下角，右下角坐标，坐标x,y轴像素值
    id: "06216",//唯一id
    notes: "Nike Hong Kong Limited",//标注描述字符串
    type: "Rectangle" //类型为矩形"Rectangle" or 多边形 "Polygon"
}
*/
image.removeSub(item);
```

7. 删除所有标注
```
image.removeAll();
```


8. 定位标注到canvas中心
```
/* 对象类型
*item = {
    coordinates: [[558.3230798626577,41.847382529992984],[664.28253473271,41.847382529992984],[664.28253473271,70.51483886948435],[558.3230798626577,70.51483886948435]],//左上角，右上角，左下角，右下角坐标，坐标x,y轴像素值
    id: "06216",//唯一id
    notes: "Nike Hong Kong Limited",//标注描述字符串
    type: "Rectangle" //类型为矩形"Rectangle" or 多边形 "Polygon"
}
*/
image.setPosition(item);
```

9. 选中标注并高亮
```
/**
  * @description 设置当前的图层的zlevel值,值相同的在同一个图层
  * @params {Object} item {
    coordinates: [[558.3230798626577,41.847382529992984],[664.28253473271,41.847382529992984],[664.28253473271,70.51483886948435],[558.3230798626577,70.51483886948435]],//坐标x,y轴像素值
    id: "06216",//唯一id
    notes: "Nike Hong Kong Limited",//标注描述字符串
    type: "Polygon" //类型为矩形"Rectangle" or 多边形 "Polygon"
}
  * @params {Object} styleObj 
  */
image.selected(item,styleObj);
```
#### 样式对象

| 名称  |  类型 |  默认值  | 描述 |
| ------------ | ------------ | ------------ | ------------ |
|  opts.style.fill |  string | '#000'  | 填充样式。|
|  opts.style.stroke |  string | null  | 描边样式。|
|  opts.style.opacity |  number |1  | 不透明度。|
|  opts.style.lineDash|  number[] |null  | 描边虚线样式，参考 SVG stroke-dasharray。|
|  opts.style.lineDashOffset |  number |null  | 描边虚线偏移，参考 SVG stroke-dashoffset。|
|  opts.style.shadowBlur |  number | 0 | 阴影模糊大小。|
|  opts.style.shadowColor  |  string |  'transparent' | 阴影颜色。|
|  opts.style.shadowOffsetX  |  number |  0 |  阴影横向偏移。|
|  opts.style.shadowOffsetY  |  number |  0 |  阴影纵向偏移。|
| opts.style.lineWidth  |  number |  0 |  线宽。|
| opts.style.strokeNoScale |  boolean |  false |  描边粗细不随缩放而改变，false 则会根据缩放同比例缩放描边粗细。|
| opts.style.text  |  string |  null |  在图形中显示的文字。|
| opts.style.font  |  string |  null |  文字样式，由 fontSize、 fontFamily、 fontStyle、 fontWeight 组成，建议分别设置这几项而非直接设置 font。|
| opts.style.fontStyle |  string |  null |  同 CSS font-style。|
| opts.style.fontWeight |  string |  null |  同 CSS font-style。|
| opts.style.fontWeight |  string |  null |  同 CSS font-weight。|
| opts.style.fontSize |  string |  null |  同 CSS font-size。|
| opts.style.fontFamily |  string |  null |  同 CSS font-family。|
| opts.style.textFill |  string |  null |  文字填充样式。|
| opts.style.textStroke |  string |  null |  文字描边样式。|
| opts.style.textWidth |  number  |  null |  文字宽度。|
| opts.style.textHeight  |  number  |  null |  文字高度，仅用于设置背景色时需要设置。|
| opts.style.textLineWidth  |  number |  null |  文字描边宽度。|
| opts.style.textLineHeight  |  number |  null |  文字行高。|
| opts.style.textPosition |  string、number[]   |  'inside' |  文字位置，可以为 'inside'、 'left'、 'right'、 'top'、 'bottom'，或一个二维数组 [x, y] 表示相对形状的位置。|
| opts.style.textRect |  Object  | null|  文字包围盒，包括 x、 y、 width、 height 属性，如果没有设置，将使用形状的包围盒。|
| opts.style.textOffset   |  number[]  |  null |  文字位置偏移，包括 x、 y。|
| opts.style.textAlign   |  string |  null |  文字水平对齐方式，可取值：'left'、 'center'、 'right'，默认根据 textPosition 计算。|
| opts.style.textVerticalAlign   |  string |  null |  文字垂直对齐方式，可取值：'top'、 'middle'、 'bottom'，默认根据 textPosition 计算。|
| opts.style.textDistance   |  number |  5 |  文字与其对齐的边缘的距离，如 textPosition 为 top 时，textDistance 表示与形状上方的距离。|
| opts.style.textShadowColor   |  string |  'transparent'  |  文字阴影颜色。|
| opts.style.textShadowBlur   |  number |  0 |  文字阴影模糊大小。|
| opts.style.textShadowOffsetX  |  number |  0 |  文字阴影水平偏移。|
| opts.style.textShadowOffsetY  |  number |  0 |  文字阴影垂直偏移。|
| opts.style.textBoxShadowColor  |  string |   'transparent'  |  文字包围盒阴影颜色。|
| opts.style.textBoxShadowBlur  |  number |   0  |  文字包围盒阴影模糊大小。|
| opts.style.textBoxShadowOffsetX  |  number |   0  |  文字包围盒阴影水平偏移。|
| opts.style.textBoxShadowOffsetY  |  number |   0  |  文字包围盒阴影垂直偏移。|
| opts.style.transformText  |  boolean |   false  |  文字是否跟随变换效果，仅对 Path 或 Image 元素有效。|
| opts.style.textRotation  |  number |   0  |  文字旋转角度，仅对 Path 或 Image 元素有效，并且 transformText 应设置为 false。|
| opts.style.textOrigin  |  string、number[] |   null  |  文字变换中心，可以是 'center' 或一个二维数组 [x, y] 表示相对形状的位置，默认值是 textPosition。|
| opts.style.textBackgroundColor  |  string |   null  |  文字包围盒颜色。|
| opts.style.textBorderColor  |  string |   null  |  文字包围盒描边颜色。|
| opts.style.textBorderWidth  |  number |   0  |  文字包围盒描边宽度。|
| opts.style.textBorderRadius  |  number |   0  |  文字圆角大小。|
| opts.style.textPadding  |  number、number[] |   null  |  文字内边距，可以是 2 或 [2, 4] 或 [2, 3, 4, 5] 的形式，同 CSS Padding，单位是像素。|
| opts.style.rich  |  Object |   null  |  富文本样式，参考 ECharts rich 配置项。|
| opts.style.truncate  |  Object |   null  |  当文字过长显示不下时，显示省略号表示。|
| opts.style.truncate.outerWidth  |  number |   null  |  包含了 textPadding 的宽度，超出这个范围就裁剪。|
| opts.style.truncate.outerHeight  |  number |   null  |  包含了 textPadding 的高度，超出这个范围就裁剪。|
| opts.style.truncate.ellipsis  |  string |   '...'  |  默认用省略号表示超出部分，也可以对其进行自定义。|
| opts.style.truncate.placeholder  |  string |  null  |  如果空间过小，导致省略号也显示不下，但是又不想空着，可能得有个什么标记表示这里是有字符的，就用个 “点”，就是在这个 placeholder 里设置。|
| opts.style.blend  |  string |  null  |  混合模式，同 Canvas globalCompositeOperation。|


#### 设置css样式
```html
<!-- 图片背景填色 -->
canvas:nth-child(1){
    background:red;
}
```
----------



###  矩形
```
<!-- 生成实例 -->
let rect = new inMark.Rect({
    data: data,
    event: {
        onCreate: onCreate,
        onImageDrag: onImageDrag,
        onImageDragEnd: onImageDragEnd,
        onCreateComplete:onCreateComplete,
        onRectDrag: onRectDrag,
        onRectDragComplete:onRectDragComplete,
        onEditNodeDrag:onEditNodeDrag,
        onEditNodeDragComplete:onEditNodeDragComplete,
        onSelected:onSelected,
        onHover:onHover
    }
});
```

#### 配置属性

| 参数  |  说明 |  类型  |  是否必填  |
| ------------ | ------------ | ------------ | ------------ |
|  data  |  跟setData实例方法数据一样 | Array  | 必填  |
|  isOpen  | 默认false为初始不开启绘画矩形，true为初始开启绘画矩形 | Boolean  |  选填 |
| event  | 参见回调方法  |  Object |  选填 |

#### 回调方法 or 事件监听方法

| 回调方法  |  说明 |  是否必填  |
| ------------ | ------------ | ------------ |
|  onCreate  |  开始拖拽创建矩形，拖拽结束前 | 选填  |
| onCreateComplete |  拖拽结束，新增矩形创建完毕 | 选填  |
|  onImageDrag  | 图片拖拽开始 | 选填  |
|  onImageDragEnd  | 图片拖拽结束 | 选填  |
|  onRectDrag   | 矩形拖动开始 | 选填  |
|  onRectDragComplete    | 矩形拖动结束 | 选填  |
|  onEditNodeDrag    | 矩形编辑开始 | 选填  |
|  onEditNodeDragComplete     | 矩形编辑结束 | 选填  |
|  onSelected     | 选中某个矩形 | 选填  |

```
rect.addEventListener('onCreate', function(e, obj) {});

rect.addEventListener('onCreateComplete', function(e, obj) {});

rect.addEventListener('onRectDrag', function(e, obj) {});

rect.addEventListener('onRectDragComplete', function(e, obj) {});

rect.addEventListener('onEditNodeDrag', function(e, obj) {});

rect.addEventListener('onEditNodeDragComplete', function(e, obj) {});

rect.addEventListener('onSelected', function(e, data) {});

rect.addEventListener('onHover', function(e, data) {});

rect.addEventListener('onImageDrag', function(e) {});

rect.addEventListener('onImageDragEnd', function(e) {});
```

#### 实例方法

1. 设置标注数据setData
```
/** 数组类型
* let markNoteList = [{
    coordinates: [[558.3230798626577,41.847382529992984],[664.28253473271,41.847382529992984],[664.28253473271,70.51483886948435],[558.3230798626577,70.51483886948435]],//左上角，右上角，左下角，右下角坐标，坐标x,y轴像素值
    id: "06216",//唯一id
    notes: "Nike Hong Kong Limited",//标注描述字符串
    type: "Rectangle" //类型为矩形
}]
**/ 
rect.setData(markNoteList);
```

2. 开启关闭矩形绘画
```
rect.open();//开启矩形绘画

rect.close();//关闭矩形绘画
```

3. 设置当前的图层的zlevel值,值相同的在同一个图层
```
rect.setZIndex(2);

```

4. 设置当前样式
```
rect.setOptionStyle({
 fill: 'rgba(255,60,60,.1)',
 stroke: '#FF3C3C',
 lineDash: [4, 4]
});                           

```

----------

###  多边形
```
<!-- 生成实例 -->
let polygon = new inMark.Polygon({
    data: data,
    event: {
        onCreate: onCreate,
        onImageDrag: onImageDrag,
        onImageDragEnd: onImageDragEnd,
        onCreateComplete:onCreateComplete,
        onRectDrag: onRectDrag,
        onRectDragComplete:onRectDragComplete,
        onEditNodeDrag:onEditNodeDrag,
        onEditNodeDragComplete:onEditNodeDragComplete,
        onSelected:onSelected,
        unSelect:unSelect
    }
});
```
#### 实例方法

1. 设置标注数据setData

polygon.setData(markNoteList);

```
/** 数组类型
* let markNoteList = [{
    coordinates: [[558.3230798626577,41.847382529992984],[664.28253473271,41.847382529992984],[664.28253473271,70.51483886948435],[558.3230798626577,70.51483886948435]],//左上角，右上角，左下角，右下角坐标，坐标x,y轴像素值
    id: "06216",//唯一id
    notes: "Nike Hong Kong Limited",//标注描述字符串
    type: "Polygon" //类型为矩形
}]
**/ 
polygon.setData(markNoteList);
```

2. 开启关闭多边形绘画

```
polygon.open();//开启多边形绘画

polygon.close();//关闭多边形绘画
```

3. 设置当前的图层的zlevel值,值相同的在同一个图层
```
polygon.setZIndex(2);

```

4. 设置当前样式
```
polygon.setOptionStyle({
 fill: 'rgba(255,60,60,.1)',
 stroke: '#FF3C3C',
 lineDash: [4, 4]
});                           

```


###  文字
```
<!-- 生成实例 -->
let text = new inMark.Text({
    style: {
        textFill: '#FF3535',
        zlevel: 2
    },
    event: {
        onSelected: onSelectedText,
        onHover: onHoverText,
    },
    data: []
});
```

#### 配置属性
style：对象类型，选填

data：数组类型，绘画文字数据，选填

event：对象类型，选填，参见回调方法


#### 回调方法 or 事件监听方法
onSelected：选中某个文字

onHover：悬浮到文字上触发

onImageDrag：图片拖拽开始

onImageDragEnd：图片拖拽结束


```
text.addEventListener('onSelected', function(e, data) {});

text.addEventListener('onHover', function(e, data) {});

text.addEventListener('onImageDrag', function(e) {});

text.addEventListener('onImageDragEnd', function(e) {});
```

#### 实例方法

1. 设置文字数据setData

text.setData(textList);

```
/** 数组类型
* let textList = [{
    id: window.btoa(Math.random()),
    type: 'Text',
    word: 'Hello world',
    width: 120,//文字宽度
    height: 40,//文字高度
    position: [110, 20]//文字位置
}]
**/ 
text.setData(textList);
```


2. 设置当前的图层的zlevel值,值相同的在同一个图层
```
text.setZIndex(2);

```

3. 设置当前样式
```
text.setOptionStyle({
 textFill: 'rgba(255,60,60,.1)'
});                           

```

4. 删除所有文字
```
text.removeAll();
```