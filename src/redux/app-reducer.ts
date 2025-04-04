import { passAuthorization } from "./auth-reducer";

const INITIALIZED_SUCCESS = "ilias/app/INITIALIZED_SUCCESS";
const SET_ERROR_SUCCESS = "ilias/app/SET_ERROR_SUCCESS";

const initialState = {
  initialized: false,
  globalError: null,
};

type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS;
};

export const initializedSuccess = (): InitializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS,
});

type SetGlobalErrorActionType = {
  type: typeof SET_ERROR_SUCCESS;
  error: any;
};
export const setGlobalError = (error: any): SetGlobalErrorActionType => ({
  type: SET_ERROR_SUCCESS,
  error,
});

export const initializeApp = (token: string | null) => (dispatch: any) => {
  const promise = dispatch(passAuthorization(token));
  Promise.all([promise]).then(dispatch(initializedSuccess()));
};

export default appReducer;
