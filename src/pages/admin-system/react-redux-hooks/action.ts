import actionType from './constant'

export const addNumber = (payload: any) => {
  return ({
    payload,
    type: actionType.ADD_NUMBER
  })
}
