// keyof
// - 索引类型查询操作符
// - keyof T ------------- 索引类型查询操作符 -> 返回 T 上 ( 已知公共属性名 ) 的 ( 联合类型 )
// - 注意: 只能返回 ( 返回 T 上已知公共属性名的 联合类型 )，即 private 和 protected 都遍历不到
// - 作用于: Interface, Class, ( Enumeration, Object - 这两个先要通过 typeof 转成类型 )

// 1
// Interface
interface IStaff {
  name: string;
  age: number;
}
type Ke = keyof IStaff;

// 2
// Class
class CStaff {
  public name: string = ""; // ----- public 任意地方都可以访问 ( 定义name的类，子类，实例 )
  // public address: string = "";
  private age: number = 0; // ------ private 只能在 ( 定义name的类内部访问 )，不能在 ( 子类，实例 ) 访问
  protected sex: string = ""; // --- protected 能在 ( 类，子类 ) 中访问，不能在 ( 实例 ) 上访问
}
type TS2 = keyof CStaff;
// 相当于 type TS2 = "name"
// 注意: 只能返回 ( 返回 T 上已知公共属性名的 联合类型 )，即 ( private 和 protected 都遍历不到 )

// 3
// Enumeration
enum EN {
  AAA = 2,
  BBB,
}
type Ke2 = keyof typeof EN; // "AAA" | "BBB"

// 4
// Object
// TIPS: 注意比较 person 和 person2 的 ( PersonValues 和 PersonValues2 ) 的不同
const person = {
  name: "John",
  age: 30,
  address: "123 Main St",
};
type PersonKeys = keyof typeof person; // "name" | "age" | "address"
type PersonValues = (typeof person)[keyof typeof person]; // ------------------ string | number
// 注意比较 person 和 person2 的 ( PersonValues 和 PersonValues2 ) 的不同

const person2 = {
  name: "John",
  age: 30,
  address: "123 Main St",
} as const;
type PersonKeys2 = keyof typeof person2; // "name" | "age" | "address"
type PersonValues2 = (typeof person2)[keyof typeof person2]; // ---------------- "John" | 30 | "123 Main St"
// 注意比较 person 和 person2 的 ( PersonValues 和 PersonValues2 ) 的不同

// ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- -------
// ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- -------

// in
enum ENumber2 {
  AAA = 2,
  BBB,
}
interface People22 {
  name: string;
  age: number;
}

// 3.1
type TTest111 = {
  [K in ENumber2]: boolean;
};
// 相当于
// type TTest111 = {
//   2: boolean;
//   3: boolean;
// }

// 3.2
// in 遍历 联合类型1
type TTest222 = {
  [K in keyof People22]: boolean;
};
// 3.2.1 相当于
// type TTest222 = {
//   name: boolean;
//   age: boolean;
// }
// 3.2.2
type TTest2222 = Record<keyof People22, boolean>; // 效果和 in 遍历一样，等价于 TTest222， 但是做不到 TTes3333 的效果
type TTes3333 = {
  [K in keyof People22]: K;
};

// ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- -------
// ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- -------

// 6
type People444 = keyof typeof ENumber; // 'AA' | 'BB' ++++++ key
type People666 = `${ENumber}`; // "2" | "3" ++++++++++++++++ value // 注意: 这里 number 会转成 string

// 注意区分
type People555 = keyof ENumber; //  "toFixed" | "toExponential" | "toPrecision" | "toString" | "valueOf" | "toLocaleString"

// keyof any = string | number | symbol
type Key666 = keyof any; // string | number | symbol

type People777 = {
  [K in keyof any]: boolean;
};
// 相当于
// type People777 = {
//   [x: string]: boolean;
// }

// 7
// 结合 in 一起看
// 详见
// - 2.1
// - 2.1.1
// - 2.1.3
// - 1-FRONTEND/2-TS/2.1-keyof-in-typeof-extends-T[K].ts
