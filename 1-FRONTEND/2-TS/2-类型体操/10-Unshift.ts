// 1
// 实现 Unshift

// 题目
// Implement the type version of Array.unshift

// 详见
// - https://github.com/type-challenges/type-challenges/blob/main/questions/03057-easy-push/README.zh-CN.md

type Unshift<T extends any[], U> = [...T, U];

type Result33 = Unshift<[1, 2], 0>; // [0, 1, 2,]
