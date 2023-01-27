### loader原理
这个和 redux 中间件的原理有点像，但是又不太一样，方向相反，那是因为redux每个中间件做了柯里化
redux
```js
const middleWareOne = ({ dispatch }) => (next) => (action) => {
    console.log('one');
    next();
}

const middleWareTwo = ({ dispatch }) => (next) => (action) => {
    console.log('two');
    next();
}

const middleWareThree = ({ dispatch }) => (next) => (action) => {
    console.log('three');
    next();
}

const dispatch = () => {
    // 遍历reducer然后传入type
}

const compose = (funs) => {
    return funs.reduce((a, b) => (...args) => a(b(args)));
}
const middlewareAPI = {
    dispatch: (action) => dispatch,
    setState: () => {}
}
const middlewares = [middleWareOne, middleWareTwo, middleWareThree];
const chain = middlewares.map(middleware => middleware(middlewareAPI));
dispatch = compose(chain)(dispatch);
```
而loader的是这个样子的
```js
function a(source) {
    const cur = source + 'a-';
    console.log('a',cur);
    return cur;
}

function b(source) {
    const cur = source + 'b-';
    console.log('b', cur);
    return cur;
}

function c(source) {
    const cur = source + 'c-';
    console.log('c', cur);
    return cur;
}

const compose = (loaders) => {
    return loaders.reduce((draft, cur) => (args) => draft(cur(args)));
};
const loaders = [a, b, c];
compose(loaders)('start');
```

### DLLPlugin 原理是什么，有什么缺点

### webpack中的module、chunk、bundle是什么

### loader 和 plugin 区别
loader
> 是一个转换器，将A文件编译成B文件

plugin
> 是一个拓展器，它丰富了webpack本身，针对的是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作（发布订阅模式tapable），会监听webpack打包过程中的某些节点，执行广泛的任务。

### webpack 文件监听的原理（watch）
```js
module.exports = {
    watch: true,
    watchOptions: {
        ignore: /node_modules/,
        aggregateTimeout: 300, // 等待时间，去进行批量打包，而不是文件一变就去打包
        poll: 1000, // 轮询次数，每秒1000次
    }
}
```
原理：
文件第一次打包完后会收集到文件的更新时间，缓存起来。然后轮询判断文件的最后编辑时间是否发生变化，若某个文件发生了变化并不会立刻告诉监听者，而是先缓存起来（批量更新），等待一段时间再一起提交
watch的缺陷：
每次重新打包后需要手动刷新浏览器
