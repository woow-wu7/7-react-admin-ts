// 类型保护
// - 主要作用就是 缩小 值类型的范围
// - 类型谓词 is
// - 类型断言 as
// - typeof
// - instanceof

// 1
// is - 类型谓词 - 类型保护
// - 类型谓词 is
// - parameterName is Type
// - parameterName 必须是来自当前函数签名里的一个 ( 参数名 )，一般用于 ( 返回值 - 缩小范围 )
// - 使用场景
//  - 当一个函数返回值是boolean时
//    - function isStr(s: any): s is string { return typeof s === 'string'; }
//    - 让我们明确地告诉TypeScript，如果isStr为真，参数的类型就是字符串类型
//    - 这里是把函数的参数 s 从 any 范围缩小到 string 类型
//  - 通常用在给联合类型确定一个具体的类型

// 2
// as - 类型断言
// 类型断言有两种方式
// - let strLength: number = (someValue as string).length;
// - let strLength: number = (<string>someValue).length;
// - 唯一区别是，在JSX中，尖扩号与JSX语法冲突，只能使用as关键字

interface Bird {
  fly();
  layEggs();
}
interface Fish {
  swim();
  layEggs();
}
function isFish2(pet: Fish | Bird): pet is Fish {
  // 类型谓词 is 的作用: 当函数返回boolean类型的值时，如果返回true，那么pet就是Fish类型
  return (<Fish>pet).swim !== undefined; // 返回值是boolean
  // return (pet as Fish).swim !== undefined 这两种写法都可以
}

// 2
// typeof - 类型保护
function isNumber(x: any): x is number {
  return typeof x === "number";
}
function isString(x: any): x is string {
  return typeof x === "string";
}

// 3
// instanceof - 类型保护
// if (instance instanceof Constructor) {}
