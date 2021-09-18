// redux-thunk 中间件

// 1
// createThunkMiddleware 函数签名
// (...extraArgument) => (store) => (next) => (action) => action(dispatch, getState, extraArgument)
// (...extraArgument) => (store) => (next) => (action) => next(action)

// 2
// 真正导出的是 createThunkMiddleware() 的执行结果 --> ({dispatch, getState}) => (next) => (action) => {}

// 3
// redux-thunk 的使用
/**
 *
    const asyncFn = (params: any) => finalAsyncFn(dispatchFn: any, getState: any) => {
      try {
        setTimeout(() => {
          dispatchFn({
            type: 'ADD_NUMBER',
            payload: params,
          })
        }, params)
      } catch (err) {
        console.log(err)
      }
    }
    const thunk = () => dispatch(asyncFn(2000))
    // 点击按钮执行thunk函数，会dispatch一个异步函数 finalAsyncFn(虽然箭头函数不能在加函数名，不能这样写，这里就是为了说明是那个函数)
    // 当执行完异步操作后，在dispatch一个action
 *
 **/

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      // action is function
      if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument)
      }

      // action is object
      return next(action)
    }
}

const thunk = createThunkMiddleware()
thunk.withExtraArgument = createThunkMiddleware

export default thunk
