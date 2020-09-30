import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import appReducer from '../app.reducer'


const totalReducers = {
  app: appReducer
}

const store = createStore(
  combineReducers(totalReducers),
  composeWithDevTools(applyMiddleware())
)

export default store