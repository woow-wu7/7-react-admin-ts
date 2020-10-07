import actionType from './app.constant'
import { SYSTEMTYPE } from './global/enum'

const initialState = {
  systemType: SYSTEMTYPE.ADMIN,
  loginMessage: {
    token: '',
    roles: ''
  }
}

const appReducer = (
  state = initialState,
  action: { type: string, payload: { token: string, roles: string } }
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
    default:
      return {
        ...state
      }
  }
}

export default appReducer