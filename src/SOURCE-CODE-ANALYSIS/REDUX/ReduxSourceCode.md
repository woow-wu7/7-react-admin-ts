# redux
- createStore
- combineReducers
- applyMiddleware
- bindActionCreators
- compose

# react-redux
- Provider
- connect
- hooks
  - useSelector
  - useDispatch
  - useStore

# 结合我的掘金文章：https://juejin.cn/post/6844904137952329742 
- 一定要结合写的博客，特别注意 ( 中间件的原理 ) 和 文章中的 ( 原理图 )

# redux中间件
- 每一个中间件都必须满足 `(dispatch, getState) => (next) => (action) => next(action)` 的格式
- redux-thunk
- redux-logger

### (1) redux-thunk
- https://github.com/reduxjs/redux-thunk
```
源码如下：
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
export default thunk;
```

### (2) redux-logger
- https://github.com/LogRocket/redux-logger



