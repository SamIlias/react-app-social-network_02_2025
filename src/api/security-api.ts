import { instance } from "./api";

type getCaptchaURLResponseType = {
  url: string;
};

export const securityAPI = {
  async getCaptchaURL() {
    return instance
      .get<getCaptchaURLResponseType>("/security/get-captcha-url")
      .then((response) => response.data);
  },
};
