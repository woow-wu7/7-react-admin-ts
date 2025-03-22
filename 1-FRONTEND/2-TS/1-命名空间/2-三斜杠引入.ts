// 1
// 没有 export namespace
// - 可以使用 /// <reference path="namespace-a.ts" /> 来引入文件

// 2
// 有 export namespace
// - 使用 import 来引入

// 3
// 三斜杠指令 ///
// 定义
// - 三斜线指令是包含单个XML标签的单行注释
// - ( 注释的内容 ) 会做为 ( 编译器指令 ) 使用
// - 三斜线指令仅可放在包含它的文件的最顶端
// 应用
// - /// <reference path="..." />指令是三斜线指令中最常见的一种。 它用于声明文件间的 依赖

/// <reference path="1-namespaceA.ts" />

const apple: FruitNamespace.Apple = {
  color: "red",
  getColor: () => {},
};
