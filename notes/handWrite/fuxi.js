// create
function objectCreate(prototype) {
    function F() {};
    F.prototype = prototype;
    const obj = new F();
    if (prototype === null) {
        obj.__proto__ = null;
    }
    return obj;
}

// instanceOf
function myInstance(target, source) {
    const prototype = source.prototype;
    let proto = Object.getPrototypeOf(target);
    while(true) {
        if (proto === null) return false;
        if (proto === prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}

// new
function myNew(constructor, ...args) {
    const temp = {};
    temp.__proto__ = constructor.prototype;
    constructor.call(temp,  ...args);
    return temp;
}

function myNewTwo(constructor, ...args) {
    const temp = Object.create(constructor.prototype);
    constructor.call(temp,  ...args);
    return temp;
}

// const inst = new People();


// eventEmmiter
class EventEmmiter {
    #handlers = {};

    addEventListener(type, handler) {
        if (!this.#handlers[type]) {
            this.#handlers[type] = [];
        }

        this.#handlers[type].push(handler);
    }

    removeEventListener(type, handler) {
        if (!this.#handlers[type]) throw new Error('该事件未注册');

        this.#handlers[type] = this.#handlers[type].filter(el => (el !== handler) && (el.handler !== handler));

        if (this.#handlers[type].length === 0) delete this.#handlers[type];
    }

    dispatchEvent(type, params) {
        if (!this.#handlers[type]) throw new Error('该事件未注册');

        this.#handlers[type].forEach(handler => {
            handler(params);
        });
    }

    once(type, handler) {
        const _once = (params) => {
            handler(params);
            this.removeEventListener(type, _once);
        }
        this.addEventListener(type, _once);
        _once.handler = handler;
    }
}


module.exports = {
    objectCreate,
    myInstance,
    myNew,
    myNewTwo,
    EventEmmiter,
}