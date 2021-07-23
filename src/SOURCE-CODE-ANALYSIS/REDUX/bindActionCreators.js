// bindActionCreator
// - 函数签名: (actionCreator, dispatch) => () => dispatch(actionCreator.apply(this, arguments))
// - 调用后：返回的是一个函数： () => dispatch(actionCreator.apply(this, arguments))
function bindActionCreator(actionCreator, dispatch) {
  return function() {
    return dispatch(actionCreator.apply(this, arguments))
  }
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
export default function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') { // ------------------------------------------- 函数
  // 如果 actionCreators 是函数，则最终返回一个函数 () => dispatch(actionObject)

    return bindActionCreator(actionCreators, dispatch)
    // return () => dispatch(actionCreator.apply(this, arguments))
    // return () => dispatch(actionObject)
    // 因为actionCreator是action创建函数，调用返回一个action
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) { // ------------------ undefined,number,string,boolean
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${
        actionCreators === null ? 'null' : typeof actionCreators
      }. ` +
        `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    )
  }

  // actionCreators 是对象, 则最终返回一个对象 // ---------------------------------------------- object||array
  // {
  //   actionCreator 即 ( action创建函数 ) 的函数名: () => dispatch(actionObject)
  // }
  const boundActionCreators = {}
  // boundActionCreators 是一个对象
  // key ===> action创建函数的函数名
  // value => bindActionCreator(actionCreator, dispatch)执行的返回值

  for (const key in actionCreators) {
    const actionCreator = actionCreators[key] // 取出具体的每一个 actionCreator 函数
    if (typeof actionCreator === 'function') { // 对象 value 是一个函数
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
      // boundActionCreators[key] = () => dispatch(actionObject)

      // key是：函数名
      // value是： () => dispatch(actionCreator.apply(this, arguments)) 这样一个函数
      // value简化：() => dispatch(action)
    }
  }
  return boundActionCreators // 返回这个map对象
}
