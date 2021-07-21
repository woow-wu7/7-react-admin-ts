import actionType from './constant'

const initialState = {
  interviewCount: 0,
}

interface WIA {
  type: string
  payload: any
}

const interviewCountReducer = (state = initialState, action: WIA) => {
  switch (action.type) {
    case actionType.ADD_INTERVIEW:
      return {
        ...state,
        interviewCount: state.interviewCount + action.payload,
      }
    case actionType.DEC_INTERVIEW:
      return {
        ...state,
        interviewCount: state.interviewCount - action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export default interviewCountReducer
