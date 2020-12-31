import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import appReducer from '../app.reducer'
import bigScreenReducer from '@/pages/bigscreen-system/reducer'
import reactReduxReducer from '@/pages/admin-system/react-redux-hooks/reducer'
import adminReducer from '@/pages/admin-system/reducer'
import interviewReducer from '@/pages/admin-system/interview-react/reducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
// redux中间件
// 1. redux-thunk  => 用于dispatch一个函数，则可以处理异步的请求函数
// 2. redux-logger => 可以打印 prevState action nextState

const totalReducers = {
  app: appReducer,
  admin: adminReducer,
  reactReduxState: reactReduxReducer,
  bigScreen: bigScreenReducer,
  interview: interviewReducer,
}

const store = createStore(
  combineReducers(totalReducers),
  composeWithDevTools(applyMiddleware(thunk, logger)) 
)

export default store