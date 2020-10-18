# (一) 技术栈
` ts + react-hooks + react-router-dom@5.2.0 + redux@^4.0.5 + react-redux + axios`   

` styled-components + echarts + antd `      

` 通过 create-react-app 脚手架构建 `   




# (二) 代码规范相关 ( 1-8 )

### (1) commitlint
- [官网教程](https://github.com/conventional-changelog/commitlint)
- 安装
  - npm install --save-dev @commitlint/config-conventional @commitlint/cli
  - npm install --save-dev husky
- 新建
  - 新建.huskyrc文件或者在package.json中配置husky选项
  - 新建 `commitlint.config.js` 注意是js文件，不能是ts，或者`.commitlintrc.json`等
  - `commitlint.config.js`中添加扩展`@commitlint/config-conventional`
```
commitlint.config.js
-----
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

### (2) husky
- [官网教程](https://typicode.github.io/husky/#/)
- 安装
  - yarn add husky --save-dev
- 配置
  - 在 `package.json` 中配置 `husky` 字段

### (3) lint-staged 
- [官网教程](https://github.com/okonet/lint-staged)
- 安装
  - yarn add lint-staged -save-dev
- 相关案例
  - [tianbo-h5](https://github.com/woow-wu/tianbo-h5)
- 配置
  - lint-stage
  - .eslintrc.js
  - .eslintignore
    - 在 `package.json` 中配置  `"lint-staged"` 字段
    - 如果使用 `pre-commit`中用到 `eslint` 就需要配置 `.eslintrc.js` 和 `.eslintignore` 不然会报错
    - 在 `.eslintrc.js` 中，通过 `/* eslint-disable */` 

### (4) eslint
- [官网教程](https://cn.eslint.org/docs/user-guide/command-line-interface)
- [配置实例详细教程](https://juejin.im/post/6844904056591220750#heading-4)

### (5) stylelint
- [官网教程](https://stylelint.io/)
- npm install --save-dev stylelint stylelint-config-standard
- .stylelintrc.js
- stylelint 
- stylelint-config-standard
- stylelint-scss
- stylelint-webpack-plugin
- 然后添加到 `husky` 的 `hooks` 中

```
1,2,3,4,5
```
```
package.json
-----
"husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx,js}": [
      "eslint --config .eslintrc.js"
    ],
    "*.{css,sass,scss}": [
      "stylelint --fix",
      "git add"
    ]
  }
```

### (6) git提交规范
- [文档](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
- feat: 新功能 feature
- fix: 修复bug
- docs: 文档 documentation
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：测试
- chore：构建过程 或 辅助工具的变动 (chore：日常事务，乏味无趣的工作的意思)
- style：格式（不影响代码运行的变动）

### (7) js注释规范
- http://www.shouce.ren/api/view/a/13269

### (8) react-hooks 的 eslint 规范插件
- `eslint-plugin-react-hooks`
- [eslint-plugin-react-hooks地址](https://www.npmjs.com/package/eslint-plugin-react-hooks)


### (9) prettier
- eslint负责语法正误，prettier负责样式美化
- 所需要的包
  - prettier 
  - eslint-config-prettier
  - eslint-plugin-prettier
- 安装
  - npm install prettier --save-dev --save-exact
  - 



# (三) 按需加载相关

### (1) react-router-dom
- npm install react-router-dom
- npm install @types/react-router-dom
- **集中式路由插件** ( `react-router-config` )
  - npm install --save react-router-config
  - npm install @types/react-router-config -S
  - [官网](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config)
  - [使用教程](https://www.cnblogs.com/yetiezhu/p/12966026.html)
  - renderRoutes
- **react-router-dom中的hooks**
  - useHistory
  - useLocation
  - useParams 
    - ` useParams只有在动态路由对应的组件中可以获取到，在父组件或者其他组件都不能后去到 `
    - ` 做全局 面包屑的时候容易采坑 `
  - useRouteMatch
- **路由按需加载**
  - 1. 路由按需加载：`React.lazy` 和 `Suspense`
    - https://react.html.cn/docs/code-splitting.html
  - 2. 第三方库 `react-loadable`
    - https://github.com/jamiebuilds/react-loadable

### (2) antd 按需加载
- [babel-plugin-import官网](https://github.com/ant-design/babel-plugin-import)
- [实例教程](https://cloud.tencent.com/developer/article/1467366)
- npm install babel-plugin-import -D
- 配置 `.babelrc` 文件
  - 注意需要 `eject` 后修改 `webpack.config.js` 中的 `babelrc: true` 启用 .babelrc 文件
  - 同时需要删除在 `package.json` 中定义的 `babel` 选项
```
.babelrc
-----
{
  "presets": ["react-app"],
  "plugins": [
    [ "import", { "libraryName": "antd", "style": "css"} ]
  ]
}
```

### (3) antd使用iconfont自定义图标
- [官网](https://ant.design/components/icon-cn/#components-icon-demo-basic)
- scriptUrl 就是 Symbol在线生成的文件路径

### (4) redux 相关
- npm install redux react-redux -S
- npm install @types/react-redux -S
- npm install --save redux-devtools-extension
- npm install redux-devtools -D





# (四) create-react-app 相关设置

### (1) 添加别名 `@` 映射 `src` 在TS的项目中
- 1. create-react-app构建的项目，eject后，找到 config/webpack.config.js => resolve.alias
- 2. tsconfig.json 中删除 `baseUrl` 和 `paths`，添加 ` "extends": "./paths.json" `
- 3. 在根目录新建 `paths.json` 文件，写入 `baseUrl` 和 `paths` 配置
- [教程地址](https://www.jianshu.com/p/6f8a98a9f2e2)
```
1. webpack.config.js => resolve => alias
module.export = {
   resolve: {
     alias: {
      "@": path.resolve(__dirname, '../src')
     }
   }
 }
2. 根目录新建 paths.json 写入以下配置
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
3. 在 tsconfig.json 中做如下修改，添加( extends ), 删除(  baseUrl,paths )
{
  // "baseUrl": "src",
  // "paths": {
  //   "@/*": ["src/*"]
  // },
  "extends": "./paths.json"
}
```

### (2) create-react-app 配置全局的 scss ，而不需要每次 @import
- 安装 `sass-resources-loader`
- 修改 config/webpack.config.js 如下
- `注意：很多教程修改use:getStyleLoaders().concat()这样修改不行`
```
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [......].filter(Boolean);
  if (preProcessor) {
    loaders.push(......);
  }
  if (preProcessor === 'sass-loader') {
    loaders.push({
      loader: 'sass-resources-loader',
      options: {
          resources: [
            // 这里按照你的文件路径填写../../../ 定位到根目录下, 可以引入多个文件
            path.resolve(__dirname, '../src/style/index.scss'),
          ]
      }
    })
  }
  return loaders;
};
```


### (2) css-module
- 需要安装 node-sass
- npm install node-sass -D
- xxxx.module.scss

### (3) 在 create-react-app 实现代码分割
- [我的掘金文章](https://juejin.im/post/6879020830253285384)

### (4) require.context => ts报错不存在属性
- npm install @tyeps/webpack-env -D

### (5) 使用TS中的 enum 枚举类型避免魔法字符串
- export enum SYSTEMTYPE { ADMIN, BIGSCREEN }
- import { SYSTEMTYPE } from 'src/global/enum.ts'
- 注意点1：
  - 问题：元素隐式具有 "any" 类型，因为类型为 "string" 的表达式不能用于索引类型 "typeof SYSTEMTYPE"。
  - 解决方案：在tsconfig.json => compilerOptions => "suppressImplicitAnyIndexErrors": true,
- 注意点2：
```
export enum SYSTEMTYPE1 {
  ADMIN = 'ADMIN',
  BIGSCREEN = 'BIGSCREEN',
}

export enum SYSTEMTYPE2 {
  ADMIN,
  BIGSCREEN,
}


SYSTEMTYPE1.ADMIN =========> 'ADMIN'
SYSTEMTYPE2.ADMIN =========> 0
```



# (五) 大屏

### (1) screenfull
- 安装：cnpm install screenfull -S
- [官网](https://github.com/sindresorhus/screenfull.js)

### (2) echarts封装
- [echarts的封装](https://hellohy.github.io/post/react-echarts/)

### (3) 大屏线上项目
- [自定义的数据可视化大屏-可拖动的大屏](http://47.100.38.254/library/charts)

### (4) 大屏滚动效果
- [你可能需要这样的大屏数字滚动效果](https://juejin.im/post/6844903901355835406)




# (六) BUG总结

### (1) 登陆页面出现的bug
- 问题描述：登陆页面，选择系统时，报错，并且select每change一次，动画就渲染一次
- `报错描述：Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.`
- 原因分析：
  - Select的value值，直接从redux全局state中取数据，change后又把改变的数据传入store
  - 因为是全局顶层store，导致基本整个项目根组件都重新渲染了
- 解决办法：
  - 1. 可以获取store的state，在传给组件的state，然后change Select时，修改组件自己的state，只影响该组件，然后点击登陆时，在把数据传递给redux


### (2) [ts]未终止的正则表达式文字
- 注意如果有组件或者jsx返回的DOM，就必须用 tsx 文件后缀

### (3) 找不到模块“xxxx”或其相应的类型声明。
- 最简单的修复方式：在import前面加上 `// @ts-ignore`
- 合理的解决办法：
  - 1、 项目根目录下添加 index.d.ts, 并在其中写类型声明
  - 2、 将 index.d.ts 加入到 tsconfig.json 中的配置项 include

  - 1. 创建一个 types 目录，专门用来管理自己写的声明文件，将 foo 的声明文件放到 types/foo/index.d.ts 中
  - 2. tsconfig.json 中的 paths 和 baseUrl 字段
  ```
  根目录/types/redux/idnex.d.ts
  declare module 'redux' {
    const bindActionCreators: any
    export { bindActionCreators }
  }

  tsconfig.json
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "*": [
        "types/*"
      ]
    }
  },
  ```
- [issue](https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam/51320328#51320328)
- [ts类型声明文件的正确使用姿势](https://zhuanlan.zhihu.com/p/103158789)

### (4) style-lint
- `:global` 报错
- 解决方法：
  - .stylelintrc.js 中做以下修改
```
rules: {
    "selector-pseudo-class-no-unknown": [true, {
      ignorePseudoClasses: ["global"],
    }]
  },
```

### (5) 依赖没有锁版本造成的报错
- 报错：TypeScript error in /@pretty-format/build/index.d.ts(7,13): '=' expected.  TS1005
- 原因："typescript": "~3.7.2", 版本问题
- 解决："typescript": "^3.8.2"
- 资料：https://www.jianshu.com/p/a69ff39a91c5


### (6) antdMenu Sider inlineCollapsed 报错
- Warning: [antd: Menu] `inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.
- mene的inlineCollapsed在有Sider父组件时，不能操作Sider，必须用Sider的collapsed属性来操作Silder展开/收缩   


### (7) echarts初始化时超出容器的宽度
- 问题：当初始化时，div按照样式设置了50%的大小，但是echarts图标超出了容器大小
- 解决：
  - 把 init设置成async函数，当实例存在的时候，再去设置setOption
  - 即确保在setOption时，echarts实例存在并且，如果实例存在，通过echarts.getInstanceByDom()直接复用，不用重新生成


### (8) antd - BackTop组件不生效
- 原因：因为antd的布局组件 **Content** 是不能直接设置宽高和overflow等属性
- 解决：
  - 在 **Content** 组件内部在设置容器 **scrollOuterWrap** 在包裹住 **scrollInnterWrap**，由**scrollInnterWrap** 包裹需要滚动的元素
  - **.scrollOuterWrap**：需要设置固定的高度，通过 **calc** 计算得到；和其他 **overflow-y** 相关的属性
  - antd的 **BackTop** 组件的层级，在哪里的层级都可以


https://www.cnblogs.com/xiaojiumei/p/10422806.html