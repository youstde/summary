//=====> koa-compose
const koaCompose = function(middlewares) {
    return (ctx) => {
        const dispatch = (index) => {
            const middleware = middlewares[index];
            if (index === middlewares.length) return;
            return middleware(ctx, () => dispatch(index + 1));
        }
        return dispatch(0);
    }
}

// 测试用例
const koaMiddlewareOne = function(ctx, next) {
    console.log(1);
    next();
    console.log(2);
}
const koaMiddlewareTwo = function(ctx, next) {
    console.log(3);
    next();
    console.log(4);
}
const koaMiddleWares = [koaMiddlewareOne, koaMiddlewareTwo];
const koaFn = koaCompose(koaMiddleWares);
const ctx = {
    req: {},
    res: {}
}
koaFn(ctx);
// koaFn(ctx).then(() => {
//     // response
// });

//=====> iterator
function iterator(items) {
    let index = 0;
    return {
        next() {
            const done = index === items.length;
            const val = items[index];
            return {
                value: val,
                done
            }
        }
    }
}
// 测试用例
const iterable = iterator([1, 2, 3, 4]);
iterable.next().value;

//=====> redux compose
function reduxCompose(middlewares) {
    return middlewares.reduce((a, b) => (...args) => a(b(args)));
}


// 测试用例
const reduxMiddlewareOne = ({ dispatch }) => (next) => (action) => {
    if (typeof action === 'function') {
        return action(dispatch);
    }
    next(action);
}

const reduxMiddlewareTwo = ({ dispatch }) => (next) => (action) => {
    console.log('reduxMiddlewareTwo');
    next(action);
}
const reduxMiddlewares = [reduxMiddlewareOne, reduxMiddlewareTwo];
const dispatch = (action) => {
    console.log('dispatch', action);
}
const middlewareAPI = {
    dispatch: (action) => dispatch(action),
    getState: () => {}
}
const chain = reduxMiddlewares.map(reduxMiddleware => reduxMiddleware(middlewareAPI));
dispatch = reduxCompose(chain)(dispatch);


//=====> webpack loader compose
const loaderCompose = (loaders) => {
    return loaders.reduce((a, b) => (source) => a(b(source)));
}

// 测试用例
const loaderOne = (source) => {
    console.log(1);
    return source;
}

const loaderTwo = (source) => {
    console.log(1);
    return source;
}

const loaders = [loaderOne, loaderTwo];
const source = 'start';
loaderCompose(loaders)(source);
