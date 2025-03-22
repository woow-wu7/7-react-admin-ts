// unknown 类型
// - 定义
//   - unknown 类型，是 any 类型对应的安全类型
//   - unknown在使用时必须指定 具体的类型
//   - 所有类型都可以被归为 any，所有类型也都可以被归为 unknown
//   - 这使得 unknown 成为 TypeScript 类型系统的另一种顶级类型（另一种是 any）
// - 特点
//   - unknown 类型只能被赋值给 any 类型和 unknown 类型本身
//   - 任意类型的值都可以赋值给 unknown 类型的值，这点 any 和 unknown 一样
// - 问题
//   - 问题: unknown 和 any 的区别？
//   - 回答:
//     - unknown: unknown 必须要在判断完它是什么类型之后，才能继续用
//     - any: any 会绕过类型检查，对 any 类型的值执行操作之前，我们不必进行任何检查

// 推荐使用 unknown 而不是 any

// 1
// unknown
const unk: unknown = 1;
const product = unk * unk; // --------------------------- 报错，unknown在使用时必须指定 具体的类型
const product2 = (unk as number) * (unk as number); // -- 正确  as是类型断言

// 2
// any
const unk2: any = 2;
const product3 = unk2 * unk2; // ------------------------ 正确，any不会进行类型检查

function accumulate(name: unknown) {
  return name + 1; // ----------------------------------- 报错，unknown在使用时必须指定 具体的类型
}
function accumulate2(name: unknown) {
  return (name as number) + 1;
}

// 英语
// 和 sum
// 差 difference
// 积 product
// 商 quotient

// 6 subtracted from 9 is 3. ---------------- 9减6等于3
// 9 minus 6 equals 3. ---------------------- 9减6等于3
// If you subtract 6 from 9, you get 3. ----- 9减6等于3
// subtract 减去 v
// subtracted
// -- subtract 减去v: If you subtract 3 from 5, you get 2.
// -- divide 除以v: 10 divided by 2 equals 5.
// ------- times 乘以v: 2 times 3 equals 6.
// ------- multiply 乘以: 2 multiplied by 3 equals 6.
// -- plus/add 加v: 2 plus/add 3 equals 5.
// - add/plus
// - minus/subtract
// - times/multiplied by
// - times
// - divided by
// - multiplied by
// ------- [ greater than. 大于 大于符号 ] // great 伟大的 巨大的
// ------- [ less than. 小于 小于符号 ]
