import actionType from './app.constant'
import { SYSTEMTYPE } from './global/enum'

const initialState = {
  systemType: SYSTEMTYPE.BIGSCREEN,
  token: ''
}

const appReducer = (state = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case actionType.SYSTEM_TYPE:
      return {
        ...state,
        systemType: action.payload
      }
    case actionType.GET_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    default:
      return {
        ...state
      }
  }
}

export default appReducer