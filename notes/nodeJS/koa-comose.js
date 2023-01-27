function compose(middlewares = []) {
    return ctx => {
        function dispatch(index) {
            if (index === middlewares.length) return;
            return middlewares[index](ctx, () => dispatch(index + 1));
        }
        return dispatch(0);
    }
}


function middwareOne(ctx, next) {
    console.log(1);
    next();
    console.log(2);
}

function middwareTwo(ctx, next) {
    console.log(3);
    next();
    console.log(4);
}

const fn = compose([middwareOne, middwareTwo]);
const ctx = {
    body: 123,
    res: () => {},
    req: () => {}
}
fn(ctx);