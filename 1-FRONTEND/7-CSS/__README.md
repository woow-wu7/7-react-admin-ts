## CSS

## 一些单词

```
ellipsis 省略号 ----------- VS ellipse 椭圆 = oval
orient 朝向 向东
unordered 无序的 adj ------ VS ordered有序的
parallelogram 平行四边形 --  VS parallel 平行的
paint 油漆 绘制 // repaint重绘 reflow重排
aspect 外观
interface 界面 接口 n
-
pixel 像素 n
```

## (一) position

- static 默认值
- inherit 继承，从父元素继承 position 的值
- relative 相对定位，相对于 - 自己正常位置进行定位 ------------ 脱离正常的文档流，是在文档流中的位置依然存在
- absolute 绝对定位，相对于 - 距离最近的具有定位属性的父元素 ---- 脱离正常的文档流，在文档流中的位置不存在
  - 问题: 什么是具有 定位属性 的父元素？
  - 回答: 就是除了 position: static 以外的定位属性都可以
- **【 fixed 】** // 基于窗口定位
  - **`注意 transform 的影响，如果祖先元素设置了 transform属性(非null属性值)，则fixed定位基于该祖先元素，而不是基于视口定位，即整个窗口定位`**
- **【 sticky 】** // 粘性定位
  - 相当于 `position:sticky = position:fixed + position:relative`

### (1.1) position: sticky 粘性定位

- Location reference point. 定位的基准点
  - 相对于 ( 具有滚动条的，距离最近的祖先元素 )
  - 如果不存在这样的祖先元素，则是基于 ( viewport ) 视口进行定位
- 表现上来看
  - position:sticky = position:fixed + position:relative
- 详见
  - 1.1-position:sticky.html

```
.container {
  height: 600px;
  overflow: scroll;
}
.item-sticky {
  position: sticky;
  top: 0;
}
```

### (1.2) transform 和 position:fixed 的关系

- position:fixed
  - 1. 一般情况下，是基于 ( viewport 视口 - 一般情况下是整个窗口 ) 进行定位
  - 2. 但是，如果 ( 祖先元素设置了 transform ，属性值为非 null ) 时，( position:fixed ) 就变成了 ( 基于该祖先元素定位 )
  - 3. 多个祖先元素都具有 transform 属性时，采用 ( 就近原则 )
- 扩展
  - 问题: transform 有哪些属性 ?
  - 回答: (rotate 旋转) (translate 移动) (scale 缩放) (skew 倾斜)
  - 扩展: transform: skew; 可以实现平行四边形
  - 扩展: 可以在 triangle 的基础上实现 sector 和 trapezoid
- 详见
  - 1.2-transform-fixed.html

## (二) display:none 和 visibility:hidden 的区别？

- 区别
  - display:none ------- 隐藏后，不占据原来的位置
  - visibility:hidden -- 隐藏后，占据原来的位置
- 共同点:
  - DOM 是否存在: ( display:none ) ( visibility:hidden ) 所在的元素，真实的 DOM 仍然存在，只是页面上不显示而已，只是通过 css 的方式隐藏
  - DOM 是否存在: ( 伪元素 ) 在 DOM 中不存在，表现上相当于 ( 当前元素的第一个子元素 )
- 对比伪元素
  - 伪元素: 不在 DOM 中，相当于当前元素的第一个子元素。- 不在 DOM 中，所以可以提升性能。比如实现分割线，图标，父元素高度塌陷等
- reflow 和 repaint
  - display:none; 会引起回流和重绘

## (三) display: inline-block; 存在间隙的原因?

- 原因: ( 标签 ) 之间存在 ( 空白字符 )
- 解决:
  - 1. 各个标签不要换行，紧贴着写
  - 2. 父元素设置 font-size:0; 然后子元素在设置自己需要的字体大小，因为空白字符是字符，所以设置 font-size 有效
- 扩展:
  - inline-block: input select textarea img button
  - block:
    - form table div p h1-h6 ul ol li
    - section header footer aside main nav
  - inline: span a
  - 注意:
    - inline 元素: 设置 width 和 height 无效
    - inline 元素: margin 设置只在 水平方向 有效，垂直方向不生效
    - 例子: 1-FRONTEND/5-CSS/2.1-block-inline-inlineblock.html
    - 例子: 1-FRONTEND/5-CSS/2.2-inline-padding-width.html

## (四) 画各种图形

- triangle 三角形
- right triangle. 直角三角形
- -
- rectangle 矩形
- square 正方形
- parallelogram 平行四边形 // parallel + o + gram
- trapezoid 梯形
- -
- polygon 多边形
- pentagon 五边形
- hexagon 六边形
- -
- sector 扇形
- semicircle 半圆
- oval 椭圆
- arrow 箭头
- -
- -
- sphere 球
- cube 立方体
- cuboid 长方体
- cylinder 圆柱
- cone 圆锥

### (4.1) css 画三角形 -- triangle

- 问题
  - 问题: 把 div 的 width 和 height 设置为 0 时，同时将四边的 border 设置为不同颜色，为什么会出现 4 个三角形?
  - 回答: 因为 width 和 height 是 0，border 的四边相互遮住了
- 实现
  - 将 width 和 height 设置为 0
  - 将 border 设置为透明 transparent，然后单独设置一边的 border 即可
- 特点
  - 底边长度: 三角形底边长度 = border 长度的两倍
  - 高度: 三角形的高度 = border 的长度
  - 相反: ( border 显示的方向 ) 和 ( 三角形的朝向 ) 是 ( 相反的 )，border-bottom 是向上的三角形

```
height: 0;
width: 0;
border: 100px solid transparent;
border-bottom: 100px solid red;
```

### (4.2) css 画扇形 -- sector

```
css实现扇形
- css实现扇形的方式和实现三角形的方式差不多
- css三角形的基础上 + border-radius: 100%;
---

#sector {
  width: 0;
  height: 0;
  border: 100px solid transparent;
  border-bottom: 100px solid red;

  border-radius: 100%; // 在三角形的基础上 + border-radius:100%;
}
```

### (4.3) css 画半圆 -- semicircle

```
css实现半圆
- 在矩形的基础上，设置相邻两边的 border-radius 最大即可
---

.semicircle {
  width: 300px;
  height: 150px;
  background: red;

  /* 上右下左 */
  border-radius: 1000px 1000px 0 0;
}
```

### (4.4) css 画平行四边形 -- parallelogram

- parallelogram 是平行四边形的意思
- skew: 扭曲 曲解 弯曲的

```
transform: skew(x-angle,y-angle)
- x-angle 水平倾斜的角度
- y-angle 垂直倾斜的角度
- 详细：https://juejin.cn/post/7029703494877577246
---

.parallelogram {
  width: 400px;
  height: 200px;
  transform: skew(-30deg, 0deg);
}
```

### (4.5) css 画箭头 -- arrow

```
- 请看 17
border-top + border-right
transform: rotate(45deg)
```

### (4.6) SVG 画环形进度条

- 详见 `1-FRONTEND/7-CSS/GG-环形进度条.html`

```
svg 画环形进度条
---

1
viewBox
- html: ------ viewBox="0 0 200 200"
- 参数: ------- startX startY width height
- 表示: ------- 截取的区域的 ( 左上角坐标 startX, startY ) 和 ( 截取区域的 width 和 height )
- 作用: svg上截取一小块，放大到整个svg显示

2
stroke-dasharray
- html: ------- stroke-dasharray="5, 5"
- css: -------- stroke-dasharray: 596 596;
- 表示: -------- 短划线 和 缺口的长度
- 作用: 控制用来描边的点划线的图案范式

3
stoke-dashoffset
- 表示: ------- 边框的偏移距离，如果使用了一个 <百分比> 值，那么这个值就代表了当前 viewport 的一个百分比

4
资料
- 多种方式实现环形进度条 https://codepen.io/pizizz/pen/mwyNyG
- https://minjiechang.github.io/css/svgCircle/

5
实现
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      svg {
        border: 1px solid red;
      }

      #circle {
        transform: rotate(-90deg); /* 这是让环的起点在圆的顶点 */
        transform-origin: center;

        transition: all 0.1s linear;

        stroke: rgb(0, 85, 255);
        stroke-width: 10px;
        stroke-linecap: round;
        stroke-dasharray: 596 596;
        stroke-dashoffset: 496;
      }

      #circle-background {
        stroke: rgba(190, 190, 190, 0.5);
      }
    </style>
  </head>
  <body>
    <svg width="200" height="200" viewBox="0 0 200 200">
      <!-- circle -->
      <!-- cx cy 表示圆心坐标 -->
      <!-- r 表示半径 -->
      <!-- fill 表示圆的填充颜色 -->
      <!-- stroke-width 边框宽度 -->
      <!-- stroke 边框填充颜色 -->
      <circle id="circle" cx="100" cy="100" r="95" fill="transparent" />
      <circle
        id="circle-background"
        cx="100"
        cy="100"
        r="95"
        fill="transparent"
        stroke-width="10"
      />
    </svg>

    <button>随机概率</button>
    <script>
      const button = document.querySelector("button");
      const circle = document.querySelector("circle");

      button.addEventListener("click", onRandom, false);
      function onRandom() {
        console.log("circle", circle);
        circle.style["stroke-dashoffset"] = Math.random() * 496;
      }
    </script>
  </body>
</html>
```

### (4.7) HTML/CSS 画环形进度条

```
HTML/CSS 画环形进度条
---

1
原理
- 左右半圆，旋转后，隐藏

2
实现
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      svg {
        border: 1px solid red;
      }

      #circle {
        transform: rotate(-90deg); /* 这是让环的起点在圆的顶点 */
        transform-origin: center;

        transition: all 0.1s linear;

        stroke: rgb(0, 85, 255);
        stroke-width: 10px;
        stroke-linecap: round;
        stroke-dasharray: 596 596;
        stroke-dashoffset: 496;
      }

      #circle-background {
        stroke: rgba(190, 190, 190, 0.5);
      }
    </style>
  </head>
  <body>
    <svg width="200" height="200" viewBox="0 0 200 200">
      <!-- circle -->
      <!-- cx cy 表示圆心坐标 -->
      <!-- r 表示半径 -->
      <!-- fill 表示圆的填充颜色 -->
      <!-- stroke-width 边框宽度 -->
      <!-- stroke 边框填充颜色 -->
      <circle id="circle" cx="100" cy="100" r="95" fill="transparent" />
      <circle
        id="circle-background"
        cx="100"
        cy="100"
        r="95"
        fill="transparent"
        stroke-width="10"
      />
    </svg>

    <button>随机概率</button>
    <script>
      const button = document.querySelector("button");
      const circle = document.querySelector("circle");

      button.addEventListener("click", onRandom, false);
      function onRandom() {
        console.log("circle", circle);
        circle.style["stroke-dashoffset"] = Math.random() * 496;
      }
    </script>
  </body>
</html>
```

## (五) 盒模型

- 标准盒模型 和 IE 盒模型
  - box-sizing: border-box;
  - box-sizing: content-box;
- 标准盒模型
  - box-sizing: content-box;
  - width 和 height 只包含 ( content )
- IE 盒模型
  - box-sizing: border-box;
  - width 和 height 包含 ( content padding border ) 三者之和
- 组成
  - 盒子模型由以下组成
  - content padding border margin
- 扩展
  - 问题: 当用 border-radius 将盒子设置成圆后，内容会超出圆形吗？
  - 回答: 会，因为 border-radius 只会改变视觉效果，盒子占据的实际空间不会变
- 扩展
  - 问题: **如果一个正方形 box 设置了 border-radius: 100%; 成为一个圆后，设置 box-shadow 是圆形的还是矩形的？**
  - 回答: 是圆形的
  - 注意: box-shadow 和 filter: drop-shadow 的区别
  - 详见: 19-filter:drop-shadow().html
- 扩展
  - 问题: 行内元素设置 width 和 height，设置 margin 会出现什么情况
  - 回答:
    - 行内元素设置 width 和 height 无效
    - 行内元素设置 margin 只在水平方向有效，在垂直方向无效
    - 例子: 30-inline-padding-margin-height-width.html
- 扩展
  - 问题: clientHeight 和 offsetHeight 的区别
  - 回答:
    - clientHeight: height + padding + (滚动条)
    - offsetHeight: height + padding + border + (滚动条)
    - offsetHeight 比 clientHeight 多了 border 的高度，注意是 ( 双倍 ) 的 border，因为上下左右都有 border

## (六) 移动端 1px 物理边框 ？

- 前置知识
  - 公式: ( `物理像素 = css 像素 * 像素比` )
  - 像素比: 即 几倍屏
  - 如何获取屏幕像素比: `window.devicePixelRatio`
- 实现
  - 1. 给 div 盒子设置 伪元素，高度 1px，绝对定位在盒子底部
    - 扩展: 伪元素 - 相当于当前元素的第一个子元素，不在 DOM 中
    - 扩展: display:node 和 visibility:hidden 在 DOM 存在
  - 2. 通过 @media screen and (-webkit-min-device-pixel-ratio: 2 或者 3 ) 命中几倍屏
  - 3. 然后通过 transform: scaleY(0.5) 缩放 伪元素 ( 2 倍屏缩小 0.5，3 倍屏缩小 0.333 )
- 详见
  - 1-FRONTEND/7-CSS/3-1px-border.html
- 英语
- // TIPS: Pay attention to the pronunciation of "media". [media-媒体-n]

```
.container {
  position: relative;
}
.container::after { // 伪元素 - 当前元素的第一个子元素，不在DOM中
  content: "";
  position: absolute;
  bottom: 0; // 底部
  left: 0;
  right: 0;
  height: 1px;
  background: red;
}

@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .container::after {
    transform: scaleY(0.5);
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) {
  .container::after {
    transform: scaleY(0.33);
  }
}
```

## (七) em 和 rem

- 相同点
  - 两者都是 ( 相对单位 )
- 不同点
  - **em**
    - em 作为 font-size 属性的单位时 ---> 1em 表示的是 ( 父元素 ) 的 font-size 大小
    - em 作为其他属性的单位时 -----------> 1em 表示的是 ( 自身 ) font-size 的大小
  - **rem**
    - 特点
      - rem 是根据 html 元素的 font-size 作为基准
      - 1rem = html 的 font-size 的大小
    - 前置知识
      - `物理像素 = css 像素 * 像素比(几倍屏)`
      - **deviceWidth/ui 设计稿的总宽度 = 某元素的实际宽度/该元素 ui 宽度**
    - 实现原理
      - 动态计算 html 元素的 font-size
        - 1. 通过 js 方式 --> document.documentElement.style.fontSize = document.documentElement.clientWidth / 750 + 'px'
        - 2. 通过 css 方式 -> html{ font-size: 100vw /750 }

## (八) block inline inline-block 三者的区别 ?

- 结合 (三) 一起看
- 本项目/2-FRONTEND/CSS/7-block-inline.html
- 常见的 block 元素 --------- 设置 width 和 height 有效
  - form table p div h1-h6 ul ol li
  - section header footer aside main nav
- **常见的 inline 元素 -------- 设置 width 和 height 无效，并且如果设置 margin 的话，margin 只在水平方向生效，垂直方向不生效**
  - span a
- **常见的 inline-block ----- 设置 width 和 height 有效**
  - input textarea select img button
- 扩展
  - 问题: display: inline-block; 存在间隙的原因?
  - 原因: ( 标签 ) 之间存在 ( 空白字符 )
  - 解决:
    - 1. 各个标签不要换行，紧贴着写
    - 2. 父元素设置 font-size:0; 然后子元素在设置自己需要的字体大小，因为空白字符是字符，所以设置 font-size 有效

## (九) css 选择器

- **元素型选择器**
  - Element 元素选择器
  - `*`通配符选择器
  - #id 选择器
  - .类 选择器
- **关系型选择器**
  - E > F 子选择器
  - E F 后代选择器
  - E+F 相邻选择器，选择符合条件的 ( 相邻的兄弟元素 )，( E 元素后相邻的兄弟元素 F ) ------------ 家相邻
  - E~F 兄弟选择器，选择符合条件的 ( 所有兄弟元素 )，不强调相邻 ( E 元素后面的所有兄弟元素 ) ----- 浪兄弟
- **属性选择器**
  - E[att]
  - E[att="val"] att 属性值是 val 的元素
  - E[att~="val"] 选择具有 att 属性且属性值其中一个等于 val 的 E 元素（包含只有一个值且该值等于 val 的情况）
  - E[att^="val"] 开头：选择 att 属性以 val 开头的元素
  - E[att$="val"] 结尾
  - E[att*="val"] 包含
- **伪类伪元素选择器**
  - **伪类选择器**
    - E:hover // --------------- // TIPS: Pay attention to the pronunciation of the word 'hover'. [hover-悬停-盘旋-徘徊-v]
    - E:focus // --------------- // TIPS: Pay attention to the pronunciation of the word 'focus'. [focus-焦点焦距-n-聚焦-v]
    - E:link
    - E:active
    - E:visited // ---------------------------- 分割线 ----------------------------
    - E:nth-child()
    - E:nth-of-type()
    - E:root // ----------------- 详见 二十六
    - E:is() // ----------------- 详见 二十六
    - E:not() // ---------------- 详见 二十六
    - E:where() // -------------- 详见 二十六
  - **伪元素选择器**
    - E::before
    - E::after

### (9.1) css 选择器的权重 - ( css specificity. 权重 )

- !important > style 内联(行内)样式 > id > ( class 类, 伪类, 属性选择器 ) > ( 标签元素选择器，伪元素选择器 ) > ( 通配符选择器，关系型选择器 -- 记忆/最后通关 )

```
10000：!important
1000：内联样式、外联样式
100：ID选择器
10：类选择器、伪类选择器、属性选择器
1：标签选择器（元素选择器）、伪元素选择器
0：通配选择器、关系型选择器( 后代选择器、子选择器、兄弟选择器、相邻选择器 )
```

## (十) @import 和 link 的区别？

- 类型
  - html：link 是 html 标签，除了加载 css，link 标签上还具有其他属性 rel 属性
  - css：@import 是 css 语法，只有导入样式的作用
- DOM 可操作性
  - js 可以操作 DOM，而 link 标签属于 DOM;
  - js 不能操作 @import
- 权重
  - link 标签引入的样式 权重 > @import 引入的样式
- 加载顺序
  - link：加载 css 和页面一起加载
  - @import：页面加载完成后，再加载 css
- 兼容性
  - link 是 html 标签
  - @import 是 css2 的语法，ie5 以上才兼容，兼容性比较差
- 总
  - 总体上 link 比 @import 好
  - link: 是 html 标签，能被 js 操作，优先级，加载顺序，权重都比@import 好

## (十一) HTML5 的一些新特性

- 新的语义化标签
  - section
  - header
  - footer
  - aside
  - main
  - nav
- 新的媒体标签
  - video
  - audio
- 新的绘画标签
  - canvas
  - svg
- 拖放
  - drag
  - drop
- 本地存储
  - localStorage
  - sessionStorage
  - indexedDB
- 地理位置
  - GeoLocation ---------- geography 地理 n
- webWorker
- webSocket
- 新的表单控件
  - date
  - time
  - email
  - url
  - search

## (十二) pointer-events 用 css 方式设置 ( 事件穿透 - 即让事件不响应 )

- 作用：可以设置 ( 事件穿透 )
- 具体：指定在什么特定的情况下，target 可以设置为 ( 鼠标事件 ) 的 ( target )
- 应用: 应用即设置了 ( pointer-events:none; ) 的元素绑定的 ( 事件不会再触发 )，即用 css 的方式禁止事件响应
- 属性:
  - pointer-events: none; 不响应事件
  - pointer-events: auto; 响应事件
- 例子: 8-pointer-events.html
- 详细
  - pointer-events: none; ------- 表示 ( 该 css 选择器对应的 target 永远不会成为鼠标事件的 target )，即不会对 ( 鼠标事件进行响应 )
  - pointer-events: auto -------- 默认值，对鼠标事件进行响应
  - pointer 是 指针 的意思

## (十三) 如何修改 transform 变换时的原点？

- 原点
  - 默认原点: transform 变换时，默认的原点是 ( 中心点 )
  - 修改原点: transform-origin 属性可以 ( 修改原点 )
- transform-origin
  - transform-origin: x-axis y-axis z-axis;
  - 单位：可以是 百分数，px，top 等等

## (十四) css 设置小于 12px 的字体

```
1. 前置知识
- 浏览器上能设置的最小字体是 12px，当小于12px的字体会当作12px来处理

2. 解决方案
- zoom
- transform: scale() + transform-origin: left;


zoom
- zoom表示变焦，可以改变页面上元素的尺寸
- zoom:50% 和 zoom:0.5 都表示缩小到原来的一半


transform
- transform: scale(0.5)
- transform-origin: left;
- 注意：
  - 出现问题：transform: scale(0.5) 进行字体缩放后，字体虽然变小了，但是位置缺变化了
  - 分析原因：因为transform的操作，默认的 ( 原点 ) 是 ( 正中心位置 )
  - 如何解决：transform-origin: left;
  - 扩展: 结合13中 ( transform-origin ) 改变原点来学习
- 扩展知识
  - position: fixed; 会受到 transform 的影响，如果祖先元素没有transform则基于窗口定位，如果有transform，并且值非空，则基于该祖先元素定位
  - 详见 1.3-12px-zoom-transform.html
- 扩展知识
  - 描述：transform 是 ( 不会 ) 引起 ( reflow回流 ) 的，只会 ( repaint重绘 )
  - 原因：
    - 浏览器渲染会经过 parseHTML -> parseStylesheet -> evaluateScript -> layout -> paint -> composite
    - 分层
      - transform ------------ 是在 composite 合成层
      - width，left，margin --- 是在 layout 层，不在同一层
      - 分层的目的: 是为了减少重绘制的时间
    - GPU加速: transform还能开启 GPU 加速
- 扩展知识
  - 问题：还有哪些属性会开启 GPU 加速？
  - 回答
    - transform
      - transform: translate rotate scale skew translate3d
    - filter
    - opacity
    - will-change
      - 本项目/2-FRONTEND/CSS/29-will-change.html
      - will-change 为 web 开发者提供了一种告知浏览器该元素会有哪些变化的方法，浏览器可以在元素属性真正发生变化之前提前做好对应的优化准工作

例子
- 1.3-12px-zoom-transform.html
```

## (十五) 单行省略号 和 多行省略号

- 例子: 1-FRONTEND/5-CSS/10-ellipsis.html

```
1. 单行省略号
---
overflow: hidden;
text-overflow: ellipsis; // 文本溢出显示省略号，ellipsis是省略号的意思
white-space: nowrap;
```

```
2. 多行省略号
---
overflow: hidden;
text-overflow: ellipsis; // 前面两个属性和单行省略号相同

display: -webkit-box;
-webkit-box-orient: vertical; // 指定朝向是垂直方向上
-webkit-line-clamp: 2; // 指定多少行后显示省略号
```

## (十六) ul 和 ol 的区别？

- 区别
  - ul 无序列表 -------- unordered list 无序列表
  - ol 有序列表 -------- ordered list 有序列别
- 记忆
  - u 是 unordered 的缩写
  - o 是 ordered 的缩写
- 问题
  - 问题: 去除 ul 和 ol 的 ( 默认样式 )
  - 回答: **`list-style: none;`**
- 例子
  - 1-FRONTEND/5-CSS/12-ul-ol.html

## (十七) repaint 重绘 和 reflow 重排(回流) 和 合成

- repaint 重绘
  - 对 DOM 的修改只导致了 ( 样式 ) 的变化，并没有改变 ( 几何属性 )，浏览器不需要从新计算几何样式，而是从新绘制新的样式，这个过程叫做重绘 repaint
  - 跳过了 ( 布局树 ) 和 ( 建图层树 )
- reflow 重排
  - 对 DOM 的修改引发了 DOM 几何尺寸的变化(宽高，隐藏等)，浏览器需要 ( 重新计算 ) 元素的几何属性
  - 同时 ( 其他元素的集合属性 和 位置也将受到影响 )，浏览器需要重新将计算结果绘制出来，这个过程叫做回流 reflow
- composite 合成
  - 就是更改了一个既不要 ( 布局 layout ) 也不要 ( 绘制 paint ) 的属性，那么渲染引擎会跳过布局和绘制，直接执行后续的 ( 合成 composite ) 操作，这个过程就叫合成
- 特点
  - reflow 一定会 repaint
  - repaint 不会定会 reflow
- **常见的会引起 ( reflow 重排-回流 ) 的操作有哪些？**
  - 页面首次渲染
  - 浏览器窗口大小变化
  - 元素尺寸 和 位置变化 width height position padding margin border
  - fontSize
  - 显示/隐藏元素
  - 添加/删除元素
  - 激活 css 伪类
  - offsetWidth, clientWidth, scrollTop/scrollHeight 的计算， 会使浏览器将渐进回流队列 Flush，立即执行回流
- **只会 composite 合成的属性，不会重绘重排回流**
  - transform
  - opacity
  - filter
  - will-change
  - 所以动画最好使用 transform opacity 等属性来实现，结合 32 一起看

## (十八) sticky-footer 效果

- 效果定义
  - 当内容不足一屏时，保持在屏幕最底部
  - 当内容超过一屏时，在内容的最底部，随着内容滚动
- 实现方式
  - padding-bottom + margin-top
  - flex 布局
  - calc 动态计算
- 详见 `14-sticky-footer-**.html`

```1 -------- padding-bottom + margin-top
1
padding-bottom + margin-top
- 特点: 适合 ( footer高度固定 ) 的情况，兼容性好
---

section{main footer}
section 和 其上的所有父元素都要设置 height: 100%;
main 的 box-sizing: border-box; 因为默认是标准盒子
main ------> min-height: 100%; padding-bottom: 200px; box-sizing: border-box; // 注意这里一定要设置 box-sizing: border-box;
footer ----> margin-top: -200px;
```

```2 -------- flex布局
2
flex布局
- 特点: 适合 ( footer高度不确定 ) 的情况
---

section{main footer}
section ---> display: flex; flex-direction: column; min-height: 100%; 同时 section 以上的父元素都要设置 height: 100%才可以
main ------> flex: 1;
```

```3 -------- calc
3
calc
- 特点: 也只是适合于 ( footer 高度固定 ) 的情况
---

section{main footer}
section 和其上的所有父元素都要设置 height: 100%;
main ------> min-height: calc(100% - footer 的高度) // 这里一定要注意是 min-height，不能是height，不然main的内容会溢出
```

## (十九) 水平垂直居中布局

- 绝对定位
  - 知道盒子的大小: margin: -自身高度的负一半 -自身宽度的负一半;
  - 不知道盒子的大小: transform: translate(-50%, -50%);
- flex
  - 父 display: flex; justify-content: center; align-items: center;
  - 子 不需要任何设置
- grid 布局 1
  - 父 display: grid; justify-items: center; align-items: center;
  - 子 不需要任何设置
- grid 布局 2
  - 父 display: grid;
  - 子 justify-self: center; align-self: center; -- 注意是在子元素上设置
- table-cell 布局
  - 父 display: table-cell;
  - 父 text-align: center;
  - 父 vertical-align: middle;
  - 子 display: inline-block; // 记得要设置子元素的 display: inline-block;
- 例子
  - 1-FRONTEND/5-CSS/4-center.html

## (二十) 双栏布局

- 绝对定位
- flex 布局
- float
  - container{left, right} 容器及以上的元素高度都设置为 100%;
  - left ---> float: left; height: 100%;
  - right --> margin-left: left 的宽度；// 其实可以不设置
  - 记得要清楚浮动带来的影响

## (二十一) 三栏布局(圣杯布局) - 中间自适应，两边固宽

- float
  - container{left, right} 容器及以上的元素高度都设置为 100%;
  - left ----> float: left;width=200px;
  - right ---> float: right;width=200px;
  - center --> margin-left: 200px; margin-right: 200px; // 其实可以不设置
- 注意点
  - DOM 标签的书写顺序是 left right center，将 center 放在最后面
  - ( center ) 的设置 ( margin-left+marin-right ) 可以使用 ( overflow: hidden ) 来代替

## (二十二) BFC 块级格式化上下文

- BFC 是 block formatting context ( 块级格式化上下文 ) 的缩写
- 具有 BFC 特性的元素，可以看作是隔离了的 ( 独立元素 )，容器中的元素不会在 布局上 影响其他元素
- **如何触发 BFC？** 共 5 种方法
  - 根元素
  - 浮动
  - 绝对定位
  - overflow 除了 visible 以外的值，比如 hidden，scroll，auto
  - display: flex table-cell inline-block
- BFC 的应用
  - 去除 margin 重叠 - 使相互影响的 ( 两个标签位于两个 BFC 中 ) -- 扩展: 行内元素设置 margin 只在水平方向有效
  - 清除浮动 - 解决 ( 浮动元素的父元素高度塌陷 ) 的问题
- 扩展
  - 问题: 清除浮动的方式
  - 回答:
    - 将父元素设置为 BFC 容器，所有触发 BFC 的方法都可以
    - 添加伪元素，然后在伪元素上设置 clear 操作，注意伪元素不在 DOM 中
    - 添加占位元素来撑开浮动造成的父元素高度塌陷

## (二十三) title 和 alt 的区别？

- title
  - title 可以作为标签，也可以作为标签的属性
  - 标签: title 作为标签，用在 head 标签中，表示 ( 网页的标题 ) -- `<head><title>网页标题</title><head>`
  - 属性: title 作为属性，在 `<a title="">` 标签中表示 ( hover 时的文字说明 )，注意是 a 标签
- alt
  - alt 只能作为标签属性
  - 用于 ( img input textarea )，表示 ( 标签加载失败后的 文字说明 )
- 例子
  - 18-title-alt.html

## (二十四) filter

### (24.1) filter: drop-shadow() VS box-shadow

- 具有 alpha 通道的阴影
- filter: drop-shadow() VS box-shadow
- 语法
  - `filter: drop-shadow(offset-x offset-y blur-radius spread-radius注意阴影大小这个参数大多数浏览器不支持 color)`
- 注意 drop-shadow() 和 box-shadow 的区别
  - box-shadow 属性在元素的整个框后面创建一个矩形阴影
  - drop-shadow() 过滤器则是创建一个符合图像本身形状 (alpha 通道) 的阴影
- 扩展
  - filter: drop-shadow(x,y,blur,color); // box-shadow: x, y, blur, spread, color;
  - filter: brightness(200%);
  - filter: grayscale(100%);

```
drop-shadow
---

box-shadow: h-shadow v-shadow blur spread color inset;
box-shadow: 水平方向距离，垂直方向距离，模糊半径，扩展半径，阴影颜色，将外部阴影 (outset) 改为内部阴影;

drop-shadow(offset-x offset-y blur-radius color)
- 属性基本和box-shadow一样
- 注意
  - drop-shadow 是一个函数
  - 第四个设置项 spread-radius 阴影大小，大多数浏览器不支持，这是参数和 box-shadow 的主要区别
- 案例
  - FRONTEND/CSS/19-drop-shadow.html
```

### (24.2) filter: brightness()

- 表示让图表更亮或者更暗
- filter: brightness(amount)
  - 参数 amount 是数量的意思，是一个数值
- 扩展
  - filter: drop-shadow(x,y,blur,color); // box-shadow: x, y, blur, spread, color;
  - filter: brightness(200%);
  - filter: grayscale(100%);
- 详见: 本项目/2-FRONTEND/CSS/19-filter:brightness().html

```
@keyframes change-brightness {
  0% {
    filter: brightness(100%);
  }
  50% {
    filter: brightness(300%);
  }
  100% {
    filter: brightness(100%);
  }
}
```

### (24.3) filter:grayscale() [开启悼念模式]

- 英语
  - grayscale 是灰度的意思
- 扩展
  - filter: drop-shadow(x,y,blur,color); // box-shadow: x, y, blur, spread, color;
  - filter: brightness(200%);
  - filter: grayscale(100%);
- 实战 1-FRONTEND/5-CSS/19-Filter-grayscale.html

```
html {
  filter: grayscale(100%);
}
```

## (二十五) 图片等比例放大缩小

- 详见 `FRONTEND/CSS/6-image-equal-ratio.html`

```
图片等比例放大缩小 - 三种方法
width: 100%;一个相对单位后，做以下三种设置
- aspect-ratio: 宽/高；// aspect是外观的意思
- padding-bottom: 75%;
- height: auto;
---

1
width: 100%;
height: auto;

2
width: 100%;
height: 0;
padding-bottom: 75%; // 宽高比4:3

3
width: 100%;
aspect-ratio: 4/3;
// 宽高比4:3
// aspect-ratio: <width-ratio>/<height-ratio>
// aspect 是外观的意思

总结:
三个方法的共同点: 都是 width: 100%; 或者是 相对单位
```

## (二十六) 伪类

## (26.1) :nth-of-type(number) 和 :nth-child 的区别？

- 详见: `FRONTEND/CSS/21-nth-of-type.html`
- p:nth-child(2) 和 p:nth-of-type(2) 的区别?
  - p:nth-of-type(2)
    - p:nth-of-type(2) 命中的是父元素的子元素中的 - p 标签中的第二个 p 标签
  - p:nth-child(2)
    - p:nth-child(2) 命中的是父元素的第二个子元素，注意 ( 父元素的第二个子元素类型 ) 必须和 ( 伪类调用者的类型 ) 一致才会命中
    - :nth-child(odd)
    - :nth-child(even)
- 扩展:
  - 问题: 如何选中除了选择器以外的所有元素？
  - 回答: :not() ------- 详见 30
- 扩展
  - 常见的伪类
  - E:hover
  - E:focus
  - E:link
  - E:active
  - E:visited
  - E:nth-child()
  - E:nth-of-type()
  - E:root // 详见 二十六
  - E:not() // 详见 二十六
  - E:is() // 详见 二十六
  - E:where() // 详见 二十六
- 扩展
  - :nth-child()
    - 1. 如何选中 2 的倍数的元素 // :nth-child(2n)
    - 2. 如何选中 奇数 元素 // :nth-child(2n+1)
    - 3. 如何选中 前 3 个元素 // :nth-child(-n+3)
    - 4. 如何选中 第 3 个及以后的元素 // :nth-child(n+3)
    - 6. 如何选中 奇数 元素 // :nth-child(odd) // 或者 nth-child(2n+1) // -- odd 奇数
    - 7. 如何选中 偶数 元素 // :nth-child(even) // ------------------------ even 偶数
  - :nth-last-child()
    - 5. 选中倒数 3 个元素 // :nth-last-child(-n+3)

### (26.2) :not()

- 详见 `22-:not().html`

```
:not(.child1) {
  /* 选中除了 .child1 的元素，包含了所有层级 */
  color: red;
}
```

### (26.3) :is -------- 对比 :where()

- 详见 `1-FRONTEND/7-CSS/36-伪类:is().html`

```
:is
- 以选择器列表作为参数，并选择该列表中任意一个选择器可以选择的元素
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      <!-- a和c将是红色 -->
      div:is(.a, .c) {
        color: red;
      }
    </style>
  </head>
  <body>
    <div class="a">a</div>
    <div>b</div>
    <div class="c">c</div>
    <div class="d">d</div>
  </body>
</html>
```

### (26.4) :where() -------- 对比 :is()

- 详见 `1-FRONTEND/7-CSS/36-伪类:is().html`

```
:where()
- 作用和 :is() 类似
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      :where(header, footer) {
        color: red;
      }

      /* p标签是蓝色，而不是红色 */
      :is(p) {
        color: blue;
      }
    </style>
  </head>
  <header>header</header>
  <footer>
    <div>footer-div</div>
    <p>footer-p</p>
  </footer>
</html>
```

### (26.5) :root

- 详见 `1-FRONTEND/7-CSS/36-伪类:root.html`
- 详见 `1-FRONTEND/7-CSS/36-var.html`

```
:root
- 表示的是 html 选择器
- 同时存在 ( html选择器 ) 和 ( :root ) 时，优先级 ( :root > html )
- 两只方式设置 css 变量
  - css 中设置
  - js 中设置
---

/* 定义变量 */
:root {
  --color: yellow;
}

/* 使用变量 */
/* 第二个参数表示: 如果变量名不存在，就使用第二个参数 */
.container {
  background: var(--color, red);
}

/* js中设置变量 */
<script>
  const html = document.querySelector(":root");
  html.style.setProperty("--color", "green");
</script>
```

## (二十八) word-wrap 和 word-break

- 详见: 2-FRONTEND/5-CSS/23-word-wrap-vs-word-break.html

```
word-wrap: break-word; 整个单词一起换行
word-break: break-all; 单词内换行
```

## (二十九) transform 为什么不会引起 回流(重排) ？

- 原因
  - 因为 GPU 进程会为其开启一个新的复合图层(也叫 GPU 硬件加速)，不会影响默认复合图层（就是普通文档流），即脱离了文档流，所以并不会影响周边的 DOM 结构，而属性的改变也会交给 GPU 处理，不会进行重排
  - 使 GPU 进程开启一个新的复合图层的方式还有 3D 动画，过渡动画 transform，以及 opacity 属性，还有一些标签，这些都可以创建新的复合图层。这些方式叫做硬件加速方式
- 对比
  - ( 绝对定位 ) 虽然可以脱离文档流，但是没有新建图层，所以会 reflow
  - 结合 19 一起看
- 扩展
  - 还有哪些属性不会引起 reflow
    - transform
    - opacity
    - filter
    - will-change

## (三十) Element.offsetHeight 和 Element.clientHeight ---- [border]

- Element.clientHeight = ( 自身高度 ) + ( padding ) + ( 滚动条高度 )
- Element.offsetHeight = ( 自身高度 ) + ( padding ) + ( 滚动条高度 ) + ( border 的高度 )
- 总结
  - offsetHeight 比 clientHeight 多了 border 的高度
  - **注意: ( 上下都有 border，padding，所以是两倍 )**
- 关联
  - 其实 clientHeight 和 offsetHeight 于 box-sizing 相关
  - box-sizing: content-box; ---- width 和 height 只包括 content
  - box-sizing: border-box; ----- width 和 height 包括 content+padding+border
  - clientHeight = height + padding + 滚动条高度
  - offsetHeight = height + padding + border + 滚动条高度
- 详见 `2-FRONTEND/5-CSS/25-clientHeight-offsetHeight.html`
- [相见](file:///Users/xiawu/work/personal/front-end/8-penetrate/1-FRONTEND/7-CSS/25-clientHeight-offsetHeight.html)

## (三十一) HTMLCollection 和 NodeList 的区别 ？

```
NodeList 和 HTMLCollection 的区别？
- HTMLCollection: document.getElementsByTagName()
- NodeList: querySelectorAll()
---

1. 动态集合 和 静态集合
- HTMLCollection 是动态集合，DOM树 ( 新增 和 删除 ) 可以感知，但是能感知 ( 修改 )
- NodeList ----- 是静态集合，DOM树 ( 新增 和 删除 ) 无法感知，但是能感知 ( 修改 )

2. 子节点类型
- HTMLCollection 只能包含 - 元素节点
- NodeList ----- 可以包含 - 任意类型的节点

3. 查询的方法
- HTMLCollection
  - document.getElementsByTagName()
  - 比如在手写history路由时，获取所有的a标签就是通过 document.getElementsByTagName('a')
- NodeList
  - document.querySelectorAll()

// (1)
// 如何记忆：
// - 多对多
//    - getElementsByTagName 比  querySelectorAll 长
//    - HTMLCollection 比 NodeList 长
// - elements
//    - HTMLCollection中只包含element元素节点，而 getElementsByTagName 名字中也包含了 Elements

// (2)
// Node.childNodes 返回 NodeList
// Element.children 返回 HTMLCollection

4. 返回值
- HTMLCollection -- Element.children 返回 HTMLCollection
- NodeList -------- Node.childNodes 返回 NodeList

5. 方法
- HTMLCollection -- 没有 forEach，只能使用 for 循环遍历
- NodeList -------- forEach
```

## (三十二) html 和 xml 的区别 ?

```
html和xml的区别 ?
---

1. html中不区分大小写；xml中严格区分大小写
2. html中属性可以不带值；xml中属性必须有值
3. html中的标签是预定义的固有标签，不可扩展；xml中的标签不是固定的，可以自定义，可以扩展
4. html是用来显示数据的，xml是用来描述数据结构，存储数据的

总结:
- HTML 大小写都可以，属性可以没值, 固有标签，不可扩展，显示数据
- XML 严格区分大小写，属性必须有值, 标签不固定，可自定义标签，可扩展，存储数据
```

## (三十三) 【HTML 的 img 标签的 srcset 属性】 和 【css 的 image-set()】

- 链接 本项目/2-FRONTEND/CSS/26-img-srcset.html
- [链接](https://juejin.cn/post/6844903702810066958)
- 实战 2-FRONTEND/5-CSS/BB-img-srcset.html

```
1
srcset
---

<img src="small.jpg " srcset="big.jpg 1440w, middle.jpg 800w, small.jpg 1x" />
- srcset 属性的作用是
  - 1. w: 根据屏幕宽度w，加载不同大小的图片
  - 2. x: 根据屏幕的像素密度x，加载不同大小的图片
- 上面的代码表示
  - 浏览器宽度达到 800px 则加载 middle.jpg ，达到 1400px 则加载 big.jpg
```

```
2
background-image: image-set()
---

body {
  background-image: -webkit-image-set( url(../images/pic-1.jpg) 1x, url(../images/pic-2.jpg) 2x, url(../images/pic-3.jpg) 600dpi);
  background-image: image-set( url(../images/pic-1.jpg) 1x, url(../images/pic-2.jpg) 2x, url(../images/pic-3.jpg) 600dpi);
}
- 上面的代码表示
  - 1倍屏: 上述代码将会为普通屏幕使用 pic-1.jpg
  - 2倍屏: 为高分屏使用 pic-2.jpg
  - 600dip: 如果更高的分辨率则使用 pic-3.jpg
```

## (三十四) transitionend 事件 和 ( :hover ) ( :active ) 的应用

- 触发: transitionend 是一个事件 ( 分割单词 transition_end )，在 css transition 完成过渡后触发
- 案列:
  - 1. 在按钮 hover 1s 后触发一些事件，不到 1s 不触发
  - 2. 在按钮 长按:active 1s 后触发一些事件，不到 1s 不触发
  - 3. 轮播图的滚动和暂停
  - 地址: https://github.com/woow-wu7/6-penetrate/blob/main/2-FRONTEND/CSS/27-transitionend.html
- 资料: https://juejin.cn/post/7143051955810598926
- 资料: transition 小技巧 https://juejin.cn/post/7149531766045278244
- 案例 27-transitionend.html

```
button1.addEventListener("transitionend",() => console.log("hover 2s 后打印"));
#button-hover {
  opacity: 0.99;
  transition: all 2s;
}
#button-hover:hover {
  opacity: 1;
}
```

## (三十五) css 中的变量

- 详见 `1-FRONTEND/5-CSS/36-var.html`

```
1
定义一个变量 (或者叫属性)
定义变量 -----> :root { --main-bg-color: red; }
使用变量 -----> background: var(--main-bg-color, blue); // 第二个参数表示: 如果变量名不存在，就使用第二个参数

2
问题: css变量为什么要使用 -- 开头 ？
回答:
  - 因为为了避免和scss和less等库的冲突
  - scss $main-bg-color: red;
  - less @main-bg-color: red;

3
问题: 为什么要使用 :root 伪类？
回答: :root 伪类表示 ( 文档根元素 )，在 :root 中声明的属性(变量)相当于全局属性

4
var
var(变量名, 默认值)
- 使用变量
- 第二个参数: 表示如果变量名不存在，就使用默认值
```

## (三十六) ios Safari 浏览器 100vh 遇到的问题

- 问题描述: 当整个页面的根元素设置了 height: 100vh 后，底部的内容被底部工具栏所遮挡
- 原因: 因为 ios safari 浏览器的 100vh 是包含 ( 可视区域 + 地址栏 + 底部工具栏 ) 的，所以 100vh 容器的底部才会被底部的工具栏所遮挡
- 如何解决:
  - 1. js+css 的方式: window.innerHeight + css 变量 + size 事件，即 ( `js 动态修改 height` )
- 链接:
  - https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties
  - https://www.jianshu.com/p/662039030e7e
  - https://juejin.cn/post/7096050514105729061

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <style>
      html, body, .wrap { padding: 0; margin: 0; }

      /* 文档根元素 */
      :root {
        --global-bg-color: red;
      }

      .wrap {
        height: 100vh; /* 給 Safari 以外的浏览器读取，保证兼容性 */
        height: calc(var(--vh), 100vh); /* 使用css变量 --vh，不存在就使用100vh默认值 */
      }
    </style>
  </head>
  <body>
    <div id="app">
      <div class="wrap" ref="wrap">
        <div>这是内容</div>
      </div>
    </div>
    <script>
      new Vue({
        el: "#app",
        mounted() {
          this.vhHack()
        },
        methods: {
          vhHack() {
            const height = window.innerHeight;
            this.$refs.wrap.style.setProperty('--vh', height + 'px'); // 在 wrap 类中声明css变量 --vh

            // 窗口变化
            window.addEventListener('resize', function() {
              window.document.querySelector('.wrap').style.setProperty('--vh', height + 'px');
            });
          }
        },
      });
    </script>
  </body>
</html>
```

## (三十七) 无限滚动的轮播图 和 (公告)提示信息

- 无限滚动: 本项目/2-FRONTEND/5-CSS/11-infinite-scroll.html
- 轮播图: 本项目/2-FRONTEND/CSS/1-carousel/无限滚动轮播图.html
- 提示信息: 本项目/2-FRONTEND/CSS/1-carousel/无限滚动轮播图.html

```
(一) 无限滚动公告栏
// 问题
// 需要解决的问题
// 1. 文字滚动结束时，文字并没有完全移动出去，即 ( 移动的距离不是文字的长度 ) - position
// 2. 文字没有首尾衔接，即 ( 没有实现无缝连接 ) -------------------------- 两段相同的文字，并且 transform: translateX(-50%);

// 解决
// 1. 移动的距离并不是文字的长度
//    - 因为: transform: translateX移动的百分数的距离，不是以自身为参照，但是因为 .target 是处于文档流中块级元素，其宽度默认为父元素的宽度。所以文字只会移动 父元素宽度而不是文本本身长度的距离
//    - 解决: 我们需要利用脱离文档流的方式解决 ( 比如：通过 position: absolute; )，因为 transform: translateX() 是基于父元素来定位的
// 2. 文字没有收尾相连
//    - 解决: 我们可以通过完全一样的两段文字拼接，并且移动的距离在 translateX(-50%) 时，从新开始动画，在视觉上就是无限拼接滚动

// 实战
// 2-FRONTEND/5-CSS/11-infinite-scroll.html
```

```
(二) 无限滚动 ( 轮播图 ) 的原理
- 原理: 在123张图片的基础上，再在1的前面加上结尾的3，在3的后面加上开始的1，即 31231 五张图片，然后判断偏移量即可
- 实战: 本项目/2-FRONTEND/CSS/1-carousel/carousel.html
```

## (三十八) 行内元素可以设置 padding 和 margin 吗 ？

- margin: 行内元素的 margin 只在水平方向有效，垂直方向无效
- width height: 行内元素设置 width 和 height 无效
- 结合: 八 一起看

## (三十九) 层叠上下文

- 如何创建层叠上下文
  - 根元素 HTML
  - 普通元素，需要设置 ( position 为非 static )，并且设置 ( z-index ) 的值
  - css3 很多属性能都创建一个层叠上下文
- 层叠顺序 ( 以下逐渐增大 )
  - **层叠上下文 background/border**
  - **z-index < 0**
  - **block 块级水平盒子**
  - **float 浮动盒子**
  - **inline/inline-block 水平盒子**
  - **z-index:auto/z-index:0**
  - **z-index > 0**
  - 创建层叠上下文的元素 background/border <--- z-index:负数 <--- block 块级元素 <--- float <--- inline/inline-block <--- z-index:auto/z-index:0 <--- z-index:正数
- z-index
  - 问题: 什么时候 z-index 有效?
  - 回答: 只有在元素定义了 ( position 属性，且 position 非 static ) 时才有效
- 资料
  - https://juejin.cn/post/6844903667175260174

## (四十) scroll-behavior

- scroll-behavior: smooth;
- 例子: 本项目/2-FRONTEND/5-CSS/32-scroll-behavior.html

```
1.
scroll-behavior: smooth;
// 平滑滚动，比如回到顶部时，有平滑滚动动画
// 英语
// behavior 是行为的意思
// smooth 是平滑的意思

2.
a 标签
// 当 href 是 #id 时，设置 id 就能滚动到该 id 元素的位置
---

<a href="#bottom" id="top">滚动到底部</a>
<div>内容内容内容内容内容内容内容内容内容内容<br /><br /><br /><br /></div>
<div>内容内容内容内容内容内容内容内容内容内容<br /><br /><br /><br /></div>
<div>内容内容内容内容内容内容内容内容内容内容<br /><br /><br /><br /></div>
<div>内容内容内容内容内容内容内容内容内容内容<br /><br /><br /><br /></div>
<div>内容内容内容内容内容内容内容内容内容内容<br /><br /><br /><br /></div>
<div>内容内容内容内容内容内容内容内容内容内容<br /><br /><br /><br /></div>
<div>内容内容内容内容内容内容内容内容内容内容<br /><br /><br /><br /></div>
<a id="bottom" href="#top">回到顶部</a>
```

## (四十一) animation

- animation: name duration time-function delay iteration-count direction fill-mode
- 详见 2-FRONTEND/5-CSS/19-filter:brightness().html

```
一共 7 个属性
---

animation: name duration time-function delay iteration-count direction fill-mode
- iteration-count: 0-infinite；表示动画执行的次数 0-infinite 之间 --- iteration 是重复的意思
- direction：normal|alternate；表示是否轮流反向播放 ----------------- alternate 是轮流的意思
- fill-mode:none|forwards|backwards;表示动画不播放时的样式 ---------- forwards是停在最后一帧，backward是停在第一帧，和意思是相反的

@keyframes name {}
```

## (四十二) 视差滚动

- 英语
  - attachment 附件
  - preserve 保持
  - perspective 透视
- 实战
  - 1-FRONTEND/5-CSS/33-background-attachment.html
  - 1-FRONTEND/5-CSS/33-transform-style.html
  - 1-FRONTEND/5-CSS/DD-视差滚动.html
- 资料
  - https://www.zhangxinxu.com/study/201503/css-parallax-effect-demo.html
  - https://juejin.cn/post/7039275245831716895
  - https://juejin.cn/post/7200653122637103164#heading-3

```
1
background-attachment: fixed;
- 作用: 设置 ( 背景图像 ) 是否 ( 固定 )，或者 ( 随页面的其余部分滚动 )
- 属性值:
  - scroll: 背景图片随着页面的滚动而滚动，这是默认的
  - fixed: 背景图片不会随着页面的滚动而滚动
  - local: 背景图片会随着元素内容的滚动而滚动
```

```
2
父: perspective: 1px; overflow: scroll;
子: transform-style: preserve-3d;
孙(必须是直接孙，不能是曾孙): transform: translateZ(-2px) scale(2); // transform: translate3D(-50%, -120px, -1px) scale(2);
---

.root {
  perspective: 1px;
  overflow-y: scroll;
  .app {
    transform-style: preserve-3d;
    .child1 {
      transform: translateZ(-2px) scale(2);
    }
    .child1 {
      transform: translateZ(-1px);
    }
  }
}
```

## (四十三) 自定义滚动条

- 资料
  - https://cloud.tencent.com/developer/article/1537366
  - https://juejin.cn/post/6844903926110617613#heading-36
- 实战
  - 1-FRONTEND/5-CSS/EE-自定义滚动条.html
  - 组件库: https://github.com/woow-wu7/8-divine-plus/tree/main/packages/components/scrollbar

```
1
滚动条的组成
- Thumb 滚动条
- Track 滚动曹 // track 是轨道，跟踪的意思
---

section::-webkit-scrollbar {
  width: 8px;
}
section::-webkit-scrollbar-thumb {
  border-radius: 9px;
  background-color: #66f;
}
section::-webkit-scrollbar-track {
  background-color: #f0f0f0;
}
```

## (四十四) vmin 和 vmax

- 详见 `本项目/1-FRONTEND/5-CSS/35-vmin-vmax.html`

```
vmin 和 vmax
---

vmin - viewport min 表示视窗最小值
vmax - viewport max 表示视窗最大值

1. vmin
- 当浏览器 ( 高度 < 宽度 ) 时，100vmin 相当于 100vh
- 当浏览器 ( 宽度 < 高度 ) 时，100vmin 相当于 100vw

2. vmax 同理
```

## (四十五) css 属性继承

```
可以被继承的属性
---

字体属性: font font-size font-weight font-family font-style
文本属性: color, line-height
可见性属性: visibility
光标属性: cursor
间距:　letter-spacing word-spacing
```

## (四十六) 如何在页面上实现一个 圆形 可点击区域

- 详见 [1-FRONTEND/7-CSS/37-circle-click-css.html](file:///Users/xiawu/work/personal/front-end/8-penetrate/1-FRONTEND/7-CSS/37-circle-click-css.html)
- 详见 [1-FRONTEND/7-CSS/37-circle-click-js.html](file:///Users/xiawu/work/personal/front-end/8-penetrate/1-FRONTEND/7-CSS/37-circle-click-js.html)

```
圆形 可点击区域
---

1
css方式
- 使用 border-radius 直接画一个圆，添加点击事件即可
.root {
  width: 300px;
  height: 300px;
  border-radius: 100%;
}

2
js方式
// 如果 ( 鼠标的x坐标 - 圆心X坐标 )^2 + (鼠标的Y坐标 - 圆心Y坐标)^2 的和，在开方 < 半径 --- 则说明在圆形区域内
// 三角形勾股定理
var len = Math.sqrt(
  Math.abs(Math.pow(mouse_root_x - circle_x, 2)) +
    Math.abs(Math.pow(circle_y - circle_x, 2))
);
// 这里半径是100
if (len <= 100) {
  console.log("半径为100的圆");
}
```

## (四十七) div 的 tabindex 和 focus/blur 事件的关系

- 详见 `38-focus-blur`
- 详见 `https://github.com/woow-wu7/8-divine-plus/tree/main/packages/components/collapse`

```
div 的 tabindex 和 focus/blur 事件的关系
---

1
div是否支持 focus/blur 事件
- div不支持: 不带 tabindex 属性的 div 不支持 focus/blur 事件
- input/a支持: input/a 默认支持 focus/blur


2
tabindex
- 作用: tabindex属性表示其元素是否可以聚焦，以及它是否/在何处参与顺序键盘导航（通常使用Tab键，因此得名）
- 值:
 - tabindex=负数: 可以聚焦，可以 tab 键访问
 - tabindex=0: 可以聚焦，可以 tab 键访问，顺序由 DOM结构决定
 - tabindex=正数: 可以聚焦，可以 tab 键访问，顺序由 tabindex数字大小决定

3
扩展
- vue3 中 collapse 组件的实现: 展开和隐藏需要用到focus/blur事件
```

## (四十八) 键盘事件

```
键盘事件
- keydown: 按下键盘时触发
- keypress: 按下有值键时触发，即按下 Ctrl、Alt、Shift、Meta 这样无值的键不会触发
- keyup: 松开键盘时触发
---

1
keydown 和 keypress 的先后顺序
- 当按下有值键时，先触发 keydown，再出发 keypress

2
连续触发
- 如果用户一直按键不松开，就会连续触发键盘事件

3
回车键
div.addEventListener("keydown", (e) => { if (e.keyCode == 13) { } }, false );
```

## (四十九) style 和 getComputedStyle 的区别？

```
1
样式的分类
- 内联/行内样式: -- 通过元素的 style 属性设置
- 内嵌样式: ------ 写在 html 中的 head 标签的 style 标签中
- 外联样式: ------ 通过 .css 文件引入，即通过 <link href="xxx.css" /> 方式引入


2
js 获取 css 的方式
- Element.style
- window.getComputedStyle(Element)


3
style 和 getComputedStyle 的区别？
- style
  - Element.style 可读写
  - Element.style 只能读取 - 行内样式
- getComputedStyle
  - window.getComputedStyle(Element) 只能读取样式，不能设置样式
  - window.getComputedStyle(Element) 可以获取 行内/内嵌/外联 最终的合成样式
- 扩展
  - 权重: 既然能获取 行内/内嵌/外联 最后的综合样式，即涉及到 ( css 样式的权重问题 )
```

```
window.getComputedStyle(element, [pseudoElt])
---

1
作用: 返回一个对象，包含了最终的css样式，即获取 行内/内嵌/外联 样式后最终的css属性

2
参数
- element: 必填，表示要获取css的元素
- pseudoElt: 选填，表示如果是要获取 ::before() 和 ::after() 这样的伪元素时，需要填写的参数

3
示例
- 本项目/1-FRONTEND/7-CSS/40-getComputedStyle.html
```

## (五十) 清除元素的所有默认样式

```
all: unset;
---

详见: 本项目/1-FRONTEND/7-CSS/42-all:unset.html
[local](file:///Users/xiawu/work/personal/front-end/8-penetrate/1-FRONTEND/7-CSS/42-all:unset.html)
```

## (五十一) 实现容器中两个元素在 【 右上角 和 右下角 】 和 【 左上角 和 右下角 】

```
 .container {
  /* 右上角 和 右下角 */
  /* top-right-corner  bottom-right-corner */

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  height: 500px;
  width: 600px;
  border: 1px solid black;
}

.right-top,
.right-bottom {
  width: 300px;
  height: 200px;
  background: red;
}
```
