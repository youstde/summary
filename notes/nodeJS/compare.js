// 1 webpack loader
function loaderCompose(loaders) {
    return loaders.reduce((a, b) => (...args) => a(b(args)));
}

// 测试用例
function loaderA(source) {
    console.log('loaderA');
    return 'test';
}

function loaderB() {
    // 异步loader
    // const callBack = this.Async();
    console.log('loaderB');
    return '123';
}

const loaders = [loaderA, loaderB];
const curLoader = loaderCompose(loaders);
// webpack中的loader是通过loader-runner去执行的
// 而通过use传入的loaders会通过loaderCompose去整合成一个，依次从后向前执行
function runLoader(loader) {
    const source = 'hello';
    loader(source);
}
runLoader(curLoader);

// 2 koa-compose
// 洋葱模型中间件的机制
// ctx中糅合了request相关的req，res，中间件会在res，req上去挂载或者调用某些方法
// 这些都会等到所有中间件执行完成后才会去处理，promise的then种去处理
function koaCompose(middlewares) {
    return (ctx) => {
        function dispatch(index) {
            if (index === middlewares.length) return;
            const middleware = middlewares[index];
            middleware(ctx, () => dispatch(index + 1));
        }
        dispatch(0);
    }
}
// 测试用例
function koaMiddlwareOne(ctx, next) {
    console.log('koaMiddlwareOne');
    next();
}

function koaMiddlwareTwo(ctx, next) {
    console.log('koaMiddlwareTwo');
    next();
}
const koaMiddlewares = [koaMiddlwareOne, koaMiddlwareTwo];
// 这个地方源码里返回的是一个promise
const koaFn = koaCompose(koaMiddlewares);
const ctx = {
    res: {},
    req: {}
}
koaFn(ctx);
// koaFn(ctx).then(() => {
//     // 处理response
// })

// 3 for of
function forOf(obj) {
    if (typeof obj[Symbol.iterator] !== 'function') {
        throw new Error('该对象不支持for of');
    }
    const iterable = obj[Symbol.iterator]();
    let next = iterable.next();
    while(!next.done) {
        console.log(next.value);
        next = iterable.next();
    }
}
// 测试用例
forOf([1, 2, 3, 4]);

// iterator
function iterator(items) {
    let index = 0;
    return {
        next() {
            const done = index >= items.length;
            const value = items[index];
            index++;
            return {
                value,
                done,
            }
        }
    }
}

// 测试用例
const iterable = iterator([6, 7, 8, 9, 10]);
console.log(iterable.next().value, iterable.next().done);
console.log(iterable.next().value, iterable.next().done);
console.log(iterable.next().value, iterable.next().done);
console.log(iterable.next().value, iterable.next().done);
console.log(iterable.next().value, iterable.next().done);
console.log(iterable.next().value, iterable.next().done);

// 4 redux compose
const reduxMiddlewareOne = ({ dispatch }) => (next) => (action) => {
    // thunk-redux
    console.log('start');
    if (typeof action === 'function') {
        return action(dispatch);
    }
    console.log('reduxMiddlewareOne');
    return next(action);
}

const reduxMiddlewareTwo = ({ dispatch }) => (next) => (action) => {
    console.log('reduxMiddlewareTwo');
    return next(action);
}

function reduxCompose(funcs) {
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
function applyMiddleware(middlewares) {
    let dispatch = (action) => {
        console.log('real dispatch', action);
    }
    const middlewareAPI = {
        dispatch: (action) => dispatch(action),
        getData: () => {}
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = reduxCompose(chain)(dispatch);
    return dispatch;
}

const reduxMiddlewares = [reduxMiddlewareOne, reduxMiddlewareTwo];
const curDispatch = applyMiddleware(reduxMiddlewares);
function testAction(dispatch) {
    setTimeout(() => {
        dispatch({
            type: 'test',
        })
    }, 1e3);
}
curDispatch(testAction);