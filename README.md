
[![7-react-admin-java](https://img.shields.io/badge/7--react--admin--java-7--react--admin--java-brightgreen "7-react-admin-java")](https://github.com/woow-wu7/7-react-admin-java "7-react-admin-java")

[![7-react-admin-java-pro](https://img.shields.io/badge/7--react--admin--java--pro-7--react--admin--java--pro-ff69b4 "7-react-admin-java-pro")](https://github.com/woow-wu7/7-react-admin-java-pro "7-react-admin-java-pro")



# (一) 技术栈
` ts + react-hooks + react-router-dom@5.2.0 + redux@^4.0.5 + react-redux + axios `

` husky + lint-staged + commitlint + eslint + stylelint + prettier + EditorConfig `

` styled-components + echarts + antd `

` redux-logger + redux-thunk 中间件 `

` 通过 create-react-app 脚手架构建 `

[本项目构建过程记录博客](https://juejin.im/post/6879020830253285384)



# (二) 主要功能
```
(1) 功能
    - router menu breadcrumb 三合一
    - 自定义hooks ( useFetch, useModal, useViewprot, useIntersectionObserver, useThrottle, useDebounce等)
    - 自定义redux, 懒加载, 权限控制, 回到顶部, echarts封装, react-redux-hooks-api, react-router-hooks-api
    - alias别名, 全局sass, 新手功能引导动画(react-joyride)(reactour), 瀑布流, axios取消请求
    - webpack-bundle-analyzer 包分析插件
(2) css特效
    - stickyFooter粘性页脚, ceiling吸顶效果, shockWave冲击波, 水平垂直居中, 两栏三栏布局
    - rem响应布局, em, @media媒体查询, 一物理像素边框, 盒模型, 三角形, 进度条, margin重叠
    - inline-block间隙, 两行三行省略号, 多列等高布局, 滑动菜单slide-menu
(3) 源码分析
    - redux axios webpack-Compiler
    - 具体在本项目 src/SOURCE-CODE-ANALYSIS 文件夹中
```



# (三) 源码分析
### (1) redux 和 react-redux 源码分析 [redux^4.0.5]
- [redux源码分析-仓库](https://github.com/woow-wu7/7-react-admin-ts/tree/master/src/SOURCE-CODE-ANALYSIS/REDUX)
- [redux源码分析-我的掘金博客](https://juejin.cn/post/6844904137952329742)
### (2) 手写 webpack Compiler 源码 [webpack^4.42.0]
- [手写Compiler源码-仓库](https://github.com/woow-wu7/7-compiler)
- [手写Compiler源码-我的掘金文章](https://juejin.cn/post/6844903973002936327)
### (3) axios 源码分析 [axios^0.20.0]
- [axios源码分析-仓库](https://github.com/woow-wu7/7-react-admin-ts/tree/master/src/SOURCE-CODE-ANALYSIS/AXIOS)
- [axios源码分析-我的掘金文章](https://juejin.cn/post/6844904147532120072)
### (4) vue 源码分析 [vue^2.6.12]
- [vue源码分析-仓库](https://github.com/woow-wu7/7-react-admin-ts/tree/master/src/SOURCE-CODE-ANALYSIS/VUE)
- [vue源码分析-我的掘金文章](https://juejin.cn/post/6844904181094957069)
### (5) react 源码分析 [react^17.0.3]
- [react源码分析-仓库](https://github.com/woow-wu7/7-react-source-code-analysis)
- [react源码分析-我的掘金文章](https://juejin.cn/post/6993980489463758855)

### (6) badJs-report 源码分析
- [badJs-report源码分析-仓库](https://github.com/woow-wu7/7-badjs-report-analysis)

# 复习资料
- [复习资料-思维导图](https://github.com/woow-wu7/7-react-admin-ts/tree/master/src/assets/iamges/xmind)


# (四) 代码规范相关 ( 1-9 )
* [x] 123456789

>安装 husky + lint-staged + commitlint + eslint + stylelint + prettier + EditorConfig

### (1) EditorConfig
- [EditorConfig官网](https://editorconfig.org/)
- [EditorConfig教程](https://juejin.cn/post/6860440041039069191#heading-0)
- 作用
  - EditorConfig 可以帮助开发者在不同的编辑器和IDE之间定义和维护一致的代码风格
- 重点规则
  - **[*]** 表示用于所有文件的规则
  - **[.md]** 表示用于.md文件的规则
  - **indent_style=space** 表示当键下tab键时使用软选项卡填充缩进，也就是使用 ( 空格 ) 填充
  - **indent_style=tab** 表示键下tab键时使用硬选项卡填充缩进，也就是使用 ( \t ) 填充
  - **indent_size=2** 表示两个空格
  - **trim_trailing_whitespace=true** 表示将换行符前面的空格删除掉 `trim: 修剪` `trailing: 尾部`
  - **insert_final_newline=true** 确保文件保存的时候以换行符结尾，即文件末尾会多一行空行
- 配置步骤
  - 1.在vscode中下载 `EditorConfig for VSCode` 插件，该插件在保存时会执行.editorconfig中指定的规则
  - 2.新建 `.editorconfig` 文件
```
root=true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

### (2) husky + lint-staged
- [husky官网](https://typicode.github.io/husky/#/)
- [lint-staged官网](https://github.com/okonet/lint-staged)
- [教程](https://juejin.cn/post/6879955438482227207)
- 配置步骤
  - 1.安装npm install -D husky lint-staged
  - 2.在 `package.json` 文件中配置 `husky` 和 `lint-staged` 配置项
  - 3.如果在 `husky => hooks => pre-commit`中用到eslint,就需要配置`.eslintrc.js`和`.eslintignore`不然会报错
  - 4.在配置中就用到了几乎所有代码规范的配置 `husky + lint-staged + commitlint + eslint + styleslnt + prettier`
- package.json配置如下
```
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --config .eslintrc.js --fix"
    ],
    "*.{css,less}": [
      "stylelint --config .stylelintrc.js --fix"
    ],
    "*.{ts,tsx,js,jsx,css,less}": "prettier --write --ignore-unknown"
  }
```

### (3) commitlint
- [commitlint官网](https://github.com/conventional-changelog/commitlint)
- 配置步骤
  - 1.安装npm install --save-dev @commitlint/config-conventional @commitlint/cli
  - 2.安装npm install --save-dev husky
  - 3.新建.huskyrc文件或者在`package.json`中配置`husky`选项
  - 4.新建 `.commitlintrc.js` 注意是js文件，不能是ts，或者.commitlintrc.json等
  - 5.在`.commitlintrc.js`中添加扩展`@commitlint/config-conventional` // conventional: 传统的
```
在 .commitlintrc.js 中配置如下

module.exports = {
  extends: ['@commitlint/config-conventional']
};
```

### (4) eslint
- **eslint**
  - [eslint官网](https://cn.eslint.org/docs/user-guide/command-line-interface)
- **eslint-plugin-import**
  - 用来校验import/export语法，防止 ( 文件路径 ) 和 ( 导出名称 ) 错误
  - [eslint-plugin-import官网](https://github.com/benmosher/eslint-plugin-import)
- **eslint-plugin-react**
  - [eslint-plugin-react官网](https://github.com/yannickcr/eslint-plugin-react)
- **eslint-plugin-jsx-a11y**
  - [eslint-plugin-jsx-a11y官网](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
- 教程
  - [教程0 - TS + react + eslint](https://zhuanlan.zhihu.com/p/62401626?from_voters_page=true)
  - [教程1 - 自动](https://juejin.cn/post/6844904056591220750#heading-0)
  - [教程2 - 手动](https://segmentfault.com/a/1190000020379876?utm_source=tag-newest)

- **手动配置步骤**
```
(1) 安装
- npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

(2) 新建 .eslintrc.js 和 .eslintignore 两个文件

(3) 配置 .eslintrc.js 文件
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["react-app", "plugin:@typescript-eslint/recommended"],
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "no-console": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "no-use-before-define": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "react-hooks/exhaustive-deps": 0,
  },
};

```

- **自动配置步骤**
```
(1) 安装 npm install -D eslint

(2) 在项目根目录中，执行命令 npx eslint --init

(3) 执行2的命令后，会进入交互式界面，可根据上面的 [教程1] 进行配置，这个过程可能安装依赖时会报错，不行就自行安装依赖吧

(4) 经过23后，就会自动生成 .eslintrc.js 文件，并且配置好了
```

### (5) stylelint
- [stylelint官网](https://stylelint.io/user-guide/get-started)
- 配置步骤
  - 1.npm install --save-dev stylelint stylelint-config-standard
  - 2.npm install -D stylelint-scss stylelint-webpack-plugin
  - 3.新建`.stylelintrc.js`
  - 4.然后添加到 `husky` 的 `hooks` 中
- package.json 配置如下
```
"husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx,js}": [
      "eslint --config .eslintrc.js --fix"
    ],
    "*.{css,sass,scss}": [
      "stylelint --config .stylelintrc.js --fix",
      "git add"
    ]
  }
```


### (6) prettier
- [prettier官网](https://github.com/prettier/prettier)
- [prettier教程](https://segmentfault.com/a/1190000020379876)
- 配置步骤
  - 1.npm i -D prettier eslint-config-prettier eslint-plugin-prettier
  - 2.新建 `.prettierrc.js` 文件
  - 3.同时修改 `.eslintrc.js` 中的配置
- .prettierrc.js配置如下
```
module.exports = {
  printWidth: 120, //一行的字符数，如果超过会进行换行，默认为80
  tabWidth: 2, //一个tab代表几个空格数，默认为2
  singleQuote: true,
  semi: false,
}
```
- .eslintrc.js配置如下
```
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'react-app',
    'plugin:@typescript-eslint/recommended',
    //  "plugin:prettier/recommended" 暂不开启
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    'no-console': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react-hooks/exhaustive-deps': 0,
  },
}
```

### (7) git提交规范
- [文档](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
- feat: 新功能 feature
- fix: 修复bug
- chore：构建过程 或 辅助工具的变动 (chore：日常事务，乏味无趣的工作的意思)
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- perf: 性能优化
- docs: 文档 documentation
- test：测试
- style：格式（不影响代码运行的变动）

### (8) js注释规范
- http://www.shouce.ren/api/view/a/13269

### (9) react-hooks 的 eslint 规范插件
- `eslint-plugin-react-hooks`
- [eslint-plugin-react-hooks地址](https://www.npmjs.com/package/eslint-plugin-react-hooks)




# (五) 按需加载相关

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





# (六) create-react-app 相关设置

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

### (2-2) create-react-app 配置全局 less
- 安装 `style-resources-loader`
- `cnpm i style-resources-loader`
- [github仓库](https://github.com/yenshih/style-resources-loader)
```
  // common function to get style loaders
  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      ...
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
            root: paths.appSrc,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        }
      );
    }
    if (preProcessor === 'less-loader') {
      loaders.push({
        loader: 'style-resources-loader',
        options: {
          patterns: path.resolve(__dirname, '../src/styles/*.less'),
          injector: 'append'
        }
      })
    }
    return loaders;
  };
```


### (3) css-module
- 需要安装 node-sass
- npm install node-sass -D
- xxxx.module.scss

### (4) 在 create-react-app 实现代码分割
- [我的掘金文章](https://juejin.im/post/6879020830253285384)


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

### (6) require.context => ts报错不存在属性
- npm install @tyeps/webpack-env -D
- require.context(direactory, useSubdirectorys, regExp, mode)
- 作用
  - 创建自己的context
- 参数
  - directory: 需要搜多的文件夹
  - useSubdirectory: 是否搜索其子目录
  - regExp: 匹配文件的正则表达式
  - mode：模式，比如 'sync'

### (7) require.context() 实现自动化 import 功能
- require.context(directory, useSubdirectories, regExp, mode)
- 作用
  - 创建自己的 context
- 参数
  - directory：需要搜索的文件夹
  - useSubdirectories：是否搜索其子目录
  - regExp：匹配文件的正则表达式
  - mode：模式，比如 'sync'
- 返回值
  - context导出的 require() 函数
- require() 函数
  - 参数：request
  - 属性
    - resolve函数，它返回request被解析后得到的 ( 模块id )，可能在 module.hot.accept 时会用到
    - keys函数，它返回一个数组，由所有可能被此 context module 处理的请求组成
- require.context()本项目使用到的案例
  - 详见 `requireModules` 函数
```

(1) 获取模块的路径
const moduleContext = require.context('./Knowledge', true, /index.tsx/, 'sync')
moduleContext.keys().forEach(modulePath => {
  console.log('modulePath就是模块的路径')
})

```
```

(2) 获取模块的源码
const moduleContext = require.context('./Knowledge', true, /index.tsx/, 'sync')
moduleContext.keys().forEach(modulePath => {
  const moduleSourceCode = moduleContext(modulePath).default
  console.log('moduleSourceCode就是模块的(组件)源码')
})

```

### (8) console.log('123 %c abc', 'font-size: 30px; color: red;')

### (9) 环境变量
- NODE_ENV
  - 运行cnpm run start时， NODE_ENV = 'development'
  - 运行cnpm run test时，NODE_ENV = 'test'
  - 运行cnpm run build时，NODE_ENV = 'production'
  - 获取：`process.env.NODE_ENV`
  - 注意：`你无法手动覆盖 NODE_ENV`
- **在 ( .env ) 中添加开发环境变量**
  - 要定义( 永久环境变量 )，请在项目的 ( 根目录 ) 创建名为 ( .env  ) 的文件
  - 必须以 `REACT_APP_` 开头来创建自定义环境变量，`除了 ( NODE_ENV ) 之外的任何其他变量都将被忽略`
  - 此功能需要在 react-scripts@0.5.0及更高版本
- **除了 .env 文件，还可以用哪些命名？**
  - .env：默认
  - .env.local：本地覆盖。除 test 之外的所有环境都加载此文件
  - .env.development, .env.test, .env.production：设置特定环境
  - .env.development.local, .env.test.local, .env.production.local：设置特定环境的本地覆盖
  - 注意： ( `.env.development.local` ) 文件会覆盖掉 ( `.env.development` ) 中设置的环境便变量，但不会影响 ( `NODE_ENV` )
  - 注意：`.env.development.local`文件不被识别，git push 时并不会提交，其实也没有必要使用local文件

# (七) 大屏

### (1) screenfull
- 安装：cnpm install screenfull -S
- [官网](https://github.com/sindresorhus/screenfull.js)

### (2) echarts封装
- [echarts的封装](https://hellohy.github.io/post/react-echarts/)

### (3) 大屏线上项目
- [自定义的数据可视化大屏-可拖动的大屏](http://47.100.38.254/library/charts)

### (4) 大屏滚动效果
- [你可能需要这样的大屏数字滚动效果](https://juejin.im/post/6844903901355835406)




# (八) BUG总结

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


### (9) 前端部署到服务器后，刷新404
原因：因为web单页应用，其实就一个index.html页面，跳转路由只是更新页面的一部分，而不存在真正的路由对应的页面，刷新访问的地址页面是不存在的，所以要重新重定向到index.html
解决：配置nginx的try_files
具体：`try_files $uri $uri/ /index.html`
说明：
  - **try_files**：依次尝试访问对应的资源，第一个访问不到，就访问第二个资源，一次往后
  - **$uri**：表示Nginx地址变量，即当前的rul地址
    - 比如：访问http://www.baidu.com/index.html，则 ( $uri ) 为 ( /index.html )
  - **$rui/**：表示一个目录，nginx会自动识别是目录还是文件
    - 比如：访问http://www.baidu.com/a/b/，则 ( $uri/ ) 为 ( /a/b/ )
代码：
```
server {
	listen 80;
	server_name localhost;
	location / {
		root /usr/share/nginx/html;
		index index.html index.htm;
		try_files $uri $uri/  /index.html;
	}
}

表示：当 $uri 和 $uri/ 均不是对应资源时，返回 /index.html 资源
```

### (10) 本地开发环境用express的proxy做的代理，部署到服务器后需要用nginx做代理
- 遇到问题：部署后前端代码是跑在 nginx 中的，代理要用nginx来做，同时因为单页应用需要做try_files来解决刷新问题
- 解决：在前端的请求path中加入 /api，在nginx中对 /api做反向代理
```
server {
	listen 80;
	server_name localhost;
	location / {
		root /usr/share/nginx/html;
		index index.html index.htm;
		try_files $uri $uri/  /index.html;
	}

	location /api {
		proxy_pass  http://49.233.215.163:7001; // 因为egg启动的是7001端口
	}
}
```

### (11) React.lazy(() => import())
- `React.lazy(() => import(/* webpackChunkName: "[request]" */, `@/pages/${path}`))`
- 上面的 request 就是 path 变量的值
- 比如：path=aaa => request=aaa => 按需加载的chunk包名就包含aaa.chunk.js
- **( React.lazy ) 需要配合 ( Suspense ) 组件**
- suspense：是悬念的意思

```
import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { lazyLoad } from '@/utils'
// 基础路由
const Login = lazyLoad('@/pages/login')
const NotFound = lazyLoad('@/pages/404')
const Layout = lazyLoad('@/pages/layout')

// renderRoutes 中包含 Switch 组件
const Router = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route path='/login' render={props => { console.log("login路由"); return <Login {...props} />}} />
        <Route path='/404' render={props => { console.log("NotFount路由"); return <NotFound {...props} />}}  />
        <Route component={Layout} />
      </Switch>
    </Suspense>
  )
}

export default Router
```

### (12) 当 eject 后报错
- 原因：eject后，如果之前有安装依赖，就都会消失，也不会在package.json中有记录
- 解决：
  - 1. 删除 node_modules 文件夹
  - 2. npm run eject 后需要 npm install 安装依赖，因为弹出了很多其他的依赖并没有安装
  - 3. 需要从新安装eject之前你安装的依赖


### (13) 记录一个因为不小心而踩的深坑 - ( 关于变量和引用 )
```
// 根据权限对（menu）,和（router注册）进行过滤
function routesFilter(routes, role) {
  return routes.filter((route) => {
    let { meta, subs } = route;
    if (subs) {
      route.subs = routesFilter(subs, role);
      // 坑：这里有个巨坑，这里一定要用route.subs
      // 例如: subs = routesFilter(subs, role);
      // 说明：不能用 subs， 因为subs是新声明的变量，直接替换了整个subs后，不会影响route.subs
    }
    return !meta.needLoginAuth || meta.rolesAuth.includes(role);
  });
}
```


### (14) 关于菜单的 openkeys selectedKeys collapsed
- **问题记录**
- 问题：当菜单中有展开和选中的项时，点击向左缩窄菜单时，再次向右展开，状态没有保存
- 解决：可以通过 onOpenChange 中的 openKeys 来做持久化
  - 刚刚点击的 openKeys 存在，就使用，不存在，就使用  localStorage 中的
- 新问题：
  - 1.这样在缩窄的菜单中hover一些之后，展开状态也变了，因为缩窄的菜单hover时也会触发openchange
  - 2.有选中和展开状态时去缩窄菜单，会有选中的菜单突出，影响观感
```
  // 展开/关闭的回调
  const onOpenChange = (openKeys: any) => {
    console.log(openKeys, 'onOpenChange执行了')
    setOpenKeys(() => openKeys)
    setLocalStorage(CONST.OPENKEYS, openKeys) // 记住展开关闭的组，刷新持久化
  }

  // const onOpenChange = (openKeys: any) => {
  //   console.log(openKeys, 'onOpenChange执行了')
  //   const currentopenKeys = openKeys.length
  //     ? openKeys
  //     : getLocalStorage(CONST.OPENKEYS)
  //   setLocalStorage(CONST.OPENKEYS, currentopenKeys) // 记住展开关闭的组，刷新持久化
  //   setOpenKeys(() => currentopenKeys)
  // }
```

### (15) useDebounce
- 问题：当 UseDebounce 组件中有其他 state 更新时，useDebounce是新的函数重新执行了，timer又会被重新赋值为初始值，造成错乱，不能达到debounce效果
- 如何验证：useDebounce在UseDebounce组件有其他state更新时重新执行了：在useDebounce中 console.log() 打印即可
- 如何解决：使用 useRef 固定数据，类似class中的实例变量
```
import { useRef } from "react";

interface IuseDebounce {
  (fn: Ifn, delay?: number, immediate?: boolean): IClosure;
}

interface Ifn {
  (...rest: any[]): any;
}

interface IClosure {
  (e: any, ...rest: any[]): any;
}

/**
 * @desc debounce 防抖函数
 * @param {function} fn 需要执行的函数
 * @param {number} delay 延时执行的时间段
 * @param {boolean} immediate 是否立即执行
 */
export const useDebounce: IuseDebounce = (
  fn: any,
  delay = 1000,
  immediate = false
) => {
  const refTimer = useRef(0); // 相当于class中的实例属性

  return (e, ...rest) => {
    if (immediate && !refTimer.current) {
      fn.call(rest);
      refTimer.current = 1; // 除了第一次进入，后面都不会在进入该函数
      return; // 第一次不往下执行
    }
    if (refTimer.current) {
      window.clearTimeout(refTimer.current);
    }

    refTimer.current = window.setTimeout(() => {
      fn.call(rest);
    }, delay);
  };
};

// -------------------- 变量 timer 版本 --------------------
// 问题：当 UseDebounce 组件中有其他 state 更新时，useDebounce是新的函数重新执行了，timer又会被重新赋值为初始值，造成错乱，不能达到debounce效果
// 如何验证：useDebounce在UseDebounce组件有其他state更新时重新执行了：在useDebounce中 console.log() 打印即可
// 如何解决：使用 useRef 固定数据，类似class中的实例变量
// export const useDebounce: IuseDebounce = (fn: any, delay = 1000, immediate = false) => {
//   let timer = 0;
//   return (e, ...rest) => {
//     if (immediate && !timer) {
//       fn.call(rest);
//       timer = 1;
//       return;
//     }
//     if (timer) {
//       window.clearTimeout(timer);
//     }
//     timer = window.setTimeout(() => {
//       fn.call(rest);
//     }, delay);
//   };
// };

```


### (16) react-markdown
- 1.安装： `npm install --save react-markdown`
- 2.安装： `npm install -D raw-loader`
- 2.引入md文件作为source
  - 引入前需要安装的依赖：npm install -D raw-loader，配置webpack
- 3.接下来就可以正常使用了
- 4.教程链接：https://segmentfault.com/a/1190000020294373


### (17) webpack-bundle-analyzer 使用报错
- 原因：端口被占用，如果有别的项目中也使用到了 webpack-bundle-analyzer 时就会产生端口调用
- 解决: 关闭其他项目的服务
- 该项目已经在开发环境添加了 webpack-bundle-analyzer 分析


### (18) 在react中如果通过create-react-app创建的项目，之后想加Typescript配置
- 1.同过配置别名时已经做了相关配置了
- 2.在1的基础上在 `scr` 文件夹中添加 `global.d.ts` 配置文件


# (九) TS 相关

## (1) tsconfig.json
- [官网介绍](https://www.tslang.cn/docs/handbook/tsconfig-json.html)
- [顶级属性](http://json.schemastore.org/tsconfig)
- 如果项目中存在 `tsconfig.json` 代表着这个目录是Typescript项目的 `根目录`
- `tsconfig.json`文件中指定了编译这个项目的 ( 根文件 ) 和 ( 编译选项 )
  - 根文件
  - 编译选项
### (1-1) @types, typeRoots, types
  - **@types**: 默认所有可见的@types包会在 `编译过程中被包含进来`，比如 `node_modules/@type/...`
  - **typeRoots**: 如果指定了`typeRoots`，则只有typeRoots下面的包才会包含进来
  - **types**: 只有被列举的包才会包含进来
```1
{
  "compilerOptions": {
    "typeRoots" : ["./typings"]
  }
}
表示：这个配置文件会包含 ./typings 下面的包，而不包含 ./node_modules/@types 里面的包
```
```2
{
  "compilerOptions": {
    "types" : ["node", "lodash", "express"]
  }
}
表示：
1. 这个tsconfig.json文件将仅会包含 ./node_modules/@types/node，./node_modules/@types/lodash和./node_modules/@types/express
2. /@types/。 node_modules/@types/*里面的其它包不会被引入进来
```

### (1-2) extends
- tsconfig.json文件可以利用 `extends` 属性从 `另一个配置文件里继承配置`
- **extends**的值是一个字符串，表示继承文件的**路径**
- **源文件的配置先被加载，然后被继承文件中的配置重写**，如果循环引用就会报错
- 顶级属性

### (1-3) compilerOptions 编译选项
- **allowJs**
  - boolean，默认值false，表示允许编译js文件
- **declaration**
  - boolean，默认值false，表示生成相应的 .d.ts 文件
- **jsx**
  - 表示在 .tsx 文件中支持jsx


## (2) 如何编写 .d.ts
