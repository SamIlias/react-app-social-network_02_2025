import { passAuthorization } from "./auth-reducer";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

const INITIALIZED_SUCCESS = "ilias/app/INITIALIZED_SUCCESS";
const SET_ERROR_SUCCESS = "ilias/app/SET_ERROR_SUCCESS";

const initialState = {
  initialized: false,
  globalError: null as string | null,
};

const appReducer = (
  state = initialState,
  action: ActionTypes,
): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };

    case SET_ERROR_SUCCESS:
      return {
        ...state,
        globalError: action.error,
      };

    default:
      return state;
  }
};

export const actions = {
  initializedSuccess: () =>
    ({
      type: INITIALIZED_SUCCESS,
    }) as const,

  setGlobalError: (error: string | null) =>
    ({
      type: SET_ERROR_SUCCESS,
      error,
    }) as const,
};

export const initializeApp =
  (token: string | null): ThunkType =>
  (dispatch) => {
    const promise = dispatch(passAuthorization(token));
    Promise.all([promise]).then(() => dispatch(actions.initializedSuccess()));
  };

export default appReducer;

// types -----------------------------------
type InitialStateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes>;
