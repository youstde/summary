// Object.create
function objectCreate(prototype) {
    function F() {}
    F.prototype = prototype;
    const obj = new F();
    if (prototype === null) {
        obj.__proto__ = null;
    }
    return obj;
}

// instanceOf
function myInstanceOf(left, right) {
    const prototype = right.prototype;
    let proto = Object.getPrototypeOf(left);

    while(true) {
        if (prototype === proto) return true;
        if (proto === null) return false;
        proto = Object.getPrototypeOf(proto);
    }
}

// new F();
function myNew(constructor, ...params) {
    var obj = {};
    obj.__proto__ = constructor.prototype;
    constructor.call(obj, ...params);
    return obj;
}

function myNewTwo(constructor, ...params) {
    var obj = Object.create(constructor.prototype);
    constructor.call(obj, ...params);
    return obj;
}

class EventEmmiter {
    #handlers = {}

    addEventListener(type, handler) {
        if (!this.#handlers[type]) {
            this.#handlers[type] = [];
        }
        this.#handlers[type].push(handler);
    }

    removeEventListener(type, handler) {
        if (!this.#handlers[type]) {
            throw new Error('该事件未注册');
        }

        this.#handlers[type] = this.#handlers[type].filter(el => (el !== handler) || (el.handler !== handler));
    }

    once(type, handler) {
        const _once = (params) => {
            handler(params);
            this.removeEventListener(type, _once);
        }
        _once.handler = handler;
        this.addEventListener(type, _once);
    }

    dispatchEvent(type, params) {
        if (!this.#handlers[type]) {
            throw new Error('该事件未注册');
        }

        this.#handlers[type].forEach(handler => {
            handler(params);
        })
    }
}


module.exports = {
    objectCreate,
    myInstanceOf,
    myNew,
    myNewTwo,
    EventEmmiter,
}