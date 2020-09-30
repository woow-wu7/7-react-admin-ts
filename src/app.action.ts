import actionType from './app.constant'

export const changeSystemType = (payload: any) => {
  return {
    type: actionType.SYSTEM_TYPE,
    payload,
  }
}