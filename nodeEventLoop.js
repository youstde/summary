
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async end');
}

// async function mockAsync1() {
//     console.log('async1 start');
//     new Promise(resolve => {
//         async2();
//         resolve();
//     }).then(res => {
//         console.log('async end');
//     });
// }

async function async2() {
    console.log('async2');
}

console.log('script start.');

setTimeout(() => {
    console.log('setTimeout0');
    setTimeout(() => {

    }, 0);
    setImmediate(() => {
        console.log('setImmediate');
    });
}, 0);

mockAsync1();
process.nextTick(() => {
    console.log('nextTick');
});

new Promise((resolve) => {
    console.log('promise1');
    resolve();
    console.log('promise2');
}).then(() => {
    console.log('promise.then');
});
console.log('script end.');