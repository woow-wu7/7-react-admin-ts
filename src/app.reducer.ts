import actionType from './app.constant'

const initialState = {
  systemType: 'admin'
}

const appReducer = (state = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case actionType.SYSTEM_TYPE:
      return {
        ...state,
        systemType: action.payload
      }
    default:
      return {
        ...state
      }
  }
}

export default appReducer