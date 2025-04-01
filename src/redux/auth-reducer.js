import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_AUTH_DATA = "samurai/auth/SET_USER_AUTH_DATA";
const TOGGLE_IS_FETCHING = "samurai/auth/TOGGLE_IS_FETCHING";
const GET_CAPTCHA_URL_SUCCESS = "samurai/security/GET_CAPTCHA_URL_SUCCESS";

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  token: null,
  captchaUrl: null, // if null captcha is not requared
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_AUTH_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
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

export const passAuthorization = (token) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await authAPI.getAuthData(token);
    dispatch(toggleIsFetching(false));
    if (data.resultCode === 0) {
      const { id, login, email } = data.data;
      dispatch(setUserAuthData(id, login, email, true, token));
    }
  };
};

export const login =
  (email, password, rememberMe, captcha) => async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === 0) {
      dispatch(passAuthorization(data.data.token));
    } else {
      if (data.resultCode === 10) {
        dispatch(getCaptchaUrl()); //token??
      }
      const error = data.messages.length > 0 ? data.messages[0] : "Some error";
      dispatch(stopSubmit("loginForm", { _error: error }));
    }
  };

export const logout = () => async (dispatch) => {
  const data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setUserAuthData(null, null, null, false));
  }
};

const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

export const getCaptchaUrl = () => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  dispatch(getCaptchaUrlSuccess(data.url));
};

export default authReducer;
