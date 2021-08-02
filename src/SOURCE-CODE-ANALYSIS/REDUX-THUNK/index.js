// redux-thunk 源码

// 1
// createThunkMiddleware函数签名如下
// (extraArgument) => ({dispatch, getState}) => next => action => { ...具体根据action的类型来判断 }

// 2
// 真正导出的是:
// (1) action是一个对象: ({dispatch, getState}) => next => action => next(action)
// (2) action是一个函数: ({dispatch, getState}) => next => action => action(dispatch, getState, extraArgument)

// 3
// 具体案例在 在 admin-system/interview-react/Knowledge/reduxSourceCode组件中

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    // 如果 action 是一个函数
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);

      // 比如dispatch这样一个函数
      // 1. <button onClick={add}>直接dispatch一个函数</button>
      // 2. const add = () => { dispatch(handleThunk) }
      // 3. 如下
      // const handleThunk = (dispatch: any, getState: any) => {
      //   setTimeout(() => {
      //     dispatch({
      //       type: actionType.ADD_INTERVIEW,
      //       payload: 1
      //     })
      //   }, 2000)
      // }

    }

    // 如果 action 不是函数，就调用 next(action) 将 action对象 传递到下一个中间件
    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
