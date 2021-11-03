import createStore from './createStore'
import combineReducers from './combineReducers'
import bindActionCreators from './bindActionCreators'
import applyMiddleware from './applyMiddleware'
import compose from './compose' // 以上是redux暴露的几个api
import warning from './utils/warning'
import __DO_NOT_USE__ActionTypes from './utils/actionTypes'

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 *
 * isCrushed函数主要用来检查代码是否被压缩，因为压缩后，函数名会变短，如果被 ( 压缩，并且是生产环境就警告用户 )
 *
 */
function isCrushed() {} // crushed是压坏，压碎的意思

if (
  process.env.NODE_ENV !== 'production' &&
  typeof isCrushed.name === 'string' &&
  isCrushed.name !== 'isCrushed' // 压缩后name会被修改成更短的名字，达到压缩的目的
) {
  warning(
    'You are currently using minified code outside of NODE_ENV === "production". ' +
      'This means that you are running a slower development build of Redux. ' +
      'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' +
      'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' +
      'to ensure you have the correct code for your production build.'
  )
}

// redux最终暴露以下api
export {
  createStore,
  // createStore
  // 1. 返回一个store实例，store上挂载了 ( getState, dispatch, subscribe, replaceReducer, observable )
  // 2. 如果存在 applyMiddleware() 这样的 enhancer 函数，则会重写 ( dispatch ) 函数
  // 2021.11.03更新如下
  // createStore(reducer, preloadState, enhancer)
  // 11. enhancer参数存在
  //    - 情况：如果只有两个参数，并且第二个参数是函数
  //    - 交换：说明第三个参数是undefined，第二个参数是函数，那么交换第二个和第三个参数的位置 ( 来保证enhancer参数是一个函数 )
  //    - 返回：
  //        - 因为：这种情况 createStore() 返回的是 enhancer(createStore)(reducer, preloadedState)
  //        - 又因为：applyMiddleware 就是一个enhancer函数
  //        - 函数签名：applyMiddleware 的函数签名是：(...middlewares) => (createStore) => (...args) => ({...store, dispatch})
  //          - 第一次调用在：createStore(reducer, applyMiddleware(logger, chunk)) 返回这样一个函数 (createStore) => (...args) => ({...store, dispatch})
  //          - 第二次和第三次调用：enhancer(createStore)(reducer, preloadedState) 等同于 createStore(reducer, preloadState)
  //    - 最终返回：createStore(reducer, preloadState) 执行的结果，大部分和下面22的情况一致了
  //    - 问题：既然 11 和 22 返回大部分一致，那有什么不同呢？
  //    - 答案：
  //        - 返回值的不同：是返回的store对象的dispatch方法不一样，这里情况11重写了dispatch，用来处理各种redux中间件执行后的dispatch方法
  //        - 函数内部逻辑不一样：情况11多了对中间件的处理过程，相当于函数组合的过程
  // 22. enhancer不存在
  //    - 情况：只有一个参数，或者有两个参数但是第二个参数不是一个函数(是一个对象)
  //    - 返回：返回一个对象，对象中的属性都是内部自己定义的，对象中包含 getState，dispatch，subscribe，replaceReducer，observable
  // 33. 综上所述
  //    - 不管参数是那种情况，createStore返回的都是store对象，包含getState，dispatch，subscribe，replaceReducer，observable这些属性

  combineReducers,
  // combineReducers
  // 1. combineReducers 返回的是 combination(state = {}, action) 函数，该函数是 reducer函数类型

  bindActionCreators,
  // bindActionCreators
  // 1. 案例：
  //   const mapDispatchToProps = (dispatch: any) => {
  //     return bindActionCreators(actions, dispatch)
  //   }
  // 2. 返回值
  // - 参数是函数：() => dispatch(action)
  // - 参数是对象：{ action创建函数的函数名: () => dispatch(action), action创建函数的函数名: () => dispatch(action) }

  applyMiddleware,
  // applyMiddleware
  // 1. 返回 store实例，不过会重写dispatch，其实applyMiddleware就是 enhancer 函数

  compose,
  // compose
  // 1. compose(funcs)
  // - 当没有参数时，返回 args => args 这样一个函数
  // - 当参数长度为1，即一个参数，直接返回参数函数调用的结果，funcs[0]
  // - 否则用reducer迭代，从右往左，把 ( 右边函数执行的结果 ) 作为 ( 左边函数的参数 ) 传入，[a, b, c] => a(b(c(...args)))

  __DO_NOT_USE__ActionTypes,
  // __DO_NOT_USE__ActionTypes
  // - 其实就是一个actionType，即action对象中的type属性，是一个常量，具体值如下
  // __DO_NOT_USE__ActionTypes === const ActionTypes = {
  //   INIT: `@@redux/INIT${randomString()}`,
  //   REPLACE: `@@redux/REPLACE${randomString()}`,
  //   PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}` // probe_unknown_action
  // }
}
