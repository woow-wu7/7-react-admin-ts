import actionType from './app.constant'

export const changeSystemType = (payload: any) => {
  return {
    type: actionType.SYSTEM_TYPE,
    payload,
  }
}

export const getLoginMessage = (loginMessage: { token: string, roles: string }) => {
  return {
    type: actionType.GET_LOGIN_MESSAGE,
    payload: loginMessage
  }
}