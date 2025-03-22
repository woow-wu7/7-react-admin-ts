// 1
// 实现 Exclude

// 题目
// 实现内置的Exclude <T, U>类型，但不能直接使用它本身

// 详见
// - https://github.com/type-challenges/type-challenges/blob/main/questions/00043-easy-exclude/README.zh-CN.md

// 实现
// 1. Exclude<T, U> 表示的是: 将 U 的类型从 T 中去除
// 2. 当 T 是枚举类型时，T extends U 表示的是: 遍历 T 中的每一个成员 i，都做  ( i extends U ? never : i ) 这样的判断
// 3. 即 T 中每个成员 i 是 U 的类型约束(子集)时，就剔除i，不是就返回该成员i

type MyExclude<T, U> = T extends U ? never : T;

type Result = MyExclude<"a" | "b" | "c", "a">; // 'b' | 'c'
type Result2 = MyExclude<"a" | "b" | "c", "a" | "b">; // 'c'
