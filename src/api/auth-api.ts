import {
  contentTypeDefault,
  instance,
  ResultCodesEnum,
  ResultCodesEnumForCaptchaEnum,
  setHeaders,
} from "./api";

export const authAPI = {
  async getAuthData(token: string | null) {
    return instance
      .get<
        APIResponseType<GetAuthResponseDataType, ResultCodesEnum>
      >(`auth/me`, setHeaders(token, contentTypeDefault))
      .then((response) => {
        return response.data;
      });
  },

  async login(
    email: string | null,
    password: string | null,
    rememberMe = false,
    captcha: string | null = null,
  ) {
    return instance
      .post<
        APIResponseType<
          LoginResponseDataType,
          ResultCodesEnum | ResultCodesEnumForCaptchaEnum
        >
      >(`auth/login`, { email, password, rememberMe, captcha })
      .then((response) => {
        return response.data;
      });
  },

  async logout() {
    return instance.delete(`auth/login`).then((response) => {
      return response.data;
    });
  },
};

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D;
  resultCode: RC;
  messages: Array<string>;
};

type LoginResponseDataType = {
  id: number;
  token: string;
};

type GetAuthResponseDataType = {
  id: number;
  email: string;
  login: string;
};
