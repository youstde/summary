
### nextTick 原理
- 作用：
nextTick 接收一个 callback 作为参数，并将这个 callback 延迟到 DOM 更新后才执行.
- 原理：
将传入的 callback 包装成异步任务，优先微任务，如果都不支持，只能通过 setTimeout 实现
- 细节：
源码中判断了不同环境支持的方法，提供了四种方式去创建异步任务：
1. Promise.then
2. MutationObserver
3. setImmediate - 这个只用 IE 10/11 和 node 环境支持
4. setTimeout

### new Vue 都做了什么
1. 合并配置
2. 初始化生命周期
3. 初始化 data、props、computed、watch 等
4. 初始化事件中心