// 泛型 - 工具类型
// - 详见: 本项目/2-FRONTEND/2-TS/_README.md/ # (二) 范型工具类型
// - 在线运行: https://www.typescriptlang.org/zh/play

// Record
// -
// Partial
// Required
// -
// Pick
// Omit
// Exclude
// -
// Parameters
// ReturnType
// -
// Readonly
// ReadonlyArray
// -
// Awaited
// -
// Uppercase
// Lowercase
// -
// InstanceType

type Color1 = "red" | "yellow" | "blue";
interface Color2 {
  red: string;
  yellow: string;
  blue: number;
}

// enumeration 枚举 n
// - 枚举可以作为 ( 类型 )，也可以作为 ( 值 )
// - 数字枚举，存在反向映射
// - 注意点: 如果是 常量枚举，就不存在数字反向映射，详见 3
// - 在线运行: https://www.typescriptlang.org/zh/play
enum color3 {
  one = 1,
  two,
  three,
}
type color4 = [number, string, symbol];

// ------- ------- ------- ------- ------- ------- ------- -------
// 1
// Record
// - 用于将 ( 一种类型属性 - 最终是联合类型 ) 映射到 ( 另一种类型 )
// - Record 的实现详见: 本项目/2-FRONTEND/2-TS/_README.md
// - record 记录 记载 v
// -- keyof 是 索引类型查询 操作符， 返回 T 上已知的公共属性名的 联合类型
// -- T[K] 是 索引访问 操作符，Color2["red"] = string
type TR1 = Record<Color1, boolean>; // -------------------------- 鼠标 hover 查看具体的类型
type TR2 = Record<keyof Color2, boolean>; // -------------------- keyof 索引类型查询 操作符 ------- 返回一个 ( 联合类型 )
type TR3 = Record<keyof Color2, Color2["red"]>; // -------------- Color2["red"] 索引访问 操作符
type TR3333 = Record<keyof Color2, Color2["red" | "blue"]>; // >> type TRecord33 = { red: string | number; ... ... }
type TR34 = Record<keyof TR3333, number>; //--------------------- type TRecord34 = { red: number; yellow: number; blue: number; }
type TR4 = Record<Color1, Color2>;
type TR5 = Record<string, any>; // ------------------------------ key是string类型，value是any类型
type TR6 = Record<keyof any, any>; // --------------------------- key 是string | number | symbol，value是any类型
type TR7777 = keyof any; // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 相当于 type TR7777 = string | number | symbol
type TR7 = Record<"a" | "b", boolean>;
// --- 分割线 ---
type TR8888 = Record<keyof typeof color3, string>; // >>>>>>>>>>> 相当于 type TRecord7 = { one: string; two: string; three: string; }
type TR9999 = Record<`${color3}`, string>; // >>>>>>>>>>>>>>>>>>> 相当于 type TRecord8 = { 1: string; 2: string; 3: string; }
type TR8 = keyof typeof color3; // ------------------------------ 枚举的[key] ---- 相当于 type R7 = "one" | "two" | "three"
type TR9 = `${color3}`; // -------------------------------------- 枚举的[value] -- 相当于 type R8 = "1" | "2" | "3"
// --- 分割线 ---
type TRecord9 = Record<color4[number], string>;
// --- 分割线 ---
const record1: TR1 = { red: true, yellow: true, blue: false };
const record2: TR2 = { red: true, yellow: true, blue: false };
const record3: TR3 = { red: "", yellow: "", blue: "" };
const record5: TR5 = { name: "woow_wu7", age: 20 };
const record6: TR6 = { name: "woow_wu7", age: 20, 10: "number" };
const record4: TR4 = {
  red: { red: "", yellow: "", blue: 1 },
  yellow: { red: "", yellow: "", blue: 1 },
  blue: { red: "", yellow: "", blue: 1 },
};

// ------- ------- ------- ------- ------- ------- ------- ------- Partial 和 Required 相反
// 2
// Partial
// -- 将 ( 类型 ) 定义的 ( 所有属性 ) 都修改为 ( 可选的 )
// -- partial 部分的 不完整的 adj
// -- part 部分 n
type TPartial1 = Partial<Color2>;
type TPartial2 = Partial<Record<"a" | "b", boolean>>;
const partial1: TPartial1 = {
  red: undefined, // red 可以是 string 或 undefined，并且可选，即可以没有该属性
  // yellow: "", 可选了，即可以没有 yellow 和 red 属性
};
const partial2: TPartial2 = {
  // a: true,
  // b: false,
  // c: true, // a 和 b 属性可选，但是不能超过a和b的范围，即一个新属性 c 就会报错
};

// ------- ------- ------- ------- ------- ------- ------- ------- Required 和 Partial 相反
// 3
// Required
// -- 将 ( 类型 ) 定义的 ( 所有属性 ) 都修改为 ( 必传 ) 属性
// ---- require 要求 需求 依靠 依赖 v
// ---- required 必须的 adj
type TRequired = Required<ColorPartial>;
interface ColorPartial {
  a?: number;
  b?: string;
  c: string;
}
const tr: TRequired = { a: 1, b: "2", c: "3" };

// ------- ------- ------- ------- ------- ------- ------- ------- Pick 和 Omit 刚好相反
// 4
// Pick
// - 从类型定义的属性中，选取 ( 指定一组的属性 )，返回一个 ( 新的类型定义 )
// - 从字面意思也能知道是 ( 摘取 部分属性 )
// - 注意区分 Pick 和 Omit 和 Exclude 的区别
// pick 选择 挑选 摘
// TIPS: Pay attention to the pronunciation of the word 'record'.
type TPick1 = Pick<Color2, "red">;
type TPick2 = Pick<Color2, "red" | "yellow">; // ------------------ Pick<> 的第二个参数可以是 联合类型
type TPick3 = Pick<Record<"a" | "b", number>, "b">;
type TPick4 = Pick<Record<"a" | "b" | "c", string>, "a" | "c">;
type TPick5 = Pick<Record<keyof Color2, number>, "red">;
type TPick6 = Pick<Record<keyof typeof color3, string>, "one" | "two">; // 相当于 type TPick6 = { one: string; two: string; }
// --- 分割线 ---
const pick1: TPick1 = {
  red: "", // 从 Color2 中选取 red 属性
  // yellow: ''// 报错，不能将类型“{ red: string; yellow: string; }”分配给类型“Pick<Color2, "red">”。对象字面量只能指定已知属性，并且“yellow”不在类型“Pick<Color2, "red">”中
};
const pick2: TPick2 = { red: "", yellow: "" }; // 从 Color2 中选取 red 和 yellow 属性
const pick3: TPick3 = { b: 1 };
const pick4: TPick4 = { a: "", c: "" };
const pick5: TPick5 = { red: 1 };

// ------- ------- ------- ------- ------- ------- ------- ------- Omit 和 Pick 刚好相反
// 5
// Omit
// - ( 忽略 ) 某个属性
// - 注意区分 Pick 和 Omit 和 Exclude 的区别
// -
// omit 省略 忽略 v
// ellipsis 省略 n
//【 omit a word. 省略一个词语 】
// TIPS: Pay attention to the pronunciation of the word 'omit'.
// -
type TOmit1 = Omit<Color2, "red">; // 排除掉 "red" 属性
type TOmit2 = Omit<Record<"a" | "b" | "c", boolean>, "a" | "b">;
const omit1: TOmit1 = { yellow: "", blue: 2 }; // 忽略 red 属性，则只剩下 yellow 属性
const omit2: TOmit2 = { c: true };

// ------- ------- ------- ------- ------- ------- ------- ------- Exclude
// 6
// Exclude
// - Exclude 就是将前面类型的与后面类型对比，( 过滤出 前面独有的属性 )
// - 注意区分 Pick 和 Omit 和 Exclude 的区别
// - exclude 排除 v
type Exclude1 = Exclude<"a" | "1" | "2", "a" | "y" | "z">;
type Exclude2 = Exclude<"a" | "1" | "2", "a" | "1" | "y">;
const exclude1: Exclude1 = "1"; // str 的类型是 "1" | "2"，即从前面中去除后面中有的属性
const exclude2: Exclude2 = "2"; // str 的类型是 "1" | "2"，即从前面中去除后面中有的属性

// ------- ------- ------- ------- ------- ------- ------- ------- Readonly
// 7
// Readonly
// - 将类型 T 中包含的属性设置为readonly，并返回一个新类型
// - ( ReadOnly ) 达到的效果 和 ( as const 断言一样 )

// 1
// 扩展
// 除了使用 Readonly<Color2>能做到只读外，也可以直接设置 interface Color2 { readonly red: string; }

// 扩展
// 2
// 在 Typescript 中有哪些方法可以是一个 值 变成 常量，或者说不可修改
// - Readonly 工具类型
// - as const 常量断言
// - interface 和 class 中有 readonly 属性
// 2.1
// interface IName { name: string; }
// Type TC = Readonly(IName)
// 2.2
// const arr = [1, 3] as const;
// 2.3
// interface IA { readonly name: string; }
// class CA { readonly name: string = ''; }

const readonly1: Readonly<Color2> = {
  red: "",
  yellow: "",
  blue: 1,
};
readonly1.red = "11"; // 不能修改，只读，这里报错

// ------- ------- ------- ------- ------- ------- ------- ------- ReadonlyArray
// 8
// ReadonlyArray
// 8.1
type TReadonlyArray = ReadonlyArray<any>;
const readonlyArr: TReadonlyArray = ["1", 1];
readonlyArr[0] = "11"; // 报错，类型“TReadonlyArray”中的索引签名仅允许读取。
// 8.2
// 在React的useEffect函数签名中
// function useEffect(effect: EffectCallback, deps?: DependencyList): void
//   - type EffectCallback = () => (void | (() => void | undefined))
//   - type DependencyList = ReadonlyArray<any>
// 8.3
function foo1(arr: ReadonlyArray<string>) {
  arr.slice(); // okay
  arr.push("hello!"); // error!，只读
}
// 在最新的 typescript3.4 版本中可以使用下面的写法
function foo2(arr: readonly string[]) {
  arr.slice(); // okay
  arr.push("hello!"); // error! 只读
}
function foo3(arr: readonly string) {
  // 报错，仅允许对数组和元组字面量类型使用 "readonly" 类型修饰符。ts(1354)
}

// ------- ------- ------- ------- ------- ------- ------- ------- Parameters
// 9
// Parameters
// ---- parameter 参数 -- 形参
// ---- argument 参数 --- 实参
type TP1 = Parameters<typeof fn8>;
type TP2 = Parameters<typeof fn88>;
function fn8(arg: { a: number; b: string }): void {} // ---------- 相当于 type TP1 = [ arg: { a: number; b: string; } ];
function fn88(a: number, b: string): void {} // ------------------ 相当于 type TP2 = [a: number, b: string]

// ------- ------- ------- ------- ------- ------- ------- ------- ReturnType
// 10
// ReturnType
function fn9(s: string) {
  return { a: 1, b: s };
}
type T2222 = ReturnType<<T>() => T>; // >>>>>>>>>>>>>>>>>>>>>>>>>> 相当于 type T2222 = unknown
type T14 = ReturnType<typeof fn9>; // ---------------------------- { a: number, b: string }
type T10 = ReturnType<() => string>; // -------------------------- string -- 这里传入的是 函数签名，即传入是 函数的类型
type T2 = ReturnType<(s: string) => number[]>; // ---------------- number[]
type T11 = ReturnType<(s: string) => void>; // ------------------- void
type T13 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
type T15 = ReturnType<any>; // any
type T16 = ReturnType<never>; // any
type T17 = ReturnType<string>; // Error
type T18 = ReturnType<Function>; // Error

// ------- ------- ------- ------- ------- ------- ------- ------- Awaited
// 11
// Awaited
type AAA1 = Awaited<Promise<string>>; // string
type AAA2 = Awaited<Promise<Promise<number>>>; // number - 不管嵌套有多深，都可以得到 参数类型
type AAA3 = Awaited<boolean | Promise<number>>; //  number | boolean

// ------- ------- ------- ------- ------- ------- ------- ------- InstanceType
// 12
// InstanceType
class Fn1 {}
type TInstance = InstanceType<typeof Fn1>; // 相当于 type TInstance = Fn
type TInstance2 = InstanceType<any>; // any
type TInstance3 = InstanceType<never>; // any
type TInstance4 = InstanceType<string>; // Error
type TInstance5 = InstanceType<Function>; // Error

// 13
// Uppercase
// Lowercase
type Name = "woow_wu7";
type UpperName = Uppercase<Name>; // 相当于 type UpperName = "WOOW_WU7"

// 14
// NonNullable
// 去除 null 和 undefined 类型
type T0 = NonNullable<string | number | undefined>; // type T0 = string | number
type T1 = NonNullable<string[] | null | undefined>; // type T1 = string[]
