// 1
// 没有 export namespace
// - 可以使用 /// <reference path="namespace-a.ts" /> 来引入文件

// 2
// 有 export namespace
// - 使用 import 来引入

import { FruitNamespace2 } from "./1-namespaceB";

const apple: FruitNamespace2.Apple = {
  color: "red",
  getColor: () => {},
};
