// never 类型

// 1
// - 赋值
//    - 1. 其他任意类型都 不能 赋值给 never类型
//    - 2. never 可以赋值给 其他任意类型
const throwErr = () => {
  throw new Error("error");
};
let neverVar: never = throwErr(); // ---------------------------------------------- never类型的变量
let neverVar2: never = neverVar; // ----------------------------------------------- 1. never类型的变量 可以 赋值给never类型 的变量
const num: number = neverVar; // -------------------------------------------------- 2. never类型 可以赋值给其他任意类型
const boo: boolean = neverVar; // ------------------------------------------------- 2. never类型 可以赋值给其他任意类型
const stri = "";
neverVar = stri; // Type 'string' is not assignable to type 'never' -------------- 报错: 其他任意类型都不能赋值给 never类型

// 2
// 函数总会抛出一个错误时，使用 never 作为返回值
const throwErr2: () => never = () => {
  throw new Error("error");
};
function throwErr3(): never {
  throw new TypeError("error");
}

// 3
// 函数可能存在死循环时，使用 never 作为返回值
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {}
}

// 4
// 穷尽检查，时可以使用 never
// 对于一个联合类型，将其类型收窄为 never
interface Foo {
  type: "foo";
}
interface Bar {
  type: "bar";
}
type All = Foo | Bar;
function handleValue(val: All) {
  switch (val.type) {
    case "foo": // 这里 val 被收窄为 Foo
      break;
    case "bar": // val 在这里是 Bar
      break;
    default: // val 在这里是 never
      const exhaustiveCheck: never = val;
      break;
  }
}
