# 渲染进程 webview
# app service线程（js 线程）=> JS core
### 双线程 + hybrid（JSBridge）
主要优点：安全，便于管控(微信可不希望说，你用一个小程序导致了微信经常崩掉，或者导致微信里面的信息不安全)
        - 微信不希望小程序过于灵活，限制 DOM 和 BOM 的操作 => 双线程
附带优点：性能会好一点，改善了 JS 阻塞渲染进程的问题
缺点：JSBridge 是异步的，有通信成本
     - 例如：
     - 页面上的滚动事件频繁触发 JS 事件，这个会有一些延迟的
     - 页面拖动去触发 JS事件
    => 改善：可以使用 wxs 去改善

### WXS 是什么东西
- 在渲染线程（webview）中执行 js脚本，当然这个脚本的使用也是有限制的，只能用微信提供的一些写法

### 同层渲染
- 背景：
1.0 使用原生组件的时候原生组件的图层会遮挡webview的图层，而且webview中怎么设置优先级都没用
2.0 打补丁：cover-view cover-image 这两个也是原生组件，将webview中的模块通过 cover-view 包裹，从而达到和原生同样的层级
3.0 同层渲染 - 将原生的组件插入到webview指定的位置上

### 小程序更新机制
1. 微信会定期检查近期使用的小程序是否有更新
2. 用户打开长时间未使用的小程序会强制同步检查是否有更新
3. 小程序冷启动的时候会异步检查是否有更新，如果有，下次冷启动时生效
4. 手动触发更新
```js
const updateManager = wx.getUpdateManager();

updateManager.onCheckForUpdate(function(res) {
    // 请求完新版本信息的回调
    console.log(res.hasUpdate);
});

updateManager.onUpdateReady(function () {
    wx.showModal({
        title: '更新提示',
        content: '新版本已准备好了，是否更新并重新启动？',
        success(res) {
            if (res.confirm) {
                // 如果用户同意则安装新版本并重启
                updateManager.applyUpdate();
            }
        }
    })
});
```