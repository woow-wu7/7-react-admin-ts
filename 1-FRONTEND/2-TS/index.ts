// 1
// in
// - 鼠标hover 查看 Obj
type T = "name" | "age";
type Obj = {
  [k in T]: any;
};

// 2
// Exclude
const str: Exclude<"a" | "1" | "2", "a" | "y" | "z"> = "1";

// 3
// Omit
type UserState = {
  name: string;
  age: number;
};

type Person = Omit<UserState, "age">;
// 等价于
// type Person {
//    name: string
// }

// 4
// Pick
type Person2 = Pick<UserState, "age">;
// 等价于
// type Person2 {
//    age: number
// }

// 5
// in
enum City {
  BEIJING = 2,
  SHANGHAI,
  GUANGZHOU,
}
enum City2 {
  BEIJING = "BEIJING",
  SHANGHAI = "SHANGHAI",
  GUANGZHOU = "GUANGZHOU",
}
type City3 = "BEIJING" | "SHANGHAI" | "GUANGZHOU";
type City4 = {
  [key in City]: string;
};
type City5 = {
  [key in City2]: string;
};
type City6 = {
  [key in City3]: string;
};

// 6
// public private protected
class Test {
  public pub: string = "public";
  private pri: string = "private"; // private不能在声明它的类的外部使用，( 实例 和 子类 都不能访问 )
  protected pro: string = "protected"; // protected ( 实例不能访问 )，但是 ( 子类能访问 )
}

const testInstance = new Test();
console.log("testInstance.pub", testInstance.pub);
console.log("testInstance.pri", testInstance.pri); // 报错
console.log("testInstance.pro", testInstance.pro); // 报错

class TestChild extends Test {
  constructor() {
    super();
    console.log("super.pri", super.pri); // 报错
    console.log("super.pro", super.pro); // 可以访问，因为 protected 不能在子类实例访问，但是 ( 可以在子类中访问 )
  }
}
const testChildInstance = new TestChild();
console.log("testChildInstance.pub", testChildInstance.pub);
console.log("testChildInstance.pri", testChildInstance.pri); // 报错
console.log("testChildInstance.pro", testChildInstance.pro); // 报错

// ------------------------------------------------------------
// ------------------------------------------------------------
// 1
// 类型体操 Partial
type TPartial<T> = {
  [K in keyof T]?: T[K];
};
