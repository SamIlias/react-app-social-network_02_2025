import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_AUTH_DATA = "SET_USER_AUTH_DATA";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_AUTH_DATA:
      return {
        ...state,
        ...action.payload,
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

export const setUserAuthData = (userId, login, email, isAuth, token) => ({
  type: SET_USER_AUTH_DATA,
  payload: { userId, login, email, isAuth, token },
});

export const toggleIsFetching = () => ({ type: TOGGLE_IS_FETCHING });

export const passAuthorization = (userId, token) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));

    authAPI.getAuthData(userId, token).then((data) => {
      dispatch(toggleIsFetching(false));
      if (data.resultCode === 0) {
        const { id, login, email } = data.data;
        dispatch(setUserAuthData(id, login, email, true, token));
      }
    });
  };
};

export const login = (email, password, rememberMe) => (dispatch) => {
  authAPI.login(email, password, rememberMe).then((data) => {
    if (data.resultCode === 0) {
      dispatch(passAuthorization(data.data.userId, data.data.token));
    } else {
      const error = data.messages[0];
      dispatch(stopSubmit("loginForm", { _error: error }));
    }
  });
};

export const logout = () => (dispatch) => {
  authAPI.logout().then((data) => {
    if (data.resultCode === 0) {
      dispatch(setUserAuthData(null, null, null, false));
    }
  });
};

export default authReducer;
