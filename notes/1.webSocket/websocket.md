
### 为什么会出现 websocket
- 背景：
1. http 协议是无状态协议，记性很差，请求处理完就不认识你是谁了，每次请求我都得告诉服务端我是谁
2. http 1.0 和 1.1 协议的 request 和 response 基本上都是一一对应的，一问一答。而且 response 都是被动的，除了 http 2.0 支持了服务端推送
3. poll 轮询去获取最新数据
=> websocket 出现了
1. 长连接，而且一次建连后请求头不用带很多数据，因为websocket记性很好，在第一次建连的时候就记住了，后面请求头里就不需要带一大堆东西证明我是我 - 请求头比较小
2. 不再是 http 的半双工的形式 - 全双工 协议

### websocket 是基于什么协议的
- 基于 TCP 的全双工通讯协议
- TCP 就像是跑在铁路上的火车🚄，而 websocket 和 http 像是火车里的人，只是 websocket 和 http 长得有点相似
- 正因为 websocket 和 http 长得有点相似，所以要在 websocket 的请求头上标明：
`connection: Upgrade`
`Upgrade: websocket`


