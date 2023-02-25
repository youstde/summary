
## Promise 与微任务
[原文链接🔗](https://zhuanlan.zhihu.com/p/449183802)

这是一个关于Promise 微任务的题目，猜猜以下代码输出是什么？为什么？
```js
let p1 = Promise.resolve()
  .then(function f1(v) { console.log(1) })
  .then(function f2(v) { console.log(2) })
  .then(function f3(v) { console.log(3) })
 
p1.then(function f4(v) { console.log(4) })
p1.then(function f5(v) { console.log(5) })

let p2 = Promise.resolve()
  .then(function f11(v) { console.log(11) })
  .then(function f22(v) { console.log(22) })
  .then(function f33(v) { console.log(33) })
 
p2.then(function f44(v) { console.log(44) })
p2.then(function f55(v) { console.log(55) })
```

---
- 有的小伙伴会认为输出的结果是 1, 2, 3, 4, 5, 11, 22, 33, 44, 55。其理论依据是“Promise的then属于微任务，代码在执行的时候，遇到.then(fn)， 会把fn加入到微任务队列”，所以这些then里的回调函数被依次加入微任务队列，到执行队列任务时就会依次输出。

- 有的小伙伴会认为输出的结果是 1、11、2、22、3、33、4、44、5、55。理由是“Promise的then属于微任务，但只有当前一个Promise对象的resolve，才会触发让其后的.then(fn)中的fn加入微任务队列”。所以一开始微任务队列是[f1, f11]， 执行f1时(return的是undefined，)导致当前promise对象resovle(undefined)，从而把f2加微任务队列[f11, f2]，f11执行时同样把f22加任务队列[f2, f22]，一次轮流执行。

两种说法都没问题，问题在于不够严谨，不能描述当前这个例子，导致得出错误的推断结果。更严谨的说法是：

**对于一处于pending状态的Promise对象p，内部状态的resolve，会让p.then(fn)中的fn加入微任务队列**

```js
//code 1
let p = new Promise(function f1(resolve) {
  setTimeout(function f2(){ 
    resolve(2) 
    console.log(1)
  }, 1000)
})
p.then(function f3(v) { console.log(v) })
```

在上例中，f1是同步执行的代码，在执行时创建一个定时器（f2会加入宏队列），之后执行 p.then，此时 f3并没有立即加入微任务队列。 1秒后 f2执行时，运行 resolve(1)，此时才触发f3加微任务队列。 详细的流程是

- 运行同步代码f1，创建定时器，初始化p.then

- 1秒之后，f2加入宏队列。此时宏队列：[f2]， 微队列: []。

- 先扫描微队列（为空），再扫描宏队列（拿出一个任务f2），运行f2。遇到resolve，触发把之前p.then(f3)的f3移入微任务队列，之后输出1。此时宏队列：[]， 微队列: [f3]。

- 扫码微队列，依次拿出并运行全部任务，执行f3输出2。

- 所以最输出结果是1秒之后立即依次出现 1、2

```js
//code 2
let p1 = new Promise(function f1(resolve1) {
  setTimeout(resolve1)
})
let p2 = p1.then(function f2(v) { console.log(2) })
let p3 = p2.then(function f3(v) { console.log(3) })

let p11 = new Promise(function f11(resolve2) {
  setTimeout(resolve2)
})
let p22 = p11.then(function f22(v) { console.log(22) })
let p33 = p22.then(function f33(v) { console.log(33) })
```
对于Promise我们需要知道，链式调用.then之后会返回一个新的Promise对象。以上代码的执行流程是

- 先执行同步的代码。运行f1，立即得到一个pending状态的Promise对象p1（f1里面的resolve1函数被加入宏任务，还没开始执行）。运行p1.then得到一个pending状态的Promise对象p2。... ，同理得到一个pending状态的Promise对象p33。此时宏队列里有[resolve1, resolve2]。

- 因微队列目前为空，所以扫描宏队列，拿出resolve1运行，导致p1被resolve（从pending变成fulfilled），从而导致p1.then(f2)中的f2被加入微队列。此时宏队列[resolve2]，微队列[f2]。
扫描全部微任务，拿出f2运行，输出2。f2运行结束（函数结束或者遇到return）时，触发p2内部状态的变化（p2从pending变成fulfilled），导致p2.then(f3)中的f3加入微任务队列。此时宏队列[resolve2]，微队列[f3]。微任务队列不为空，拿出f3，运行输出3，此时p3变成fulfilled状态。微队列为[]。

- 扫描下一个宏任务，拿出resolve2，运行，导致p11被resolve，从而导致p11.then(f22)中的f22被加入微队列。此时宏队列[]，微队列[f22]。

- 扫描全部微任务，拿出f22运行，输出22。f22运行结束时，触发p22从pending变成fulfilled，导致p22.then(f33)中的f33加入微任务队列。此时宏队列[]，微队列[f33]。微任务队列还未扫描完，拿出f33，运行输出33，此时p33变成fulfilled状态。微队列为[]。

最终输出顺序为 2、3、22、33。以上代码等价于常见链式写法
```js
new Promise( resolve => setTimeout(resolve) )
  .then( v => console.log(2) )
  .then( v => console.log(3) )

new Promise( resolve => setTimeout(resolve) )
  .then( v => console.log(22) )
  .then( v => console.log(33) )
```

此时一切还符合我们的预期。再看下一条规则：
**对于一处于fulfilled状态的Promise对象p，p.then(fn)会立即让fn加入微任务队列**

```js
// code 3
let p1 = Promise.resolve(1)
let p2 = p1.then(function f2() {
  console.log(2)
})
let p3 = p2.then(function f3() {
  console.log(3)
})

let p11 = new Promise(function f11(resolve) {
  resolve(11)
})
let p22 = p11.then(function f22() {
  console.log(22)
})
let p33 = p22.then(function f33() {
  console.log(33)
})
```

看起来和 code 2 代码类似，在实际执行的时候会发现得到截然不同的结果。分析一下具体执行流程：
- 先执行同步代码。
    1. p1 = Promise.resolve()。创建一个Promise对象p1，其内部状态为 fulfilled。
    2. p2 = p1.then(f2) 。对于一处于fulfilled状态的Promise对象p1，会立即让f2加入微任务队列（f2并未执行），创建的p2是pending状态。此刻微队列为[f2]
    3. p3 = p2.then(f3)。对于一处于pending状态的Promise对象p2，内部resolve才会让f3加入微队列（因为p2还没resolve，所以f3还没加微队列）。
    4. p11 =new Promise(functionf11(resolve){ resolve(11) })。 创建一个Promise对象p11，内部状态为fulfilled
    5. p22 = p11.then(f22)。对于一处于fulfilled状态的Promise对象p11，会立即让f22加入微任务队列，创建的p22是pending状态。此刻微队列是[f2, f22]
    6. p33 = p22.then(f33)。对于一处于pending状态的Promise对象p22，内部resolve才会让f33加入微队列（因为p22还没fulfilled，所以f33还没加微队列）。
- 扫描微任务队列
    1. 拿出f2，运行输出2。f2执行完时（函数结束或者遇到turn），p2被resolve（变成fulfilled状态），触发f3加入微队列。此刻微队列为[f22, f3]
    2. 拿出f22，运行输出22。f22执行完时，p22被resolve，触发f33加入微队列。此刻微队列为[f3, f33]
    3. 拿出f3，运行输出3。f3执行完，p3变成fulfilled状态。
    4. 拿出f33，运行输出33。f33执行完，p33变成fulfilled状态。

最终输出结果为 2、22、3、33。以上代码等价于常见链式写法
```js
// code 4
Promise.resolve(1)
  .then(() => console.log(2))
  .then(() => console.log(3))

new Promise(resolve => resolve())
  .then(() => console.log(22))
  .then(() => console.log(33))
```

**最后**

回到开头的例子
```js
let p1 = Promise.resolve()     //1
  .then(function f1(v) { console.log(1) })  //2
  .then(function f2(v) { console.log(2) })  //3
  .then(function f3(v) { console.log(3) })  //4
  
p1.then(function f4(v) { console.log(4) })   //5
p1.then(function f5(v) { console.log(5) })   //6 

let p2 = Promise.resolve()            //7
  .then(function f11(v) { console.log(11) })  //8
  .then(function f22(v) { console.log(22) })  //9
  .then(function f33(v) { console.log(33) })  //10
 
p2.then(function f44(v) { console.log(44) })  //11
p2.then(function f55(v) { console.log(55) })  //12

```

p1是第4行then得到的Promise对象， p2是第10行then得到的对象。一开始，代码按照code4 的逻辑执行。依次输出 1、11、2、22、3（运行f3）、33（运行f33）。当运行到f3后，p1 被resolve，导致f4、f5被同时加入微队列。当运行到f33时，p2被resolve，导致f44、f55被同时加入微队列。最后微队列里为[f4, f5, f44, f55]，所以最后依次输出4、5、44、55

到目前为止，你应该真正理解了宏任务、微任务、以及Promise。
