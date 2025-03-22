// 函数重载
// - 包含: 函数签名 + 实现签名
// - 资料: https://juejin.cn/post/7029481950691737630

// 问题: 为什么需要函数重载？
// 回答: 例子1中，我们调用 fn(1).toFixed() 报错，因为返回的值类型没有确定是number还是string
// 解决: 函数重载，声明时，具体执行不同输入和返回值之间的对应关系，输入string返回string，输入number返回number

// 例子1
// - 未使用 函数重载
function fn(args: string | number): number | string {
  const type = typeof args;
  if (type === "string") return "1";
  return 1;
}
fn(1).toFixed(); // 报错: 类型“string | number”上不存在属性“toFixed”。类型“string”上不存在属性“toFixed”。

// 例子2
// - 函数重载
function fn2(args: string): string; // -------------------- 函数签名 -------------- 多个函数签名
function fn2(args: number): number;
function fn2(args: string | number): number | string {
  // ------------------------------------------------------ 实现签名 + 函数体 ------ 一个实现签名
  const type = typeof args;
  if (type === "string") return "1";
  return 1;
}
fn2(1).toFixed(); // 没有报错了

// 例子3
// type AType = "name" | 1;
// let resA = "name";
// function fnA(arg: AType): arg is "name" {
//   return typeof arg === "string";
// }
