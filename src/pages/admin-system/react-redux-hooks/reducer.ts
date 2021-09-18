import actionType from './constant'

interface Iaction {
  type: string;
  action: any
}

const initialState = {
  number: 0
}

const reactReduxReducer = (state = initialState, action: Iaction) => {
  switch(action.type) {
    case actionType.ADD_NUMBER:
      return {
        ...state,
        number: state.number + 1
      }
    default:
      return {
        ...state
      }
  }
}

export default reactReduxReducer
