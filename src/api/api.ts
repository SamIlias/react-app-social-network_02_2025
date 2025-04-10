import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "f76d54d9-5cfb-4436-85d2-0dd64acd06d6",
  },
});

export const contentTypeDefault = "application/json";
type contentTypeDefaultType = typeof contentTypeDefault;

export const setHeaders = (
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

export enum ResultCodesEnum {
  success = 0,
  error = 1,
}

export enum ResultCodesEnumForCaptchaEnum {
  captchIsRequired = 10,
}

export type GetItemsType<ItemType> = {
  items: Array<ItemType>;
  totalCount: number;
  error: string | null;
};
