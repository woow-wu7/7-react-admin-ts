import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import appReducer from '../app.reducer'
import bigScreenReducer from '@/pages/bigscreen-system/reducer'
import reactReduxReducer from '@/pages/admin-system/react-redux-hooks/reducer'
import adminReducer from '@/pages/admin-system/reducer'


const totalReducers = {
  app: appReducer,
  admin: adminReducer,
  reactReduxState: reactReduxReducer,
  bigScreen: bigScreenReducer,
}

const store = createStore(
  combineReducers(totalReducers),
  composeWithDevTools(applyMiddleware())
)

export default store