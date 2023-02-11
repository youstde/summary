const STATE = {
    PANDING: 'panding',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}
function MyPromise(fn) {
    let state = STATE.PENDING;
    let value;
    const thenCbs = [];
    const catchCbs = [];

    function handle() {
        if (state === STATE.PENDING) return;

        if (state === STATE.FULFILLED) {
            thenCbs.forEach(cb => {
                cb(value);
            });
            return;
        }

        if (state === STATE.REJECT) {
            catchCbs.forEach(cb => {
                cb(value);
            });
        }
    }

    function resolve(newValue) {
        queueMicrotask(() => {
            if (state === STATE.PENDING) return;
            if (newValue && newValue instanceof MyPromise) {
                // 此时传入的是一个promise实例
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
            if (state === STATE.PENDING) return;
            if (newValue && newValue instanceof MyPromise) {
                // 传入的是promise实例
                newValue.then(resolve, reject);
                return;
            }

            value = newValue;
            state = STATE.REJECT;
            handle();
        });
    }

    this.then = function(thenCb, catchCb) {
        return new MyPromise((resolve, reject) => {
            thenCbs.push((newValue) => {
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

            catchCbs.push((newValue) => {
                if (!catchCb) {
                    reject(newValue);
                    return;
                }

                try {
                    const ret = catchCb(newValue);
                    resolve(ret);
                } catch(err) {
                    reject(err);
                }
            });
        });
    }

    this.catch = function (cb) {
        return this.then(null, cb);
    }

    this.finally = function(cb) {
        // return this.then(
        //     newVal => MyPromise.resolve(cb()).then(() => newVal),
        //     result => MyPromise.resolve(cb()).then(() => { throw result }) 
        // );
        return this.then(cb, cb);
    }

    try {
        fn(resolve, reject);
    } catch(err) {

    }
}