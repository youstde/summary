// promise 是比较典型的发布订阅的模式
// vue是观察者模式
// 两者区别在于发布订阅是无耦合的，而观察者是耦合的
// 发布订阅类似于有一个公共的调度中心去dispatchEvent，而观察者是给每个需要观察的数据一个特定的处理器
class EventEmmiter {
    #handlers = {};

    addEventListener(type, handler) {
        if (!this.#handlers[type]) {
            this.#handlers[type] = [];
        }
        this.#handlers[type].push(handler);
    }

    removeEventLister(type, handler) {
        if (!this.#handlers[type]) throw new Error('该事件未注册');
        this.#handlers[type] = this.#handlers[type].filter(el => (el !== handler) && el.handler !== handler);

        if (this.#handlers[type].length === 0) delete this.#handlers[type];
    }

    once(type, handler) {
        const _once = (params) => {
            handler(params);
            // 这个地方必须移除的是_once，因为handler根本就没有push到队列中
            this.removeEventLister(type, _once);
        }
        // 此时push进去的事件回调是_once,如果我在外面手动调用removeEventListener就会移除不掉对应的事件
        // 因为它真正的handler不是_once
        this.addEventListener(type, _once);
        // 把真正的handler挂载到包装函数上
        _once.handler = handler;
        return _once;
    }

    dispatchEvent(type, params) {
        if (!this.#handlers[type]) return new Error('该事件未注册');
        this.#handlers[type].forEach(handler => handler(params));
    }
}


const em = new EventEmmiter();
const onceHandler = (params) => {
    console.log('onceParams', params);
};

function aHandler(params) {
    console.log('aaa', params);
}
em.addEventListener('click', aHandler);
function bHandler(params) {
    console.log('bbb', params);
}
em.addEventListener('click', bHandler);

em.dispatchEvent('click', 1111);
em.removeEventLister('click', aHandler);
em.dispatchEvent('click', 1111);
// em.once('click', onceHandler);
// 如果这个地方手动去移除掉通过once绑定的事件
// em.removeEventLister('click', onceHandler);