// 关键字
// keyof T ------------- 索引类型查询 操作符 -> 返回 T 上已知的公共属性名的 联合类型 // --------- 详见 1-FRONTEND/2-TS/2.1.1-keyof.ts
// in ------------------ 1.类型中使用: 遍历 枚举类型，联合类型 2.对象中使用: 遍历对象的属性 // -- 详见 1-FRONTEND/2-TS/2.1.3-in.ts
// typeof -------------- 获取一个 变量 或 对象 的类型
// T[K] ---------------- 索引访问 操作符 // ----------------------------------------------- 详见 1-FRONTEND/2-TS/2.1.2-T[K].ts
// extends ------------- 1.继承(用于interface表示继承) 2.表示条件类型，可用于条件判断. // ----- 详见 1-FRONTEND/2-TS/2.1.4-extends.ts

// 分割线 ------------------------------------------------------------------------------------------
// 分割线 ------------------------------------------------------------------------------------------
// 1
// keyof
// - 1. keyof 返回 T 类型上的已知公共属性名的 联合类型
// - 2. 如果 keyof 作用于一个 ( 类 )， 所以如果是 private 和 protected 属性则不会返回，因为只会返回 ( 已知的公共属性名 public ) 的联合类型
// -- protected 保护的 adj
// -- protect 保护 v

// 1.1
interface People {
  name: string;
  age: number;
}
const people11: keyof People = "age"; // keyof 返回 T 类型上的已知公共属性名的 联合类型
const people22: People = {
  name: "woow_wu7",
  age: 35,
};

// 1.2
class PeopleX {
  public name: string = ""; // ----- public 任意地方都可以访问 ( 定义name的类，子类，实例 )
  // public address: string = "";
  private age: number = 0; // ------ private 只能在 ( 定义name的类内部访问 )，不能在 ( 子类，实例 ) 访问
  protected sex: string = ""; // --- protected 能在 ( 类，子类 ) 中访问，不能在 ( 实例 ) 上访问
}
type PeopleY = keyof PeopleX; // 相当于 type TS2 = "name"，注意: 只能返回 ( 返回 T 上已知公共属性名的 联合类型 )，即 private 和 protected 都遍历不到

function getPeople<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map((n) => o[n]);
}
let strings: string[] = getPeople(people22, ["name"]); // ok, string[]

// 分割线 ------------------------------------------------------------------------------------------
// 分割线 ------------------------------------------------------------------------------------------
// 2
// in
// - 1. 在 ( 类型 ) 中使用，用来遍历 ( 联合类型 和 枚举类型 )
// - 2. 在 ( 值 ) 中使用，用来判断对象中是否存在某个 key 注意包括 ( 自身属性 ) 和 ( 继承属性 )
enum ENumber {
  AA = 2,
  BB,
}

// 2.1
// in 遍历 枚举类型 - 枚举中的 value
// 请 hover 鼠标查看具体的值
type TTest1 = {
  [K in ENumber]: boolean;
};

// 2.2
// in 遍历 联合类型1
// 请 hover 鼠标查看具体的值
type TTest2 = {
  [K in keyof People]: boolean;
};
type TT1111 = {
  [K in keyof typeof ENumber]: boolean;
};
type TT2222 = {
  [K in `${ENumber}`]: boolean;
};

// -------

// 注意区分
type TTest11 = {
  [K in keyof typeof ENumber]: boolean;
};
// 相当于
// type TTest11 = {
//   [x: number]: boolean;
//   readonly AA: boolean;
//   readonly BB: boolean;
// }

// 2.3
// in 遍历 联合类型2
type TP = "name" | "age";
type People8 = {
  [K in TP]: string;
};
// 相当于
// type People8 = {
//   name: string;
//   age: string;
// }

// 2.4
// 返回的是枚举中的 key =================================== 枚举中的 key
// - 枚举是一种数据类型
// - typeof 枚举A: 返回的是A的类型
type People44 = keyof typeof ENumber; // 'AA' | 'BB' ++++++ key
type People66 = `${ENumber}`; // "2" | "3" ++++++++++++++++ value // 注意: 这里 number 会转成 string

// 注意区分
type People55 = keyof ENumber; //  "toFixed" | "toExponential" | "toPrecision" | "toString" | "valueOf" | "toLocaleString"

// keyof any = string | number | symbol
type Key = keyof any; // string | number | symbol

type People7 = {
  [K in keyof any]: boolean;
};
// 相当于
// type People7 = {
//   [x: string]: boolean;
// }

// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// 3
// 3.1 keyof
interface IObj {
  attr1: number;
  attr2: string;
}
let obj1: IObj;
type TObj = keyof typeof obj1; // 相当于 type TObj = 'attr1' | 'attr2'
type TObj2 = keyof IObj;
const tobj: TObj = "attr1";
// - 所以这里 keyof typeof interface/enum 都是可以的
// - 即 interface 和 enum 通过 typeof 返回类型后，都可以用 keyof 获取 keys映射的联合类型
// - 联合类型 和 枚举 又都可以用 in 来遍历

// 3.2
// - 详见 1-FRONTEND/2-TS/2.1.1-keyof.ts
class CStaff2 {
  public name: string = ""; // ----- public 任意地方都可以访问 ( 定义name的类，子类，实例 )
  private age: number = 0; // ------ private 只能在 ( 定义name的类内部访问 )，不能在 ( 子类，实例 ) 访问
  protected sex: string = ""; // --- protected 能在 ( 类，子类 ) 中访问，不能在 ( 实例 ) 上访问
}
type TS22 = keyof CStaff; // 相当于 type TS2 = "name"，只能返回 ( 返回 T 上已知公共属性名的 联合类型 )，即 private 和 protected 都遍历不到

// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// 4
// typeof
interface IType {
  name: string;
}
type TType = {
  name: string;
};
typeof IType; //  typeof 只能用于值，而不能用于类型，任意类型都不行，interface type 都不行
typeof TType;
