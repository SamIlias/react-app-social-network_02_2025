import { InferActionsTypes } from "./redux-store";

const initialState = {
  items: ["Profile", "Users", "Messages", "News", "Music", "Settings"],
};

type InitialStateType = typeof initialState;

const leftBarReducer = (
  state = initialState,
  action: ActionTypes,
): InitialStateType => {
  return state;
};

export const actions = {};

export default leftBarReducer;

type ActionTypes = InferActionsTypes<typeof actions>;
