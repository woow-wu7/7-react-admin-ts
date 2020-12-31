import actionType from "./constant";

export const addInterview = (v: number) => {
  return {
    type: actionType.ADD_INTERVIEW,
    payload: v + 1,
  };
};

export const decInterview = (v: number)  => {
  return {
    type: actionType.DEC_INTERVIEW,
    payload: v - 1
  }
}
