// 1
// webpack plugin
// 1. 每个插件都是一个 class
// 2. 每个插件都有一个 apply 方法
// 3. apply 方法的参数是 compiler 实例，这样就可以在 插件 中获取 实例和原型上 挂的所有属性和方法

// 2
// emit
// - emit是compiler的一个生命周期: 表示 输出 asset 到 output 目录之前执行
// - 回调参数：compilation

// 3
// tapAsync
// - 插件一共有3种注册方式: tap tapAsync tapPromise
// - 插件一共有3种调用方式: call callAsync callPromise，调用时机就是在 对应的 compiler 的生命周期中
// 3.1 tapAsync
// class HelloAsyncPlugin {
//   apply(compiler) {
//     compiler.hooks.emit.tapAsync(
//       'HelloAsyncPlugin',
//       (compilation, callback) => {
//         // 执行某些异步操作...
//         setTimeout(function () {
//           console.log('异步任务完成...');
//           callback();
//         }, 1000);
//       }
//     );
//   }
// }
// 3.2 tapPromise
// class HelloAsyncPlugin {
//   apply(compiler) {
//     compiler.hooks.emit.tapPromise('HelloAsyncPlugin', (compilation) => {
//       // 返回一个 promise ，异步任务完成后 resolve
//       return new Promise((resolve, reject) => {
//         setTimeout(function () {
//           console.log('异步任务完成...');
//           resolve();
//         }, 1000);
//       });
//     });
//   }
// }

// 4
// 资料
// - https://juejin.cn/post/7135420182838640648

const fs = require("fs");
const path = require("path");

class MyCleanWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      "MyCleanWebpackPlugin",
      (compilation, callback) => {
        console.log("MyCleanWebpackPlugin is running");

        const outputOption = compilation.options.output;
        removeDir(outputOption.path); // 删除 webpack配置文件中的 output.path 对应的文件夹的所有内容
        callback();
      }
    );
  }
}

function removeDir(outputAbsolutePath) {
  // 文件夹路径存在
  if (fs.existsSync(outputAbsolutePath)) {
    // 读文件夹内容
    fs.readdirSync(outputAbsolutePath).forEach((file) => {
      const curPath = path.join(outputAbsolutePath, file); // output.path对应的文件夹中的 每个文件路径

      // 是文件夹，递归删除，即递归执行AA和BB
      if (fs.lstatSync(curPath).isDirectory()) {
        removeDir(curPath);
      }
      // 是文件，AA.直接删除文件
      else {
        fs.unlinkSync(curPath);
      }
    });

    // BB.删除文件夹
    fs.rmdirSync(outputAbsolutePath);
  }
}

module.exports = {
  MyCleanWebpackPlugin,
};
