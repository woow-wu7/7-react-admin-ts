import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ReactReduxContext } from './Context'
import Subscription from '../utils/Subscription'

// Provider
// 1. `<Provider store={store}></Provider>`
function Provider({ store, context, children }) {
  // 使用 useMemo 缓存contextValue，在store变化时才重新计算contextValue
  const contextValue = useMemo(() => {
    const subscription = new Subscription(store)
    subscription.onStateChange = subscription.notifyNestedSubs
    return {
      store,
      subscription,
    }
  }, [store])

  const previousState = useMemo(() => store.getState(), [store]) // 上一个state

  useEffect(() => {
    const { subscription } = contextValue
    subscription.trySubscribe()

    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs()
    }
    return () => {
      subscription.tryUnsubscribe()
      subscription.onStateChange = null
    }
  }, [contextValue, previousState, store])

  const Context = context || ReactReduxContext
  // ReactReduxContext 是通过 React.createContext(null) 生成的 Context 对象
  // Context 如果传入了context参数对象就是context，没有传入自己生成一个Context对象

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
  // 1. 通过 Context.Provider 注入供消费组件使用的 value
  // 2. 当 value 变化时，所有的 ( 消费组件 ) 都会重新渲染，使用 Object.is() 来判断是否变化
}

if (process.env.NODE_ENV !== 'production') { // 开发环境做检测
  Provider.propTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
    }),
    context: PropTypes.object,
    children: PropTypes.any,
  }
}

export default Provider
