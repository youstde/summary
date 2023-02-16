function forOf(items) {
    if (typeof items[Symbol.iterator] !== 'function') {
        throw new Error('不支持迭代器模式');
    }

    const iterable = items[Symbol.iterator]();
    let next = iterable.next();
    while(!next.done) {
        console.log(next.value);
        next = iterable.next();
    }
}

// forOf([1,2,3,4,5]);
// forOf({ 0: 1, 1: 2, 2: 3 })


function iterator(items) {
    let index = 0;
    return {
        next() {
            const done = items.length === index;
            value = items[index];
            index++;
            return {
                value,
                done,
            }
        }
    }
}

// const iterable = iterator([1, 2, 3, 4]);
// console.log(iterable.next().value);
// console.log(iterable.next().value);

const map = new Map();
map.set('a', true);
map.set('b', false);
map.set('c', true);

const mapIterable = map.keys();
console.log(mapIterable.next().value);
console.log(mapIterable.next().value);
