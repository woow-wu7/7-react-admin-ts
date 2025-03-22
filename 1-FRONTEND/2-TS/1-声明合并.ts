// 前置知识
// - interface 可以 声明合并
// - type 不能 声明合并，会报错

// 1
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// interface 声明合并
// - 非函数成员合并: 有 ( 同名成员 ) 时，( 类型必须一样 ) ---- 比如下面的 age，一个string，一个number 就会报错
// - 函数成员合并: 每个同名函数声明都会被当成这个函数的一个 ( 函数重载 )。 同时需要注意，当接口 A与后来的接口 A合并时，后面的接口具有更高的优先级

// AA.
interface Same {
  name: string;
  age: number;
}
interface Same {
  name: string; // -------------- interface非函数成员声明合并: name 成员名和类型都一样，不报错
  age: string; // --------------- interface非函数成员声明合并(报错): age 一个是number，一个是string，报错 -- interface 声明合并，非函数成员，有同名成员时，类型必须一样
  address: number; // 新的属性
  (name: string): umber;
}

const objMerge: Same = {
  name: "",
  age: "", // 这里报错了
  address: 0,
};

// BB.
// Interface-声明合并-函数成员: 函数重载 function overload
interface Cloner {
  clone(animal: Animal): Animal;
}
interface Cloner {
  clone(animal: Sheep): Sheep;
}
interface Cloner {
  // 位置靠前
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}
// 相当于
interface Cloner {
  clone(animal: Dog): Dog; // 注意每组接口里的声明顺序保持不变，但各组接口之间的顺序是后来的接口重载出现在靠前位置
  clone(animal: Cat): Cat;
  clone(animal: Sheep): Sheep;
  clone(animal: Animal): Animal;
}

// 2
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// type 不能重名，所以 type 不存在声明合并
type TMerge = {
  name: string;
  age: string;
};
type TMerge = {
  age: string;
  address: string;
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 扩展
// type 和 interface 的区别？
// - 不同点
//  - 1. interface新建了一个类型; 而type没有新建类型，而是给一个也有的类型取了一个新的名字来引用这个类型
//  - 2. interface可以被 extends扩展 和 implements实现; 而type不能
//  - 3. interface只能用于对象类型; 而type可以用于原始类型, 元组, 联合类型等任何需要手写的类型，以及不能通过 interface 声明的类型
//  - 4. interface存在声明合并; 而type不能声明声明合并会报错
//        - interface 非函数成员 声明合并: 属性名一样时，类型必须一样，不然会报错
//        - interface 函数成员 声明合并: 会函数重载，并且后面的interface中的函数声明优先级高
// - 相同点
//  - 1. interface 和 type 都可以有 范型
