import axios from "axios";
const myToken = "d1b85f17-f896-4ab1-9620-e52c1a1b76de";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${myToken}`,
    "API-KEY": "631f98c1-41a5-44ce-b085-2891317a10e6",
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

export const authAPI = {
  async getAuthData() {
    return instance.get(`auth/me`).then((response) => {
      return response.data;
    });
  },
};
