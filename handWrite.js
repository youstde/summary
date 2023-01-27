// 手写Object.create
function create(obj) {
    // obj只能传入对象或者null
    function F() { }
    F.prototype = obj;
    return new F();
}

// 手写instanceOf
// var a = {};  a instanceof Object  true
function myInstance(left, right) {
    let proto = Object.getPrototypeOf(left);
    let prototype = right.prototype;
    while (true) {
        if (!proto) return false;
        if (proto === prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}

// 手写promise
const STATE = {
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
    PENDING: 'pending'
}
class MyPromise {
    #state = STATE.PENDING
    #thenCbs = []
    #catchCbs = []
    #value
    #onSuccessBind = this.#onSuccess.bind(this)
    #onFailBind = this.#onFail.bind(this)
    constructor(cb) {
        try {
            cb(this.#onSuccessBind, this.#onFailBind);
        } catch (e) {
            this.#onFail(e);
        }
    }

    #runCallbacks() {
        if (this.#state === STATE.FULFILLED) {
            this.#thenCbs.forEach(callback => {
                callback(this.#value);
            });
            this.#thenCbs = [];
        }

        if (this.#state === STATE.REJECTED) {
            this.#catchCbs.forEach(callback => {
                callback(this.#value);
            });

        }
    }

    #onSuccess(value) {
        queueMicrotask(() => {
            if (this.#state !== STATE.PENDING) return;

            if (value instanceof MyPromise) {
                value.then(this.#onSuccessBind, this.#onFailBind);
                return;
            }

            this.#value = value;
            this.#state = STATE.FULFILLED;
            this.#runCallbacks();
        });
    }

    #onFail(value) {
        queueMicrotask(() => {
            if (this.#state !== STATE.PENDING) return;

            if (value instanceof MyPromise) {
                value.then(this.#onSuccessBind, this.#onFailBind);
            }

            this.#value = value;
            this.#state = STATE.REJECTED;
            this.#runCallbacks();
        });
    }

    then(thenCb, catchCb) {
        return new MyPromise((resolve, reject) => {
            this.#thenCbs.push(result => {
                if (thenCb === null) {
                    resolve(result);
                    return;
                }
                try {
                    resolve(thenCb(result));
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
}

// 手写防抖
function debounce(fn, wait) {
    let timer = null;
    return function () {
        const context = this;
        const args = arguments;
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            fn.apply(context, args);
            timer = null;
        }, wait);
    }
}

const fn = debounce(() => {
    console.log(111);
}, 300);

// 手写节流
function throttle(fn, deley) {
    let timer = null;
    return function () {
        const context = this;
        const args = arguments;
        if (timer) return;
        timer = setTimeout(() => {
            fn.apply(context, args);
            timer = null;
        }, deley);
    }
}

// 手写requestAnimationFrame
// 基于60fps
(function () {
    var lastTime = 0;
    const frameDuration = 1000 / 60;
    window.requestAnimationFrame = function (callback) {
        const now = Date.now();  // 当前时间
        const nextTime = Math.max(lastTime + frameDuration, now);
        return setTimeout(() => {
            callback(lastTime = nextTime);
        }, nextTime - now);
    }

    window.cancelAnimationFrame = clearTimeout;
})();

// 手写call

// 手写bind

// 手写new操作符

// 手写深拷贝

// 手写实现数组乱序

// 实现发布订阅
class EventCenter {
    #handlers = {};

    addEventListener(type, handler) {
        // 处理初始化
        if (!this.#handlers[type]) {
            this.#handlers[type] = [];
        }
        this.#handlers[type].push(handler);
    }

    dispatchEvent(type, params) {
        // 错误边界处理
        if (!this.#handlers[type]) {
            return new Error('该事件未注册');
        }

        this.#handlers[type].forEach(handler => {
            handler(params);
        });
    }
    // 这里传入的handler要是addEventListener传入的函数，不能是新创建的函数
    removeEventListener(type, handler) {
        if (!this.#handlers[type]) {
            return new Error('该事件未注册');
        }
        if (!handler) {
            // 移除整个事件
            delete this.#handlers[type];
        } else {
            let index = this.#handlers[type].findIndex(el => el === handler);
            if (index === -1) {
                // 没有找到
                return new Error('无该绑定事件');
            }
            this.#handlers[type].splice(index, 1);
        }

    }
}

// 实现setTimeout
function mySetTimeout(cb, delay) {
    const startTime = Date.now();
    queueMicrotask(() => {
        const curTime = Date.now();
        const distance = curTime - startTime;
        if (distance >= delay) {
            cb();
        } else {
            mySetTimeout(cb, delay - distance);
        }
    });
}

mySetTimeout(() => {
    console.log(123);
}, 3000);
