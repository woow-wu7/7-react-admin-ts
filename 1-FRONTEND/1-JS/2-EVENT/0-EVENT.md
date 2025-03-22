# (一) 事件模型

### (1) EventTarget 接口

- 定义
  - 所有的 ( 节点对象 ) 都部署了 EventTarget 接口
  - DOM 的事件操作都定义在 EventTarget 接口 ( 事件监听 和 事件触发 )
- 三个方法
  - addEventListener 绑定事件监听函数
  - removeEventListener 删除事件监听函数
  - dispatchEvent 触发事件

### (2) addEventListener

- 签名: addEventListener(type, listener[, useCapture])
- 签名: addEventListener(type, listener[, optionsObject])
- 签名: addEventListener(type, listenerObject[, optionsObject])
  - type: 事件类型
  - listener: ( 监听函数 ) 或者 ( 是一个具有 handleEvent 方法的对象 )
  - useCapture:
    - boolean: ( 是否在捕获阶段触发的 boolean 值 )
    - configurationObject: ( 一个配置对象，具有 capture, once, passive )
    - 使用 ( 配置对象 ) 的 ( 好处 ) 是: 可以配置，比如 是否在捕获阶段触发, 是否只触发一次, 是否阻止默认行为
- 作用: 在当前节点或对象上，定义一个特定事件的监听函数，触发事件，就会触发事件的监听函数
- 特点:
  - 1. **可以对 ( 同一个节点 ) 的 ( 同一个事件 )，可以绑定不同的监听函数**
  - 2. **如果 ( 同一个节点 ) 的 ( 同一个事件 )，绑定 ( 多个相同的监听函数 )，则只会执行一次**
  - 3. 监听函数传参，可以在包装一层
  - 4. this 指向 绑定事件监听函数的节点，而不是触发事件的节点

### (3) removeEventListener

- 签名: removeEventListener(type, listener[, useCapture])
- 特点
  - removeEventListener 方法移除的监听函数，必须是 addEventListener 方法添加的那个监听函数，而且必须在同一个元素节点，否则无效
  - removeEventListener 和 addEventListener 的所有参数都必须一样

### (4) dispatchEvent

- 作用: EventTarget.dispatchEvent 方法在当前节点上 ( 触发指定事件 )，从而触发监听函数的执行
- 参数: 是 Event 对象的实例
- 返回值
  - false: 监听函数调用了 Event.preventDefault()，则返回值为 false
  - true: 其他情况都是返回 true
- 注意点
  - 如果 dispatchEvent 方法的参数为空，或者不是一个有效的事件对象，将报错

```dispatchEvent
const button = window.document.getElementById("button");

const eventInstance = new Event("click");
const res = button.dispatchEvent(eventInstance); // 返回一个boolean值，只要没有调用 event.preventDefault 就返回true
console.log("res: ", res);
```

# (二) 绑定事件监听的三种方式

- 优缺点
  - 优先使用 EventTarget.addEventListener
    - HTML: 的方式违反了 html 和 js 分离的原则，并且只能在冒泡阶段触发
    - 元素节点的事件属性: 同一个事件，只能绑定一个监听函数
- EventTarget.addEventListener 优点
  - 同一个节点，同一个事件，可以绑定多个监听函数
  - 可以指定事件触发的阶段, { capture: true||false }
  - 接口统一

```
1
HTML的方式
- on+属性="需要执行的代码，而不是一个函数"
- 只会在 ( 冒泡 ) 阶段触发
- 等同于 el.setAttribute('onclick', "doSomething()")
- 注意 onClick 和 onclick 都可以，大小写问题
<!-- 正确 --><body onload="doSomething()">
<!-- 错误 --><body onload="doSomething">

2
元素节点的事件属性
div.onclick = function (event) {
  console.log('触发事件');
};

3
EventTarget.addEventListener()
```

# (三) 事件监听函数中的 this 指向

- 监听函数内部的 this 指向事件监听函数绑定的节点

# (四) 事件的传播

- 捕获阶段 capture ------- window -> document -> html -> body -> ... -> target
- 目标阶段 target
- 冒泡阶段 bubbling ------ target -> ... -> body -> html -> document -> window

# (五) 事件代理

- 阻止传播
  - e.stopPropagation 捕获和冒泡的其他元素事件被阻止，本元素的其他事件不会被阻止
  - e.stopImmediatePropagation 彻底阻止，本元素的同一个事件的其他监听函数也不会执行

# (六) 事件对象 event

- 事件监听函数的参数 - 就是 event 对象
- 原生 Event 对象 - 所有的事件都是 Event 对象的实例

### 6.1 Event.currentTarget 和 Event.target 的区别

- e.currentTarget: 监听函数绑定的那个节点 --- 永远不变
- e.target: 最先触发事件的节点

### 6.2 Event.type

- Event.type 属性返回一个字符串，表示事件类型
- 只读

### 6.3 Event.timeStamp

- Event.timeStamp 属性返回一个毫秒时间戳，表示事件发生的时间

# (七) CustomEvent

- CustomEvent 接口用于生成自定义的事件实例
- 那些浏览器预定义的事件，虽然可以手动生成，但是往往不能在事件上绑定数据，如果需要在触发事件的同时，传入指定的数据，就可以使用 CustomEvent 接口生成的自定义事件对象

```
 // 7
// 自定义事件
const customButton = window.document.getElementById("custom");

const customEventInstance = new CustomEvent("77", { detail: "woow_wu7" }); // 注意 new CustomEvent() 和 new Event() 的区别 -> event.detail的区别

customButton.addEventListener("77", (e) => console.log("自定义事件的e.detail =>", e.detail)); // e.target e.currentTarget e.detail
customButton.dispatchEvent(customEventInstance);
```
