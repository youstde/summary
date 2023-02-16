// redux源码学习
// applyMiddleware
// redux-thunk
// compose

const middleWareOne = ({ dispatch }) => (next) => (action) => {
    console.log('start');
    // 这个地方有个判断，其实也就是redux-thunk的源码
    // 如果当action类型为function的时候，直接执行action并return action的执行结果
    // 这么做是防止无限循环下去
    if (typeof action === 'function') {
        console.log('action is function');
        return action(dispatch);
    }
    console.log(1, action, dispatch);
    return next(action);
}

const middleWareTwo = ({ dispatch }) => (next) => (action) => {
    console.log(2,);
    return next(action);
}

const middleWareThree = ({ dispatch }) => (next) => (action) => {
    console.log(3, action, dispatch);
    return next(action);
}

let dispatch = function(action) {
    console.log('end', action);
}
// 为什么middleWareAPI中的dispatch需要用匿名函数包裹
// 为了让每个middleware中都能拿到相同的、最新的dispatch（也就是下面包装过后的dispatch）
const middleWareAPI = {
    dispatch: (action) => dispatch(action),
    getState: () => {}
}
const middleWares = [middleWareOne, middleWareTwo, middleWareThree];
const chain = middleWares.map(middleWare => middleWare(middleWareAPI));

const curCompose = (fncs) => {
    const res = fncs.reduce((a, b) => (...args) => a(b(...args)));
    return res;
}
dispatch = curCompose(chain)(dispatch);

const getUserId = function() {
    return function(nextDispatch) {
        setTimeout(() => {
            // 这个地方传入的dispatch其实是经过处理后的dispatch
            nextDispatch({
                type: '123'
            })
        }, 2e3);
    }
}

console.log('curDispatch');
dispatch(getUserId());