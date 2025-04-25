import { UserType } from "../redux/users-reducer";
import { contentTypeDefault, GetItemsType, instance, setHeaders } from "./api";
import { APIResponseType } from "./auth-api";

export const usersAPI = {
  async getUsers(
    currentPage: number,
    pageSize: number,
    term: string | null = "",
    friend: boolean | null = null,
  ) {
    return instance
      .get<
        GetItemsType<UserType>
      >(`users/?page=${currentPage}&count=${pageSize}${term ? `&term=${term}` : ""}${friend === null ? "" : `&friend=${friend}`}`)
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
