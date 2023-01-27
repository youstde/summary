// 手写instanceof
function selfInstanceof(left, right) {
    const proto = Object.getPrototypeOf(left);
    const prototype = right.prototype;
    while(true) {
        if (!proto) return false;
        if (proto === prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}

// 手写Object.create
function objectCreate(obj) {
    function Fn() {};
    Fn.prototype = obj;
    return new Fn();
}

const STSTE = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'reject',
}
function MyPromise(fn) {
    let value;
    let state = STSTE.PENDING;
    let thenCbs = [];
    let catchCbs = [];

    function resolve(newValue) {
       queueMicrotask(() => {
        if (state !== STSTE.PENDING) return;
        if (newValue && newValue instanceof MyPromise) {
            // 此时的newValue是通过then方法传进来的promise实例
            // mob，此时的resolve是bridge的resolve
            newValue.then(resolve, reject);
            return;
        }
        state = STSTE.FULFILLED;
        value = newValue;
        handle();
       });
    }

    function reject(newValue) {
        queueMicrotask(() => {
            if (state !==  STSTE.PENDING) return;
            if (newValue && newValue instanceof MyPromise) {
                newValue.then(resolve, reject);
                return;
            }
            value = newValue;
            state = STSTE.REJECTED;
            handle();
        });
    }

    function handle() {
        if (state === STSTE.FULFILLED) {
            thenCbs.forEach(cb => {
                cb(value);
            });
            return;
        }
        if (state === STSTE.REJECTED) {
            catchCbs.forEach(cb => {
                cb(value);
            });
        }
    }

    this.catch = function(catchCb) {
        this.then(null, catchCb);
    }

    this.finally = function(cb) {
        this.then(cb, cb);
    }

    this.then = function(thenCb, catchCb) {
        return new MyPromise((resolve, reject) => {
            thenCbs.push((newValue) => {
                if (thenCb === null) {
                    resolve(newValue);
                    return;
                }
                try {
                    const ret = thenCb(newValue);
                    // 这个resolve是bridge的resolve
                    resolve(ret);
                } catch(error) {
                    reject(error);
                }
            });
            catchCbs.push((result) => {
                if (catchCb === null) {
                    reject(result);
                    return;
                }
                try {
                    resolve(catchCb(result));
                } catch(error) {
                    reject(error);
                }
            });
        });
    }

    try {
        fn(resolve, reject);
    } catch(e) {
        reject(e);
    }
}


// const p = new MyPromise((resolve, reject) => {
//     resolve('123');
// });
// p.then((id) => {
//     return new MyPromise((resolve, reject) => {
//         resolve(`${id},jack`);
//     });
// })
// .then(res => {
//     console.log(res);
// });
// p.then(() => {
//     return new MyPromise((resolve, reject) => {
//         // to do something
//         resolve('186****5836');
//     })
// })
// .then((res) => {
//     // 这个then方法其实是上个then（也就是userId promise）返回的bridge promise
//     // bridge promise是为了让整个链路串行下去，所以bridge promise要在后面fulfilled
//     // 这个时候打印出来的res是'186****5836'
// })

p.then(res => {

}).catch(err => {

});

// 等同于
p.then(res => {

}).then(null, err => {

});


// 'use strict';

// var Promise = require('./core.js');

// module.exports = Promise;
// Promise.prototype.finally = function (f) {
//   return this.then(function (value) {
//     return Promise.resolve(f()).then(function () {
//       return value;
//     });
//   }, function (err) {
//     return Promise.resolve(f()).then(function () {
//       throw err;
//     });
//   });
// };