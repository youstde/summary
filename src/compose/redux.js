
function compose(funcs) {
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

// 测试用例
const middlewareOne =  ({ dispatch }) => next => action => {
    console.log(1);
    if (typeof action === 'function') {
        return action(dispatch);
    }
    console.log(2);
    next(action);
}

const middlewareTwo = ({ dispatch }) => next => action => {
    console.log(3);
    next(action);
}

const middlewareThree = ({ dispatch }) => next => action => {
    console.log(4);
    next(action);
}

const applyMiddleware = () => {
    let dispatch = (action) => {
        console.log('action', action);
    }
    const middlewareAPI = {
        dispatch: (action) => dispatch(action),
        getState: () => {}
    };
    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(chain)(dispatch);
    return {
        dispatch,
    }
}

const middlewares = [middlewareOne, middlewareTwo, middlewareThree];
const { dispatch} = applyMiddleware(middlewares);

function testAction(dispatch) {
    setTimeout(() => {
        dispatch({
            type: 'test',
        })
    }, 1e3);
}

dispatch(testAction);