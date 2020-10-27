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
<!-- 第一步，html页面增加一个dom标签，附上属性id -->
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
let image = new inMark.Image({
    id: 'inmarkDOM',
    mode: 'original', //original or auto
    imgUrl: 'http://url',
    event: {
        onLoadComplete: loadComplete,
        onImageDrag: imageDrag,
        onImageDragEnd: onImageDragEnd_image,
    }
});

let zr = image.getZrender();//返回zrender实例
let group = image.getGroup();//返回group,zrender.group
let img = image.getImage();//返回图片实例
```
#### 配置属性
id：字符串类型，dom唯一id,用来生成canvs

mode：字符串类型，设置渲染模式，
默认为‘auto’，进行图片大小等比例缩放适应canvas容器，
‘original’不进行图片缩放，加载原图片大小。
‘auto-rotate’ 旋转模式，支持图片旋转

imgUrl：字符串类型，设置图片的url访问地址，可以是http,https,cdn方式。如果需要图片强制刷新，可在图片url后增加时间戳

event：对象类型，参见回调方法

#### 回调方法
onLoadComplete：图片加载完毕，执行渲染矩形等图形

onImageDrag：图片拖拽开始

onImageDragEnd：图片拖拽结束

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

1. 旋转

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
2. 放大缩小
```
<!-- 放大 -->
image.zoomIn();
<!-- 缩小 -->
image.zoomOut();
```

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
let polygon = new inMark.Rect({
    data: data,
    isOpen: false,
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

#### 配置属性
data：数组类型，跟setData实例方法数据一样，

isOpen：布尔类型，默认false为初始不开启绘画矩形，true为初始开启绘画矩形

event：对象类型，参见回调方法

#### 回调方法
onCreate：开始拖拽创建矩形，拖拽结束前

onCreateComplete：拖拽结束，新增矩形创建完毕

onImageDrag：图片拖拽开始

onImageDragEnd：图片拖拽结束

onRectDrag：矩形拖动开始

onRectDragComplete：矩形拖动结束

onEditNodeDrag：矩形编辑开始

onEditNodeDragComplete：矩形编辑结束

onSelected：选中某个矩形

#### 实例方法

1. 拖拽

```
this.polygon.setDrag(true);//开启拖拽

this.polygon.setDrag(false);//关闭拖拽
```

2. 设置标注数据setData
```
/** 数组类型
* let markNoteList = [{
    coordinates: [[558.3230798626577,41.847382529992984],[664.28253473271,41.847382529992984],[664.28253473271,70.51483886948435],[558.3230798626577,70.51483886948435]],//左上角，右上角，左下角，右下角坐标，坐标x,y轴像素值
    id: "06216",//唯一id
    notes: "Nike Hong Kong Limited",//标注描述字符串
    type: "Rectangle" //类型为矩形
}]
**/ 
polygon.setData(markNoteList);
```

3. 开启关闭矩形绘画
```
polygon.open();//开启矩形绘画

polygon.close();//关闭矩形绘画
```
4. 放大缩小,继承自Image实例
```
<!-- 放大 -->
polygon.zoomIn();
<!-- 缩小 -->
polygon.zoomOut();
```

5. 点击选中某个标注，删除当前标记，返回删除的对象
```
polygon.removeAnnotation();
```


6. 删除指定对象标注
```
/* 对象类型
*item = {
    coordinates: [[558.3230798626577,41.847382529992984],[664.28253473271,41.847382529992984],[664.28253473271,70.51483886948435],[558.3230798626577,70.51483886948435]],//左上角，右上角，左下角，右下角坐标，坐标x,y轴像素值
    id: "06216",//唯一id
    notes: "Nike Hong Kong Limited",//标注描述字符串
    type: "Rectangle" //类型为矩形
}
*/
polygon.removeSub(item);
```

7. 删除所有标注
```
polygon.removeAll();
```

8. 定位标注到canvas中心
```
/* 对象类型
*item = {
    coordinates: [[558.3230798626577,41.847382529992984],[664.28253473271,41.847382529992984],[664.28253473271,70.51483886948435],[558.3230798626577,70.51483886948435]],//左上角，右上角，左下角，右下角坐标，坐标x,y轴像素值
    id: "06216",//唯一id
    notes: "Nike Hong Kong Limited",//标注描述字符串
    type: "Rectangle" //类型为矩形
}
*/
polygon.setPosition(item);
```

9. 选中标注并高亮
```
/* 对象类型
*item = {
    coordinates: [[558.3230798626577,41.847382529992984],[664.28253473271,41.847382529992984],[664.28253473271,70.51483886948435],[558.3230798626577,70.51483886948435]],//左上角，右上角，左下角，右下角坐标，坐标x,y轴像素值
    id: "06216",//唯一id
    notes: "Nike Hong Kong Limited",//标注描述字符串
    type: "Rectangle" //类型为矩形
}
*/
polygon.selected(item);
```
