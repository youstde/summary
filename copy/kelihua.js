

function sum(...args) {
    const _add = (...args2) => {
        return sum(...args, ...args2);
    }
     _add.value = () => args.reduce((a, b) => a + b);
    return _add;
}

console.log(sum(1)(2, 3)(4).value());

