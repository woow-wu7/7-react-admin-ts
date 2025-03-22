// 1
// 实现 Parameters

// 题目
// 实现内置的 Parameters 类型，而不是直接使用它，可参考TypeScript官方文档。

// 详见
// - https://github.com/type-challenges/type-challenges/blob/main/questions/03312-easy-parameters/README.zh-CN.md

// 实现
// 1. T 满足这样一个函数类型 ( ...any: infer S ) => any，就返回 S，否则返回 any

type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...any: infer S
) => any
  ? S
  : any;

const foo = (arg1: string, arg2: number): void => {};

type FunctionParamsType = MyParameters<typeof foo>; // [arg1: string, arg2: number]
