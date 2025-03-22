# promise

- 手写 promise: https://juejin.cn/post/6844903823429861389
- 本项目/TEST/1-手写 promise
- 扩展
  - 请求相关的处理 ( 控制并发数量/错误后重新请求/取消请求/避免重复请求 )
  - 1-FRONTEND/1-JS/AA-请求-控制并发请求数量

### 一些单词

```
poll 轮询
native 原生 本地人 // react native 用react做原生开发
executor 执行器
```

### 前置知识

```
1
常见的 宏任务macroTask 和 微任务microTask
- 宏任务
  - setTimeout
  - setInterval
  - setImmediate
  - requestAnimationFrame --- 在浏览器 下一帧 渲染前执行
- 微任务
  - promise
  - process.nextTick
  - MutationObserver -------- 监测DOM变化，详见 本项目/1-FRONTEND/1-JS/27-MutationObserver

2
async ... await
- async
  - 作用: async函数始终返回一个 promise 对象
    - 1. 如果返回值不是promise对象，会通过 Promise.resolve() 包装成一个 fulfilled 状态的 promise 对象
    - 2. 如果没有返回值，则会包装成 Promise.resolve(undefined)
  - 执行顺序:
    - 当 async 函数中有 await 时，执行完await后面的表达式，async会让出当前线程，将await表达式后面的代码放入 ( 微任务队列 ) 中，继续执行 async 函数后面的代码
- await
  - 1. 出现的地方: await 只能出现在 async 函数中
    - 最新的语法可以使用 顶层await了，在vue3中已经使用到
  - 2. await等待的是什么
    - 如果await等待的是一个 ( promise对象 ): 则await会 ( 阻塞 ) 后面代码的执行，直到promise状态变成resolve，但是 !!!!! async函数不会阻塞
    - 当然await后面的表达是可以是任意类型的值，不一定非要是promise对象，不是promise时，await等待的就是紧跟的表达是的返回值
- 例子
  - 2-FRONTEND/1-JS/8-promise/async1.html
  - 2-FRONTEND/1-JS/8-promise/async2.html

3
node 事件循环
- 1. timers 定时器阶段
  - ( 计时 ) 和 ( 执行到点的定时器回调函数 )
- 2. pending callbacks
  - 某些系统操作 ( tcp错误类型 ) 的回调函数
- 3. idle, prepare
  - 准备工作
- 4. poll 轮询阶段，是一个轮询队列
  - 1. 如果轮询队列不为空，就依次取出执行，直到轮询队列为空或者达到系统最大限制
  - 2. 如果轮询队列为空
    - 1. 如果之前设置过 ( setImmediate ) 函数，则直接进入下一个阶段即 ( 进入check阶段 )
    - 2. 如果之前 ( 没有设置过setImmediate ) 函数，就会在当前poll阶段 ( 等待 )，
      - 直到 ( 轮询队列 ) 添加进了新的回调函数，那么就会进入4阶段1的判断，继续执行
      - 或者，( 定时器 ) 到点了，也会去下一个 ( check阶段 )
- 5. check 查阶段
  - 执行 setImmediate 回调函数
- 6. close callbacks 关闭阶段
  - 执行 close 事件回调函数
注意点: process.nextTick可以在任意阶段优先执行，因为它是一个 ( 微任务 )，其他的都是宏任务，比如 setImmediate timer 等
连接: https://juejin.cn/post/6908732834026881038
链接: https://juejin.cn/post/6844903823429861389#heading-19 ( promise 相关面试题 )
案例:
setImmediate(function() { // ----- setImmediate要在第4个阶段，poll阶段清空轮询队列后，之前设置过setImmediate函数，就就如第5个阶段-即check阶段，check阶段就是执行setImmediate回调
  console.log('setImmediate')
})
setTimeout(function() { // ------- nodejs的第一个阶段就是timers阶段，计时和执行到定时器，这里是0，到点，会立即执行
  console.log('setTimeout')
}, 0)
process.nextTick(function() { // - process.nextTick() 可以在任意阶段优先执行
  console.log('process.nextTick')
})
// 所以输出顺序是
// process.nextTick() => setTimeout(0) => setImmediate()
```

### promise 的特点

- promise 的状态不受外界影响
- promise 状态一旦改变就不会再变

### promise 的缺点

- promise 一旦新建，就会立即执行，中途无法取消
- promise 内部抛出的错误，如果不设置 ( 回调函数 )，不会反应到外部
- 当 promise 处于 pending 状态，无法得知当前发展到哪一个阶段 ( 刚刚开始还是即将完成 )

### promise 的属性 - 2023-04-20 补充

```
// class 的属性
// 1. 实例属性: 有两种定义的方式
// - 在构造函数中声明
// - 在class的 ( 最顶层 ) 通过 ( key = value ) 的方式定义，注意需要写在最顶层，也要在 constructor 的前面
// 2. 原型属性也有两种写法
// - 如下

class A {
  attr1 = 1; // ------------ 1. 实例属性，这种写法通常须放在 ( 类的顶层 )，约定俗成的

  constructor() {
    this.attr2 = 2; // ----- 1. 实例属性
  }

  // ----------------------- 2. 原型属性，即在 A.prototype 上的属性
  getAttrs() {
    console.log("this.attr1", this.attr1);
  }
}
A.prototype.attr4 = 4; // -- 2. 原型属性

const instance = new A();
console.log("instance", instance);
console.log("A.prototype", A.prototype);
```

### resolve 函数的作用 ( 三个作用 )

- 把状态 ( status ) 从 ( pending -> fulfilled ) -------------- 将 promise 的状态从 pending 变成 fulfilled
- 把终值 ( value ) 赋值为 resolve() 函数传入的 ( 参数 ) --------- 在异步操作成功时调用，并将异步操作的结果作为参数传递出去
- 把 ( onFulfilledCallback 数组 ) 中的函数，依此取出执行 -------- 执行状态变为 fulfilled 时，在 then 函数执行却状态没有变化时的，执行 ( 成功回调队列中的所有函数 )
  - 因为: 如果 promise 中存在异步操作时，then()比 resolve()先执行
  - 所以: 所以在 then()方法中，需要向 onFulfilledCallback 数组中 push 进一个将来在 resolve()中状态变成 fulfilled 后，才会执行的函数

### (1) 原型方法

- Promise.prototype.then()
- Promise.prototype.catch()
- Promise.prototype.finally()

### (2) 静态方法

- Promise.all() ------------------ 返回一个新的 promise，( 所有 fulfilled，整个 fulfilled； ) ( 一个 rejected，整个 rejected )
- Promise.race() ----------------- 返回一个新的 promise，( 谁先 fulfilled，整个 fulfilled )，( 谁先 rejected，整个 rejected )
- Promise.any()
- Promise.allSettled()
- Promise.resolve()
- Promise.reject()
- Promise.try()
