import axios from "axios";
const myToken = "34a1feab-0bed-4233-9752-8d99ab1f4bca";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${myToken}`,
    // "API-KEY": "631f98c1-41a5-44ce-b085-2891317a10e6",
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

  async subscribeToUser(userId) {
    return instance.post(`follow/${userId}`, {}).then((response) => {
      return response.data;
    });
  },

  async unsubscribeFromUser(userId) {
    return instance.delete(`follow/${userId}`).then((response) => {
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

  async updateStatus(status) {
    return instance
      .put(`profile/status`, { status: status })
      .then((response) => {
        return response.data;
      });
  },
};

export const authAPI = {
  async getAuthData() {
    return instance.get(`auth/me`).then((response) => {
      return response.data;
    });
  },
};
