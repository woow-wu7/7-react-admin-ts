// 1
// 实现 Readonly
// - 只读属性

// 题目
// 不要使用内置的Readonly<T>，自己实现一个。
// 该 Readonly 会接收一个 泛型参数，并返回一个完全一样的类型，只是所有属性都会被 readonly 所修饰。
// 也就是不可以再对该对象的属性赋值。

// 详见
// - https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.zh-CN.md

// 思路
// - 直接遍历 T，给每个属性添加 readonly 即可
// - 和 Pick 的思路类似
type MyReadonly<T> = {
  readonly [Key in keyof T]: T[Key];
};

interface Todo {
  title: string;
  description: string;
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar",
};

todo.title = "Hello"; // Error: cannot reassign a readonly property
todo.description = "barFoo"; // Error: cannot reassign a readonly property
