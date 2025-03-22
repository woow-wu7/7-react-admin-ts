// - [7-compiler-webpack 打包源码](https://github.com/woow-wu7/7-compiler)
// - [7-compiler.js](https://github.com/woow-wu7/7-compiler/blob/main/7-compiler.js)
// - [[源码-webpack01-前置知识] AST 抽象语法树](https://juejin.im/post/6844904115265339406)
// - [[源码-webpack02-前置知识] Tapable](https://juejin.im/post/6844904115269550087)
// - [[源码-webpack03] 手写 webpack - compiler 简单编译流程](https://juejin.im/post/6844903973002936327)
// - [[深入 16] webpack](https://juejin.im/post/6844904070201753608)

const webpack = require("webpack");
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { MyCleanWebpackPlugin } = require("./plugins/MyCleanWebpackPlugin");

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

// VueLoaderPlugin
// - const VueLoaderPlugin = require("vue-loader/lib/plugin"); // 注意：这样的写法会抱错，需要改成最新的下面的写法
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  // mode
  // node环境变量: 在 package.json 中 script 中 cross-env 指定了 node 环境变量 NODE_ENV=development
  // 浏览器环境变量: mode 指定浏览器环境变量
  // mode: process.env.NODE_ENV 这样就同步了 node 和 浏览器 两端的环境变量都是 development
  // [详见]("./1-WEBPACK-README.md") / Webpack Interview
  mode: process.env.NODE_ENV,
  entry: {
    main: path.resolve(__dirname, "./src/main.ts"),
  },
  output: {
    filename: "[name].[hash].js", // [] => placeholder 占位符
    path: path.resolve(__dirname, "dist"), // AA
  },
  devtool: "eval-source-map",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../packages"),
    },
    extensions: [".ts", ".js", ".css", ".less", "*"], // import时省略后缀时，先找.js文件，再找.css文件 注意：'*' 表示所有类型的文件
  },
  resolveLoader: {
    // 表示在寻找loader时，先去node_modules中找，再去loaders文件夹中找，loaders文件夹中有我们自己写的loader
    modules: ["node_modules", path.resolve(__dirname, "./loaders/")],
  },
  // devServer
  // 详情: https://github.com/woow-wu7/8-divine-plus/blob/main/build/webpack.config.js
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"), // AA output.path 和 这里保持一致
    },
    port: 7777,
    compress: false,
    hot: true,
    // watchOptions: {
    //   poll: 1000, // 每秒检查一次变动
    // },
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              presets: [["@babel/preset-env"]],
              plugins: [
                // ["@babel/plugin-proposal-decorators", { legacy: true }], // 装饰器语法
                // ["@babel/plugin-proposal-class-properties"], // 支持 class
                // proposal 是提案的意思
              ],
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/], // vue 单文件组件中假如使用了lang="ts"，ts-loader需要配置appendTsSuffixTo: [/\.vue$/]，用来给.vue文件添加个.ts后缀用于编译
              // suffix 后缀的意思
            },
          },
          {
            loader: "myReplace-loader",
            options: {
              name: "####",
            },
          },
          // "eslint-loader", // 有了 eslint-webpack-plugin 就不用设置 eslint-loader 了
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "myReplace-loader",
            options: {
              name: "####",
            },
          },
          // "eslint-loader", // 有了 eslint-webpack-plugin 就不用设置 eslint-loader 了
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          // "style-loader", // 使用了 MiniCssExtractPlugin.loader 就不需要使用 style-loader 了
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          // "style-loader", // 使用了 MiniCssExtractPlugin.loader 就不需要使用 style-loader 了
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              esModule: false,
              outputPath: "img/",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HTMLWebpackPlugin({
      title: "webpack-review",

      // 报错: 直接这样写会报错 template: "public/index.html",
      // Module not found: Error: Can't resolve '/Users/xiawu/work/personal/front-end/8-penetrate/public/index.html' in '/Users/xiawu/work/personal/front-end/8  -penetrate'
      // template: "public/index.html",

      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
    }),
    new webpack.HotModuleReplacementPlugin(),

    // new CleanWebpackPlugin(),
    new MyCleanWebpackPlugin(),

    // new ESLintPlugin({
    //   fix: false /* 自动帮助修复 */,
    //   extensions: ["js", "json", "coffee", "vue"],
    //   exclude: "node_modules",
    // }),
  ],
  optimization: {
    moduleIds: "named",
  },
};
