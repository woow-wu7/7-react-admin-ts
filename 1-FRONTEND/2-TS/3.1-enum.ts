// enumeration
// 枚举
// - 1. 数字枚举的 反向映射
// - 2. 枚举成员 访问 另一个枚举成员
// - 3. 常量枚举
// - 4. 枚举既是 类型 也是 变量值 ( 详见本文件最底部 )
// - in 遍历 枚举类型
// - in 遍历 联合类型
// type People4 = keyof typeof Enu; // 'A' | 'B' ++++++ key
// type People5 = `${Enu}`; // "2" | "3" ++++++++++++++ value

// 1
// 数字枚举 - 反向映射
// - 数字枚举，存在反向映射
// - 注意点: 如果是 常量枚举，就不存在数字反向映射，详见 3
// - 在线运行: https://www.typescriptlang.org/zh/play
enum Enum {
  A = 1, // 不赋值，默认是 0
  B,
  c = 7,
  D,
}
let a = Enum.A; // 1
let nameOfA = Enum[a]; // "A" - 数字枚举的 反向映射
let nameOfA2 = Enum[1]; // "A" - 数字枚举的 反向映射
console.log("nameOfA", nameOfA); // "A"
console.log("nameOfA2", nameOfA2); // "A"

// 1.1
// 非数字枚举，不存在反向映射
// - 反向取值会报错
// - 报错信息如下
//    - Element implicitly has an 'any' type because expression of type '"english"' can't be used to index type 'typeof EClass22'.
//    - Property 'english' does not exist on type 'typeof EClass22'.ts(7053)
enum EClass22 {
  en = "english",
  ch = "chinese",
}
const class22 = EClass22.en;
const class222 = EClass22["english"]; // 报错
console.log("class2", class2);
console.log("class22", class22);

// 2
// 枚举中成员 使用 另一个成员的值
enum Enum2 {
  A = 1,
  B = 2 * A, // B 使用了 A 的值
  C = 3 * B, // C 使用了 B 的值
}
const b = Enum2.B; // 2
const c = Enum2.C; // 6
console.log("b", b); // 2
console.log("c", c); // 6

// 3
// const 枚举
// const enum xxx {...}
// - ( 常量枚举 ) 只能使用 ( 常量枚举表达式 )
// - 特点: 并且不同于常规的枚举它们在 ( 编译阶段会被删除 ) ( 编译阶段会被删除 ) ( 编译阶段会被删除 )
// - 使用场景: 为了避免 ( 在额外生成的代码上的开销 ) 和 ( 额外的非直接的对枚举成员的访问 )，我们可以使用 ( const枚举 )
// - 详见: 1-FRONTEND/2-TS/3.4-enum和const enum.ts
// - 详见: [link](file:///Users/xiawu/work/personal/frontend/8-penetrate/1-FRONTEND/2-TS/3.4-enum和constEnum.ts)

// 4
// [ 枚举类型 ]
// 枚举类型 可以通过 in 关键字来遍历
// in
// - 1. 在 ( 类型 ) 中使用，用来遍历 ( 联合类型 和 枚举类型 )
// - 2. 在 ( 值 ) 中使用，用来判断对象中是否存在某个 key 注意包括 ( 自身属性 ) 和 ( 继承属性 )
// -
// type TT1111 = { [K in keyof typeof ENumber]: boolean; };
// type TT2222 = { [K in `${ENumber}`]: boolean; };
// -
// type People44 = keyof typeof ENumber; // 'AA' | 'BB' ++++++ key
// type People66 = `${ENumber}`; // "2" | "3" ++++++++++++++++ value // 注意: 这里 number 会转成 string
// -
// - 详见: 本项目/2-FRONTEND/2-TS/2-keyof-in-extends-T[K].ts
// - 详见: [link](file:///Users/xiawu/work/personal/frontend/8-penetrate/1-FRONTEND/2-TS/2.1-keyof-in-typeof-extends-T[K].ts)

// 4.1
// in 遍历 枚举类型
// 相当于 type TypePeople2 = { 2: boolean; 3: boolean; }
// ------- 1
// enum Enu {
//   A = 2,
//   B,
// }
type TypePeople2 = {
  [K in Enu]: boolean;
};
// 鼠标 hover 到 TypePeople2 上查看
// 相当于
// type TypePeople2 = {
//   2: boolean;
//   3: boolean;
// }

// ------- 2
// typeof Enu 返回枚举数据的类型
type TypePeople3 = {
  [K in keyof typeof Enu]: boolean;
};

// 4.2
// in 遍历 联合类型
interface People {
  name: string;
  age: number;
}
type TypePeople4 = {
  [K in keyof People]: boolean;
};
type TypePeople5 = {
  [K in keyof People]: K;
};

// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------
// 5 扩展
// in
// - 1. 在 ( 类型 ) 中使用，用来遍历 ( 联合类型 和 枚举类型 )
// - 2. 在 ( 值 ) 中使用，用来判断对象中是否存在某个 key 注意包括 ( 自身属性 ) 和 ( 继承属性 )
enum Enu {
  A = 2,
  B,
}

// 2.1
// in 遍历 枚举类型 ===================================== 枚举中的 value
type People2 = {
  // ------- in 遍历枚举
  [K in Enu]: boolean;
};
// 相当于
// type People2 = {
//   2: boolean;
//   3: boolean;
// }

// 2.2
// in 遍历 联合类型
type People3 = {
  // ------- in 遍历联合类型
  [K in keyof People]: boolean;
};

// 2.3
// 返回的是枚举中的 key =================================== 枚举中的 key
// enum Enu { A = 2, B }
type People4 = keyof typeof Enu; // 'A' | 'B' ++++++ key
type People5 = `${Enu}`; // "2" | "3" ++++++++++++++ value

// 注意区分
// keyof Enu  和  keyof type Enu
type People6 = keyof Enu; //  "toFixed" | "toExponential" | "toPrecision" | "toString" | "valueOf" | "toLocaleString"

// 拓展 1
// 枚举既是 类型 也是 变量 ( 详见本文件最底部 )
enum STATUS {
  OPEN,
  CLOSE,
}
const clickSwitch = (current: STATUS) => {
  // 这里的 STATUS 是一个 类型
  setState(current === STATUS.OPEN ? STATUS.CLOSE : STATUS.OPEN); // 这里的 STATUS 是一个 值
};

// 扩展 2
// 注意: 这个不是枚举，是一个对象
// 详见: [link 4 Object](file:///Users/xiawu/work/personal/frontend/8-penetrate/1-FRONTEND/2-TS/2.1.1-keyof.ts)
const color = {
  Green: "GreenValue",
  Blue: "BlueValue",
  Red: "RedValue",
} as const;
// 轻松抽取 key
type ColorEnumKeys = keyof typeof color; // "Green" | "Blue" | "Red"
// 轻松抽取 value
type ColorEnumValues = (typeof color)[keyof typeof color]; // "GreenValue" | "BlueValue" | "RedValue"

// 扩展 3
const ColorEnum3 = {
  Green: "GreenValue",
  Blue: "BlueValue",
  Red: "RedValue",
} as const;
// 相当于
const ColorEnum3: {
  readonly Green: "GreenValue"; // 只读属性 - 属性名前用 readonly 来指定只读属性，interface接口中同理
  readonly Blue: "BlueValue";
  readonly Red: "RedValue";
};
// as const 把 ColorEnum声明成一个 readonly 的 object，保证枚举类型不会被改写

// 资料
// 1. https://juejin.cn/post/7205875448567808059

// -------- -------- -------- -------- -------- -------- --------  分隔符 Important
// -------- -------- -------- -------- -------- -------- --------  分隔符 Important
enum Enum2Object {
  A = "value",
  B = 2, // 数字枚举转成对象后，会存在反向映射
  C = "good",
}
const objEum = {
  ...Enum2Object,
};
// console.log("objEum", objEum);
// [LOG]: "objEum",  {
//   "2": "B", // 数字枚举转成对象后，会存在反向映射
//   "B": 2,
//   "A": "value",
//   "C": "good"
// }
