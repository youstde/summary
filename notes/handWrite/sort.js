// 冒泡排序
// 冒泡是将大的数据冒泡到最上层（最后）
function bubbleSort(arr) {
    for(let i = 0; i < arr.length; i++) {
        let flag = true;
        for(let j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                flag = false;
            }
        }
        if (flag) break;
    }
    return arr;
}

// 选择排序
// 选择是将小的数据放到左边
function selectSort(arr) {
    for(let i = 0; i < arr.length; i++) {
        let min = i;
        for(let j = i + 1; j < arr.length; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        [arr[min], arr[i]] = [arr[i], arr[min]];
    }
    return arr;
}

// 插入排序
// 就像打牌起牌的过程
function insertSort(arr) {
    for(let i = 1; i < arr.length; i++) {
        let j = i;
        // 刚起到的一张牌，我先放在牌尾，然后向前一张一张的对比，最后插入正确的位置
        const target = arr[j];
        while(j >= 0 && arr[j - 1] > target) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = target;
    }
    return arr;
}

// 希尔排序（插入排序的优化版本）

// 归并排序

// 快速排序
function fastSort(arr) {
     partition(arr, 0, arr.length - 1);
     return arr;
}

function partition(nums, start, end) {
    if (start >= end) return;
    const temp = nums[start];
    let left = start;
    let right = end;
    while(left < right) {
        while(left < right && nums[right] > temp) {
            right--;
        }
        if (left < right) {
            nums[left] = nums[right];
            left++;
        }
        while(left < right && nums[left] < temp) {
            left++;
        }
        if (left < right) {
            nums[right] = nums[left];
            right--;
        }
    }
    nums[left] = temp;
    partition(nums, start, left - 1);
    partition(nums, left + 1, end);
}

// 归并排序
function mergeSort(arr) {
    const draft = [];
    mergePartition(arr, 0, arr.length - 1, draft);
    return arr;
}

function mergePartition(arr, start, end) {
    const mid = parseInt(start + (end - start) / 2);
    mergePartition(arr, start, mid - 1);
    mergePartition(arr, mid, end);
    merge(arr, start, mid, end);
}

function merge(nums, start, mid, end, draft) {
    for(let i = start; i <= end; i++) {
        draft[i] = nums[i];
    }

    let p1 = start;
    let p2 = mid + 1;
    for(let i = start; i <= end; i++) {
        if (p1 > mid) {
            nums[i] = draft[p2];
            p2++;
            continue;
        }
        if (p2 > end) {
            nums[i] = draft[p1];
            p1++;
            continue;
        }
        if (draft[p1] < draft[p2]) {
            nums[i] = draft[p1];
            p1++;
            continue;
        }
        if (draft[p1] >= draft[p2]) {
            nums[i] = draft[p2];
            p2++;
        }
    }
}

// 希尔排序

module.exports = {
    bubbleSort,
    selectSort,
    insertSort,
    fastSort,
}