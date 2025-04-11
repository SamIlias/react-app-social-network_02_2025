import { stopSubmit } from "redux-form";
import { ResultCodesEnum } from "../api/api";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

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

const authReducer = (
  state = initialState,
  action: ActionTypes,
): InitialStateType => {
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
export const actions = {
  setUserAuthData: (
    userId: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean,
    token: string | null,
  ) =>
    ({
      type: SET_USER_AUTH_DATA,
      payload: { userId, login, email, isAuth, token },
    }) as const,

  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: TOGGLE_IS_FETCHING,
      isFetching,
    }) as const,

  getCaptchaURLSuccess: (captchaURL: string) =>
    ({
      type: GET_CAPTCHA_URL_SUCCESS,
      payload: { captchaURL },
    }) as const,
};

// thunk creators --------------------------------------------

export const passAuthorization = (token: string | null): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    const data = await authAPI.getAuthData(token);
    dispatch(actions.toggleIsFetching(false));
    if (data.resultCode === ResultCodesEnum.success) {
      const { id, login, email } = data.data;
      dispatch(actions.setUserAuthData(id, login, email, true, token));
    }
  };
};

export const login =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string,
  ): ThunkType =>
  async (dispatch) => {
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

export const logout = (): ThunkType => async (dispatch) => {
  const data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(actions.setUserAuthData(null, null, null, false, null));
  }
};

export const getCaptchaURL = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaURL();
  dispatch(actions.getCaptchaURLSuccess(data.url));
};

type InitialStateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes | ReturnType<typeof stopSubmit>>;
