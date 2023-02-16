
export const createStore = (reducer, initState) => {
    let state = initState;
    let listeners = [];

    const subscribe = (fn) => {
        listeners.push(fn);
    };

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((fn) => fn());
    };

    const getState = () => {
        return state;
    };

    return {
        getState,
        dispatch,
        subscribe,
    };
};

// 测试用例
const initState = {
    count: 0,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1,
            };
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1,
            };
        default:
            return state;
    }
};

const store = createStore(reducer, initState);

store.subscribe(() => {
    let state = store.getState();
    console.log('state', state);
});

store.dispatch({
    type: 'INCREMENT',
});