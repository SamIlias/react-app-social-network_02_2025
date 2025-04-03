import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "f76d54d9-5cfb-4436-85d2-0dd64acd06d6",
  },
});

const contentTypeDefault = "application/json";
type contentTypeDefaultType = typeof contentTypeDefault;

const setHeaders = (
  token: string | null,
  contentType: string | contentTypeDefaultType,
) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": contentType,
    },
  };
};

export const usersAPI = {
  async getUsers(currentPage: number | null, pageSize: number | null) {
    return instance
      .get(`users/?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },

  async getProfile(userId: number | null) {
    console.warn("Obsolete method. Use userProfileAPI object.");
    return userProfileAPI.getProfile(userId);
  },

  async subscribeToUser(userId: number | null, token: string | null) {
    return instance
      .post(`follow/${userId}`, {}, setHeaders(token, contentTypeDefault))
      .then((response) => {
        return response.data;
      });
  },

  async unsubscribeFromUser(userId: number | null, token: string | null) {
    return instance
      .delete(`follow/${userId}`, setHeaders(token, contentTypeDefault))
      .then((response) => {
        return response.data;
      });
  },
};

export const userProfileAPI = {
  async getProfile(userId: number | null) {
    return instance.get(`profile/${userId}`).then((response) => {
      return response.data;
    });
  },

  async getStatus(userId: number | null) {
    return instance.get(`profile/status/${userId}`).then((response) => {
      return response.data;
    });
  },

  async updateStatus(status: string | null, token: string | null) {
    return instance
      .put(
        `profile/status`,
        { status: status },
        setHeaders(token, contentTypeDefault),
      )
      .then((response) => {
        return response.data;
      });
  },

  async saveProfilePhoto(image: string | null, token: string | null) {
    return instance
      .put(
        `profile/photo`,
        { image: image },
        setHeaders(token, "multipart/form-data"),
      )
      .then((response) => {
        return response.data;
      });
  },

  async saveProfile(profile: any, token: string | null) {
    return instance
      .put(`profile`, profile, setHeaders(token, contentTypeDefault))
      .then((response) => {
        return response.data;
      });
  },
};

export const authAPI = {
  async getAuthData(token: string | null) {
    return instance
      .get(`auth/me`, setHeaders(token, contentTypeDefault))
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
      .post(`auth/login`, { email, password, rememberMe, captcha })
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

export const securityAPI = {
  async getCaptchaUrl() {
    return instance
      .get("/security/get-captcha-url")
      .then((response) => response.data);
  },
};
