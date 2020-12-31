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
  // actionCreators 是函数，则最终返回一个函数 () => dispatch(actionObject)
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
    // return () => dispatch(actionCreator.apply(this, arguments))
    // return () => dispatch(actionObject)
    // 因为actionCreator是action创建函数，调用返回一个action
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${
        actionCreators === null ? 'null' : typeof actionCreators
      }. ` +
        `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    )
  }

  // actionCreators 是对象, 则最终返回一个对象
  // {
  //   actionCreator即action创建函数的函数名: () => dispatch(actionObject)
  // }
  const boundActionCreators = {}
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') { // 对象 value 是一个函数
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
      // boundActionCreators[key] = () => dispatch(actionObject)
      
      // key是：函数名
      // value是： () => dispatch(actionCreator.apply(this, arguments)) 这样一个函数
      // value简化：() => dispatch(action)
    }
  }
  return boundActionCreators
}
