import actionType from './app.constant'
import { SYSTEMTYPE } from './global/enum'

const initialState = {
  systemType: SYSTEMTYPE.ADMIN,
  loginMessage: {
    token: '',
    roles: ''
  },
  lastBreadCrumbUseParams: ''
}

const appReducer = (
  state = initialState,
  action: { type: string, payload: any }
) => {
  switch (action.type) {
    case actionType.SYSTEM_TYPE:
      return {
        ...state,
        systemType: action.payload
      }
    case actionType.GET_LOGIN_MESSAGE:
      return {
        ...state,
        loginMessage: {
          ...state.loginMessage,
          token: action.payload.token,
          roles: action.payload.roles,
        }
      }
    case actionType.GETLASTBREADCRUMBUSEPARAMS:
      return {
        ...state,
        lastBreadCrumbUseParams: action.payload
      }
    default:
      return {
        ...state
      }
  }
}

export default appReducer