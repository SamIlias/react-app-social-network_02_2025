import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "f76d54d9-5cfb-4436-85d2-0dd64acd06d6",
  },
});

const setTokenHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

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
      .post(`follow/${userId}`, {}, setTokenHeader(token))
      .then((response) => {
        return response.data;
      });
  },

  async unsubscribeFromUser(userId, token) {
    return instance
      .delete(`follow/${userId}`, setTokenHeader(token))
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
      .put(`profile/status`, { status: status }, setTokenHeader(token))
      .then((response) => {
        return response.data;
      });
  },
};

export const authAPI = {
  async getAuthData(token) {
    return instance.get(`auth/me`, setTokenHeader(token)).then((response) => {
      return response.data;
    });
  },

  async login(email, password, rememberMe = false) {
    return instance
      .post(`auth/login`, { email, password, rememberMe })
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
