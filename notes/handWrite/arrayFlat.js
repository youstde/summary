var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
//输出：[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

// 简单快捷方式：
// const result = Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b);

