## 错误监控 性能监控 Monitor Errors.

## (一) 前置知识

```
range 范围 领域 n
reference 参考 参照 提及 v n
syntax 句法 // grammar 语法
stack 栈
-
refer 参考 参照 v
reference 参考 参照 n
【 refer to. 参考 v 】
-
reject 拒绝 v
rejection 拒绝 n
-
beacon 信标 烽火 n
```

## (1) 错误类型 ( 运行时错误，资源加载错误，Promise 错误，异步错误 )

- 运行时的错误( 8 种 ) ------ js 中的错误
  - 1 种原生错误 ----------- Error/name+message+stack
  - 6 种派生错误 ----------- TypeError ReferenceError RangeError SyntaxError URIError EvalError
  - 1 种自定义错误 --------- 原型链继承
- 资源加载错误
  - js
  - css
  - 图片
  - ... ...

```
错误类型
- 运行时错误: ( TypeError ReferenceError RangesError SyntaxError EvalError URIError ) + ERROR + CustomType
- 资源加载错误: js css 图片 等

1
错误的类型 ( 6种错误类型 + 1种自定义错误类型 + Error )
- TypeError ------------- 类型错误
- ReferenceError -------- 引用错误
- RangeError ------------ 范围错误
- SyntaxError ----------- 语法错误
- URIError -------------- encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape() 和 unescape() 这六个函数
- EvalError ------------- eval函数没有被正确执行


2
原生错误
const error = new Error('message');
- error.name ----------- // 'Error' // 'ReferenceError' 'RangeError' 'TypeError' 'SyntaxError' 'URIError' 'EvalError'
- error.message -------- // 'message'
- error.stack ---------- // Error: a\n    at <anonymous>:1:11'


3
自定义错误 ( 原型链继承 )
function UserError(message) {
  this.name = 'UserError';
  this.message = message || '默认信息';
  this.stack = "..."
}
UserError.prototype = new Error();
UserError.prototype.constructor = UserError;
```

## (2) 白屏时间 和 首屏时间

```
白屏时间: 从 ( 浏览器输入网址 ) 到 ( 浏览器页面 - 开始有内容展示出来 ) 之间的时间 // ----- 白屏时间 = domLoading - fetchStart
首屏时间: 从 ( 浏览器输入网址 ) 到 ( 浏览器首屏内容渲染完毕 ) 之间的时间 // ------------- 首屏时间 = 白屏时间 + 首屏首次渲染完成的时间
---

1
白屏时间
白屏时间 = domLoading - fetchStart
const timing = window.performance.timing;
const time = timing.domLoading - timing.fetchStart;
白屏时间 = 把 ( 资源的加载全部放在head标签内 )，然后在head标签的 ( 最上面 和 最下面 ) 打上 timestamp，计算差值


2
首屏时间
首屏时间 = 白屏时间 + 首屏首次渲染完成的时间
首屏时间 = HTML结尾打上时间戳 - head头部打上时间戳
```

## (3) try...catch 是否能捕获 Promise 中的错误？

```
1.
try...catch 能捕获 Promise 中的错误吗？
- 不能
- 因为 try...catch 只能获取 ( 同步代码 ) 中的错误，而 promise 是异步任务


2.
为什么 try...catch 可以捕获 await 中的错误？
- 能: try...catch 能捕获 await 中的错误
- 因为: await 是一个语法糖，它会检查 promise 中的状态，当rejected时，会 throw error，当然就能被 catch 所捕获
```

## (二) 错误相关的事件

```
总结:
- 捕获 Promise 中的错误
  - window.onerror 和 window.addEventListener('error') --- 不能捕获 Promise 中的错误
  - window.addEventListener('unhandledrejection') -------- 可以捕获 Promise 中的错误
- 捕获 资源加载 的错误
  - window.onerror --------------------------------------- 不能捕获 资源加载 的错误，因为资源加载不会冒泡，而 【 元素节点的事件属性指定的监听函数 ( 只能在冒泡阶段触发 ) 】
  - window.addEventListener('error') --------------------- 可以捕获 资源加载 的错误，window.addEventListener('error', ()=>{}, true)
- 捕获 setTimeout 异步
  - window.onerror 和 window.addEventListener('error') --- 都能捕获 setTimeout 中的错误
- 扩展知识
  - 从 unhandledRejection 从名字就可以看出: 未处理的rejection，就和Promise的reject状态有关

1.
window.onerror
- 不能捕获 ( 资源请求错误 )，因为 ( 资源加载错误不会冒泡 )
- 不能捕获 异步 ( Promise ) 中的错误
- 可以捕获 异步 ( setTimeout ) 的错误
// 元素节点的事件属性 window.onerror - 用这种方法指定的监听函数 ( 只能在冒泡阶段触发 )


2.
window.addEventListener
- 可以捕获捕获 ( 资源请求错误 ), window.addEventListener('error', ()=>{}, true) 或者 window.addEventListener('error', ()=>{}, { capture: true })
- 可以捕获 异步 setTimeout 的错误
- 不能捕获 异步 ( Promise ) 中的错误


3.
img/script
- object.onerror
- 资源加载可以单独设置，比如 img.onerror
- 但是一个项目可能有成百上千的资源加载，不能每个都单独设置，所以我们用 window.addEventListener('error', ()=>{}, true)


4.
unhandledrejection 事件
- 可以 捕获 Promise 中的错误
- addEventListener("unhandledrejection", (event) => {});



分割线 ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- -------
分割线 ------- ------- ------- ------- ------- ------- ------- ------- ------- ------- -------


1
window.onerror
- 函数签名
  - function(message, source, lineno, colno, error)
  - message: 错误信息 string
  - source: 发生错误的脚本url
  - lineno: 发生错误的 行号
  - colno: 发生错误的 列号
  - error: Error对象
- 跨域
  - window.onerror 只能用于同域的脚本，如果需要跨域，需要做两件事情
  - 1. 设置crossorigin: <script type="text/javascript" src="..."  crossorigin></script>
  - 2. 设置cors: 允许所有域跨域 Access-Control-Allow-Origin:*
- 优点
  - 可以捕获异步 setTimeout 中的错误
- 缺点
  - 1. 不能绑定多个监听函数，比如: 不能通过 ( 不同的文件 ) 绑定 ( 不同的监听函数 )
  - 2. 只能在事件的 ( 冒泡阶段 ) 触发
  - 3. 不能捕获异步 promise 中的错误
  - 4. 不能捕获网络中的错误(资源加载错误)
    - 因为网络请求异常不会冒泡，应此需要在事件捕获阶段才能获取到，即分别在比如 img 和 script 标签中添加 onerror 事件，获取 img.addEventListener()
    - 所以可以通过 window.addEventListener('error') 捕获网络错误

2
window.addEventListener('unhandledrejection')
unhandledrejection 事件
- 触发
  - 当 Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件
  - 可以将unhandledrejection捕获到的错误throw出来让error进行捕获之后统一上报。

3
object.onerror
// DOM.addEventListener('error', ()=> {}, false)
- img
- script
- img标签和script标签可以单独添加 error 事件，来捕获图片和脚本这样的 资源加载错误
- 原理: 资源加载错误，并不会向上冒泡，object.onerror捕获后就会终止，所以window.onerror并不能捕获资源加载错误
```

## (三) 错误上报 ( 三种方式 - ajax, img, Navigator.sendBeacon )

```
上报方式
- ajax 上报
- img 上报
- Navigator.sendBeacon 上报  // -------  【 beacon 烽火 信标 n 】
---

1
ajax上报
- 缺点: 不能跨域
- 缺点: 如果 ajax 有可能没上报完，页面就卸载了导致请求中断，上报发生错误


2
img上报
- 优点: img的src属性 可以跨域
- 缺点: img上报是 get 请求，url是有长度限制的
- 扩展: ( script的src属性，img的src属性，link的href属性 ) 都可以跨域
- 扩展
  - 问题: ( img.src script.src link.href ) 都能跨域，为什么选择 img 呢？
  - 回答:
    - script.src/link.href: 因为需要将标签挂载到页面上(就会存在反复操作DOM的消耗，性能差)，不挂载就不会发起请求
    - img.src: 不需要挂载到页面上，就能发送请求


3
Navigator.sendBeacon 上报
- navigator.sendBeacon(url, data);
- 通过 HTTP POST 将少量数据 异步 传输到 Web 服务器
- https://juejin.cn/post/7251935816728739897
- 特点
  - 异步请求，并且是POST请求
  - 发出的请求，脱离当前页面(被放到的浏览器任务队列执行的，)，所以 ( 不会阻塞当前页面的卸载 )和 ( 后面页面的加载过程 )，用户体验较好；

4
beacon 烽火 信标 n
```

## (三) 谷歌性能标准 ( 6 个 )

```
谷歌性能标准 ( 6 个 )
---
LCP ------ Largest Contentful Paint ------- 最大内容绘制
// LCP 衡量页面主内容加载完成的时间，通常是页面中最大可视元素（例如图片或文本块）的渲染时间

FID ------ First Input Delay -------------- 首次输入延迟
// FID 衡量从用户第一次与页面交互（如点击链接、按钮等）到浏览器开始响应的时间


FP ------- First Paint. ------------------- 首次绘制
FCP ------ First Contentful  Paint. ------- 首次内容绘制
FID ------ First Input Delay. ------------- 首次输入延迟
LCP ------ Largest Contentful Paint ------- 最大内容绘制
FMP ------ First Meaningful Paint. -------- 首次有效绘制
TTI ------ Time to Interactive. ----------- 页面可交互时间
```

## 资料

- 重要
  - 谷歌标准: https://juejin.cn/post/7218121928799764535
  - 各种时间的计算: https://juejin.cn/post/6844904020482457613
- 自己
  - [bad.js 源码分析](https://github.com/woow-wu7/7-badjs-report-source-code-analysis)
  - https://juejin.cn/post/7185871994624147512
  - https://juejin.cn/post/6867773840768909326
