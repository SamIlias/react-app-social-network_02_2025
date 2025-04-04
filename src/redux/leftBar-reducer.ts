const initialState = {
  items: ["Profile", "Users", "Messages", "News", "Music", "Settings"],
};

type InitialStateType = typeof initialState;

const leftBarReducer = (
  state = initialState,
  action: any,
): InitialStateType => {
  return state;
};

export default leftBarReducer;
