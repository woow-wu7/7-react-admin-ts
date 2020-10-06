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



### (6) react-router-dom
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
  - useRouteMatch
- **路由按需加载**
  - 1. 路由按需加载：`React.lazy` 和 `Suspense`
    - https://react.html.cn/docs/code-splitting.html
  - 2. 第三方库 `react-loadable`
    - https://github.com/jamiebuilds/react-loadable



### (7) antd 按需加载
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



### (8) redux 相关
- npm install redux react-redux -S
- npm install @types/react-redux -S
- npm install --save redux-devtools-extension
- npm install redux-devtools -D



### (9) git提交规范
- [文档](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
- feat: 新功能 feature
- fix: 修复bug
- docs: 文档 documentation
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：测试
- chore：构建过程 或 辅助工具的变动 (chore：日常事务，乏味无趣的工作的意思)
- style：格式（不影响代码运行的变动）



### (10) 没有锁版本造成的报错
- 报错：TypeScript error in /@pretty-format/build/index.d.ts(7,13): '=' expected.  TS1005
- 原因："typescript": "~3.7.2", 版本问题
- 解决："typescript": "^3.8.2"
- 资料：https://www.jianshu.com/p/a69ff39a91c5



### (11) js注释规范
- http://www.shouce.ren/api/view/a/13269

### (12) antd使用iconfont自定义图标
- [官网](https://ant.design/components/icon-cn/#components-icon-demo-basic)
- scriptUrl 就是 Symbol在线生成的文件路径

# (13) 
---
---
---
---
---
---




# create-react-app

### 别名

### css-module
- 需要安装 node-sass
- npm install node-sass -D
- xxxx.module.scss

### 在 create-react-app 实现代码分割



### require.context => ts报错不存在属性
- npm install @tyeps/webpack-env -D


### 使用TS中的 enum 枚举类型避免魔法字符串
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

### 单词
  - conventional：常规的
  - chore：日常事务，乏味无聊的工作



---
---
---
---
---
---




# Bug总结

### (1) [ts]未终止的正则表达式文字
- 注意如果有组件或者jsx返回的DOM，就必须用 tsx 文件后缀

### (2) 找不到模块“xxxx”或其相应的类型声明。
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