// infer
// - infer: 推断 推理 v
// - refer: 参考 v
// - prefer: 更喜欢 v
// - defer: 推迟 v
// -【 refer fo. 参考 v 】
// - TIPS: Pay attention to the pronunciation of the word 'infer'. [infer-推断-v]

// 1
// type ParamType<T> = T extends (arg: infer P) => any ? P : T;
// - 表示【参数】: 如果 T 能赋值给 (arg: infer P) => any，则结果是返回 (arg: infer P) => any 类型中的参数 P，否则返回为 T
// - 其中infer表示: infer P 表示待推断的函数参数
type MyParamType<T> = T extends (arg: infer P) => any ? P : T;
interface User {
  name: string;
  age: number;
}
type Func = (user: User) => void;
type Param = MyParamType<Func>; // Param = User
type AA = MyParamType<string>; // AA = string，因为 T 不是 函数，所以返回值类型就直接是 T

// 2
// type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
//  - 表示【返回值】: 如果 T 能赋值给 (...args: any[]) => infer R，即 T满足这样的函数签名，就返回  (函数的返回值类型R )，否则返回 ( any )
//  - 其中infer表示: infer R 表示函数的返回值 类型
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
type func = () => number;
type variable = string;
type funcReturnType = MyReturnType<func>; // funcReturnType 类型为 number，因为T满足是函数，并且满足该函数签名，所以返回值就是 函数的返回值
type varReturnType = MyReturnType<variable>; // varReturnType 类型为 any，T不满足条件，返回any

// 3
// 实现
// 1. infer 关键字，表示 ( 待推断的类型 )
// 2. 以下表示: 如果 T 满足是一个数组，那么就返回 F，即第一个元素；否则返回never
type MyFirst<T extends any[]> = T extends [infer F, ...any] ? F : never;
type arr111 = ["a", "b", "c"];
type arr222 = [3, 2, 1];
type head111 = MyFirst<arr111>; // expected to be 'a'
type head222 = MyFirst<arr222>; // expected to be 3
