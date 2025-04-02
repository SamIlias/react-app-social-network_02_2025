import { passAuthorization } from "./auth-reducer";

const INITIALIZED_SUCCESS = "ilias/app/INITIALIZED_SUCCESS";
const SET_ERROR_SUCCESS = "ilias/app/SET_ERROR_SUCCESS";

const initialState = {
  initialized: false,
  globalError: null,
};

const appReducer = (state = initialState, action) => {
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

export const initializedSuccess = () => ({
  type: INITIALIZED_SUCCESS,
});

export const setGlobalError = (error) => ({ type: SET_ERROR_SUCCESS, error });

export const initializeApp = (userId, token) => (dispatch) => {
  const promise = dispatch(passAuthorization(userId, token));
  Promise.all([promise]).then(dispatch(initializedSuccess()));
};

export default appReducer;
