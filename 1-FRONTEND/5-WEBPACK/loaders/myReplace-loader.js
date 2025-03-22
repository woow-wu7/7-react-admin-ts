// webpack5 自带 this.getOptions
// - this.getOptions() 来代替 loader-utils 插件，我们就不需要添加
// const loaderUtils = require("loader-utils");

// loader
// 1. 概念
// - loader是一个 ( 函数 )，函数的第一个参数就是 ( 源码字符串 )，返回一个解析后的 ( 新的字符串 )
// 2. 注意点
// - loader不能写成 ( 箭头函数 )，因为内部需要使用 ( this ) 来获取更多的api
// - 比如：
//    - this.async
//    - this.callback

function myReplaceLoader(source) {
  // TIPS: webpack loader can not be an arrow function, because we should use "this" to get attributes.

  const options = this.getOptions() || {};
  const callback = this.async();
  const options1 = this.query;
  const callback1 = this.callback;

  console.log("this.query", this.query);
  console.log("this.callback", this.callback);

  console.log("options", options);
  console.log("callback", callback);

  console.log("options1", options1);
  console.log("callback1", callback1);

  setTimeout(function () {
    const result = source.replace("hello", options.name); // 将 hello 字符串 转成 ####
    callback(null, result);
  }, 1000);
}

module.exports = myReplaceLoader;

// ### (4) loader
// - 特点
//   - 1. loader 就是一个函数，函数的第一个参数就是 资源匹配上后的 ( 源码字符串 ) 或 ( 上一个 loader 产生的结果-源码字符串 )
//   - 2. loader 执行是有顺序的，从右到左，从下到上 ( 比如: 先 sass-loader > postcss-loader > css-loader > style-loader )
//   - 3. loader 函数不能是箭头函数，因为 loader 函数内部需要使用 this 获取很多配置数据
//        - this.getOptions()
//        - this.query
//        - this.callback()
//        - this.async()
// - 参数
//   - content: 源文件的内容
//   - map: 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
//   - meta: meta 数据，可以是任何内容
// - loader 函数中的 this
//   - this.query
//     - 获取 loader 的配置对象，即 `{ loader: 'xx', options: {} }` 中的 options 对象
//     - 注意：this.query 已经废弃，使用 loader-utils 中的 getOptions 来获取 options 对象
//   - this.getOptions
//     - 获取 webpack.config.js 中 module.rules 中 loader 配置的 options 对象
//     - webpack5 中已经自带 **this.getOptions()** 来代替 loader-utils 插件 了
//   - this.callback
//     - 第一个参数：err // Error 或者 null
//     - 第二个参数：content // string 或者 buffer，即处理过后的源代码
//     - 第三个参数：sourceMap // 可选，必须是一个可以被这个模块解析的 source map
//     - 第四个参数：meta //可选，即元数据
//   - this.async
//     - 处理 loader 中的异步操作
//     - this.async() 方法返回 this.callback
// - loader 中获取 loader 的配置对象 options
//   - 注意: webpack5 中已经自带 **this.getOptions()** 来代替 loader-utils 插件 了
//   - 需要安装 `loader-utils 插件`, options 对象即`{ loader: 'xx', options: {} }`
//   - loader-utils 插件
//     - 安装: npm install loader-utils -D
//     - 获取: 通过 loader-utils 中的 `getOptions` 获取 loader 的 options 配置对象
// - 注意点
//   - loader 不能写成 ( 箭头函数 )，因为函数内部需要使用 ( this ) 来获取更多的 api
//   - 比如:
//     - this.getOptions()
//     - this.query
//     - this.callback()
//     - this.async()

// ```
// (1)
// 我们自己写的loader，如何在webpack.config.js 中使用？
// // 一共有两种方法
// // 方法1
// // - 在 webpack.config.js 中使用 resolveLoader 配置项来配置
// // - 然后在module.rules 中使用
// resolveLoader: {
//   // 表示在寻找loader时，先去node_modules中找，再去loaders文件夹中找
//   modules: ["node_modules", path.resolve(__dirname, "./loaders/")],
// }
// {
//   test: /\.tsx?$/,
//   use: [
//     "ts-loader",
//     {
//       loader: "myReplace-loader",
//       options: { name: "####", },
//     },
//   ],
// }
// // 方法2
// // - 直接写路径
// module: {
//   rules: [{
//     test: /\.js$/,
//     use: [path.resolve(__dirname, './loaders/myReplace-loader.js')]
//   }]
// }
// ```
