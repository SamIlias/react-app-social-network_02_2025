import { UserType } from "../redux/users-reducer";
import { contentTypeDefault, GetItemsType, instance, setHeaders } from "./api";
import { APIResponseType } from "./auth-api";

export const usersAPI = {
  async getUsers(currentPage?: number, pageSize?: number) {
    return instance
      .get<
        GetItemsType<UserType>
      >(`users/?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },

  async subscribeToUser(userId: number | null, token: string | null) {
    return instance
      .post<APIResponseType>(
        `follow/${userId}`,
        {},
        setHeaders(token, contentTypeDefault),
      )
      .then((response) => {
        return response.data;
      });
  },

  async unsubscribeFromUser(userId: number | null, token: string | null) {
    return instance
      .delete<APIResponseType>(
        `follow/${userId}`,
        setHeaders(token, contentTypeDefault),
      )
      .then((response) => {
        return response.data;
      });
  },
};
