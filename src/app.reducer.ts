import actionType from './app.constant'
import { SYSTEMTYPE } from './global/enum'

const initialState = {
  systemType: SYSTEMTYPE.ADMIN,
  loginMessage: {
    token: '',
    roles: ''
  },
  routeParams: {},
  forceUpdataCount: 0,
  selectKeys: []
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
    case actionType.GET_ROUTE_PARAMS: {
      return {
        ...state,
        routeParams: action.payload
      }
    }
    case actionType.FORCE_UPDATE: {
      return {
        ...state,
        forceUpdataCount: action.payload
      }
    }
    case actionType.SELECT_KEYS: {
      return {
        ...state,
        selectKeys: action.payload
      }
    }
    default:
      return {
        ...state
      }
  }
}

export default appReducer