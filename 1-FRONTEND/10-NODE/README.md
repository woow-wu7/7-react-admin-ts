# Node

### (1) node 事件循环

```
(一)
node.js事件轮训机制 - 一共分为6个阶段
---

(1) timers 定时器阶段
- ( 计时 ) 和 ( 执行到点的定时器 )
(2) pending callbacks 阶段
- 执行某些系统操作的回调函数，比如 ( tcp错误类型 )
(3) idle, prepare 阶段
- 一些准备工作
(4) poll轮询阶段，是一个轮询队列
- 1. 如果 ( 轮询队列不为空 )，依次取出执行，直到 ( 轮询队列为空 ) 或者 ( 达到系统最大限制 )
- 2. 如果 ( 轮询队列为空 )
     - 1. 如果之前设置过 ( setImmediate ) 函数，则直接进入下一个阶段 ( check阶段 )
     - 2. 如果之前没有设置过setImmediate函数，则会在当前poll阶段 ( 等待 )
          - 直到 ( 轮询队列 ) 添加进了新的回调函数，那么就会进入(4)阶段1的判断，继续执行
          - 或者 ( 定时器 ) 到点了，也会进入下一个阶段 ( check阶段 )
(5) check 阶段
- 执行 ( setImmediate ) 回调函数
(6) close callbacks 阶段
- 执行 ( close ) 事件回调函数
-------> 注意点：process.nextTick() 会在nodejs事件轮询的 ( 任意阶段，优先执行 )


---
(二)
案例
console.log(1);  // 同步任务
setTimeout(() => console.log(2)); // timer阶段执行 - nodejs事件轮询的第 1 个阶段
setTimeout(() => console.log(8), 0); // timer阶段执行 - nodejs事件轮询的第 1 个阶段
process.nextTick((n) => console.log(n), 3); // --- 在 node.js 事件轮询的 ( 任意阶段，优先执行 )，即在同步任务执行完毕后，优先执行
setImmediate(() => console.log(4)); // check阶段执行 - nodejs事件轮询的第 5 个阶段
new Promise((resolve) => {
  console.log(5); // 同步任务
  resolve();
  console.log(7); // 同步任务
}).then((res) => console.log(6)); // --- 微任务
// 执行顺序 1 5 7 3 6 2 8 4
// 同步任务 1 5 7
// 异步任务(微任务) 3 6
// 异步任务(宏任务) 2 8 4
```

### (2) node 中循环引用

```
a文件
module.exports.a = "a";
const b = require("./1-circularReference-b.js");
console.log("b", b);
module.exports.a = "aa";

b文件
module.exports.b = "b";
const a = require("./1-circularReference-a.js");
console.log("a", a);
module.exports.b = "bb";


(1)
问题: 我们执行a文件会打印什么？
回答: 会打印
a { a: 'a' }
b { b: 'bb' }


(2)
原因:
// 相当于下面的代码
// module.exports.a = "a";
// const b = require("./1-circularReference-b.js"); // 加载整个b

// module.exports.b = "b";
// const a = require("./1-circularReference-a.js"); // 此时加载的a是: a刚执行到的地方之前的所有代码，没执行的不会在b中被加载
// console.log("a", a);
// module.exports.b = "bb";

// console.log("b", b);
// module.exports.a = "aa";


-------
(3)
总:
(一) 所以最终的执行的代码是
module.exports.a = "a";
// module.exports.b = "b";
// const a = require("./1-circularReference-a.js"); // 相当于执行了 module.exports.a = "a";
// console.log("a", a);
// module.exports.b = "bb";
console.log("b", b);
module.exports.a = "aa";

(二) 所以最终输出的代码是
a { a: 'a' }
b { b: 'bb' }
```
