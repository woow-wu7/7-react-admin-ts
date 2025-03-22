type TA = { name: "a", age: 1 } | { name: "b" };
type TB = { name: "a", age: 1 } & { name: "a", address: 1 };

const union: TA = { name: "b" }; // 满足其中任意一个 或 全部
const intersection: TB = { name: 'a', age: 1, address: 1 }; // 取并集