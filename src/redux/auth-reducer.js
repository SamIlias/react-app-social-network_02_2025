import { authAPI } from "../api/api";

const SET_USER_AUTH_DATA = "SET_USER_AUTH_DATA";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_AUTH_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: true,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};

export const setUserAuthData = (userId, login, email) => ({
  type: SET_USER_AUTH_DATA,
  data: { userId, login, email },
});

export const toggleIsFetching = () => ({ type: TOGGLE_IS_FETCHING });

export const passAuthorization = () => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));

    authAPI.getAuthData().then((data) => {
      dispatch(toggleIsFetching(false));
      if (data.resultCode === 0) {
        const { id, login, email } = data.data;
        dispatch(setUserAuthData(id, login, email));
      }
    });
  };
};

export default authReducer;
