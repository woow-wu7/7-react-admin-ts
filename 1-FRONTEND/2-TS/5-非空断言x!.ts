// 非空断言 x!
// - 表示排除类型是 null 和 undefined 的情况
// - (x!)非空断言 vs (as)类型断言

// 报错
function notNullFn(arg: string | null | undefined): string {
  return arg;
  // 11. 报错: 不能将类型“string | null | undefined”分配给类型“string”。不能将类型“undefined”分配给类型“string”。
}

// 1
// 解决办法1 - 非空断言 x!
function notNullFn2(arg: string | null | undefined): string {
  return arg!;
  // 22. 不报错: 非空断言，即 arg 一定是非空的，即排除 null 和 undefined，这里 arg 就一定是 string
}

// 2
// 解决办法2 - as 类型断言
function notNullFn3(arg: string | null | undefined): string {
  return arg as string; // 类型断言为 string
}

// 3
// 解决办法3
function notNullFn4(arg: string | null | undefined): string {
  if (arg) return arg;
  return "";
}

// 4
const aa: number | undefined = undefined;
const bb = aa!;
// 结果：b的类型就是 number
// 原因：a! 非空断言表示 ( a的非空，b的类型中不再包含null和undefined)
