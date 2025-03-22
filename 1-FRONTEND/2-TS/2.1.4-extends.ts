// extends
// 1.继承(用于interface表示继承)
// 2.表示条件类型，可用于条件判断

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// 1
// 继承(用于interface表示继承)
interface IExtended1 {
  name: string;
}
interface IExtended2 {
  age: number;
  name: string; // IExtended3 不报错，因为 interface 存在 声明合并，1.非函数成员-同名属性类型必须一样，不一样会报错 2.函数成员为-函数重载
  // name: number; // IExtended3 报错
}
interface IExtended3 extends IExtended1, IExtended2 {
  sex: "male" | "female";
}

// 使用
const instanceExtended: IExtended3 = {
  name: "",
  age: 1,
  sex: "male",
  address: "", // 报错 Object literal may only specify known properties, and 'address' does not exist in type 'IExtended3'
};

// 交叉类型
const instanceExtended2: IExtended1 & IExtended2 & IExtended3 = {
  // 所以: type虽然不能 extends，但是可以通过 & 交叉类型的方式达到相同的效果 !!!!!!!
  name: "",
  age: 1,
  sex: "male",
};
type IExtended4 = IExtended1 & IExtended2 & IExtended3;
const instanceExtended3: IExtended4 = {
  // 所以: typ 虽然不能extends，但是可以通过 & 交叉类型的方式达到相同的效果 !!!!!!!
  name: "",
  age: 1,
  sex: "male",
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// 2
// 表示条件类型，可用于条件判断
type A1 = "x" extends "x" ? 1 : 2; // type A1 = 1
type A2 = "x" | "y" extends "x" ? 1 : 2; // type A2 = 2
type A4 = "x" extends "x" | "y" ? 1 : 2; // type A4 = 1

// 特例 特例 特例
// 3 说明了原因
type P<T> = T extends "x" ? 1 : 2;
type A3 = P<"x" | "y">; // type A3 = 1 | 2

// 3
// 扩展
// 问题: A2 和 A3 有什么区别 ？
// 回答: 如果 extends 前面的类型是 ( 范型 ，并且范型的类型是 联合类型 时 )，则会依次判断该联合类型的所有子类型是否可分配给extends后面的类型 ( 是一个分发便利的过程 )
// 资料: https://juejin.cn/post/6994102811218673700

// 4
// 扩展
// 类型的可赋值性
// 1
// interface
// 父类型 ----------------------- 父类型更加宽泛
interface IBrandA {
  name: string;
}
// 子类型 ----------------------- 子类型更加具体
interface IBrandB extends IBrandA {
  established: number;
}
let lAA: IBrandA = { name: "" };
let lBB2: IBrandB = { established: 0 }; // 报错 Property 'name' is missing in type '{ established: number; }' but required in type 'IBrandB'.
let lBB: IBrandB = { name: "", established: 0 };
lAA = lBB; // 可以赋值
lBB = lAA; // 报错，不能赋值

// 2
// 联合类型
type TEnum11 = 1 | 2 | 3;
type TEnum22 = 2 | 3;
let lCC: TEnum11 = 1;
let lDD: TEnum22 = 2;
lCC = lDD;
lDD = lCC;
