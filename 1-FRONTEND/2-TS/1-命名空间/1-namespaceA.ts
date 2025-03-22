// 1
// 没有 export namespace
// - 可以使用 /// <reference path="namespace-a.ts" /> 来引入文件
namespace FruitNamespace {
  export interface Apple {
    color: string;
    getColor: () => void;
  }
}

// 2
// 有 export namespace
// - 使用 import 来引入
// export namespace FruitNamespace2 {
//   export interface Apple {
//     color: string;
//     getColor: () => void;
//   }
// }
