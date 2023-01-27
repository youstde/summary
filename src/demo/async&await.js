
function HaveResolvePromise(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(100);
          }, 0);
      });
}
async function getResult() {
    console.log(1);
    let a = await HaveResolvePromise();
    console.log(a);
    console.log(2);
}
console.log(0);
const pro = getResult();
console.log('pro', pro);
pro.then(res => {
    console.log('res', res);
})
console.log(3);