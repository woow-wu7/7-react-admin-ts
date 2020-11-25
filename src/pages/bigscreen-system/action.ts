import actionType from './constant'

export const getCurrentDate = (payload: any) => {
  return ({
    payload,
    type: actionType.GET_CURRENT_DATE,
  })
}