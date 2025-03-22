# npm 发包相关的知识点

### 一些单词

```
major 主要的
minor 次要的
patch 补丁 兼容
alpha 在版本中表示 内侧
beta 在版本中表示 公测
```

### (1) main module browser

```
1
main module browser
---

- (1) 问题
  - 问题：为什么 package.json 中需要这么多字段 main module browser ？
  - 回答：因为有些包只用于浏览器，有的包只能用node，有的包需要兼容两种环境
  - 回答：如果我们需要开发一个包，同时兼容 ( 浏览器和node环境 )，就需要在不同的环境下加载 ( 包的不同入口 ) 文件，一个main字段已经不能满足需求，就衍生出了 module 和 browser 字段

- (2) 问题
  - 问题：什么是 .mjs 文件
  - 回答：前端 esm 和 commonjs 规范，为了能在 ( node环境执行esm环境的模块 ) ( .mjs  ) 就应运而生

- (3) 问题
  - 问题：index.js 和 index.mjs 两种文件的优先级
  - 回答：index.mjs > index.js
  - 回答：也就是说会优先加载 index.mjs，没有才会去加载 index.js

- (4) 问题
  - 问题：main module browser 三者的含义
  - 回答：
    - main：----- 定义 npm 包的入口文件 --------------- browser环境 和 node环境 都能使用
    - module：--- 定义 npm 包的 ESM 规范的入口文件 ----- browser环境 和 node环境 都能使用
    - browser：-- 定义 npm 包 browser 环境的入口文件 -- browser环境能使用

- (5) 总结
  - 如果npm包导出的 ( ESM规范 ) 的包，使用 --------------------- ( module )
  - 如果npm包只在 ( web端使用 )，并且 ( 严禁在node端使用 )，使用 - ( browser )
  - 如果npm包只在 ( server端使用 )，使用 ---------------------- ( main )
  - 如果npm包在 ( browser端 和 server端 ) 都使用，使用 --------- ( module 或者 main )
```

### (2) npm 包版本号

```
2
npm包版本号
---

版本号基本是由三位数字组成：
   1   .   0   .   0   - beta.24
[MAJOR].[MINOR].[PATCH]-[alpha内部版本|beta公测版本|rc候选版本]

- MAJOR 进行不兼容的API更改时的版本 - 重大更新版本 不兼容
- MINOR 以向后兼容的方式添加功能时的版本 - 新功能 兼容
- PATCH 向后兼容的错误修复程序的版本 - 修复错误 兼容

// major 重要的 重大的
// minor 次要的 较小的
// patch 补丁

// alpha 希腊字母的第一个字母；开端；最初 ---- 内测
// beta 希腊字母的第二个字母 --------------- 公测
```

### (3) ^ 和 ~ 的区别

```
3
^ 和 ~ 的区别
^ 表示改变 minor 层级的版本
~ 表示改变 patch 层级的版本
---

"vue": "2.5.21",
"vue": "~2.5.21" // 2.5.x ---------- ( 不低于2.5.21小于2.6.x )
"vue": "^2.5.21", // 2.x.x --------- ( 不低于2.5.21小于3.x.x )
```

### (4) npm 的一些命令

```
4
npm 的一些命令
---

1. 第一次发包
- npm adduser
  - 注意：npm 必须是npm的源，不能是淘宝等其他源，可以使用nrm切换
  - 问题
    - 问题：如何查看 npm源 ？
    - 回答：npm config get registry
  - 问题
    - 问题：如何设置 npm源 ？
    - 回答：npm config set registry=http://registry.npmjs.org
- 然后输入 用户名 密码


2. 非第一次发包
npm login

3. 发布
npm publish

4. 撤销发布的包
npm unpublish
npm unpublish 包名@版本号

5. 生成压缩文件 和 使用压缩文件
- 生成压缩文件：npm pack
- 使用压缩文件：npm install 路径\xx-xx.tgz
- npm pack
  - 生成一个压缩文件 ( name-version.tgz )
  - 注意：npm pack 命令是在整个项目的根目录中输入的命令，因为package.json在根目录
- npm install
  - 使用压缩文件：npm install 路径\xx-xx.tgz
  - 其实就是在项目中安装打包好的包

```

### (5) package.json 中的一些字段

```
5
package.json 中的一些字段
---

1. private
- 如果是在发布到npm，需要将 private 设置为 false


2. exports 和 main
- exports
  - 作用：exports 是 main 的替代品，既定义了 ( 包的主入口 )，又 ( 封闭了包 )
  - 封闭包的作用：防止其他未被定义的内容被访问
  - 说人话：( exports ) 就是声明了一个 ( 对应关系 )
- main
  - 作用：定了npm包的主入口
  - 对比：请注意对比 main module browser 三者的区别
- 优先级
  - 同时定义了 ( exports 和 main ) 的话，优先级是 ( exports > main )
"exports": {
    ".": {
      "import": "./lib/esm/index.mjs", // --- 表示如果使用 import 就加载这个路径的文件
      "require": "./command.js" // ---------- 表示如果使用 require 就加载这个路径的文件
    },
    "./package.json": "./package.json"
}


3. keywords
- 表示：关键字，一个数组
- 作用：帮助npm上搜索到这个包
"keywords": ["react", "component", "ui"]


4. bin
- 作用：表示可执行的文件
- 什么时候用到bin：当我们需要 ( npm link ) 时使用
- 具体流程
  - 1. 在 ( 需要被link的包 A 的 package.json 中声明 bin xx )，然后执行 ( npm link )，把A包link到全局
  - 2. 在 ( 需要引入 包A 的 项目B 中 )，执行 ( npm link xx )，安装 A
  - 3. 在 B 中就可以执行 bin 中的命令了
- 使用链接：https://juejin.cn/post/6844903973002936327


5. name
- 包名：表示npm包名，该名字唯一
- 唯一：需要去 npm 上查看名字是否已被使用


6. homepage
- 项目官网url
```
