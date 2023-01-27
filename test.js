const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('186');
    }, 1e3);
});
p.then((userId) => {
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(`${userId}****5836`);
    //     }, 1e3);
    // });

    // 这个地方的return其实是将数据传给这个then方法创建并返回的bridge promise的resolve方法
    // 那么下面的then方法才能获取到这个地方return的数据
    return `${userId}****5836`;
}).then(res => {
    console.log('res', res);
});

// 手写promise
const STATE = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}
function MyPromise(fn) {
    let value;
    let state = STATE.PENDING;
    const deferreds = [];

    function handle(cb) {
        if (state === STATE.PENDING) {
            deferreds.push(cb);
            return;
        }
        cb(value);
    }

    function resolve(newValue) {
        if (newValue && newValue instanceof MyPromise) {
            // 说明这个地方传入的是一个MyPromise实例
            newValue.then(resolve);
            return;
        }

        queueMicrotask(() => {
            state = STATE.FULFILLED;
            value = newValue;
            deferreds.forEach(deferred => {
                handle(deferred);
            });
        });
    }

    function reject() {

    }

    this.then = function (thenCb, catchCb) {
        return new MyPromise((resolve, reject) => {
            handle((newValue) => {
                try {
                    const ret = thenCb(newValue);
                    resolve(ret);
                } catch (error) {
                    reject(error);
                }
            });
        });;
    }

    try {
        fn(resolve, reject);
    } catch (error) {
        reject(error);
    }
}


var myP = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('341');
    }, 1e3);
});

myP.then(userId => {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve(`${userId}*****4031`);
        }, 200);
    });
    // return `${userId}*******4031`;
}).then(res => {
    console.log('idCard', res);
});
