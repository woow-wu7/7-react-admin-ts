import actionType from './app.constant'

export const changeSystemType = (payload: any) => {
  return {
    type: actionType.SYSTEM_TYPE,
    payload,
  }
}

export const getToken = (token: string) => {
  return {
    type: actionType.GET_TOKEN,
    payload: token
  }
}