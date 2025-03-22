// 1
// 实现 Push

// 题目
// 在类型系统里实现通用的 Array.push

// 详见
// - https://github.com/type-challenges/type-challenges/blob/main/questions/03057-easy-push/README.zh-CN.md

type Push<T extends any[], U> = [...T, U];

type Result22 = Push<[1, 2], "3">; // [1, 2, '3']
