
function koaCompose(middlewares) {
    return (ctx) => {
        function dispatch(index) {
            const isDone = index === middlewares.length;
            if (isDone) return;
            middlewares[index](ctx, () => dispatch(index + 1));
        }

        dispatch(0);
    }
}

function middlewareOne(ctx, next) {

}

function middlewareTwo(ctx, next) {

}
const middlewares = [middlewareOne, middlewareTwo];
const koaFn = koaCompose(middlewares);
const ctx = {
    req: {},
    res: {}
}
koaFn(ctx);