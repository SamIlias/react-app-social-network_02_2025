import { passAuthorization } from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

export const initializedSuccess = () => ({
  type: INITIALIZED_SUCCESS,
});

export const initializeApp = (userId, token) => (dispatch) => {
  const promise = dispatch(passAuthorization(userId, token));
  Promise.all([promise]).then(dispatch(initializedSuccess()));
};

export default appReducer;
