import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "f76d54d9-5cfb-4436-85d2-0dd64acd06d6",
  },
});

const setHeaders = (token, contentType) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": contentType,
    },
  };
};

// const setTokenHeader = (token) => ({
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

export const usersAPI = {
  async getUsers(currentPage, pageSize) {
    return instance
      .get(`users/?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },

  async getProfile(userId) {
    console.warn("Obsolete method. Use userProfileAPI object.");
    return userProfileAPI.getProfile(userId);
  },

  async subscribeToUser(userId, token) {
    return instance
      .post(`follow/${userId}`, {}, setHeaders(token))
      .then((response) => {
        return response.data;
      });
  },

  async unsubscribeFromUser(userId, token) {
    return instance
      .delete(`follow/${userId}`, setHeaders(token))
      .then((response) => {
        return response.data;
      });
  },
};

export const userProfileAPI = {
  async getProfile(userId) {
    return instance.get(`profile/${userId}`).then((response) => {
      return response.data;
    });
  },

  async getStatus(userId) {
    return instance.get(`profile/status/${userId}`).then((response) => {
      return response.data;
    });
  },

  async updateStatus(status, token) {
    return instance
      .put(`profile/status`, { status: status }, setHeaders(token))
      .then((response) => {
        return response.data;
      });
  },

  async saveProfilePhoto(image, token) {
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

  async saveProfile(profile, token) {
    return instance
      .put(`profile`, profile, setHeaders(token))
      .then((response) => {
        return response.data;
      });
  },
};

export const authAPI = {
  async getAuthData(token) {
    return instance.get(`auth/me`, setHeaders(token)).then((response) => {
      return response.data;
    });
  },

  async login(email, password, rememberMe = false, captcha = null) {
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
  async getCaptchaUrl(token) {
    return instance
      .get("/security/get-captcha-url", setHeaders(token))
      .then((response) => response.data);
  },
};
