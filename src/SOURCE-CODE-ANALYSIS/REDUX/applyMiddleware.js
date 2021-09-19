import compose from './compose'

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 * 因为中间件可能是异步的，这应该是compose中间件中第一个增强器
 *
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 * 1. 很明显 applyMiddleware 是一个高阶函数
 */

// @function applyMiddleware
// @description 1. applyMiddleware的函数签名 (...middlewares) => (createStore) => (...args) => ({...store, dispatch})
// @description 2. applyMiddleware第一层的调用: applyMiddleware(thunk, logger) ====> (createStore) => (...args) => ({...store, dispatch})
// @description 3. 每个中间键的函数签名(以redux-thunk为例)是：({ dispatch, getState }) => (next) => (action) => next(action)
// @description createStore(combineReducers(totalReducers), applyMiddleware(thunk, logger))

// 1
// createStore(combineReducers(totalReducers), applyMiddleware(thunk, logger)) 执行了 applyMiddleware(thunk, logger) 后的 ( 返回值 ) 如下
//  - applyMiddleware(thunk, logger) 执行后返回下面这样一个函数：
//  - (createStore) => (...args) => ({...store, dispatch})



// ------------------------------------------------------------------------------------------------------------------- applyMiddleware
// applyMiddleware
// - 返回值
//    - applyMiddleware() 调用后的返回值就是一个 enhancer 函数，这个enhancer函数一般作为createStore(reducer, enhancer) 的第二个参数传入
export default function applyMiddleware(...middlewares) {
  // 这里，middlewares 是一个数组
  // 真正的调用是：applyMiddleware(thunk, logger)
  return (createStore) => (...args) => {
    const store = createStore(...args)
    // createStore => 生成store, args是rest参数 => args是一个数组
    //  - 注意：这里的createStore(...args) 中第三个参数 enhancer 不存在，所以会返回函数内部定义的api，而不是调用enhancer高阶函数

    let dispatch = () => {
      // 定义 dispatch 函数
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
        // 在构建中间件时不允许dispatching，因为其他中间件可能不会被dispatch
      )
    }

    const middlewareAPI = {
      getState: store.getState, // 从store实例上获取 getState 方法
      dispatch: (...args) => dispatch(...args), // dispatch属性的定义
    }

    const chain = middlewares.map((middleware) => middleware(middlewareAPI))
    // chain
    // 1. 向每个传入的 ( 中间件 ) 中传入 ( middlewareAPI ) 参数，middlewareAPI上具有 ( getState 和 dispatch )
    // 2. 并且将中间件执行的结果返回，组成一个数组 ---- ( 注意：中间件这里只调用了一层，因为每个中间件都有三成，是 store => next => action => next(action) 这样的结构，当然最后层的返回值next(action)不一定，比如redux-thunk就要分情况next是不是函数)
    // 3. chain = [next => action => next(action), next => action => next(action)]
    // 4. reduxThunk = ({ dispatch, getState }) => (next) => (action) => action(dispatch, getState, extraArgument) | next(action)

    // 中间件
    // 1. 中间件必须满足 (dispatch, getState) => (next) => (action) => dispatch(action) 这样的格式
    // 2. middleware(middlewareAPI) 中间件执行后，返回的是 (next) => (action) => dispatch(action) 执行后的返回值

    dispatch = compose(...chain)(store.dispatch)
    // 1. compose() 方法
    // 2. 当参数是多个时compose函数的函数签名是： (...funcs) => funcs.reduce((a, b) => (...args) => a(b(...args)))
    // 3. compose函数的作用：从右往左，将 ( 右边函数执行后的结果，即返回值 ) 作为 ( 左边函数的参数传入 )
    // 4. 比如类似这样的结果：compose(a,b,c)(arg) => a(b(c(args)))


    // ！！！！！！！dispatch分析 ！！！！！！！
    // 执行过程
    // 0. 先复习下 reduce((a,b,index,arr)=>a+b); 1.a是累积变量，默认是数组第一个成员；2.b是当前变量，默认是数组第二个成员；3.index当前位置，从0开始；4.原数组；5.如果累积变量题提供初始值，即作为reduce的第二个参数，b的初始值就是数组的第一个成员了
    // 1. compose(...chain)(store.dispatch)
    // 2. 执行 【第一层】 compose(...chain) 后返回的函数，其实就是执行 funcs.reduce((a, b) => (...args) => a(b(...args))) 函数后，返回的函数
    //    - 当funcs长度是2时指定后的返回值函数是 ====> (...args) => a(b(...args))
    //    - 最终执行compose第一层后返回的就是 ======> (...args) => a(b(...args))
    // 3. 执行 【第二层】 compose(...chain)(store.dispatch) 即 xxx(store.dispatch)
    //    - 其实就是 a(b(...args)) 执行后返回的结果
    // 4. 最终
    //    - dispatch 函数就是 a(b(...args)) ---> a(b(store.dispatch)) 执行后的结果
    //      - 前提是当funcs中间件长度是2时
    //      - a是：第一个中间件执行第一层后，返回的函数，结构类似 (next) => (action) => next(action)
    //      - b是：第二个中间件执行第一层后，返回的函数，结构类似 (next) => (action) => next(action)
    //    - b(store.dispatch) ---> 执行的结果是：(actionB) => store.dispatch(actionB)
    //    - a(b执行的结果函数) ----> (actionA) => store.dispatch(actionA) ; 当然这里最后的 next(action)前面和后面都可能有其他代码，最终的执行过程如下面的更完善的例子


    // ！！！！！！！dispatch最终的具体分析如下 ！！！！！！！
    // 现在假设有三个中间件
    // const M1 = (store) => (next) => (action) => { console.log('A开始');  next(action); console.log('A结束')}
    // const M2 = (store) => (next) => (action) => { console.log('B开始');  next(action); console.log('B结束')}
    // const M3 = (store) => (next) => (action) => { console.log('C开始');  next(action); console.log('C结束')}
    // 注意上面三个中间件的第一个参数 store 中只有getState, dispatch两个函数
    // 1. chain = [next => action => {M1}, next => action => {M2}, next => action => {M3}]
    // 2. 在chain数组中的
    //    M1 = next => action => {console.log('A开始');  next(action); console.log('A结束')}
    //    M2 = next => action => {console.log('B开始');  next(action); console.log('B结束')}
    //    M3 = next => action => {console.log('C开始');  next(action); console.log('C结束')}
    // 2. compose(...chain) = chain.reduce((a, b) => (...args) => a(b(...args)))
    //                      = 第一次: (...args) => M1(M2(...args)) ---- 中执行 M2(...args) = action => { console.log('B开始');  (...args)(action); console.log('B结束') }
    //                           M2: (...args) => M1(action => { console.log('B开始');  (...args)(action); console.log('B结束') })
    //                           M1: (...args) => action => {console.log('A开始'); next(action); console.log('A结束')}
    //                         M1M2: (...args) => action => {console.log('A开始');  console.log('B开始');  (...args)(action); console.log('B结束') console.log('A结束')}
    //                第一次过程总结:
    //                            11. 调用M2(...args)即next参数是(...args)返回值是: action => {B开始;(...args)(action);B结束}
    //                            22.   将M2(...args) 调用的返回值作为参数出入M1，即 M1(action => {B开始;(...args)(action);B结束})
    //                            33. 调用M1(M2执行后的返回值)函数，返回值是 1: action => {A开始; 调用next(action)即第11步返回的函数; A结束}
    //                                                                    2: action => {A开始;B开始;(...args)(action);B结束;A结束}
    //                            44. 最终是 (...args) => action => ({A开始;B开始;(...args)(action);B结束;A结束})
    //                      = 第二次: (...args) => M1M2(M3(..args))
    //                             : (...args) => M1M2(action => {console.log('C开始');  (...args)(action); console.log('C结束')})
    //                      =  最终: (...args) => action => {console.log('A开始');  console.log('B开始');  console.log('C开始');  (...args)(action); console.log('C结束'); console.log('B结束') console.log('A结束') }
    // 3. dispatch = compose(...chain)(store.dispatch)
    //             = (最终)(store.dispatch)
    //             = action => {console.log('A开始');  console.log('B开始');  console.log('C开始');  store.dispatch(action); console.log('C结束'); console.log('B结束') console.log('A结束') }
    //
    // 4. dispatch = action => {
    //      console.log('A开始');
    //      console.log('B开始');
    //      console.log('C开始');
    //      store.dispatch(action)
    //      console.log('C结束');
    //      console.log('B结束');
    //      console.log('A结束');
    //    }

    /**
      ----
      compose()
      ----
      export default function compose(...funcs) {
        // 没传参数，就返回一个函数，这个函数直接将参数返回
        if (funcs.length === 0) {
          return arg => arg
        }
        // 参数个数为1，直接返回参数
        if (funcs.length === 1) {
          return funcs[0]
        }
        // 多个参数
        return funcs.reduce((a, b) => (...args) => a(b(...args)))
      }
    *
    */

    return {
      ...store,
      dispatch,
    }
    // 返回
    // 1. store
    // 2. 覆盖store中的 dispatch 方法

    // dispatch就是一个函数，经过redux中间件执行各种副作用后，调用store对象上的 dispatch()方法
    // 而store对象又是通过 createStore()方法生成的，里面有dispatch()方法的实现

    // store上的dispatch方法，主要干了两件事情
    // 1. 传递action给reducer，更新state
    // 2. state更新后，执行监听数组中的所有监听函数listener
  }
}
