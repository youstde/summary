const sort = require('../sort');

const { bubbleSort, selectSort, insertSort } = sort;

const arr = [6, 2, 1, 7, 3, 9, 5, 8, 4];
const sortedArr = arr.sort((a, b) => a - b);

describe('sort', () => {
    test(('bubbleSort'), () => {
        expect(bubbleSort(arr)).toEqual(sortedArr);
    });

    test(('selectSort'), () => {
        expect(selectSort(arr)).toEqual(sortedArr);
    });

    test(('insertSort'), () => {
        expect(insertSort(arr)).toEqual(sortedArr);
    });
});