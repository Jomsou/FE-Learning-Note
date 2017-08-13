# CSS定位(position)
![](http://i.imgur.com/b07IDmD.png)

>如果想设置元素相对父元素而不是相对浏览器窗口，需要在子元素设置position: absolute;在其父元素中设置position: relative;，否则，绝对定位将不起作用。通过top、bottom、left、right控制位置。
元素设置了绝对定位后，脱离标准流，不占据空间。

### HTML中的三种布局方式
- 浮动
- 标准流
- 定位

### position属性的意义
>通过top、right、bottom、left实现位置的改变

### position属性决定了元素将如何定位


|position可选参数|参数特性|说明|
|-|-|-|
|relative|可以利用 top right bottom left 进行定位|不脱离文档流,为子定位划分作用域,移动区域为整个网页|
|static|浏览器默认参数|-|
|absolute|可以利用 top right bottom left 进行定位|脱离文档流,为子定位划分作用域,移动区域为整个网页|
|fixed|可以利用 top right bottom left 进行定位|脱离文档流,为子定位划分作用域,移动区域为整个窗口区|
|inherit|position：inherit|继承父元素的定位IE属性|

#### 定位中的层级
##### z-index改变层级
通过顺序插入，越后添加的定位元素层级越大
不同父元素中的子元素的层级各不相干

|z-index |属性值|
|-|-|
|z-index|auto(默认值)
|z-index|inherit（继承）
|z-index|number（number指具体数值）
##### z-index 特性

**重要**：只有在定位属性不为默认情况下才起作用。
```
z-index大的元素会覆盖z-index小的元素
可以设置元素的叠加顺序，但依赖定位属性
z-index为auto的元素不参与层级比较
z-index 为负值，元素被普通流中的元素覆盖
```
### 定位与边距的异同
position通过定位改变距离
margin、padding通过控制边距改变距离

### 利用position：absolute使得块级元素水平垂直居中。

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>position</title>
    <style>
        .test{
            width: 100px;
            height: 100px;
            background: red;
            position: absolute;
            left: 50%;
            top: 50%;
			margin-left: -50px;
			margin-top: -50px;
        }
    </style>
</head>
<body>
    <div class="test"></div>
</body>
</html>
```
