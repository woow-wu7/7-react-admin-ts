interface WIAction {
  type: string
  payload: any
}

interface WIinitialState {
  module: string
  scrollContainer: HTMLDivElement | null
}

type TadminReducer = (state: WIinitialState, action: WIAction) => any

export const actionType = {
  GET_MODULE: 'GET_MODULE',
  GET_SCROLLCONTAINER: 'GET_SCROLLCONTAINER',
}

const initialState: WIinitialState = {
  module: 'admin',
  scrollContainer: null,
}

const adminReducer: TadminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_SCROLLCONTAINER:
      return {
        ...state,
        scrollContainer: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export default adminReducer
