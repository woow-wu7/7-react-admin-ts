import actionType from './constant'

interface Iaction {
  type: string;
  payload: any
}

const initialState = {
  currentDate: new Date()
}

const bigScreenReducer = (state = initialState, action: Iaction) => {
  switch(action.type) {
    case actionType.GET_CURRENT_DATE:
      return {
        ...state
      }
    default:
      return {
        ...state
      }
  }
}

export default bigScreenReducer