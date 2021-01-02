import React from 'react'


// React.createContext(defaultValue)
// 作用
// 1. 生成一个Context对象: const MyContext = React.createContext(defaultValue)
// 参数
// 1. defaultValue: 只有在树中没有 Provider 时，参数defaultValue才会生效
// api
// 1. Context.Provider
//    - <MyContext.Provider value={/* 某个值 */}>
//    - value 会传递给消费组件
//    - 当 Provider 组件的 value 发生变化时，内部的 ( 消费组件 ) 都会重新渲染，不受 (shouldComponentUpdate ) 的影响
//    - 如何监测 value 是否发生变化???????
//      - Object.is
//        - 1. 注意 Object.is 和 === 的区别
//          - ===
//            (1) ( === ) 表示严格相等， 必须是 ( 数据类型 ) 和 ( 值 ) 都要相等
//            (2)  对象仅与自身严格相等，即两个对象即使属性一样也不严格相等
//          - Object.is
//        - 2. 案例
//          (1) NaN === NaN ------------------ false
//          (2) Object.is(NaN, NaN) ---------- true
//          (3) +0 === -0 -------------------- true
//          (4) Object.is(+0, -0) ------------ false
// 2. const context = useContext(Context对象)
//    - 参数
//      - Context对象，通过 React.createContext() 生成

export const ReactReduxContext = /*#__PURE__*/ React.createContext(null)

if (process.env.NODE_ENV !== 'production') {
  ReactReduxContext.displayName = 'ReactRedux'
}

export default ReactReduxContext
