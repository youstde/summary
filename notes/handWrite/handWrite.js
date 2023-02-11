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

// 扁平数组转树形结构
function arrToTree(arr) {
    const res = [];
    const map = {};
    for(let item of arr) {
        const id = item.id;
        const pid = item.pid;
        map[id] = map[id] ? {...item, ...map[id] } : {...item}; 
        if (pid === 'root') {
            res.push(map[id]);
        } else {
            if (!map[pid]) {
                map[pid] = {
                    children: [],
                }
            } else if (!map[pid].children) {
                map[pid].children = [];
            }
            map[pid].children.push(map[id]);
        }
    }
    return res;
}

// 树状结构转扁平数组
function treeToArray(tree) {
    const res = [];
    for(let itemRoot of tree) {
        const draft = traverse(itemRoot);
        res.push(...draft);
    }
    return res;
}

function traverse(root) {
    const res = [{ id: root.id, pid: root.pid }];
    if (!root.children) return res;

    root.children.forEach(itemRoot => {
        const draft = traverse(itemRoot);
        res.push(...draft);
    });
    return res;
}


// call
Function.prototype.myCall = function(context, ...args) {
    const curContext = context || window;
    const fn = Symbol(curContext);
    context[fn] = this;

    const res = context[fn](...args);
    delete context[fn];
    return res;
}


// apply
Function.prototype.myApply = function(context, args=[]) {
    const curContext = context || window;
    const fn = Symbol(curContext);
    context[fn] = this;
    const res = context[fn](...args);
    delete context[fn];
    return res;
}

// bind
Function.prototype.myBind = function(context, ...args) {
    return (...otherArgs) => {
        return this.apply(context, args.concat(otherArgs));
    }
}



module.exports = {
    objectCreate,
    myInstance,
    myNew,
    myNewTwo,
    EventEmmiter,
    arrToTree,
    treeToArray,
}