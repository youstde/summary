// 手写一个 iterator
function createIterator(items) {
    let index = 0;
    return {
        next() {
            const done = index >= items.length;
            const val = items[index] || undefined;
            index++;
            return {
                done,
                value: val
            }
        }
    }
}

// const iterable = createIterator('12345');
// let one = iterable.next();
// console.log(one.value); // 1
// one = iterable.next();
// console.log(one.value); // 2
// one = iterable.next();
// console.log(one.value); // 3
// one = iterable.next();
// console.log(one.value); // 4
// one = iterable.next();
// console.log(one.value); // 5
// one = iterable.next();
// console.log(one.value); // undefined


// for of 遍历的是 obj[Symbol.iterator(一特ruai特)] 这个属性
// 自己实现一个for of
function myForOf(obj) {
    let iterable, result;
    if (typeof obj[Symbol.iterator] !== 'function') {
        throw new Error('params is not iterable');
    }

    iterable = obj[Symbol.iterator]();
    result = iterable.next();

    while(!result.done) {
        console.log(result.value);
        result = iterable.next();
    }
}

// myForOf([1, 2, 3, 4]);

// =================================================================
// forEach
// forEach中使用return并不能跳出循环，只能结束当前循环，进入下一次循环
var a = [1, 2, 3, 4];
// a.forEach(it => {
//     if (it === 2) return;
//     console.log(it); // 1 3 4
// });
// every some for循环都可以跳出循环
// 每一个都要满足
const res = a.every(it => {
    return it >= 1;
});

// 只要有一个满足就行
const res2 = a.some(it => {
    if (it > 4) return true;
    return false;
});

function forReturnFn() {
    for(let i = 0; i < 4; i++) {
        if (i === 2) return 123;
        console.log(i);
    }
}
console.log(forReturnFn()); // 123; 

for(let i = 0; i < 4; i++) {
    if (i === 2) break; // 如果不是在function中是不能用return的
    console.log(i);
}

// console.log(res);
// console.log(res2);

// ===================================================================
