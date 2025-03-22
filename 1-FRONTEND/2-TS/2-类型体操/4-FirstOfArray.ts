// 1
// 实现 第一个元素

// 题目
// 实现一个通用First<T>，它接受一个数组T并返回它的第一个元素的类型。

// 详见
// - https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/README.zh-CN.md

// 实现
// 1. infer 关键字，表示 ( 待推断的类型 )
// 2. 以下表示: 如果 T 满足是一个数组，那么就返回 F，即第一个元素；否则返回never
type First<T extends any[]> = T extends [infer F, ...any] ? F : never;

type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3
