
// 23. 合并K个升序链表
var mergeKLists = function(lists) {
    if (!lists.length) return null;
    return split(lists, 0, lists.length - 1);
};

var split = function(lists, start, end) {
    if (start === end) return lists[start];

    const mid = parseInt(start + (end - start) / 2);
    const left = split(lists, start, mid);
    const right = split(lists, mid + 1, end);
    return merge(left, right);
}

var merge = function(left, right) {
    const resNode = new ListNode();
    let p1 = left;
    let p2 = right;
    let p = resNode;

    while(p1 !== null &&  p2 !== null) {
        if(p1.val < p2.val) {
            p.next = p1;
            p1 = p1.next;
        } else {
            p.next = p2;
            p2 = p2.next;
        }
        p = p.next;
    }
    if (p1 === null && p2 !== null) {
        p.next = p2;
    }
    if (p1 !== null && p2 === null) {
        p.next = p1;
    }
    return resNode;
}

// 扁平数组转树形结构
function arrToTree(arr) {
    const map = {};
    const res = [];
    for(let i = 0; i < data.length; i++) {
        const item = data[i];
        if (map[item.id]) {
            map[item.id] = {...map[item.id], ...item};
        } else {
            map[item.id] = {...item};
        }
        if (item.pid === 'root') {
            res.push(map[item.id]);
        } else {
            if (map[item.pid]) {
                if (!map[item.pid].children) {
                    map[item.pid].children = [];
                }
            } else {
                map[item.pid] = {
                    children: []
                }
            }
            map[item.pid].children.push(map[item.id]);
        }
    }
    return res;
}

const data = [
    { id: 'node-1', pid: 'root' },
    { id: 'node-2', pid: 'root' },
    { id: 'node-3', pid: 'node-2' },
    { id: 'node-4', pid: 'node-2' },
    { id: 'node-5', pid: 'node-4' },
];

console.log(arrToTree(data));

function myNew(constructor, params) {
    const obj = Object.create(constructor.prototype);
    constructor.call(obj, params);
    return obj;
}

function ObjectCreate(prototype) {
    function F() {}

    F.prototype = prototype;
    const obj = new F();
    if (prototype === null) {
        obj.__proto__ = null;
    }

    return obj;
}


Function.prototype.call = function(context, ...args) {
    const curContext = context || window;
    const fn = Symbol(curContext);
    curContext[fn] = this;
    const res = curContext[fn](...args);
    delete curContext[fn];
    return res;
}


// 节流
function throttle(fn, delay) {
    var timer = null;
    return function() {
        const args = arguments;
        if (timer) return;
        timer = setTimeout(() => {
            fn(args);
            timer = null;
        }, delay);
    }
}