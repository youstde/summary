### display 的 inline 和 inline-block 区别

### flex
flex-direction      主轴方向
flex-wrap           是否换行
justify-content     主轴方向上的对齐方式
align-items         交叉轴上的对齐方式
flex-grow           放大
flex-shrink         缩小
======================================
flex: <flex-grow> <flex-shrink> <flex-basis>;
auto: flex: 1 1 auto;
none: flex: 0 0 auto;
=> flex-wrap 和 flex-grow 、flex-shrink 之间的关系：
- 当 flex-wrap: wrap | wrap-reverse
1. 子项宽度不及父容器宽度时。flex-grow 会起作用，子项会根据 flex-grow 设置的值放大（为 0 的项除外）.
2. 子项宽度超过父容器的宽度时。首先，一定会换行，换行后，每行的右侧可能会有剩余空间，这时 flex-grow 会起作用.
- 当 flex-wrap: nowrap
1. 当子项宽度不及父容器宽度时。flex-grow 会起作用，子项会根据 flex-grow 设置的值放大（为 0 的项除外）.
2. 当子项宽度超过父容器宽度时。flex-shrink 会起作用，子项会根据 flex-shrink 设定的值进行缩小（为0的项不缩小）。但这里有一个较为特殊情况，就是当这一行所有子项 flex-shrink 都为0时，也就是说所有的子项都不能缩小，就会出现讨厌的横向滚动条.


### 已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改
```html
<img src="1.jpg" style="width:480px!important;”>
```
- max-width
`max-width: 300px`

- 缩放
`transform: scale(0.625)`

- 使用 JS 覆盖
`document.getElementsByTagName("img")[0].setAttribute("style","width:300px!important;")`
