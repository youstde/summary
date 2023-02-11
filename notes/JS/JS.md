### for in 和 for of 区别
for of 遍历的是原生的迭代器Symbol.iterator属性，没有这个属性是不能用for of遍历的
for in 可以遍历可枚举属性，包含原型链上的，所以性能会比较差
[here](./forIn%26forOf.js)

### 原型链
![](./yuanxing.png)

#### 注意点:
1. __proto__
它来自于Object.prototype，与其说是一个属性，不如说是一个getter/setter，当使用obj.__proto__去访问原型的时候，可以理解成Object.getPrototypeOf(obj);

2. 真的是继承吗
我们总是说`每一个对象都会从原型“继承”属性`，实际上，继承是一个十分迷惑性的说法，引用《你不知道的JavaScript》中的话：
```text
继承意味着复制操作，然而JavaScript默认并不会复制对象的属性，相反，JavaScript只是在两个对象之间创建了一个关联，这样，一个对象就可以通过委托的方式访问另一个对象上的属性和方法。所以，与其叫继承，委托的说法更准确些。
```

3. 如何解释 Function.__proto__ === Function.prototype
首先，Function是JS的内置对象，在运行前就已经存在的东西，所以就没有什么鸡生蛋，蛋生鸡，我自己生我自己的问题。
至于为什么会有这个等式，可能有两个原因：
第一：
与其他函数、对象保持一致
第二：
只是表明一种关系

### 作用域 - 词法作用域
是指在程序中定义变量的区域，通俗理解就是，作用域控制着变量和函数的可见性和生命周期
在 js 中 作用域 又称 词法作用域
词法作用域就是指作用域是由代码中函数声明的位置来决定的，所以词法作用域是静态的作用域，通过它就能够预测代码在执行过程中如何查找标识符。


### 执行上下文栈
又称为调用栈

### 箭头函数 this 指向哪里
箭头函数不会创建自己的执行上下文，所以没有属于自己的this，它内部的this是继承于外部的执行上下文中的this，而且不会改变。
借助Babel理解一下箭头函数：
```js
// ES6
const obj = {
    getArrow() {
        return () => {
            console.log(this === obj);
        }
    }
}
```
=> 通过Babel转译后
```js
// ES5
var obj = {
    getArrow: function getArrow() {
        var _this = this;
        return function() {
            console.log(_this === obj);
        }
    }
}
```

### 为什么不建议频繁的增删对象的属性
隐藏类
慢属性 - 字典类型的属性

### 内存泄漏
1. 不合理的使用闭包
    - 获取过多的变量
    ```js
    function fn() {
        var bigObj = {
            name: 'youstde',
            age: 18,
            sex: 'boy',
            //...
        }
        return function inner() {
            return bigObj.name;
        }
    }
    ```
    上面例子其实我只用到了 bigObj 中的 name 属性，但是如果我这么获取的话 V8 在与解析的时候就会把整个 bigObj 拷贝一份到堆中，从而形成 inner 的 closeure，这种也算是内存泄漏.
    - 将返回的函数赋值给全局变量
    ```js
    function fn() {
        var bigObj = {
            name: 'youstde',
            age: 18,
            sex: 'boy',
            //...
        }
        var name = bigOjb.name;
        return function() {
            return name;
        }
    }
    // 这样的话其实是赋值给了 window.f 也就是挂载到了全局作用域中
    var f = fn();
    ```
    上面的例子就是把 返回的函数挂载到了全局变量上，那这个函数会一直存在一直到页面关闭
    优化方案：加载到局部变量上或者使用完后给全局变量置为 null，垃圾回收才会回收闭包的这块内存

2. js 代码中保存了对 dom 的引用
3. console.log dom 信息或者 js 中变量