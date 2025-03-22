// 1
// 实现 Pick
// - Pick<T, K>

// 题目
// 实现 TS 内置的 Pick<T, K>，但不可以使用它
// 从类型 T 中选择出属性 K，构造成一个新的类型。

// 详见
// - https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.zh-CN.md

// 实现
// 1. K 必须在 T 的 key 范围中，所以使用 (  K extends keyof T  )
// 1. 遍历 K，给每个 K 成员添加对应的类型即可，该类型对应到T中的成员类型
// 2. 约束 K 的范围在 T 的范围内

type MyPick<T, K extends keyof T> = {
  [Key in K]: T[Key];
};

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">;

const todo1: TodoPreview = {
  title: "Clean room",
  completed: false,
};
