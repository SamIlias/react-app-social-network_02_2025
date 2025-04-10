import { stopSubmit } from "redux-form";
import { ResultCodesEnum } from "../api/api";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";

const SET_USER_AUTH_DATA = "samurai/auth/SET_USER_AUTH_DATA";
const TOGGLE_IS_FETCHING = "samurai/auth/TOGGLE_IS_FETCHING";
const GET_CAPTCHA_URL_SUCCESS = "samurai/security/GET_CAPTCHA_URL_SUCCESS";

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  token: null as string | null,
  captchaURL: "" as string, // if null captcha is not required
  isFetching: false,
};

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
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

export default authReducer;

//action creators ----------------------------------------------
type SetUserAuthDataActionPayloadType = {
  userId: number | null;
  login: string | null;
  email: string | null;
  isAuth: boolean;
  token: string | null;
};

type SetUserAuthDataActionType = {
  type: typeof SET_USER_AUTH_DATA;
  payload: SetUserAuthDataActionPayloadType;
};

type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};

type GetCaptchaURLSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  payload: { captchaURL: string | null };
};

export const setUserAuthData = (
  userId: number | null,
  login: string | null,
  email: string | null,
  isAuth: boolean,
  token: string | null,
): SetUserAuthDataActionType => ({
  type: SET_USER_AUTH_DATA,
  payload: { userId, login, email, isAuth, token },
});

export const toggleIsFetching = (
  isFetching: boolean,
): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });

const getCaptchaURLSuccess = (
  captchaURL: string | null,
): GetCaptchaURLSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaURL },
});

// thunk creators --------------------------------------------
export const passAuthorization = (token: string | null) => {
  return async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    const data = await authAPI.getAuthData(token);
    dispatch(toggleIsFetching(false));
    if (data.resultCode === ResultCodesEnum.success) {
      const { id, login, email } = data.data;
      dispatch(setUserAuthData(id, login, email, true, token));
    }
  };
};

export const login =
  (email: string, password: string, rememberMe: boolean, captcha?: string) =>
  async (dispatch: any) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === 0) {
      dispatch(passAuthorization(data.data.token));
    } else {
      if (data.resultCode === 10) {
        dispatch(getCaptchaURL()); //token??
      }
      const error = data.messages.length > 0 ? data.messages[0] : "Some error";
      dispatch(stopSubmit("loginForm", { _error: error }));
    }
  };

export const logout = () => async (dispatch: any) => {
  const data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setUserAuthData(null, null, null, false, null));
  }
};

export const getCaptchaURL = () => async (dispatch: any) => {
  const data = await securityAPI.getCaptchaURL();
  dispatch(getCaptchaURLSuccess(data.url));
};
