import { createApp } from "vue";
import App from "./app.vue";

console.log("hello");

// vue
// 1. 安装
// - vue
// - vue-loader
// - vue-template-compiler
// - html-webpack-plugin
// 2. 配置:
// - 配置vue相关需要配置几个地方
// - 1. vue-loader
// - 2. VueLoaderPlugin
// - 3. 需要把 entry 设置为 vue 项目的入口文件 main.js
// - 4. devServer
// - 5. vue 中使用 ts 需要配置 ts-loader 中的 appendTsSuffixTo: [/\.vue$/]
// - 6. 热更新配置: new webpack.HotModuleReplacementPlugin() + devServer.hot
const app = createApp(App);
app.mount("#root");

// if ((module as any).hot) {
//   (module as any).hot.accept();
// }

// import { nameWebpack } from "./a.js";
// import { ageWebpack } from "./b";

// const path = require("path");

// console.log("__dirname", __dirname); // ( 执行node命令的文件 ) 所在的 ( 目录 ) 的 ( 绝对路径 )
// console.log("__filename", __filename); // ( 执行node命令的文件 ) 的 ( 绝对路径 )
// const url = path.resolve(__dirname, "app");
// console.log("url", url);
// console.log(nameWebpack);
// console.log(ageWebpack);
// console.log(1);
