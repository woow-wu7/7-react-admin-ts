// 1
// 实现 Includes

// 题目
// 在类型系统里实现 JavaScript 的 Array.includes 方法，这个类型接受两个参数，返回的类型要么是 true 要么是 false。

// 详见
// - https://github.com/type-challenges/type-challenges/blob/main/questions/00898-easy-includes/README.zh-CN.md

// 实现
// 1. T是数组或元组类型时，T[number] 相当于遍历每个成员 组成联合类型
// 2. in 遍历给每个成员的类型指定为 true
//    - 注意: 这里不能是boolean，因为测试环境中有有些没过
//    - 原因: type Tx = boolean extends true ? true : false // 相当于 Tx = false，因为 boolean 不是 true 的子集，这里需要全等才行，即 true====true，boolean===boolean
//    - 修改: [Key in T[number]]: true;
// 3. T[K] 索引访问每个属性，即 { [Key in T[number]]: boolean; }[U]
// 4. 然后做判断即可

type Includes<T extends readonly any[], U> = {
  [Key in T[number]]: true;
}[U] extends true
  ? true
  : false;

type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`

// 错误原因 1
// type cases = [
//   Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>, // ------- 没过
//   Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
//   Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>, // --------------------------------- 没过
//   Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
//   Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
//   Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
//   Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
//   Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
//   Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>, // ------------------------ 没过
//   Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
//   Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
//   Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
//   Expect<Equal<Includes<[1], 1 | 2>, false>>,
//   Expect<Equal<Includes<[1 | 2], 1>, false>>,
//   Expect<Equal<Includes<[null], undefined>, false>>,
//   Expect<Equal<Includes<[undefined], null>, false>>,
// ]

// 错误原因 2
type Tx = boolean extends true ? true : false; // 相当于 Tx = false
