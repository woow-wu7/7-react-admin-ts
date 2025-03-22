### React

### (零) 前置知识

### (0.1) 一些单词

```1
1
一些单词
---

draft 草稿箱
cleanup 清理 清除
teaser 预告
archive 存档
```

### (0.2) Object.is 和 === 的区别？ // NaN +0 -0

```2
2
Object.is 和 === 的区别？
---

两者基本上一样，但有两个区别
- NaN
  - Object.is(NaN, NaN) // true
  - NaN === NaN // ------- false
- 0
  - Object.is(+0, -0) // - false
  - +0 === -0 // --------- true
```

### (一) React 的生命周期

![](https://img.php.cn/upload/image/106/115/918/1657710414760203.png)
![](https://www.qycn.com/uploads/allimg/2022/07/1832878126727222825.png)

```
(一) 旧的生命周期
挂载阶段: constructor componentWillMount render componentDidMount
更新阶段:
  - props: componentWillReceiveProps shouldComponentUpdate componentWillUpdate render componentDidUpdate
  - state: shouldComponentUpdate componentWillUpdate render componentDidUpdate
  - forceUpdate: componentWillUpdate render componentDidUpdate
卸载阶段:
  - componentWillUnmount
- 错误相关:
  - errorBoundary
```

```
(二) 新的生命周期
- 废除了几个生命周期:
  - componentWillMount, componentWillReceiveProps, componentWillUpdate
  - 因为: fiber架构重写后，会造成这 三个生命周期 - 会重复多次执行

- 新的生命周期
  - 挂载阶段: constructor 【 getDerivedStateFromProps 】 render componentDidMount
  - 更新阶段:
    - props: getDerivedStateFromProps shouldComponentUpdate render 【 getSnapshotBeforeUpdate 】 componentDidUpdate
    - state: getDerivedStateFromProps shouldComponentUpdate render getSnapshotBeforeUpdate componentDidUpdate
    - forceUpdate: getDerivedStateFromProps  render getSnapshotBeforeUpdate componentDidUpdate

- 错误相关:
  - errorBoundary
```

### (二) React 中的原生事件和合成事件

```
1
问题: 原生事件 和 合成事件 的执行顺序?
回答: 先执行原生事件，后执行合成事件
原因: 因为原生事件在目标节点上直接触发，而合成事件需要从目标节点冒泡到document对象上才会触发


2
问题: 原生事件 和 合成事件 阻止冒泡 的相互影响影响？
回答:
- 事件冒泡: 原生事件会影响合成事件，而合成事件不会影响原生事件
- 原生事件
  - 在原生事件中，e.stopPropagation 阻止冒泡，会影响合成事件
  - 因为为原生事件中使用 e.stopPropagation() 后，事件不会冒泡的 document，所以也就触发不了 document 上绑定的合成事件
- 合成事件
  - 在合成事件中，e.stopPropagation阻止冒泡，不会影响原生事件

3
问题: 如何在合成事件中获取原生的 ( 事件对象 )
回答: e.nativeEvent
注意点:
  - 描述: e.nativeEvent.stopPropagation() 阻止冒泡时，不但不能阻止原生事件的冒泡，连合成事件的冒泡也不能阻止
  - 原因: 执行这段代码的时候，原生事件早就执行完了，因为合成需要冒泡到document上，而又没有去阻止合成事件的冒泡，合成事件的阻止是在变量对象上，即e,而不是e.nativeEvent


4
问题: Event 对象上有哪些属性和方法
- e.preventDefault() ------------- 取消浏览器对当前事件的默认行为 ( 1.比如点击浏览器链接的默认的跳转行为  2.比如阻止空格键磨人的浏览器滚动行为 )
- e.stopPropagation() ------------ 阻止 事件在DOM中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上其他的事件监听函数
- e.stopImmediatePropagation() --- 阻止同一个事件的其他监听函数被调用，不管监听函数定义在当前节点还是其他节点
-
- e.target
- e.currentTarget
-
- e.origin ---------------------- 跨标签通信时也会发生 XSS 攻击，所以通过事件对象上的 e.origin 来判断可信源 ( 详见 /Users/xiawu/work/personal/front-end/8-penetrate/1-FRONTEND/4-REACT/1-React-README.md )


5
自理
- 合成事件: react 合成事件，是代理到 document 对象
- 资料 https://juejin.cn/post/6903805279483297805
```

### (三) Diff 算法

- 传统算法的复杂度 ` O(n^3)`，其中 n 是节点数
- `diff` 算法可以把复杂度降低到 `O(n)`
- 类型：`tree diff` `component diff` `element-diff`

### (3.1). Tree diff

- 跨层级的移动操作非常少，可以忽略不计
- 关键词：
  - 逐层比较，不存在将会删除整个不一样的树，并不再向下比较，只需遍历一次即可完成对整棵树的比较
- **diff 过程：**
  - **逐层对同一层级的节点进行比较**
  - React 通过 updateDepth 更新深度对 Virtual DOM 树进行层级控制
  - 对`树`进行`分层比较`，两棵树只对`同一层次的节点`进行比较，如果该`节点不存在`，则`该节点及其子节点会被完全删除`，`不会在进一步比较`
  - 只需要遍历`一次`，就能完成整棵树的比较
  - 先创建，后删除
- **跨层级移动了怎么办**？
  - diff 只会考虑 ( **同层级的节点位置变换** )，如果跨层级的化，只有 ( **创建** ) 和 ( **删除** ) 节点的操作
- **优化**：
  - 所以在开发中，要尽量避免跨层级的组件的移动的情况，直接创建和删除消耗性能，
  - 可以通过 CSS 隐藏或显示节点，而不是真的移除或添加 DOM 节点 ( 在频繁切换时 )

### (3.2). Component diff

- **diff 过程**：
  - **同一类型的组件，按原策略，逐层进行比较**
  - **不同类型的组件，会被判定为脏组件，则会替换掉整个组件的所有节点**
  - **对于同一类型的组件，有可能其 Virtual DOM 没有任何变化(props,state 未变化时)，是没有必要再进行逐层比较的，此时，可以通过 shouldComponentUpdate() 返回 false，来进行进行性能优化，不再进行逐层的比较**
  - 如果判断类型：即 class 名(组件名)一样就是同一类型

### (3.3). Element diff

- 当节点处于同一层级时，diff 将会有三种操作：`插入INSERT_MARKUP`，`删除REMOVE_NODE`，`移动MOVE_EXISTING`
- **移动操作的一些概念**
  - **`oldIndex`**：元素在旧集合中的位置
  - **`lastIndex`**：取 oldIndex 和上一次的 lastIndex 的较大值，lastIndex 的初始值是 0，类似游标的概念
  - **`移动：oldIndex < lastIndex 移动，移动的位置是下表lastIndex对应的位置`**
  - **`不移动：oldIndex > lastIndex 不移动`**
- **情况一**
  - **--------- 新旧集合中存在相同节点但位置不同时 ---------**
  - **diff 过程**
  - **1. 先通过 ( 唯一的 key ) 逐个判断 ( 新集合中的元素 ) 在 ( 旧集合 ) 中是否存在**
  - **2. 如果存在，就会进行移动操作，具体的 ( 移动规则 ) 如下**
    ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f19c7c1c2952413588517290e4375c2e~tplv-k3u1fbpfcp-watermark.image)

第一步：

- 元素：B
- B 在旧集合中的位置：`oldIndex = 1`
- B 比较时的游标，刚开始游标默认值是 0：`lastIndex = 0`
- 比较：`oldIndex > lastIndex 不移动`
- 下一轮比较前的游标更新：取 oldIndex=1 和 lastIndex=0 的最大值 `lastIndex = 1`
  第二步：
- 元素：A
- A 在旧集合中的位置：`oldIndex = 0`
- A 比较时的游标：`lastIndex = 1`
- 比较：`oldIndex < lastIndex 移动`
- A 移动到的位置：`移动到A元素在新集合中的位置对应的位置`
- 下一轮比较前的游标更新：取 oldIndex=0 和 lastIndex=1 的最大值 `lastIndex = 1`
  第三步：
- 元素：D
- D 在旧集合中的位置：`oldIndex = 3`
- D 比较时的游标：`lastIndex = 1`
- 比较：`oldIndex > maxIndex 不移动`
- 下一轮比较的游标更新：取 oldIndex=3 和 lastIndex=1 的最大值 `lastIndex = 3`
  第四步：
- 元素：C
- C 在旧集合中的位置：`oldIndex = 2`
- C 比较时的游标：`lastIndex = 3`
- 比较：`oldIndex < lastIndex 移动`
- C 移动到的位置：`移动到元素C在新集合中的位置对应的位置`
- 下一轮比较前的游标更新：取 oldIndex=2 和 lastIndex=3 的最大值 `lastIndex = 3`

---

**情况二**

- **--------- 新集合中有新加入的节点，旧集合中有删除的节点 ---------**
- **diff 过程**  
  ![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19f974fb80ac4c98b69c1543d095be76~tplv-k3u1fbpfcp-watermark.image)  
  第一步：
- 元素 B，oldIndex=1, lastIndex=0, oldInex>lastIndex 不移动，更新后的 lastIndex=1
  第二步：
- 元素 E
- 先判断是新建，删除，或者移动操作的哪一种
- 新建：`E在新集合中存在，在就集合中不存在，新建E`
- 新建的位置：在 E 元素在新集合中的位置对应的位置，`新建E`
- 下一轮比较前的游标更新：`lastIndex = 1`
  第三步：
- 元素 C，oldIndex=2, lastIndex=1, oldIndex>lastIndex 不移动，更新后的 lastIndex=2
  第四步：
- 元素 A
- A 在就集合中的位置：`oldIndex=0`
- A 比较时的游标：`lastIndex=2`
- 比较：`oldIndex < lastIndex移动`
- 移动到的位置是：`A元素在新集合中的位置对应的位置`
- 下一轮比较前的游标更新：`lasIndex = 2`
  第五步：
- 元素 D
- 在新集合中不存在，在旧集合中存在，删除操作，直接删除 D

### (3.4) Diff Algorithm 算法总结

- [tutorial-blog](https://juejin.cn/post/6905924860308881416)
-
- 时间复杂度:
- // 把传统的 O(n^3) 的复杂度降低到了 O(n)，n 表示节点数
-
- 分类: 存在 `treeDiff` `componentDiff` `elementDiff`
- // `treeDiff` 跨层级移动非常少，逐层比较
- // `componentDiff` 判断是不是同类型的组件，区分脏组件和逐层比较，以及 VitureDOM 没变通过 shouldComponentUpdate 来做优化
- // `elementDiff`重点理解移动的算法规则
- // **特殊情况**：
- // -- 在第一个元素和最后一个元素交换时，oldIndex 是集合中的最大值，这会导致除了第一个元素不移动，后面的 oldIndex<最大值 lastIndex，**`导致除了第一个元素外，所有元素都会移动`**
- // -- ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc649675074b4f0ab1f4e57721dbdb24~tplv-k3u1fbpfcp-watermark.image)

### (四) Hooks

### (4.1) **【 useEffect - 1.清除函数执行时机 2.模拟 componentDidMount 3.模拟 componentDidUpdate 】**

- useEffect 清除函数执行的时机
- useEffect 模拟 componentDidMount
- useEffect 模拟 componentDidUpdate
-
- https://codesandbox.io/s/1-useeffect-ptqytb

```
1
useEffect
- 函数签名
  - function useEffect(effect: EffectCallback, deps?: DependencyList): void
    - type EffectCallback = () => (void | (() => void | undefined))
    - type DependencyList = ReadonlyArray<any>
- typescript泛型工具类型 - ReadonlyArray
  - type TReadonlyArray = ReadonlyArray<any>;
  - const readonlyArr: TReadonlyArray = ["1", 1];
  - readonlyArr[0] = "11"; // 报错，类型“TReadonlyArray”中的索引签名仅允许读取。
- 第二个参数
  - 如果 dependencies 不存在，那么 callback 每次 render 都会执行
  - 如果 dependencies 存在，只有当它发生了变化，callback 才会执行
---

1.1
useEffect 清除函数执行的时机 ？
- 原理
  - AA. 在 ( 下一次 ) 渲染完成后，先执行 ( 1. useEffect的清除函数cleanup - 清除上一次的副作用 )，然后再执行 ( 2. useEffect回调 )
  - BB. 在 ( 组件卸载 ) 时，执行 ( 最后一次 useEffect的清除函数cleanup ) - ( useEffect的第一个参数-回调函数不会再执行，返回的return清除函数最后一次执行 )
  - CC重要. useEffect(()=>{}, []) 在依赖数组为空时，如果存在 Cleanup 取消函数，第一次后都不会执行，直到组件销毁时才执行 Cleanup 清除函数
- 实例
  - https://codesandbox.io/s/useeffect-ptqytb?file=/src/child.js
  - 1. add后，当前count是1，清除函数中打印的count是0，即上一次的count
  - 2. 组件卸载，清除函数中的count是1，即最后一次的count


---
1.2
模拟生命周期 - componentDidMount
https://codesandbox.io/s/useeffect-ptqytb?file=/src/componentDidMount.js:69-134
useEffect(() => {
  console.log('componentDidMount')
}, []);


---
1.3
模拟生命周期 - componentDidUpdate
https://codesandbox.io/s/useeffect-ptqytb?file=/src/componentDidUpdate.js:80-134
const [isDidUpdate, setIsDidUpdate] = useState(false);
useEffect(() => {
  if(isDidUpdate){
    // componentDidUpdate阶段执行的代码
  };
  setIsDidUpdate(true)
})
---
// 注意
// 2023-11-16更新：
// - 因为: 其实这里用 useState + 标志符 来模拟是不对的，因为 setIsDidUpdate(true) 后会造成重新渲染，然后又会执行 useEffect
// - 所以: 最好用 ( useRef ) 或者 ( 全局变量 ) 来实现
export default function App() {
  const isDidUpdatedRef = useRef(false);
  useEffect(() => {
    console.log("useEffect执行次数/componentDidUpdate组件：", countRef.current);
    const isDidUpdate = isDidUpdatedRef.current;
    if (isDidUpdate) {
      console.log("componentDidUpdate");
    }
    isDidUpdatedRef.current = true;
  });
  return (
    <div>
    </div>
  );
}
```

### (4.2) useState

- https://codesandbox.io/s/2-usestate-dbt2xc

```import "./styles.css";
import { useState } from "react";

export default function App() {
  // A
  // - setCount(count+1) 会批次更新，最终只会 + 1
  // - setCount(pre => prev + 1) 则具有同步的效果，即 + 2

  // B
  // -  setTimeout(() => setCount(count + 1), 3000); 3s内多次点击，最终只会1
  // -  setTimeout(() => setCount((pre) => pre + 1), 3000); 3s内多次点击，最终只会2

  // C
  // - 重新渲染: 如果 state 是一个对象时，更新的state不是同一个引用，会重新渲染
  // - 不会重新渲染: 如果是同一个对象的引用，不会重新渲染

  const [count, setCount] = useState(0);
  const [obj, setOjb] = useState({ name: "woow_wu7" });
  const plainObj = { name: "8" };
  const [obj2, setObj2] = useState(plainObj);

  const test = () => {
    setCount(count + 1);
    setCount(count + 1); // ------------------------------ A: 虽然是两个 setCount，但是只会+1
  };
  const test2 = () => {
    setCount((pre) => pre + 1);
    setCount((pre) => pre + 1); // ----------------------- A: +2
  };

  const test3 = () => {
    setTimeout(() => setCount(count + 1), 3000); // ------ B: 三秒内我们点击多次
  };
  const test4 = () => {
    setTimeout(() => setCount((pre) => pre + 1), 3000); // B: 三秒内我们点击多次
  };

  const test5 = () => {
    // --------------------------------------------------- C: 会重新渲染，因为两个对象是不同的引用
    setOjb(() => ({
      name: "woow_wu7"
    }));
  };
  const test6 = () => {
    // --------------------------------------------------- C: 不会重新渲染，因为是同一个对象的引用
    setOjb((pre) => pre);
  };
  const test7 = () => {
    // --------------------------------------------------- C: 也会从新渲染，因为每次渲染声明的变量都是从新声明的
    setObj2(plainObj);
  };

  console.log("测试是否从新渲染");
  return (
    <div className="App">
      <button onClick={test}>test useState</button>
      <button onClick={test2}>test2 useState2</button>
      <br />
      <button onClick={test3}>test3 useState3</button>
      <button onClick={test4}>test4 useState4</button>
      <div>{count}</div>
      <br />

      <button onClick={test5}>test5 useState - object</button>
      <button onClick={test6}>test6 useState - object</button>
      <button onClick={test7}>test7 useState - object</button>
      <div>{obj.name}</div>
      <div>{obj2.name}</div>
    </div>
  );
}
```

### (4.3) useRef

```
import "./styles.css";
import { useRef, useState } from "react";

export default function App() {
  const countRef = useRef(0); // 1. 绑定数据
  const inputRef = useRef(null); // 2. 绑定dom测试

  const [number, setNumber] = useState(0);
  const onFocus = () => inputRef.current.focus();

  return (
    <div className="App">
      <button onClick={() => setNumber((prev) => prev + 1)}>number++</button>
      <div>count: {countRef.current}</div>
      <div>number: {number}</div>

      <input ref={inputRef} />
      <button onClick={onFocus}>获取input焦点</button>
    </div>
  );
}
```

### (4.4) **【 useEffect 和 useLayoutEffect 的区别？ 】**

- https://codesandbox.io/p/sandbox/3-uselayouteffect-7ywf2j?betaBrowser=true&file=%2Fsrc%2FApp.js%3A1%2C1

```
useLayoutEffect
// 1. 同步执行: 在 ( 浏览器绘制屏幕更新之前 ) 同步执行，会 ( 阻塞浏览器的渲染流程 )
// 2. 适合的操作: 比如有些操作，( popup的位置动态确定 ) 等这些操作，都 - 必须在浏览器重新绘制屏幕前完成，不然就会造成 ( 闪烁 )，即 ( 位置多次变化 等 )，虽然是多次渲染，但是不会闪烁
// 3. 关键词:
//    - 组件渲染完成后
//    - 浏览器绘制更新前


useEffect
// 1. 异步执行: 在组件渲染完成后 ( 浏览器绘制更新后 ) 异步执行，不会阻塞浏览器的渲染流程
// 2. 它是异步的，不会阻塞浏览器的渲染流程
```

# (五) Suspense

```
import React, { lazy, Suspense } from 'react';

const AvatarComponent = lazy(() => import('./AvatarComponent'));

const renderLoader = () => <p>Loading</p>;

const DetailsComponent = () => (
  <Suspense fallback={renderLoader()}>
    <AvatarComponent />
  </Suspense>
)

Vue和React中都有 Suspense 组件
```
