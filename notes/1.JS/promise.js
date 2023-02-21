// 定义状态常量
const STATE = {
    PENDING: 'pending',
    REJECT: 'reject',
    FULFILLED: 'fulfilled'
}

function MyPromise(fn) {
    let value;
    let state = STATE.PENDING;
    const thenCbs = [];
    const catchCbs = [];

    function handle() {
        if (state === STATE.PENDING) return;
        if (state === STATE.FULFILLED) {
            thenCbs.forEach(cb => {
                cb(value);
            });
        } else if (state === STATE.REJECT) {
            catchCbs.forEach(cb => {
                cb(value);
            });
        }
    }

    function resolve(newValue) {
        queueMicrotask(() => {
            if (state !== STATE.PENDING) return;
            if (newValue && newValue instanceof MyPromise) {
                // 传入的是一个promise实例
                newValue.then(resolve, reject);
                return;
            }
            value = newValue;
            state = STATE.FULFILLED;
            handle();
        });
    }

    function reject(newValue) {
        queueMicrotask(() => {
            if (state !== STATE.PENDING) return;
            if (newValue && newValue instanceof MyPromise) {
                // 传入的是一个promise实例
                newValue.then(resolve, reject);
                return;
            }
            value = newValue;
            state = STATE.REJECT;
            handle();
        });
    }

    this.then = function (thenCb, catchCb) {
        return new MyPromise((resolve, reject) => {
            thenCbs.push((newValue) => {
                // 如果thenCb没有传
                if (!thenCb) {
                    resolve(newValue);
                    return;
                }

                try {
                    const ret = thenCb(newValue);
                    resolve(ret);
                } catch(err) {
                    reject(err);
                }
            });

            catchCbs.push((result) => {
                if (!catchCb) {
                    // 如果调用了catchcbs，说明肯定哪里reject了或者抛错了。这个错误肯定是要处理的，
                    // 如果当前没有catchcb去承接，那就往下送，如果下面有catch(第一个)就会捕捉到，第二个catch就捕捉不到了
                    reject(result);
                    return;
                }
                try {
                    // 执行到这个地方说明我是有catch去处理错误的，那既然错误得到了处理，后续就正常工作吧
                    // 既然这个错误已经被很好的解决了那就恢复正常，不要影响后续的工作
                    const ret = catchCb(result);
                    resolve(ret);
                } catch(err) {
                    reject(err);
                }
            });
        });
    }

    this.catch = function (catchCb) {
        return this.then(null, catchCb);
    }

    this.finally = function(cb) {
        return this.then(cb, cb);
    }

    try {
        fn(resolve, reject);
    } catch (error) {
        reject(error);
    }
}

// 测试用例
const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(123);
    }, 300);
});

p.then(res => {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            reject(`${res}-456`);
        }, 200);
    })
})
.then(res => {
    console.log('res2', res);
})
.catch((err) => {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve(err);
        });
    })
})
.then(res => {
    console.log('res3', res);
    return res;
})
.finally((res) => {
    setTimeout(() => {
        console.log('finally', res);
        return res;
    }, 1e3);
})
.then(res => {
    console.log('afterFinally', res);
})


// 对照
// const p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(123);
//     }, 300);
// });
// p2.then(res => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(`${res}-456`);
//         }, 200);
//     });
// })
// .then(res => {
//     console.log(res);
//     return res;
// })
// .then(res => {
//     console.log(res);
// })
// .catch(err => {
//     console.log('err====>', err);
// })
// .finally((res) => {
//     console.log('finally', res);
// });