// 1
// 实现 Tuple to Object

// 题目
// 传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。

// 详见
// - https://github.com/type-challenges/type-challenges/blob/main/questions/00011-easy-tuple-to-object/README.zh-CN.md

// 前置知识
// - 1. 获取 ( 数组 ) 的类型
// - 2. 获取 ( 元组 ) 的类型
type TArr1 = string[];
type TArr2 = [number, boolean, undefined];
type a = TArr1[number]; // 相当于: type a = string
type b = TArr2[number]; // 相当于: type b = number | boolean | undefined

// 实现
// 1. T[number] 获取 数组 或 元组 的类型 --- 返回的是 联合类型
type TupleToObject<T extends readonly any[]> = {
  [Key in T[number]]: Key;
};

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type TTuple = typeof tuple;

type result = TupleToObject<typeof tuple>;
// expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
