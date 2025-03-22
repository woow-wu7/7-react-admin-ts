# 构建过程

### (1) 安装依赖

```
npm init -y // -y 可以生成默认的package.json配置

npm install webpack -D
npm install webpack-cli -D
npm install webpack-dev-server -D
npm install webpack-merge -D // -------------------------------- 合并 webpack 配置，记得一个一个装，一起装有时候会不成功

npm install html-webpack-plugin -D // -------------------------- html模版处理
npm install clean-webpack-plugin -D ---------------------------- 删除打包后的文件夹，默认是删除 output.path 指定的文件夹，用在再次打包时先删除之间生成的包

npm install typescript ts-loader -D // ------------------------- ts相关
npm install babel-loader @babel/core @babel/preset-env -D // --- babel可以把es6转成es5
npm install eslint eslint-loader eslint-webpack-plugin -D ------ lint，在 .eslintrc.js 中配置规则

npm install vue vue-loader vue-template-compiler -D // --------- vue组件处理

npm install style-loader css-loader -D // ---------------------- css样式处理
npm install sass sass-loader node-sass -D // ------------------- sass相关
npm install mini-css-extract-plugin -D // ---------------------- 抽离: 单独抽离成css文件，以便引入组件库的css，因为css和组件时单独打包的
npm install postcss-loader autoprefixer -D // ------------------ 前缀: 添加浏览器的前缀，可单独配置 postcss.config.js；autoprefixer需要在package.json中设置 browserslist
// 样式相关注意点
// 1. 使用 mini-css-extract-plugin 后就不需要 style-loader 了
// 2. 顺序: sass-loader > postcss-loader > css-loader > style-loader
// 3. autoprefixer 需要在 package.json 中设置 browserslist

npm install file-loader url-loader -D // ----------------------- 图片/文件处理，url-loader通过limit处理成base64的图片，file-loader在打包后的html中引用打包后的图片路径

Webpack内置组件
- webpack.DefinePlugin() --------------------------------------- 定义浏览器环境变量
- webpack.HotModuleReplacementPlugin() ------------------------- 热更新
- webpack.DllPlugin -------------------------------------------- 生成第三方库的动态链接库 manifest.json
- webpack.DllReferencePlugin ----------------------------------- 引用动态链接库，不存在再进行打包

npm install loader-utils -D ------------------------------------ loader工具，用来获取loader中的options对象
// 注意: webpack 已经有自带的 this.getOptions() 了，就需要安装这个 loader-utils 插件了
```

### 1.2 说明文档

```
组件库说明文档相关

1. vuepress2
// 查看: vuepress最新的版本: npm view vuepress versions
// 安装: 指定版本的vuepress: npm install vuepress@2.0.0-beta.49 -D
// 版本: vuepress2.0才支持vue3。需要注意的是目前处于维护阶段，使用 vue3+vite 构建的使用 vitePress
npm install vuepress@2.0.0-beta.49 -D
npm install @vuepress/plugin-container@next -D // 容器
npm install @vuepress/plugin-back-to-top@next -D // 回到顶部
npm install @vuepress/plugin-register-components@next -D // 注册组件
npm install @vuepress/plugin-docsearch@next -D // 搜索
npm install @vuepress/plugin-git@next -D // git


2. js语法高亮
npm install highlight.js -D
npm install @highlightjs/vue-plugin -D


3. 将 md 转成 html
- docs: vite环境
  - npm install vite-plugin-markdown -D // ----------- 将md文件转成各种类型
  - npm install highlight.js -D // ------------------- 语法高亮
  - npm install @highlightjs/vue-plugin -D // -------- 包装组件
- examples: webpack环境
  - npm install html-loader markdown-loader -D // ---- 将 md 转成 html
```

# 资料

- 环境变量区别 https://juejin.cn/post/6844904023791796237#heading-0
- tsconfig.json https://www.pengfeixc.com/blogs/javascript/tsconfig
- 构建过程 https://juejin.cn/post/6950905030635421710
- webpack
  - require.context https://webpack.js.org/guides/dependency-management/#requirecontext
- npm
  - 打包发布流程 https://juejin.cn/post/6994746118135349262
  - 发布相关 https://blog.51cto.com/u_15328720/3401308
- package.json
  - exports: https://zhuanlan.zhihu.com/p/159202959
  - files: https://juejin.cn/post/6844903975825702926#heading-8
  - &和&&: https://www.jianshu.com/p/c96fdba92c44
- vuepress2
  - 官网: https://juejin.cn/post/7096011121160618020
  - 教程: https://www.cnblogs.com/wangdashi/p/16308107.html
  - 教程: https://github.com/Lee-Tanghui/vuepress-element-doc
  - 教程: https://juejin.cn/post/7089313579169480711
  - 插件: https://blog.csdn.net/sinat_31213021/article/details/119385175
- 参考 ui 组件库
  - element-plus https://github.com/element-plus/element-plus
  - fes-design https://github.com/WeBankFinTech/fes-design
  - mzl-ui https://github.com/Ningstyle/mzl-ui#readme
