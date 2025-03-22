# tsconfig.json

- [Typescript 掘金链接](https://juejin.cn/post/6999807282343051277#heading-19)

```
重点掌握
---

compilerOptions
  - baseUrl + path
  - noImplicitAny
  - noUnusedLocals
  - noUnusedParameters
  - removeComments
  - esModuleInterop
```

### (1) tsconfig.json - 顶层属性

```
compilerOptions ----> 编译选项

extends ------------> 引入其他配置文件，继承配置
exclude ------------> 编译器需要排除的文件，或文件夹
include ------------> 编译器需要编译的文件，或文件夹

typeAcquisition
子属性如下
- enable: boolean是否开启自动引入库类型定义文件.d.ts
- include: array允许自动引入的库名
- exclude: array排除的库名
// acquisition 是收购，获取的意思

files --------------> 表示编译器需要编译的单个文件列表
references ---------> 指定依赖工程
compileOnSave ------> 可以让IDE在保存文件的时候根据`tsconfig.json`重新生成文件
```

### (2) 如何生成 tsconfig.json 文件

- `tsc --init` 会生成一个具有默认配置的 tsconfig.json 文件
- 如果一个目录下存在`tsconfig.json`文件，那么意味着这个目录是`typescript项目`的`根目录`
- tsconfig.json 文件中指定了用来编译这个项目的 ( 根文件 ) 和 ( 编译选项 )

### (3) tsconfig.json 配置项

- 1.如果在 `tsconfig.json` 中，只写一个 `{}`，则 ts 会编译所有此目录和子目录中的.ts 文件
- 2.匹配
  - `**/*` 表示匹配所有 ( `文件夹` ) 和 (`文件` )
  - `folder/**/*` 表示匹配 folder 中的所有文件夹和文件

```
compilerOptions
---


baseUrl
// baseUrl
// 含义：用于解析(非相对模块名称)的(基目录)，也可以认为是指定(根目录)
// 配合：baseUrl + paths 可以实现类似alias的功能
// 原因：当配置了 paths 时，一定需要配置 baseUrl


paths
// paths
// 值类型：Object
// 含义：( 模块名 ) 或 ( 路径映射 ) 的列表，类似于alias
// 特点：需要搭配 ( baseUrl )
// 例子1
// "baseUrl": "./",
// "paths": { "@/*": ["src/*"] }
// 例子2
// "baseUrl": "./",
//  "paths": {
//     "*": ["types/*"]
//  },
//  "esModuleInterop": true,
// 例子2表示：寻在声明文件需要到 当前目录/types目录中去寻找
// -- 例子3 -- 下面三种写法等价
// "baseUrl": "src", //
// "paths": {
//   "@/*": ["/*"]
// }
// "baseUrl": ".",
// "paths": {
//   "@/*": ["src/*"]
// }
// "baseUrl": "./src",
// "paths": {
//  "@/*": ["/*"]
// }
// -- 例子4 -- 官网的配置
- 遇到问题
- 问题：当在webpack配置了别名后，ts报错找不到模块
- 回答：
  - **paths**：因为webpack知道了别名路径，但是ts并不知道这是设置了别名，所以需要设置tsconfig.json文件中的 `paths`
  - **baseUrl**: 当设置了 paths时，就必须设置baseUrl
 {
    "compilerOptions": {
      "baseUrl": ".", // this must be specified if "paths" is specified.当指定paths的时候，就必须指定baseUrl
      "paths": {
        "jquery": ["node_modules/jquery/dist/jquery"] // this mapping is relative to "baseUrl" 该映射是相对于 baseUrl 的
        "@/*": "src/*"
      }
    }
  }
  官网说明：https://www.typescriptlang.org/tsconfig#paths



noImplicitAny
// noImplicitAny
// 类型值：boolean，默认是false
// 含义：有 隐含any时是否报错
// 单词：implicit 是隐式的意思
// 例子
// function setName(name) {}
// - 如果 noImplicitAny: false 时，name参数不会报错
// - 如果 noImplicitAny: true 时，name参数会报错，因为name推测出any类型，除非我们使用 function setName(name: any) {} 就不会报错


noUnusedLocals + noUnusedParameters
// 1
// noUnusedLocals
// 类型值：boolean，默认值是false
// 含义：有未使用的 ( 局部 ) 变量时，是否报错
// 注意点：注意这里是局部变量，如果一个变量是非局部变量，比如导出的模块变量 export const a = 1，即使没用到也不会报错！！！！！
// 2
// noUnusedParameters
// 类型值：boolean，默认值是false
// 含义：有未使用的 ( 参数 ) 时，是否报错
// 例子
// function notUse(age: number, who: string) { // 当设置 noUnusedParameters: true 时，who报错，因为参数未使用
//   console.log(`age`, age)
// }


esModuleInterop
// esModuleInterop
// 含义：`esModuleInterop`选项的作用是支持使用`import d from 'cjs'`的方式引入`commonjs`包
// 解释：本来 commmonjs只支持require的方法，esModuleInterop=true，则可以使用import的方式
// interop是相互操作的意思


target
// target
// 含义：将ts编译成什么版本的js文件
// 可选值："ES3"， "ES5"， "ES6"/ "ES2015"， "ES2016"， "ES2017"，"ESNext"
// 默认值："ES3"
// "ESNext" 表示tc39最新的ES proposed features

module
// module
// 含义：将ts编译成js文件时，js文件使用什么(模块系统)
// 可选值："None"， "CommonJS"， "AMD"， "System"， "UMD"， "ES6"， "ES2015"，"ESNext"
// 默认值根据 --target或者target 选项不同而不
// - target=es6时，module=es6
// - target不是es6时，module=commonjs
// - 比如：
// - module=es6时，打包后的js文件中，使用import
// - module=commonjs时，打包后的js文件中，使用require

lib
// lib
// 含义：编译过程中需要引入的 ( 库文件 ) 的列表
// 值类型：string[]，
// 默认值：
//   - 默认值是根据--target选项不同而不同
//   - target=es5时 -> 默认值是 ['DOM', 'ES5', 'ScriptHost']
//   - target=es6时 -> 默认值是 ['DOM', 'ES6', 'ScriptHost', 'DOM.Iterable']
// 可选值：可选的值有很多，常用的有ES5，ES6，ESNext，DOM，DOM.Iterable、WebWorker、ScriptHost等


allowJs
checkJs
// 1
// allowJs
// 值类型：boolean ，默认值是false
// 含义：是否允许编译javascript文件，true则表示js后缀的文件也会被typescrpt编辑器编译
// 例子
// allowJs=true，你在ts文件中引入了一个js文件就(不会报错)
// allowJs=false，你在ts文件文件中引入了一个js文件会(报错)
// 2
// checkJs
// 值类型：boolean，默认值是false
// 含义：是否在 .js 文件中报告错误，与 ( checkJs 和 allowJs ) 一起配合使用


typeRoots
types
// typeRoots 和 types
// 值类型：两者都是array
// - typeRoots数组成员是(@types包的文件夹路径)
// - types数组成员是(npm包名)
// 场景：默认所有可见的 @types包 会在编译过程中被包含进来
// - typeRoots场景：如果指定了typeRoots，则只有typeRoots数组(指定的文件夹)中的(@types包会被包含进来)
// - types场景：如果指定了types，则只有types数组中的(npm包会包含进来)
// 案例
// "typeRoots": ["./typings"], // 只有typings文件夹下的@types包会包含进来，node_modules中的则不会包含进来
//  "types": ["jquery"], // jquery库npm包会包含进来
// 官网说明
// - https://www.tslang.cn/docs/handbook/tsconfig-json.html#types-typeroots-and-types


jsx
// jsx
// 值类型：枚举
// 值范围：'preserve' 'react-native' 'react'
// 含义：指定jsx代码生成，这些模式只在代码生成阶段起作用
// 1 preserve => 生成代码中会保留jsx后续的转换操作(比如以后还可以用babel)，输出文件带有 .jsx
// 2 react => 生成 React.createElement，在使用前不需要转化了，输出文件带 .js
// 3 react-native => 保留了所有jsx，输出文件扩展名是 .js
  模式             | 输入        | 输出                         | 输出文件扩展名 |
  | -------------- | --------- | ---------------------------- | ------- |
  | `preserve`     | `<div />` | `<div />`                    | `.jsx`  |
  | `react`        | `<div />` | `React.createElement("div")` | `.js`   |
  | `react-native` | `<div />` | `<div />`                    | `.js`   |


outDir // 输出文件夹
rootDir // 输入文件夹

moduleResolution
// moduleResolution
// 值类型：string类型的枚举，支持 ( node ) ( classic )
// 含义：如何处理模块
// 大白话：遇到 import {} from ... 时应该如何去寻找模块
// 一般情况下都选择 node
// moduleResolution: 'node'

removeComments // ------------- boolean，是否移除代码中的注释 ！
strictNullChecks // ----------- boolean，是否开启null和undefined检查 ！
allowSyntheticDefaultImports // boolean，是否允许从没有设置默认导出的模块中默认导入 ！
strict // --------------------- boolean，是否启用 ( 所有 ) 严格类型检查选项，相当于启用 noImplicitAny noImplicitThis alwaysStrict strictNullChecks strictFunctionTypes strictPropertyInitialization !
importHelpers // -------------- boolean，是否从 ( tslib ) 导入辅助工具函数，比如 _extends _rest 等 !

sourceMap // ------------------ boolean，是否生成目标文件的sourceMap文件
skipLibCheck // --------------- boolean，是否跳过lib库检查
noImplicitReturns // ---------- boolean，是否在函数的每个分支都有返回值



---- 分割线 ----
include
exclude
  // include 和 exclude
  // 值类型：Array
  // 含义
  // - 在未设置include时，编译器默认包含(当前目录和子目录)的所有typescript文件(.ts, .d.ts 和 .tsx)
  // - 当(allowJs=true)时，还包括所有的js文件(.js和.jsx)
  // 例子
  // "include": ["src/**/*"] // 表示编译src/二级目录/三级目录中的所有(三级目录)中的typescript文件



---- 分割线 ----
2022年1月20更新
----

1
resolveJsonModule
- 表示从 .json 文件中导入，导出其类型
// settings.json ---> { "dry": false, "debug": false }
// import settings from "./settings.json";
// settings.debug === true;  // OK
// settings.dry === 2;  // Error: '===' 不能用于比较 boolean 和 number 类型

2
isolatedModules
- 是否将每个文件作为单独的模块，默认为true
- 不可以和declaration同时设定
// isolated 表示单独，分离，隔离

3
noEmit
- 不编译输出文件
- 用ts新建一个项目，发现build时，没有输出，最后发现时tsconfig.json中noEmit选项的原因

4
skipLibCheck
- 是否跳过lib库检查，即跳过声明文件的类型检查
- 如果我们开启了这个选项，则可以节省编译期的时间，但可能会牺牲类型系统的准确性。在设置该选项时，推荐值为true
```

- 具体的 tsconfig.json 配置说明

```
{
  "compilerOptions": {
    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'（"ESNext"表示最新的ES语法，包括还处在stage X阶段）
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)。默认是classic
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true,         // 为装饰器提供元数据的支持
    "strictFunctionTypes": false           // 禁用函数参数双向协变检查。
  },
  /* 指定编译文件或排除指定编译文件 */
  "include": [
      "src/**/*"
  ],
  "exclude": [
      "node_modules",
      "**/*.spec.ts"
  ],
  "files": [
    "core.ts",
    "sys.ts"
  ],
  // 从另一个配置文件里继承配置
  "extends": "./config/base",
  // 让IDE在保存文件的时候根据tsconfig.json重新生成文件
  "compileOnSave": true // 支持这个特性需要Visual Studio 2015， TypeScript1.8.4以上并且安装atom-typescript插件
}
```
