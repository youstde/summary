
function bigSum(a, b) {
    let left = a.length - 1;
    let right = b.length - 1;
    let curry = 0;
    let res = '';
    while(left >= 0 || right >= 0) {
        let x = 0;
        let y = 0;
        if (left >= 0) {
            x = a.charAt(left) - '0';
        }
        if (right >= 0) {
            y = b.charAt(right) - '0';
        }
        let sum = x + y + curry;
        if (sum >= 10) {
            sum -= 10;
            curry = 1;
        } else {
            curry = 0;
        }
        res = `${sum}${res}`;
        left--;
        right--;
    }
    if (curry) {
        res = `${curry}${res}`;
    }
    return res;
}

console.log(bigSum('123', '321'));