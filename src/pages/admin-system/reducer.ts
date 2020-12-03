interface IAction {
  type: string;
  payload: any;
}

interface IinitialState {
  module: string;
  scrollContainer: HTMLDivElement|null;
}

type TadminReducer = (state: IinitialState, action: IAction) => any;

export const actionType = {
  GET_MODULE: 'GET_MODULE',
  GET_SCROLLCONTAINER: 'GET_SCROLLCONTAINER',
}

const initialState: IinitialState = {
  module: "admin",
  scrollContainer: null,
};

const adminReducer: TadminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_SCROLLCONTAINER:
      return {
        ...state,
        scrollContainer: action.payload
      }
    default:
      return {
        ...state
      }
  }
};

export default adminReducer;
