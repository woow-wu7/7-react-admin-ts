### Webpack

- [7-compiler-webpack 打包源码](https://github.com/woow-wu7/7-compiler)
- [7-compiler.js][手写-webpack-compiler](https://github.com/woow-wu7/7-compiler/blob/main/7-compiler.js)
- [webpack- 基础学习仓库](https://github.com/woow-wu7/7-compiler/blob/main/webpack.config.js)
-
- [[源码-webpack03] 手写 webpack - compiler 简单编译流程]](https://juejin.im/post/6844903973002936327)
- [[源码-webpack01-前置知识] AST 抽象语法树](https://juejin.im/post/6844904115265339406)
- [[源码-webpack02-前置知识] Tapable](https://juejin.im/post/6844904115269550087)
- [[深入 16] webpack](https://juejin.im/post/6844904070201753608)

```English
English
-
1
chunk 块 大块 后块 n
parse 解析 v
-
a chunk of. 一大块...
-
// -- I ate 【 a chunk of 】 break. 我吃了一大块面包
// -- 【 A large chunk of 】 the company's 【 profits 】 comes from 【 overseas 】 markets.
// ---- oversea 海外的adj 海外adv
// ---- profit 利润 n
// TIPS: Pay attention to the pronunciation of the word 'chunk'. [chunk-块-大块-n]
// TIPS: Pay attention to the pronunciation of the word 'parse'. [parse-解析-v]


2
corresponding 对应的 adj
correspond 对应 符合 相当于 v
correspond to. 与...相对应 v
-
modify 修改 v
modified 修改的 adj
-
// -- The 【 modified 】 file will only impact its 【 corresponding 】 【 chunk 】.
// -- The numbers on the map 【 correspond 】 to the actual distances. 地图上的数字与实际距离相对应
// -- Different 【 professions 】 【 correspond to 】 different 【 specialties 】. 不同职业对应不同的专业


3
complete 完成v 完整的 adj
【 complete list. 完整的清单 n 】
【 complete solution. 完整的解决方案 】
// -- I have 【 completed 】 a 【 complete 】 【 novel 】. 我完成了一部完整的小说
// ---- 【 novel 小说 】
// ---- 【 fiction 小说 】


4
compile 编写 编译 v
compiler 编译程序 编写者 n
compilation 编译
// TIPS: Pay attention to the pronunciation of the word 'compiler'. [compiler-编译程序-编写者-n]


5
specify 指定 v
specific 具体的 特定的 adj
// Please 【 specify 】 a 【 specific 】 color that you want. 请指定一个具体的你想要的颜色


6
placeholder 占位符
arrow 箭头
【 arrow function. 箭头函数 n 】

7
summarize 总结 v
summary 总结 n


optional 可选的 adj
traverse 遍历 穿过 v
// TIPS: Pay attention to the pronunciation of the word 'option'. [option-选项-n]
// TIPS: Pay attention to the pronunciation of the word 'optional'. [optional-可选的-n]


usage 使用 用法 n
【 usage rate. 使用率】

optimize 优化 v
optimization 优化 n

generator 发电机 n
generate 产生 生成 v
【 generate heat. 产生热量 】
【 generate electricity. 产生电 】
【 generate contradiction. 产生矛盾 】
【 generate reaction. 产生反应 】

template: 模板
basic usage: 基本用法
relate: 联系，讲述
extract: 抽离，提取 // mini-css-extract-plugin
parallel: 平行，并行
minimizer: 最小化
optimization: 最佳的
proposal: 提议，建议 // @babel/plugin-proposal-decorators
decorators: 装饰工
uglify: 丑陋的 // uglifyjs-webpack-plugin压缩js为一行，丑
```

### (一) **【 webpack 】**

### (1) webpack compiler lifecycle 生命周期钩子 ( 7 个 )

- entryOption ------------- 在 webpack.config.js 文件中的 entry 处理完后调用
- afterPlugins ------------ 在 Compiler.constructor() 中遍历执行完 webpack.config.js 中的 plugins 的 plugin 后调用
- run --------------------- 在 Compiler.run() 执行后调用
- compile ----------------- 在打包函数 compile 执行前调用
- afterCompile ------------ 在打包函数 compile 执行后调用
- emit -------------------- 在把文件写入到 webpack.config.js 的 output 文件夹 (前) 执行
- done -------------------- 打包总流程执行完后调用
- 以上钩子是按照生命周期顺序调用的，有先后顺序之分

### (2) babel 处理 AST 的过程

- @babel/parse ------------ 解析 将 ( js 源码字符串 ) 转成 ( AST ) 抽象语法树
- @babel/traverse --------- 遍历 AST
- @babel/types ------------ 操作 AST，即进行 增删改查
- @babel/generator -------- 生成 将修改后的 AST 转成 新的源码字符串

### (3) loader 和 plugin 执行的时机

- plugin
  - 执行时机：在 webpack.Compiler.constructor 中去执行 plugin 中的 apply 方法的
  - 调用时机: 在 compiler 生命周期的各个阶段进行调用
  - 扩展：
    - 插件的注册：webpack 的每个 plugin 都有一个 apply 方法，参数是 compiler 实例, apply 方法会对插件进行 tapable 的 ----- ( tap 注册 )
    - 插件的调用：然后在不同的方法执行时去 --------------------------------------------------------------------------- ( call 调用 )
- loader
  - 执行时机：Compiler -> run -> buildModules -> getSource
  - 注意: loader 是有执行顺序的，是 ( 从右边左, 从下往上 ) 的顺序执行 => module/rules

### (4) loader

- 特点
  - 1. loader 是一个函数，loader 函数第一个参数是 所匹配资源的 ( 源码字符串 ) 或 ( 上一个 loader 产生的结果, 因为同一个资源可以用多个 loader 来处理 )
  - 2. loader 执行是有顺序的，从 ( 右到左，从下到上 ) - ( 比如: 先 sass-loader > postcss-loader > css-loader > style-loader )
  - 3. loader 函数不能是箭头函数，因为 loader 函数内部需要使用 this 获取很多配置数据
       - this.getOptions()
       - this.query
       - this.callback()
       - this.async()
  - 4. loader 的执行时机是在 Compiler -> run -> buildModules -> getSource
- 参数
  - content: 源文件的内容
  - map: 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
  - meta: meta 数据，可以是任何内容
- loader 函数中的 this
  - this.query
    - 获取 loader 的配置对象，即 `{ loader: 'xx', options: {} }` 中的 options 对象
    - 注意：this.query 已经废弃，使用 loader-utils 中的 getOptions 来获取 options 对象
  - this.getOptions
    - 获取 webpack.config.js 中 module.rules 中 loader 配置的 options 对象
    - webpack5 中已经自带 **this.getOptions()** 来代替 loader-utils 插件 了
  - this.callback
    - 第一个参数：err // Error 或者 null
    - 第二个参数：content // string 或者 buffer，即处理过后的源代码
    - 第三个参数：sourceMap // 可选，必须是一个可以被这个模块解析的 source map
    - 第四个参数：meta //可选，即元数据
  - this.async
    - 处理 loader 中的异步操作
    - this.async() 方法返回 this.callback
- loader 中获取 loader 的配置对象 options
  - 注意: webpack5 中已经自带 **this.getOptions()** 来代替 loader-utils 插件 了
  - 需要安装 `loader-utils 插件`, options 对象即`{ loader: 'xx', options: {} }`
  - loader-utils 插件
    - 安装: npm install loader-utils -D
    - 获取: 通过 loader-utils 中的 `getOptions` 获取 loader 的 options 配置对象
- 注意点
  - loader 不能写成 ( 箭头函数 )，因为函数内部需要使用 ( this ) 来获取更多的 api
  - 比如:
    - this.getOptions()
    - this.query
    - this.callback()
    - this.async()

```
(1)
我们自己写的loader，如何在 webpack.config.js 中使用？
// 一共有两种方法
// 方法1
// - 在 webpack.config.js 中使用 resolveLoader 配置项来配置
// - 然后在 module.rules 中使用
resolveLoader: {
  // 表示在寻找loader时，先去node_modules中找，再去loaders文件夹中找
  modules: ["node_modules", path.resolve(__dirname, "./loaders/")],
}
{
  test: /\.tsx?$/,
  use: [
    "ts-loader",
    {
      loader: "myReplace-loader",
      options: { name: "####", },
    },
  ],
}
// 方法2
// - 直接写路径
module: {
  rules: [{
    test: /\.js$/,
    use: [path.resolve(__dirname, './loaders/myReplace-loader.js')]
  }]
}
```

### (5) plugin

- 发布订阅模式：webpack-plugin 的发布订阅模式，是通过 tapable 来实现的
- 特点
  - 类：plugin 是一个类，因为是通过 new 的方式调用插件
  - apply 方法：每个 plugin 都有一个 apply 方法，在 new Plugin() 执行插件时被调用
  - apply 方法的参数：参数是 compiler 实例，即 Compiler 类 new 时生成的实例
- 过程
  - 注册 **tap**
    - 1. apply() ------> plugin 会在 Compiler.constructor 中被调用，通过调用 plugin.apply(compiler)，执行 apply 方法
    - 2. apply(compiler)内部 ---> 会调用 compiler 实例上的 ( hooks ) 属性中的 ( 不同的生命周期方法 ) 上的 ( tap ) 方法进行 plugin 插件的注册
  - 调用 **call**
    - 在 Compiler 中的不同的函数之间，通过 hooks.call() 来调用
- 插件类型
  - 3 种注册方式: tap tapAsync tapPromise
  - 3 种调用方式: call callAsync callPromise

### (6) 实现一个 loader 和 plugin

```
1
loader
- myReplace-loader
- myStyle-loader
- 详见: 本项目/1-FRONTEND/8-WEBPACK/loaders

2k
plugin
- MyCleanWebpackPlugin
- 详见: 本项目/1-FRONTEND/8-WEBPACK/plugins
```

### (7) path

```
1
path.resolve()
- 作用: 将( 路径或路径片段 ) 的序列解析为 ( 绝对路径 )
- 返回值：一个绝对路径
- 注意: 不传参数将返回当前工作目录的绝对路径

2
path.join()
- 拼接路径

3
__dirname 和 __filename
- __dirname: ( 执行node命令的文件 ) 所在的 ( 目录 ) 的 ( 绝对路径 )
- __filename: ( 执行node命令的文件 ) 的 ( 绝对路径 )
- 案例
  - path.resolve(__dirname, 'aa') 表示webpack.config.js所在文件夹的路径/aa
```

### (二) **【 webpack 性能优化 -- 一共 (10) 种优化方法 - performance optimization. 】**

### (1) noParse

- module.noParse
  - 作用：让 loader 不去解析该模块的依赖关系，提升构建速度，因为解析需要去遍历。前提是 - 你知道该模块没有依赖任何模块
  - 类型：后面接一个正则表达式
  - 比如: 我们明确知道 jquery 和 lodash 这两个库没有依赖其他任何的库，就不需要去解析它们的依赖，从而提高构建速度

```
module: {
  noParse: /jquery|lodash/, // 不去解析jquery或lodash的依赖关系，因为它们俩都没有依赖其他库，从而提高构建速度
  rules: []
}
```

### (2) include 和 exclude

- 作用：缩小 loader 寻找文件的范围
- 配置：module.rules[number].include 或 module.rules[number].exclude 来缩小 loader 匹配文件的范围
- loader 寻找文件的过程
  - 因为：默认 loader 会寻找 ( node_modules ) 文件夹，然后大多数情况下 loader 只需要处理 ( 本项目 ) 中的文件
  - 所以：可以通过 include 和 exclude 来做范围控制

```
module: {
  noParse: /jquery|lodash/,
  rules: [
    {
      exclude: /node_modules/, // 表示 babel-loader 不去解析 node_modules 中的 js 文件，从而提升构建和打包速度
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {}
      }
    }
  ]
}
```

### (3) DllPlugin 和 DllReferencePlugin --------------------- 动态链接库，抽离第三方包 ( pack separately. 单独打包 )

- 动态链接库
  - DllPlugin
    - 在单独打包 ( 第三方库 ) 时，生成 ( 动态链接库 )，一个 json 文件
  - DllReferencePlugin
    - ( 引用动态链接库 )，就不用重新在打包了，提升构建速度
- 总结
  - 案例：
    - 1.比如我们使用到了 react 和 reactDom，就可以利用 DllPlugin 单独打包，
    - 2.然后当我们修改了业务组件时，就不用重新打包 react 和 reactDom，而是通过 DllReferencePlugin 直接引用之前打包好的文件
  - 效果：提升构建速度 和 本地开发时，修改组件后重新打包的时间
- English
  - separate 分开 分裂 v
  - separately 单独地 分开地 adv

### (4) optimization.splitChunks.cacheGroups ---------------- 抽离自己的业务组件 或 第三方包

- 作用：抽离 ( 公共组件 和 第三方组件 )
- 具体
  - optimization -> splitChunks -> cacheGroups -> venders|commons

```
optimization: {
  minimizer: {}, // 压缩css和js的配置项
  splitChunks: { // 分割chunk
    cacheGroups: { // 缓存组
      commons: { // 公共组件 },
      venders: { // 第三方组件
        name: '', // 打包后的名字
        minChunks: 1, // 被引用的最小次数，大于等于该数字时就会单独打包成一个chunk
        priority: 11, // 表示优先级，值越大表示优先级越高
        minSize: 1, // 最小的大小，大于等于该值就会单独打包
      }
    }
  }
}
```

### (5) webpack.ignorePlugin

- 作用
  - 忽略引入的这个 ( 库 - 中引入的文件 )
  - 忽略后，则可以自己手动引入该库需要在本项目中用到的一些文件，从而减少包的大小

```
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
```

### (6) happyPack ------------------------------------------- 多线程打包

- 作用：开启多线程打包
- 分类：
  - 可以开启对 js 资源的多线程打包，开启对 css 资源对多线程打包
  - 即可以针对不同的资源，决定是否开启多线程打包

### (7) webpack 自带的一些优化 -------------------------------- ( treeShaking )

- **【 tree-shaking 】**
  - 条件：必须使用 es6 中的 ( import ) 语法，( tree-shaking ) 会自动在 ( 编译阶段 ) 注意不是代码运行阶段， ( 删除 ) 掉模块中 ( 没有被使用到的代码 )
  - 扩展：tree-shaking 的原理
    - import
      - 因为：import 语法是 ES6 中的模块化方案 ( ESModule )
      - 优点：
        - 1. 该方案的优点是在 ( 编译阶段 ) 就知道 ( 模块的依赖关系 )，和 ( 输入输出的变量 ) --- 是静态的，即在 runtime 之前的阶段
        - 2. 可以在 ( browser ) 和 ( node ) 端同时适用，没有环境限制，ES 还提供 ( globalThis ) 获取全局变量 ( window / global ).
      - 扩展: 注意区分 esModule 和 commonjs 规范 直接的区别？
    - map 映射
      - 1. 统计模块中的 export 的变量
      - 2. 统计业务方代码使用到的 import 变量
      - 3. 对比 12，就能知道 ( 该模块中哪些变量被使用到了 )，对没有使用到的变量打上 ( 标记 )
    - 压缩
      - 在压缩代码阶段，比如插件 uglify-js 就会在压缩阶段 ( 删除没有使用到的代码 )
- **【 scope-host 】**
  - webpack 会自动优化一些可以优化的代码
  - 比如：声明多个变量，然后相加的操作，webpack 就会合并变量

### (8) fileLoader 和 urlLoader ------------------------------ ( base64 )

- fileLoader
  - 将 ( 图片 ) 打包到文件夹中，并将 ( 图片地址 ) 返回 回来
- urlLoader
  - 作用: 转 Base64 的图片
  - 优点:
    - 1. 将图片转成 Base64 的图片，其实是将图片信息集成到了 css 文件中，css 文件是提前加载的，不会单独加载图片从而实现 （ 预加载 ）
    - 2. 同时减少了 图片请求 次数，减少了一次单独的请求
  - 缺点: Base64 图片，会增加 css 文件的大小，增加首屏渲染的时间
  - 1. urlLoader 具有 fileLoader 的功能外
  - 2. 还可以通过 ( option.limit ) 来指定一个 ( 值 )，当 ( 图片大小 ) 小于该阈值时，会将图片转成 ( Base64 ) 的图片
- 扩展
  - 如何实现图片预加载 https://juejin.cn/post/6893681741240909832

### (9) 路由懒加载 -------------------------------------------- ( Lazy Load. = Code splitting. 代码分割 ) ( ESModule import )

- **import()函数 + webpack 分包打包策略 = 来实现路由懒加载** ------ 比如: vue 中的路由懒加载
  - import() 函数 --- 实现动态加载模块( 懒加载 - 异步加载 )
    - 参数：文件路径
    - 返回值：返回一个 promise 对象
    - 特点
      - import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用
      - 它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块
    - 使用场景
      - 按需加载
      - 条件加载
      - 动态的模块路径

```
const button = document.createElement("button");
button.innerHTML = "动态加载";
button.style.border = "10px solid blue";
button.style.margin = "10px";
button.addEventListener("click", () => {
  import("./test-import().js").then((res) =>
    console.log(`动态获取，动态引入模块中的导出的值`, res.default.a)
  );
});
document.documentElement.insertBefore(button, document.body);
```

### (10) 开启 gzip 压缩 --------------------------------------- ( compress code. 压缩代码 )

### (三) **【 Webpack Interview 】**

### (1) hash chunkhash contenthash

- 影响范围: hash > chunkhash > contenthash

- **【 hash 】**
  - 作用：整个项目的 ( 任何一个文件 ) 修改，整个项目打包后的 ( 所有文件的 hash ) 都会变化
  - 缺点：
    - 如果只是修改了一个文件，导致整个打包后的所有文件 hash 都会变化，( 缓存就会失效 )
    - 我们只修改了一个文件，有很多文件没有修改，是可以进行缓存提升性能的，然后 hash 会修改所有文件的名字，导致缓存失效
- **【 chunkhash 】**
  - 对比：相对于 hash，则 chunkhash 影响文件的 ( 范围变小 )
  - 原理：
    - 根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值
    - ( 不同入口 entry )，会打包成不同的 ( chunk ), 打包生成的 chunk 的 hash 不一样
      - **entry: 是对象时，不同的 key 表示不同的入口** - `entry: { main: "./src/index.js", other: xxx }`
      - **output: 对象的 filename 使用占位符，即可以打包成不同的文件** - `output: { filename: "[name].[hash:8].js", path: xxx }`
  - 总结：
    - 1. 也就是说：如果有两个入口 entry，就会打包成两个 chunk，这两个 chunk 的 hash 值不一样
    - 2. 我们修改其中一个 chunk 中的组件文件，只会影响的该 chunk 打包后的文件 hash，另一个 chunk 不受影响
  - 例子：
    - 策略：比如一个项目有 6 个组件，123 打包为一个 thunk1 输出一组 js/css，456 打包为另一个 thunk2 输出另一组 js/css
    - 结果： 如果使用 chunkhash，打包完成后 chunk1 的 hash 和 chunk2 的 hash 就不一样，改动了 123，456 的 chunk2 的 hash 就不会变，缓存仍然有效
- **【 contenthash 】**
  - 对比：contenthash 在 hash，chunkhash，contenthash 三者中，( 影响范围最小 )
  - 案例
    - 遇到问题
      - 使用 chunkhash，如果 index.css 被 index.js 引用了，那么 ( css 文件和 js 文件 ) 就会 ( 共用相同的 chunkhash 值 )
      - 如果 index.js 更改了代码，css 文件就算内容没有任何改变，由于是该模块发生了改变，导致 css 文件的 hash 也会变化，导致重复构建
    - 解决方法
      - 使用 ( **【 mini-css-extract-plugin 】** ) 里的 ( contenthash ) 值，保证即使 css 文件所处的模块里就算其他类型的文件内容改变，比如 js 改变，只要 css 文件内容不变，那么不会重复构建
- 使用
  - 问题：在哪些地方可以使用到 hash chunkhash contenthash
  - 回答：凡是在 webpack.config.js 中具有 ( filename ) 属性的地方都可以使用 ( 占位符的方式 [hash|chunkhash|content] ) 使用到这几种 hash

### (2) cross-env 和 webpack.DefinePlugin 和 mode 三者的区别？

- AA.
- cross-env
  - cross-env 是什么
    - cross-env 是一个单独的库，具有跨平台使用(环境变量)的优点，能兼容 windows 平台和 mac 平台
    - 比如: windows 不支持 NODE_ENV=development 的设置方式，所以使用 cross-env 做兼容
  - node 环境变量: cross-env 定义的是 -------------------- 1. node 中的环境变量
    - 1.解释: 在使用 webpack 情况下，node 环境指代的是 webpack.config.js 等
    - 2.设置: 通过在 package.json 中的 scripts 中设置 `"build:test": "cross-env NODE_ENV=development webpack --config webpack.config.js"`
    - 3.获取: 在 `webpack.config.js` 中通过 ( `process.env.NODE_ENV` ) 就可以获取到
- BB.
- webpack.DefinePlugin
  - 浏览器环境变量：webpack.DefinePlugin() 定义是的 ------- 2. 浏览器中的环境变量
- CC.
- mode
  - 浏览器环境变量：mode 是指定 --------------------------- 3. 浏览器中的环境变量
- 以下表达式等价
  - `( mode: 'development' ) === webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')})`
- 环境
  - 浏览器环境: vue 项目的入口 main.ts 等前端业务页组件中都满足
  - node 环境: webpack.config.js
- 问题
  - 问题：如何同步浏览器环境 和 node 环境的环境变量呢？
  - 回答：
    - 1. 在 package.json 的 script 中设置 cross-env 的 NODE_ENV 的值是 'development'
    - 2. 在 webpack.config.js 中将 ( mode 的值设置为 process.env.NODE_ENV ) 或者 ( webpack.definePlugin({process.env.NODE_ENV: JSON.stringify('development') }) )
- 源码
  - 源码地址 ( 浏览器中的环境变量 ): https://github.com/woow-wu7/8-divine/blob/main/examples/main.js
  - 源码地址 2 ( node 中的环境变量 ): https://github.com/woow-wu7/7-compiler/blob/main/webpack.config.js

```1
一
同步浏览器环境 和 node 环境中的环境变量

1. 在webpack.config.js中
mode: process.env.NODE_ENV,
// 注意：1. 这里是 ( webpack.config.js ) 文件，属于 ( node环境 )，而不是 ( 浏览器环境 )
// 注意：2. 这里的 ( process.env.NODE_ENV ) 是通过 ( package.json 中的 scripts 中的 cross-env 来指定的 )；
// 注意：3. mode 指定的是 ( 浏览器中的环境变量，只不过这里的mode的值process.env.NODE_ENV是通过cross-env来指定的 )
// 问题：-- 自然而然会想到一个问题？如何同步浏览器和node环境中的环境变量呢？
// 回答：-- 就是利用这里的方式 ( mode: process.env.NODE_ENV )，
// 原理：-- ( cross-env NODE_ENV=aaa ) => 那么这里的 ( process.env.NODE_ENV=aaa ) => 推出 ( mode=aaa ) => ( webpack.DefinePLugin({'process.env.NODE_ENV': JSON.stringify(aaa)}) ) => ( 在浏览器环境中的 process.env.NODE_ENV=aaa )
// 总结：
// - cross-env -------------------------> 指定的是 node 环境中的环境变量
// - webpack.DefinePlugin() ------------> 指定的是 浏览器 环境你中的环境变量
// - mode ------------------------------> 指定的是 浏览器 环境中的环境变量，这里 ( mode: process.env.NODE_ENV ) 相当于 ( webpack.DefinePLugin({'process.env.NODE_ENV': JSON.stringify('xxxx')}) )
// - ( mode: 'development' ) 相当于 ( webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}) )
```

```2
二
总结
---
1
浏览器中的环境变量有两种方式指定
- 以下两种等价
  - 1. 通过 webpack.config.js 中的 mode:xxxx 来指定
  - 2. 通过 webpack.config.js 中的 webpack.definePlugin({process.env.NODE_ENV: JSON.stringify('xxxx') })
- 原理
  - cross-env NODE_ENV=xxxx ---> webpack.config.js中就可以通过 process.env.NODE_ENV 获取到 xxxx ---> 再把 mode: process.env.NODE_ENV ---> 则浏览器中的 process.env.NODE_ENV 就等于了 xxxx
```

### (3) webpack 打包多页应用

- 1. entry 设置为 ( 对象模式 )，即可以指定 ( 多个入口 )
- 2. output 的 ( filename ) 设置为 ( '[name].[hash:8].js' ) 的形式，这里使用到了 ( 占位符 ) 则可以分别打包为不同的 ( 出口文件 )
- 3. plugin 数组中，需要多次 ( new HTMLWebpackPlugin() )
  - a.
    - 不同 html 引入不同 js: 并且可以指定 ( chunks: ['home'] ) 来表示当前 html 引入哪些 js 文件
    - 比如: 这里表示引入 home.js 文件，因为 output 中有多个 js 文件，不同的 html 不一定要引入所有的 js
  - b. 如果不设置 chunks 属性，那么每个 html 都会引入所有的 output 中的所有 chunk

```
webpack.config.js
---

1
entry: {
  main: "./src/index.js", // ----------------------- 这里entry是一个对象，main 就是打包后的 thunk 名称
  other: "./src/other.js",
}


2
output: {
  filename: "[name].[hash:8].js", // --------------- 通过 ( [] 占位符 ) 则可以 entry 获得不同的 output
  path: path.resolve(__dirname, "build"),
}


3
plugins: [
  new HtmlWebpackPlugin({
    chunks: ['home'], // --------------------------- 打包多页应用时，可以指定 chunks，--- 表示 index.html 只引用了 home.js 文件，而不是 home.js 和 other.js 都引入
    template: "./src/index.html",
    filename: "index.html", // 打包过后的html的文件名
    hash: true, // 在打包后的build文件夹中的html文件引入资源时，是否加hash串
  }),
  new HtmlWebpackPlugin({
    chunks: ['other'],
    template: "./src/index.html",
    filename: "other.html",
    hash: true,
  }),
]
```

### (4) webpack 常见配置项

```1
webpack常见配置项
- mode
- entry
- output
- module.noParse
- module.rules[{test,use,include,exclude}]
- plugins
- dev-tool
- devServer
- resolve.alias
- resolve
- resolveLoader // 可配置loader寻找的地方，比如自己写的loader
- optimization.minimizer
- optimization.splitChunks.cacheGroups - common vender
```

````2
详细配置
---
module.exports = {
  // mode
  //  1. mode: 表示模式
  //      - development 开发环境
  //      - production  生产环境

  mode: process.env.NODE_ENV,
  // 注意：1. 这里是 ( webpack.config.js ) 文件，属于 ( node环境 )，而不是 ( 浏览器环境 )
  // 注意：2. 这里的 ( process.env.NODE_ENV ) 是通过 ( package.json 中的 scripts 中的 cross-env 来指定的 )；
  // 注意：3. mode 指定的是 ( 浏览器中的环境变量，只不过这里的mode的值process.env.NODE_ENV是通过cross-env来指定的 )
  // 问题：-- 自然而然会想到一个问题？如何同步浏览器和node环境中的环境变量呢？
  // 回答：-- 就是利用这里的方式 ( mode: process.env.NODE_ENV )，
  // 原理：-- ( cross-env NODE_ENV=aaa ) => 那么这里的 ( process.env.NODE_ENV=aaa ) => 推出 ( mode=aaa ) => ( webpack.DefinePLugin({'process.env.NODE_ENV': JSON.stringify(aaa)}) ) => ( 在浏览器环境中的 process.env.NODE_ENV=aaa )
  // 总结：
  // - cross-env -------------------------> 指定的是 node 环境中的环境变量
  // - webpack.DefinePlugin() ------------> 指定的是 浏览器 环境你中的环境变量
  // - mode ------------------------------> 指定的是 浏览器 环境中的环境变量，这里 ( mode: process.env.NODE_ENV ) 相当于 ( webpack.DefinePLugin({'process.env.NODE_ENV': JSON.stringify('xxxx')}) )
  // - ( mode: 'development' ) 相当于 ( webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}) )

  // entry
  //  1. entry 表示thunk的入口点
  //  2. entry 的简单规则
  //      - html: 每个html都有 一个入口起点
  //      - 单页应用spa: 一个入口起点
  //      - 多页应用mpa: 多个入口起点
  //  3. 如果entry后面跟一个 ( 字符串 )，或者 ( 字符串数组 )，chunk会被命名为 ( main ) ---- main
  //  4. 如果entry后面跟一个 ( 对象 )，则 ( key ) 就是 thunk名 -------------------------- key

  //  5. 如何打包一个多页应用
  //      - 1. entry设置为 ( 对象模式 )，则可以指定 ( 多个入口 )
  //      - 2. output的 ( filename ) 设置为 ('[name].[hash:8].js' ) 的形式，使用 ( 占位符 ) 则可以分别打包为不同的 ( 出口文件 )
  //      - 3. plugins 数组中需要多次 ( new HtmlWebpackPlugin() )，具体如下
  // plugins: [
  //   new HtmlWebpackPlugin({ // ---------------------------- html-webpack-plugin可以new多个
  //     template: './src/index.html', // 模版html
  //     filename: 'home.html', // 打包后的html文件名
  //     chunks: ['home'] // --------------------------------- 每个chunk对应加载哪些打包后的 js 文件，即 output指定的输出js文件
  //   }),
  //   new HtmlWebpackPlugin({
  //     template: './src/index.html',
  //     filename: 'other.html',
  //     chunks: ['other']
  //   }),
  // ]

  entry: {
    main: "./src/index.js", // 这里entry是一个对象，main 就是打包后的 thunk 名称
    other: "./src/other.js",
  },

  // 扩展
  // ### 打包多页应用
  // - 1. entry 设置为 ( 对象模式 )，即可以指定 ( 多个入口 )
  // - 2. output 的 ( filename ) 设置为 ( '[name].[hash:8].js' ) 的形式，这里使用到了 ( 占位符 ) 则可以分别打包为不同的 ( 出口文件 )
  // - 3. plugin 数组中，需要多次 ( new HTMLWebpackPlugin() )
  //    - a. 不同html引入不同js: 并且可以指定 ( chunks: ['home'] ) 来表示当前 html 引入哪些 js 文件，比如: 这里表示引入 home.js 文件，因为 output 中有多个 js 文件，不同的html不一定要引入所有的js
  //    - b. 如果不设置 chunks 属性，那么每个html都会引入所有的 output 中的所有 chunk
  // ```
  // webpack.config.js
  // ---
  // 1
  // entry: {
  //   main: "./src/index.js", // 这里entry是一个对象，main 就是打包后的 thunk 名称
  //   other: "./src/other.js",
  // }
  // 2
  // output: {
  //   filename: "[name].[hash:8].js",
  //   path: path.resolve(__dirname, "build"),
  // }
  // 3
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: "./src/index.html",
  //     filename: "index.html", // 打包过后的html的文件名
  //     hash: true, // 在打包后的build文件夹中的html文件引入资源时，是否加hash串
  //     chunks: ['home'] // 打包多页应用时，可以指定 chunks，--- 表示 index.html 只引用了 home.js 文件，而不是 home.js 和 other.js 都引入
  //   }),
  //   new HtmlWebpackPlugin({
  //     template: "./src/index.html",
  //     filename: "other.html",
  //     hash: true,
  //     chunks: ['other']
  //   }),
  // ]
  // ```

  // output
  //  1. filename
  //      - filename: 表示打包后的 thunk 的名字
  //      - '[name].[hash:8].js'
  //        - []: 表示占位符
  //        - [name]: 表示使用 entry 属性对象中的 key 作为thunk名，此时 entry 是一个对象，通过key指定不同的入口文件名
  //        - [hash:8]: 表示加上hash串，长度为 8，从而是文件变动后生成不同的hash来使缓存失效，一共有三种hash: hash chunkHash contentHash
  //  2. path
  //      - path: 表示打包生成的文件夹的路径
  //  3. hash chunkhash contenthash 之间的区别？
  //      - hash
  //          - 作用：只要项目中有文件修改，整个项目构建的hash都会改变，并且全部文件都共用相同的hash
  //          - 弊端：如果只修改了一个文件，整个文件的缓存都将失效，因为真个文件的hash都改变了
  //      - chunkhash
  //          - 相对于hash，chunkhash的影响范围较小
  //          - 原理：
  //            - 根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值
  //            - 不同入口打包生成的chunk的hash不一样
  //          - 测试
  //            - 请使用 cnpm run build 进行 chunkhash 的测试，main和other的js文件的hash值就不一样
  //          - 例子：
  //            - 策略：比如一个项目有6个组件，123打包为一个thunk1输出一组js/css，456打包为另一个thunk2输出另一组js/css
  //            - 结果： 如果使用chunkhash，打包完成后chunk1的hash和chunk2的hash就不一样，改动了123，456的chunk2的hash就不会变，缓存仍然有效
  //      - contenthash
  //          - 1. 影响范围最小，在hash，chunkhash，contenthash三者中
  //          - 2. 遇到问题
  //            - 使用chunkhash，如果index.css被index.js引用了，那么 ( css文件和js文件 ) 就会 ( 共用相同的chunkhash值 )
  //            - 如果index.js更改了代码，css文件就算内容没有任何改变，由于是该模块发生了改变，导致css文件会重复构建
  //          - 3. 解决方法
  //            - 使用 ( mini-css-extract-plugin ) 里的 ( contenthash ) 值，保证即使css文件所处的模块里就算其他文件内容改变，只要css文件内容不变，那么不会重复构建
  //      - 总结
  //          - hash(任何一个文件修改，整个打包所有文件的hash都会改变)： - 是根据整个项目构建，要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值
  //          - chunkhash(只影响到不同entry划分的chunk)：chunkhash根据不同的入口文件(Entry)进行依赖文件解析、构建对应的代码块（chunk），生成对应的哈希值，某文件变化时只有该文件对应代码块（chunk）的hash会变化
  //          - contentHash(即使是相同chunk的js和css，改动js只会影响对应的js而不会影响到css)：每一个代码块（chunk）中的js和css输出文件都会独立生成一个hash，当某一个代码块（chunk）中的js源文件被修改时，只有该代码块（chunk）输出的js文件的hash会发生变化
  //  4. 在哪些地方可以使用到 hash chunkhash contenthash
  //      - 凡是在 webpack.config.js 中具有 ( filename ) 属性的地方都可以使用 ( 占位符的方式 [hash] ) 使用到这几种hash
  output: {
    filename: "[name].[hash:8].js",
    // filename: "[name].[chunkhash:8].js",
    // filename: '[name].[content:8].js',
    path: path.resolve(__dirname, "build"),
    // library: "[name]", // 将打包后的模块赋值给变量，并导出
    // libraryTarget: "var", // 1. 使用commonjs的方式导出，即 export.default 的方式导出； 2.可以设置的值比如 var commonjs umd
  },

  // devServer
  //  1. proxy
  //      - 表示跨域代理
  //      - 如果不希望传递 '/api' 需要用 pathRewrite 重写路径
  //  2. contentBase
  //      - contentBase: 表示服务器的内容来源
  //      - 注意: contentBase 需要和 output.path 保持一致
  //  3. host主机  port端口  compress开启gzip压缩  hot开启热更新
  devServer: {
    // 本地开发服务器 - 配置项
    contentBase: path.join(__dirname, "build"),
    host: "localhost", // 主机，可以从外部访问
    port: 5555,
    compress: true, // 开启 gzip 压缩
    open: true, // 启动后，打开浏览器
    hot: true, // 启用热更新
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:7777',
    //     pathRewrite: {
    //       '^/api': ''
    //     },
    //     // https相关
    //     // 可以发送 https，默认使用自签名证书，也可以提供自己的证书，如下三个属性 key cert ca
    //     https: true,
    //     key: fs.readFileSync('/path/to/server.key'),
    //     cert: fs.readFileSync('/path/to/server.crt'), // certificate 证书的缩写
    //     ca: fs.readFileSync('/path/to/ca.pem'),
    //     secure: false,
    //   }
    // }
  },

  // devtool
  // - source-map
  // - eval-source-map
  // https://webpack.js.org/configuration/devtool/#root
  devtool: "source-map", // 显示行数，产生map文件
  // devtool: 'eval-source-map', // 显示行数，不产生map文件

  resolve: {
    // resolve.fallback 是 webpack5 新增加的配置
    // fallback: {
    //   path: require.resolve("path-browserify"), // path相关
    // },
    alias: {
      "@images": path.resolve(__dirname, "./src/images"), // 设置别名
    },
  },

  // module
  //  1. loader --------------------------------------------------------------------- loader
  //      - loader顺序: 从右往左，从下往上
  //      - 比如css相关的loader顺序: sass-loader => css-loader => style-loader
  //  2. css相关的loader
  //      - style-loader 主要用来解析 ( @import ) 语法
  //      - css-loader 将css插入到html的 ( head ) 部分
  //      - sass-loader node-sass less
  //      - 问题:
  //        - 1. 如果只用 ( style-loader和css-loader ) 会直接插入到HTML中
  //          - 可以用webpack-dev--server启动服务在html中f12查看elements，css插入到了head部分
  //          - 注意，并不是插入到打包后的html中，而是要启动服务才会看到到
  //        - 2. 如何使用sass？？？？
  //          - sass-loader sass node-sass
  //          - 先用 sass-loader => css => css-loader => style-loader => 插入html的head
  //        - 3. 那么要如何把 css 抽离成单独的文件来引入呢？？？？
  //          - mini-css-extract-plugin 单独抽离css文件
  //        - 4. css的前缀，兼容性怎么处理？？？？
  //          - postcss-loader 用来解决浏览器前缀，兼容性处理，可以单独配置 postcss.config.js
  //          - autoprefixer 需要配合autoprefixer插件
  //          - 顺序问题: 先处理sass => 加上前缀后 => 识别@import => 抽离css
  //          - 顺序具体: sass-loader => postcss-loader => css-loader => MiniCssExtractPlugin.loader
  //          - 如何配置
  //            - 单独新建 postcss.config.js 在该文件中引入 autoprefixer
  //            - autoprefixer需要给出浏览器的一些信息，需要在package.json中配置 browsersList 属性
  //  3. 图片相关loader
  //      - file-loader
  //      - url-loader // 当图片小于阈值时转成base64，大于于阈值时使用file-loader
  module: {
    noParse: /jquery|lodash/, // ------ 不去解析jquery或lodash的依赖关系，因为它们俩都没有依赖其他库，从而提高构建速度
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      // { // 非单独抽离，插入html的head部分
      //   test: /\.scss$/,
      //   use: [
      //     {loader: 'style-loader'},
      //     {loader: 'css-loader'},
      //     {loader: 'sass-loader'},
      //   ]
      // },
      {
        // 单独抽离
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "postcss-loader" }, // 先处理sass => 处理前缀 => 处理@import => 抽离css
          { loader: "sass-loader" },
        ],
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: "babel-loader", // options已在 .babelrc 文件中单独配置
      //       options: {
      //         // ------------- use数组中如果是对象的方式，则可以配置 ( options配置对象 ) 和 ( loader ) 等
      //         presets: [["@babel/preset-env"], ["@babel/preset-react"]],
      //         // plugins: [
      //         //   ['@babel/plugin-proposal-decorators', {'legacy': true}],
      //         //   ['@babel/plugin-proposal-class-properties', {'loose': true}],
      //         //   ['@babel/plugin-transform-runtime'],
      //         //   ['@babel/plugin-syntax-dynamic-import'],
      //         // ]
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "HappyPack/loader?id=js",
        // happypack：使用happypack插件，实现多线程打包
        // 含义：这里表示在打包js文件时，使用的是happypack的loader进行打包
        // 注意：这里只是表明了使用说明loader，具体的happypack的loader的设置项是在plugins中设置的
        // 需要配置两个地方
        // 1. 就是这里的配置
        // 2. 在plugins中配置
      },
      // 加载自定义的 loader - replaceLoader
      {
        test: /\.js$/,
        use: [path.resolve(__dirname, "./loaders/replace-loader.js")],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 200 * 1024, // 小于200k转成base64, 大于200k使用file-loader来处理加载图片
              esModule: false, // 用于html-withimg-plugin生效
              outputPath: "img/", // 输出到 img 文件夹中
              publicPath: "", // 单独配置img的公共路径，而不是在output中全部配置
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: "html-withimg-loader",
      },
    ],
  },

  // plugins
  //  1. html-webpack-plugin
  //      - 主要作用：将模板html打包到output指定的文件夹，并实现自动引入依赖打包后的其他资源
  //      - template: 指定模板html
  //      - filename: template模板html文件打包后的html的名字
  //      - hash: 打包后的html引入资源的名字是否加上hash
  //  2. mini-css-extract-plugin
  //      - 主要作用：单独抽离css，sass等
  //      - 在plugins中: new MiniCssExtractPlugin()
  //      - 在module.rules中: MiniCssExtractPlugin.loader
  //  3. optimize-css-assets-webpack-plugin 和  uglifyjs-webpack-plugin 一起来压缩css和js
  //      - 主要在 production生产环境才需要压缩css和js
  //      - optimization.minimizer
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html", // 打包过后的html的文件名
      hash: true, // 在打包后的build文件夹中的html文件引入资源时，是否加hash串
      // minify: {
      //   removeAttributeQuotes: true, // 删除html属性的双引号
      //   collapseWhitespace: true, // 将html折叠成一行
      // }
      // chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      // 打包多页应用时，可以指定 chunks
      template: "./src/index.html",
      filename: "other.html", // 打包过后的html的文件名
      hash: true, // 在打包后的build文件夹中的html文件引入资源时，是否加hash串
      // minify: {
      //   removeAttributeQuotes: true, // 删除html属性的双引号
      //   collapseWhitespace: true, // 将html折叠成一行
      // }
      // chunks: ['other']
    }),
    // copy-webpack-plugin
    // 这是webpack5的配置，本项目中用到的webpack4，所以不能使用这种写法
    // 报错信息：TypeError: compilation.getCache is not a function
    // 解决办法：移除copy-webpack-plugin, 安装5.0版本的copy-webpack-plugin即可解决！
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "./toCopyConsume"), // 将 toCopyConsume 中的文件拷贝到 to中的文件夹中
    //       to: "./", // 将会拷贝到打包后的文件中的根目录，比如build文件夹
    //     },
    //   ],
    // }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "./toCopyConsume"), // 将 toCopyConsume 中的文件拷贝到 to中的文件夹中
        to: "./", // 将会拷贝到打包后的文件中的根目录，比如build文件夹
      },
    ]),
    new MiniCssExtractPlugin({
      filename: "css/main.css", // 指定被打包后的文件夹，和文件名
      // filename: 'main.css', 抽离出来的css文件名
    }),

    new webpack.DefinePlugin({
      AUTH: JSON.stringify("AUTH_NAME"), // --- 需要使用 JSON.stringify()
    }),
    // webpack.DefinePlugin 和 cross-env 和 mode 的区别？？？？？？？？？？？
    // - cross-env
    //   - 作用：设置的是 ( node的环境 ) 中的环境变量 process.env，也就是说只能在webpack.config.js中访问到
    //   - 例子：`{ scripts: { "test:dev": "cross-env NODE_ENV=development OTHER_ENV=other webpack serve --config build/webpack.config.js" }}`
    //   - 语法：cross-env可以设置多个node环境的环境变量，只需要空格隔开就行，如上
    //   - 安装：npm install cross-env
    // - webpack.DefinePlugin()
    //   - 设置的是 ( 浏览器环境 ) 中的环境变量，也就是说可以在各个js文件中使用到 webpack.DefinePlugin() 中定义的环境变量
    //   - 注意点：
    //     - 如果环境变量的值是一个字符串，那么需要用 JSON.stringify('"string"') 进行转译，所以为了安全保证，将所有数据类型都进行JSON.stringify来处理
    //     - 如果 webpack.DefinedPlugin({'process.env.NODE_ENV': xxxx})，那么在浏览器环境中也能访问到process.env.NODE_ENV，这就是webpack.config.js中的mode属性需要干的事情
    // - mode
    //   - mode的作用是，mode的值将会作为 webpack.DefinedPlugin({'process.env.NODE_ENV': JSON.stringify('mode的值')})
    //   - development，production，none
    // - 总结区别
    //   - cross-env定义的环境变量，只能在node环境中被访问到，即 webpack.config.js 中被访问到
    //   - webpack.DefinePlugin()定义的环境变量，只能在浏览器环境中被访问到，即只能在各个module模块中去使用，不能在webpack.config.js中使用
    //   - mode指定的值，mode的值将会作为 webpack.DefinedPlugin({'process.env.NODE_ENV': JSON.stringify('mode的值')})，从而能在浏览器环境中访问，即module中访问
    // - 实践案例1
    //   - 结果：如果webpack.config.js中的 mode="development"，并且在 build命令时执行的命令 cross-env NODE_ENV="production"，随便在模块js中打印process.env.NODE_ENV输出的是'development'
    //   - 原因：说明浏览器环境中的process.env.NODE_ENV是通过webpack.config.js 中的 mode属性 设置的，而webpack.config.js中的process.env.NODE_ENV是通过cross-env来设置的
    //   - 本质：mode的作用是，mode的值将会作为 webpack.DefinedPlugin({'process.env.NODE_ENV': JSON.stringify('mode的值')})，从而能在浏览器环境中访问，即module中访问
    //   - 所以：如何同步？可以将 mode 设置为 ( mode:process.env.NODE_ENV ) 这样 ( node 和 浏览器 中的环境变量就同步了 )，因为 ( cross-env将webpack.config.js中的环境变量设置为了对应的值，而mode=process.env.NODE_ENV，mode有设置了webpack.DefinePlugin()中的process.env.NODE_ENV，用于在浏览器环境中使用)
    // - 实践案例2
    //   - 设置不同的环境对应的后端服务器地址，详见examples/main.js
    //   - 源码地址：https://github.com/woow-wu7/8-divine/blob/main/examples/main.js

    new webpack.BannerPlugin({ banner: " by woow_wu7" }), // webpack自带的plugin，用于在js文件开头注释一些说明内容
    new webpack.IgnorePlugin(/\.\/local/, /moment/), // 表示从moment中如果引入了 ./local 文件路径，则把 ./local  中的所有文件忽略掉
    new webpack.DllReferencePlugin({
      // 1
      // 作用：
      // - 引用打包好第三方库的动态链接库
      // - 如果找不到动态连结库中打包好的第三方包，再进行打包
      // 功能
      // - webpack.DllPlugin 在第三方webpack打包配置文件中使用，这里是 webpack.config.react.js
      // - webpack.DllReferencePlugin 在项目的webpack配置文件中指定
      // 单词
      // - manifest：是清单的意思
      // 最终
      //  - 完成动态链接库需要配合如下
      //  - 1. 在 webpack.config.react.js 中使用 webpack.DllPlugin 单独打包，生成动态连结库json文件
      //  - 2. 在 webpack.config.js 中使用 webpack.DllReferencePlugin 去查找动态链接库
      //  - 3. 在 模版HTML 中去手动引入打包好的库
      manifest: path.resolve(__dirname, "dist", "manifest.json"),
    }),
    new HappyPack({
      id: "js",
      // id是在 module.rules > use: 'happypack/loader?id=js'中指定的
      use: [
        {
          loader: "babel-loader", // options已在 .babelrc 文件中单独配置
          options: {
            presets: [["@babel/preset-env"], ["@babel/preset-react"]],
          },
        },
      ],
    }),
  ],

  // optimization
  //  - optimization 优化项 (optimization：是最佳优化的意思)
  //  1. 压缩打包后的css和js
  //    - 压缩过后的css，js都只有一行
  //    - 注意：压缩css和js要在 ( mode=production ) 中才能看到效果，和 html的优化一样
  optimization: {
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      new UglifyjsWebpackPlugin({
        cache: true,
        parallel: true, // 平行，并行的意思
        sourceMap: true, // 调试映射
      }),
    ],
    splitChunks: {
      cacheGroups: {
        common: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
          priority: 10,
          minSize: 0,
        },
        vendor: {
          // vendor是小贩的意思
          test: /node_modules/, // 范围是node_modules中的第三方依赖，注意zhe
          name: "vendors", // 抽离出来的包的名字
          chunks: "initial", // 初始化加载的时候就抽离公共代码
          minChunks: 1, // 被引用的次数
          priority: 11,
          // priority: 是优先级的意思，数字越大表示优先级越高
          // 注意对比：common 和 vender 的 priority 权重
          minSize: 0,
        },
      },
    },
  },
  // resolve.fallback 是 webpack5 新增加的配置，我们这里安装的是 webpack4，所以把代码注释掉
  // resolve: {
  //   fallback: {
  //     path: require.resolve("path-browserify"), // path相关，需要使用path需要这样设置，因为webpack5把polyfill单独抽离了
  //   },
  // },
};
````

### (四) **【 Webpack Compiler - specific process 】**

```
summarize 总结 v
summary 总结 n

The specific process of the Compiler:
- 1. new Compiler()
- 2. 【 execute 】 the constructor of the class "Compiler"
   - constructor
      - 1. Execute the "apply" function in Plugins array in the webpack.config.js ------------------ tap --- 【 publish-subscribe pattern 】
      - 2. Execute the "afterPlugin" lifecycle function in "compiler" instance.hooks immediately --- call ---【 publish-subscribe pattern 】
   - run -> parseModule
      - 1. Parse "entry" file that configured in the webpack.config.js/entry option using fs.readFileSync() function to get source code string.
      - 2. Use the current file's absolute path to match the "test" option in webpack.config.js/module/rules/{test, use},
           if they matched, we should use 【 corresponding 】 "loader" to parse the source string to get new source string.
      - 3. We can get the map:
           - that uses current file absolute path as the "key".
           - and uses current file string source code that have been parsed by corresponding loader as the "value".
      - 4. then webpack will use the "fs.writeFileSync" function to
           - write file to the destination 【 directory 】 that has been 【 specified 】 by webpack.config.js/output/path.

link: https://github.com/woow-wu7/7-compiler
sourceCode: https://github.com/woow-wu7/7-compiler/blob/main/7-compiler.js
```
