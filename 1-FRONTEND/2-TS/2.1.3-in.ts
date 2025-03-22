// in
// 1.类型中使用: 遍历 联合类型 和 枚举类型
// 2.对象中使用: 遍历对象的属性

// 1
// Traverse union types.
// 遍历 联合类型
interface IScore {
  en: string;
  ch: string;
}
type TScore2 = {
  [P in keyof IScore]: P;
};
type TScore = {
  [P in keyof IScore]: number;
};
// 等价于 type TScore = Record<keyof IScore, number>
// 因为 Record 的实现如下
// type TRecord<K extends keyof any, T> = {
//   [P in K]: T;
// };

// 2
// 遍历联合类型
type TAA = "a" | "b" | "c";
type TAA2 = {
  [P in TAA]: P;
};
type TAA1 = {
  [P in TAA]: number;
};
type TAA3 = Record<TAA, number>; // 等价于 TAA1，但是做不到 TAA2 的效果

// 3
// Traverse enumeration types.
// 遍历枚举类型
// 详见:
//  - 2.1
//  - 1-FRONTEND/2-TS/2.1-keyof-in-typeof-extends-T[K].ts
enum EColor {
  red = 999,
  blue,
}
type EColor2 = {
  [P in EColor]: number;
};
type EColor22 = {
  [p in keyof EColor]: number;
};
type EColor3 = {
  // This is the correct way to traverse the 'key' attributes of an enumeration type.
  [P in keyof typeof EColor]: number;
};
type EColor33 = {
  [P in keyof typeof EColor]: string;
};
type EColor4 = keyof typeof EColor; // key ------- type EColor4 = "red" | "blue"
type EColor5 = `${EColor}`; // value ------------- type EColor5 = "999" | "1000" // 注意: 这里 number 会转成 string

// 4
type TKey = keyof any; // string | number | symbol

// 5
type TPeople7 = {
  [K in keyof any]: boolean;
};
// 相当于
// type TPeople7 = {
//   [x: string]: boolean;
// }
