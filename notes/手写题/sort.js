// 冒泡排序
function bubbleSort(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// 测试用例
const bubbleSortArr = [6, 2, 1, 7, 3, 9, 5, 8, 4];
console.log(bubbleSort(bubbleSortArr));