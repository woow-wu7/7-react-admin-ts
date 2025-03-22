// 1
// 实现 If

// 题目
// 实现一个 IF 类型，它接收一个条件类型 C ，一个判断为真时的返回类型 T ，以及一个判断为假时的返回类型 F。
// C 只能是 true 或者 false， T 和 F 可以是任意类型。

// 详见
// - https://github.com/type-challenges/type-challenges/blob/main/questions/00268-easy-if/README.zh-CN.md

// 实现
// 只需要将 C 约束成一种布尔值做判断即可

type If<C, T, F> = C extends true ? T : F;
// type If<C, T, F> = C extends false ? T : T;

type A = If<true, "a", "b">; // expected to be 'a'
type B = If<false, "a", "b">; // expected to be 'b'
