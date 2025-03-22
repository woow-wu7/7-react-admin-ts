# 前置知识

### (1) 一些单词

    prefix 前缀
    suffix 后缀

    encapsulation 封装
    advantage 优势
    pair 成对的
    demand 需求
    tip 提示

    badge 徽章
    sub 下标
    sup 上标

    - 版本号相关
    major 重要的，重大的
    minor 次要的，较小的
    patch 补丁

### (2) scss - 会用到的 scss 知识点

- 对比 [封装 05-ElementUI 源码 01](https://juejin.cn/post/7042871115848351774/#heading-8)

<!---->

    2023-06-01 补充
    ---

    1
    @use 和 @import 的区别
    - 被移除: 尽量使用 @use 代替 @import，因为@import以后会被移除
    - @use
      - 1. 带有命名空间
          - 1. @use 'a' ----------- 使用: body: { color: a.$color }
          - 2. @use 'a' as y ------ 使用: body: { color: y.$color }
          - 3. @use 'a' as * ------ 使用: body: { color: $color }
               - `as *`将模块添加到根名称空间，因此不需要前缀
               - 如果模块文件命名是 "_a.scss"，引入时是 @use 'a'; 表示私有模块，只是为了给其他模块使用，而不是编译成最终的css
      - 2. 被不同模块多次引入，只会引入一次；比如 b引入a，c引入a，不会存在两份a代码
      - 3. 内置模块
          - `math`, `color`, `string`, `list`, `map`, `selector`和`meta` ，
          - 这些模块必须在使用之前显式地导入到文件中
          - 比如: @use 'sass:math'; -- 使用: $half: math.percentage(1/2);
    - @import
      - 如果多次`@import`相同的文件，它会降低编译速度，导致覆盖冲突，并生成重复的输出
      - 所有东西都在全局命名空间中，包括第三方包——所以我的`color()`函数可能会覆盖你现有的`color()`函数，反之亦然
      - 当你使用像`color()`这样的函数时，很难确切地知道它是在哪定义的。它来自哪个`@import`
    - 资料
      - https://zhuanlan.zhihu.com/p/112768701


    2
    @forward 和 @use 的区别？
    - @use: 是将其他模块 引入 到当前模块来使用
    - @forward: 该模块并不需要使用@forward的模块，只是转发，即 传给未来的导入操作
    - @import = @use + @forward

<!---->

    1
    !default
    - 作用：在 ( 变量的结尾 ) 加上 ( !default )
      - 1. 如果变量没有被赋值，则变量被重新赋值，即使用 !default 的值
      - 2. 如果变量已经被赋值，则不会被重新赋值
      - 从语意上来理解，就是默认值的意思，即有值就用之前的值，没有就使用default的值
    ---

    $width: 1px;
    $width: 2px !default; // 变量后加!default，变量已经定义过，不会使用新的值，使用旧的值
    $color: red !default; // 变量后加!default，变量未定义值，则使用新的变量
    .p {
        width: $width; // -- 1px，定义过使用之前的值
        color: $color; // -- red，没定义过使用最新的值
    }

<!---->

    2
    !global
    - 作用：用来设置 ( 全局变量 )
    ---

    (1)
    未使用 !global 前
    ---
    $var: red;
    @mixin foo($var: $var) {
        default-color: $var; // 这里的所有 $var 都是局部变量，是通过参数传入的，等于传入参数的值
        $var: green; // 局部变量，变量$var被设为green；在局部作用域中，$var都会被设为green
        scoped-color: $var; // 局部变量，被设置成了 green
    }
    .bar {
        @include foo($var);
        color: $var; // 这里 color 引用的是 全局变量 $var
    }
    被编译为
    .bar {
      default-color: red;
      scoped-color: green;
      color: red;
    }


    (2)
    使用 !global 后
    ---
    $var: red;
    @mixin foo($var: $var) {
        default-color: $var;
        $var: green !global; // 局部变量，变量$var被设为green；在局部作用域中，$var都会被设为green
        scoped-color: $var; // 注意：上面修改的是全局变量，而这里是局部变量未被修改，所以是 red
    }
    .bar {
        @include foo($var);
        color: $var; // 这里 color 引用的是 全局变量 $var，全局变量$var被修改成了 green
    }
    被编译为
    .bar {
      default-color: red;
      scoped-color: red;
      color: green; // color 是全局变量
    }

<!---->

    3
    @mixin @include @content
    @mixin 和 @include 和 @content
    - @mixin aa -----> 定义一个混合器aa
    - @include aa ---> 使用混合器aa
    - @content; ------> 将 @include aa 中定义的样式引入到 @mixin 中
    ---
    扩展: 注意 @mixin 和 @extends 的区别
    ---

    <style scoped lang="scss">
    @mixin test-mixin($color: red) { // -- @mixin
      // 1
      // $color: red
      // 这里冒号后面是默认值，在没有传入参数时，默认值生效
      div {
        background: $color;
        @content; // -------------------- @content 将 @include中定义的样式引入到 @mixin 的 div 中
      }
    }
    #app {
      .content {
        @include test-mixin(yellow) { // @include，花括号中的内容在 @mixin中 可以通过 @content 来引用
          font-size: 30px; // 同时，@mixin 可以接收变量，这里传入 yellow 作为 $color 的值
          font-weight: 700;
        }
      }
    }
    </style>

<!---->

    4
    插值语句 #{}
    - 通过 `#{}` 插值语句可以在 ( 选择器 ) 或 ( 属性名 ) 中使用 ( 变量 )
    - 2022/07/25补充：插值语句也可以在 ( 属性值 ) 中插入SassScript
    ---

    $name: foo;
    $attr: border;
    p.#{$name} { // -------------- #{} 插值语句在 ( 选择器 ) 中使用
      #{$attr}-color: blue; // --  #{} 插值语句在 ( 属性名 ) 中使用
    }
    编译为
    p.foo {
      border-color: blue;
    }

<!---->

    5
    @at-root
    - 将 ( 父级选择器 ) 直接暴力的改成 ( 本文件的根选择器 )，即和最外层父级元素同级，而不是其子元素
    - 2022/02/25 更新如下
    - 1. & -------------------------- 指的 ( 一定是最近的父级 )
    - 2. @at-root ------------------- 指的 ( 一定是 当前文件的 最外层的父级 )
    ---
    .p {
        color: blue;
        .h1 {
            color: yellow;
            @at-root {
                .div {
                    color: red;
                }
            }
        }
    }
    编译为：
    1. 其中 .p 和 .h1 没有变化
    2. .div 被提到了文件的顶层
    .p { color: blue; }
    .p .h1 { color: yellow; }
    .div { color: red; } // 被提升到该文件的最外层

<!---->

    6
    @each
    @each ... in ...
    格式为 @each var in <list>|<map>
    - var 表示任意变量名
    - list 表示 ( 数组 )，是一连串的值
    - map 表示 (a:b, c:d)，map时需要使用两个变量，分别表示 key 和 value

    --------
    list
    @each $animal in puma, sea-slug, egret {
      .#{$animal}-icon {}
    }
    编译为
    .puma-icon {}
    .sea-slug-icon { }
    .egret-icon {}

    --------
    map
    @each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
      #{$header} {
        font-size: $size;
      }
    }
    编译为
    h1 { font-size: 2em; }
    h2 { font-size: 1.5em; }
    h3 { font-size: 1.2em; }

<!---->

    7
    @for
    @for ... from ... to
    @for ... from ... through
    格式为 `@for <variable> from <expression> to <expression> { ... }` ------ 不包含 最后一个
    或者为 `@for <variable> from <expression> through <expression> { ... }` - 包含 最后一个
    作用：从一个数字向上或者向下计数到另一个数字
    区别：to不包含最后的数字，through包含最后的数字
    ---

    @for $i from 1 through 4 { // 包含1-4个p都加上红色，to不包含最后一个
      p:nth-child(#{$i}) {
        background: red;
      }
    }

<!---->

    8
    math.div($number1, $number2)
    - 除法：返回 $number1 除以 $number2 的结果
    - division 是除法的意思
    ---

    @debug math.div(1, 2); // 0.5
    @debug math.div(100px, 5px); // 20      单位相同
    @debug math.div(100px, 5); // 20px      没有单位时
    @debug math.div(100px, 5s); // 20px/s   单位不同时

<!---->

    9
    map相关
    --
    Sass中的Maps包含一对键值对，使得通过键查找值很容易
    格式为：(<expression>: <expression>, <expression>: <expression>)
    空map：用 () 表示
    空列表即空数组：用 () 表示
    Maps允许使用任何Sass值作为键
    ---
    map-get($map, $key) ----------- 取出指定的值
    map-remove($map, $key) -------- 移除指定的值
    map-has-key($map,$key --------- 查看值是否存在
    map-merge($map1, $map2) ------- 合并多个map
    ---

    9.1 查值
    map-get($map, $key)
    $font-weights: ("regular": 400, "medium": 500, "bold": 700);
    @debug map-get($font-weights, "medium"); // 500
    @debug map-get($font-weights, "extra-bold"); // null

    $font-weights: ("regular": 400, "medium": 500, "bold": 700);
    .p { font-weight: map-get($font-weights, bold); } // 700



    9.2 遍历
    @each var in <list>|<map>
    所以 @each是可以遍历map的
    $icons: ("eye": "\f112", "start": "\f12e", "stop": "\f12f");
    @each $name, $glyph in $icons { // 定义两个变量，相当于 key value
      .icon-#{$name}:before {
        content: $glyph;
      }
    } 编译为
    .icon-eye:before { content: "\f112"; }
    .icon-start:before {content: "\f12e"; }
    .icon-stop:before { content: "\f12f"; }


    9.3 添加元素
    map-merge($map1, $map2)
    - 相同的键：如果两个map具有相同的键，则返回第二个键所对应的值
    - 返回新的map：由于Sass中的map是`不可变的`，`map-merge()`不会修改原始列表，所以 Sass的map函数都返回新的map，而不是修改原始的map


    9.4 是否存在元素
    map-has-key($map,$key)
    - 返回一个布尔值
    - 当 $map 中有这个 $key，则函数返回 true，否则返回 false

<!---->

    10
    @if
    @if ... @else if ... @else
    当 `@if` 的表达式返回值不是 `false` 或者 `null` 时，条件成立，输出 `{}` 内的代码
    ---
    $type: monster;
    p {
      @if $type == ocean {
        color: blue;
      } @else if $type == matador {
        color: red;
      } @else {
        color: black;
      }
    }

<!---->

    11
    @function
    @function ... @return
    Sass 支持自定义函数，并能在任何属性值或 Sass script 中使用
    ---

    $grid-width: 40px;
    @function grid-width($n) { // -------------- 声明函数
      @return $n * $grid-width;
    }

    #sidebar { width: grid-width(5); } // ------ 调用函数
    结果为
    #sidebar { width: 200px }

<!---->

    12
    @extend
    - 作用：继承样式
    - 解决：
      - 不使用@extend：如果不使用继承，在htlm中需要添加两个class，<div class="error seriousError">
      - 使用@extend: <div class="seriousError">
    - 区别
      - @extend 和 @mixin 的区别？
        - @mixin 可以传参
        - 编译后的样式不一样
    - 官网教程
      - 7.3 https://www.sass.hk/docs/
    ---

    .error {
      border: 1px #f00;
      background-color: #fdd;
    }
    .seriousError {
      @extend .error;
      border-width: 3px;
    }
    编译为
    .error, .seriousError {
      border: 1px #f00;
      background-color: #fdd;
    }
    .seriousError {
      border-width: 3px;
    }

<!---->

    13
    @use 和 @import 的区别
    ---

    1. @import 的缺点
    - 多次导入，样式会重复加载
    - 没有命名空间
    - 没有私有函数

    2. @use
    - (1) 只导入一次：该文件只会 ( 导入一次 )，即使在项目中多次使用了 @use
    - (2) 私有：( 下划线_ ) 和 ( 连字符- ) 开头的 ( var，mixin，function ) 是 ( 私有的 )，不会导入
    - (3) 命名空间：@use as 命名空间的名称

<!---->

    14
    @import '~@/aa/bb'
    ---

    - 变量: 当 @import 的路径中包含 ~ 时，表示的后面是一个变量
    - 查找顺序：该变量首先会去 ( webpack 的 resolve.alias 中查找 )，没有才会去 ( node_modules ) 中查找
    - 链接：https://segmentfault.com/q/1010000010879017

<!---->

    15
    可变参数
    @function 和 @mixin 中的 ( 可变参数 )
    ---

    @mixin animate($name, $time, $mode, $delay) {
      transition: $name $time $mode $delay;
    }
    等价于
    @mixin animate($args...) {
      transition: $args;
    }

    ---
    使用
    div {
      @include animate(all, 4s, linear, 0s);
    }

<!---->

    16
    颜色函数 2022.08.20
    ---
    red() green() blue()
    rgb() rgba()
    mix()
    rgb($red,$green,$blue)：根据红、绿、蓝三个值创建一个颜色；
    rgba($red,$green,$blue,$alpha)：根据红、绿、蓝和透明度值创建一个颜色；// rgba 分别表示 red green blue alpha
    mix($color-1,$color-2,[$weight])：把两种颜色混合在一起
    red($color)：从一个颜色中获取其中红色值；
    green($color)：从一个颜色中获取其中绿色值；
    blue($color)：从一个颜色中获取其中蓝色值；
    ---

    1
    mix
    - Mix函数是将两种颜色根据一定的比例混合在一起，生成另一种颜色
    - mix($color-1,$color-2,$weight);
      - 权重
        - 默认: 默认权重是50%，表示各占一半
        - 25%: 表示第一个颜色所占比例为25%
        - background: mix(red, white, 70%);

### (3) npm - 会用到的 npm 发包相关的知识点

    1
    main module browser
    ---

    - (1) 问题
      - 问题：为什么 package.json 中需要这么多字段 main module browser ？
      - 回答：因为有些包只用于浏览器，有的包只能用node，有的包需要兼容两种环境
      - 回答：如果我们需要开发一个包，同时兼容 ( 浏览器和node环境 )，就需要在不同的环境下加载 ( 包的不同入口 ) 文件，一个main字段已经不能满足需求，就衍生出了 module 和 browser 字段

    - (2) 问题
      - 问题：什么是 .mjs 和 .cjs 文件
      - 回答：
        - .mjs: 前端 esm 和 commonjs 规范，为了能在 ( node环境执行esm环境的模块 ) ( .mjs  ) 就应运而生
        - .cjs:  前端 esm 和 commonjs 规范，为了能在 ( node环境执行Commonjs模块 ) ( .cjs  ) 就应运而生
        - 总结：.mjs是esm规范的模块，.cjs是commonjs规范的模块

    - (3) 问题
      - 问题：index.js 和 index.mjs 两种文件的优先级
      - 回答：index.mjs > index.js
      - 回答：也就是说会优先加载 index.mjs，没有才会去加载 index.js

    - (4) 问题
      - 问题：main module browser 三者的含义
      - 回答：
        - main：----- 定义 npm 包的入口文件 --------------- browser环境 和 node环境 都能使用
        - module：--- 定义 npm 包的 ESM 规范的入口文件 ----- browser环境 和 node环境 都能使用
        - browser：-- 定义 npm 包 browder 环境的入口文件 -- browser环境能使用

    - (5) 总结
      - 如果npm包导出的 ( ESM规范 ) 的包，使用 --------------------- ( module )
      - 如果npm包只在 ( web端使用 )，并且 ( 严禁在node端使用 )，使用 - ( browser )
      - 如果npm包只在 ( server端使用 )，使用 ---------------------- ( main )
      - 如果npm包在 ( browser端 和 server端 ) 都使用，使用 --------- ( module 或者 main )

<!---->

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

<!---->

    3
    ^ 和 ~ 的区别
    ^ 表示改变 minor 层级的版本
    ~ 表示改变 patch 层级的版本
    ---

    "vue": "2.5.21",
    "vue": "~2.5.21" // 2.5.x ---------- ( 不低于2.5.21小于2.6.x )
    "vue": "^2.5.21", // 2.x.x --------- ( 不低于2.5.21小于3.x.x )

<!---->

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

<!---->

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

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3f7e29428784bc4bc281bce3398f92f~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9d358c0261e457e9f3681568e61022b~tplv-k3u1fbpfcp-watermark.image?)

### (4) vue - 会用到的 vue 知识点

    1
    getCurrentInstance
    - 作用：访问组件内部实例，可以作为在组合式api中获取this的替代方案
    - 注意：getCurrentInstance只能在 ( setup 或 生命周期钩子 ) 中使用
    - 应用：
      - 获取 router
      - getCurrentInstance().appContext.config.globalProperties.$router
    - 问题：
      - 问题：如果要在除了 ( setup 和 生命周期钩子 ) 外使用 ( getCurrentInstance ) 怎么弄？
      - 回答：可以现在 ( setup 中通过 getCurrentInstance() 获取实例，然后再使用 )
    - 官网说明：https://v3.cn.vuejs.org/api/composition-api.html#getcurrentinstance
    ---


    1.1 获取router
    const instance = getCurrentInstance();
    const router = instance?.appContext.config.globalProperties.$router;

<!---->

    2
    unref
    - 是一个语法糖
    - 相当于：val = isRef(val) ? val.value : val
    ---

    function useFoo(x: number | Ref<number>) {
      const unwrapped = unref(x) // unwrapped 现在一定是数字类型
    }

<!---->

    3
    CSSProperty
    ---

    const styles: CSSProperties = {};
    styles.marginLeft = styles.marginRight = `-2px`;

### (5) typescript - 会用到的 typescript 知识点

- Record

<!---->

    1
    Record
    - 是一种工具类
    - Record<Keys， Type>
      - keys: 表示对象的属性键
      - type: 表示对象的属性值
      - 用于将 ( 一种类型属性 ) 映射到 ( 另一种类型 )
    - Record的实现
      - type Record<K extends keyof any, T> = { [P in K]: T; };
    ---

    例1
    type roles = 'tester' | 'developer' | 'manager'
    const staffCount: Record<roles, number> = {
      tester: 10,
      developer: 20,
      manager: 1
    }
    表示：roles联合类型的每个属性值的类型都是number

    ---
    例2
    interface Staff { name: string; salary: number;}
    type StaffJson = Record<keyof Staff, string>; // keyof获取interface的所有属性名的联合类型
    const product: StaffJson = {
      name: "John",
      salary: "3000",
    };
    表示：interface中的所有属性名的联合类型中的 ( 每个属性的属性值 ) 的类型是 string

    ---
    例3
    interface CatInfo {
        age: number,
        breed: string
    }
    type CatName = 'miffy'| 'boris' // 字符串字面量类型
    const cats: Record<CatName, CatInfo> ={
        miffy: {age: 10, breed: "Persian"},
        boris: {age:5, breed: 'Maine Coon'},
    };

    ---
    例4
    Record<string, any>
    - 表示 key 是 string
    - 表示 value 是 any

- Partial

<!---->

    2
    Partial
    - 将 ( 类型 ) 定义的 ( 所有属性 ) 都修改为 ( 可选的 )
    - Partial的实现
      - type Partial<T> = { [P in keyof T]?: T[P]; };
    ---

    type Coord = Partial<Record<'x' | 'y', number>>;
    // 等同于
    type Coord = { x?: number; y?: number; }

- Pick

<!---->

    3
    Pick
    - 从类型定义的属性中，选取 ( 指定一组的属性 )，返回一个 ( 新的类型定义 )
    - 从字面意思也能知道是 ( 摘取部分属性 )
    - Pick的实现
      - type Pick<T, K extends keyof T> = { [P in K]: T[P]; };
    ---

    type Coord = Record<'x' | 'y', number>;
    type CoordX = Pick<Coord, 'x'>;
    // 等同于
    type CoordX = { x: number; }


    --
    2022-10-05 更新
    例2
    type Animal = {
      name: string,
      category: string,
      age: number,
      eat: () => number
    }
    const bird: Pick<Animal, "name" | "age"> = { name: 'bird', age: 1 }

- Exclude

<!---->

    Exclude
    - Exclude<T, U> = T extends U ? never : T;
    - Exclude 就是将前面类型的与后面类型对比，( 过滤出前面独有的属性 )
    - 排除
    ---

    const str: Exclude<'a' | '1' | '2', 'a' | 'y' | 'z'> = '1'; // str 的类型是 "1" | "2"

- Omit -------- 对比 Pick

<!---->

    Omit
    - type Omit = Pick<T, Exclude<keyof T, K>>
    - 省略
    ---

    type UserState = {
      name: string
      age: number
    }
    type Person = Omit<UserState, 'age'>
    // 等价于
    type Person {
       name: string
    }

    ---
    type Person2 = Pick<UserState, 'age'>
    // 等价于
    type Person {
       age: number
    }

### (6) tsconfig.json - 会用到的 tsconfig.json 知识点

- [之前的文章 - Typescript](https://juejin.cn/post/6999807282343051277#heading-19)

<!---->

    tsconfig.json 顶层属性
    ---

    compilerOptions ----> 编译选项
    extends ------------> 引入其他配置文件，继承配置
    include ------------> 编译器需要编译的文件，或文件夹
    exclude ------------> 编译器需要排除的文件，或文件夹
    files --------------> 表示编译器需要编译的单个文件列表
    references ---------> 指定依赖工程
    compileOnSave ------> 可以让IDE在保存文件的时候根据`tsconfig.json`重新生成文件

<!---->

    compilerOptions
    ---

    1
    include
    - 指定需要编译的 ( 文件或目录 )，( 对比 files 的好处是不用一个一个写文件，而是使用模式匹配 )
    2
    exclude
    - 指定不需要编译的 ( 文件或目录 )
    "include": [
      // "scr" // 会编译src目录下的所有文件，包括子目录
      // "scr/*" // 只会编译scr一级目录下的文件
      "scr/*/*" // 只会编译scr二级目录下的文件
    ]

    3
    outDir
    - 指定编译后，文件所在的目录
    - 一般情况下，直接编译编译的文件和源文件在同一个目录，可以通过 outDir 来指定编译后的文件所在的目录

    4
    removeComments
    - 删除编译后的js代码中的 ( 注释 )

    5
    module
    - 将ts编译成js时，js文件使用什么 ( 模块系统 )
    - module=es6时，打包后的js文件中，使用import
    - module=commonjs时，打包后的js文件中，使用require，这样编译后的js文件中import都被转成了require

# 资料

- scss
  - scss-map <https://ithelp.ithome.com.tw/articles/10207093>
  - @use 和 @import 的区别 <https://toutiao.io/posts/3a7enfa/preview>
  - @function 中的可变参数 <https://blog.51cto.com/u_15652665/5330439>
- package.json
  - main module browser 的区别 <https://github.com/SunshowerC/blog/issues/8>
- typescript
  - Record <https://juejin.cn/post/6985424163502571534>
  - ts 中内置工具类 <https://juejin.cn/post/6844904066489778183>
- 参考 ui 组件库
  - element-plus <https://github.com/element-plus/element-plus>
  - fes-design <https://github.com/WeBankFinTech/fes-design>
  - mzl-ui <https://github.com/Ningstyle/mzl-ui#readme>

```

```
