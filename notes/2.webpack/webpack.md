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

### css-loader 的作用是什么
它会将 css 翻译成类似 module.exports = `${css}` 的JS代码，从而让 CSS 文件可以和 JS 文件一样作为资源。同时它还提供了 sourcemap, css-in-module 的能力

### React.lazy 配合 import 做懒加载
打包后的产物中，这些异步加载的模块都会通过 promise 引入进来
```js
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
```

### gulp 和 webpack 区别
1. 执行粒度上
webpack 是拓扑类的，以模块为最小粒度去处理；
gulp 是流式的，以任务的形式去处理

2. 执行顺序上
webpack 是弱化了执行顺序，取而代之的是 loader、plugin
gulp 是串在一起的，需要我们自己去编排顺序。更适合作为自动化工具链来使用

### 性能优化
1. 自我救赎 - webpack 本身也在一直在做优化
a. mode 为 production 的时候默认开启 scope hosting 和 tree shaking
`scope hosting 会分析出模块之间的依赖，从而尽可能的把打包出的模块合并到一个函数里去。`

b. 默认内置模块
*老版本：*
file-loader、url-loader、raw-loader
*V5版本：*
内置了这些能力
asset/resource ==> file-loader
asset/inline ====> url-loader
asset/source ====> raw-loader

c. 持久化缓存 - 阶段性编译的结果存放在持久化缓存中
```js
module.exports = {
    cache: {
        type: 'fileSystem'
    }
}
```

2. webpack5配置缓存
*webpack5 之前*
* 使用 cache-loader 将编译结果写入磁盘
* 还有一部分 loader 自带缓存配置，比如 babel-loader 可以设置缓存
*webpack5*
可以直接通过配置 cache 去设置缓存
```js
// webpack.config.js
module.exports = {
    cache: {
        type: 'filesystem', // 'memory' | 'filesystem'
        // cacheDirectory: 默认是 'node_modules/.cache/webpack',
    }
}
```
