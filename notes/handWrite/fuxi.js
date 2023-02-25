// create
function objectCreate(prototype) {
    function F() {}
    F.prototype = prototype;
    const obj = new F();
    if (prototype === null) {
        obj.__proto__ = null;
    }

    return obj;
}

// new
function myNew(constructor, params) {
    const obj = {};
    obj.__proto__ = constructor.prototype;
    constructor.call(obj, params);
    return obj;
}


// instanceof
function myinstanceof(left, right) {
    const prototype = right.prototype;
    let proto = Object.getPrototypeOf(left);

    while(true) {
        if (proto === prototype) return true;
        if (proto === null) return false;
        proto = Object.getPrototypeOf(proto);
    }
}

// call
Function.prototype.call = function(context, ...args) {
    const curContext = context || window;
    const fn = Symbol(curContext);
    context[fn] = this;
    const res = context[fn](...args);
    delete context[fn];
    return res;
}

// fn.call(this,  1, 2, 3)