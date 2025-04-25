import { PhotosType, ProfileType } from "../redux/profile-reducer";
import { contentTypeDefault, instance, setHeaders } from "./api";
import { APIResponseType } from "./auth-api";

export const profileAPI = {
  async getProfile(userId: number | null) {
    return instance.get<ProfileType>(`profile/${userId}`).then((response) => {
      return response.data;
    });
  },

  async getStatus(userId: number | null) {
    return instance.get<string>(`profile/status/${userId}`).then((response) => {
      return response.data;
    });
  },

  async updateStatus(status: string, token: string | null) {
    return instance
      .put<APIResponseType>(
        `profile/status`,
        { status: status },
        setHeaders(token, contentTypeDefault),
      )
      .then((response) => {
        return response.data;
      });
  },

  async saveProfilePhoto(image: File | null, token: string | null) {
    return instance
      .put<
        APIResponseType<{ photos: PhotosType }>
      >(`profile/photo`, { image: image }, setHeaders(token, "multipart/form-data"))
      .then((response) => {
        return response.data;
      });
  },

  async saveProfile(profile: ProfileType, token: string | null) {
    return instance
      .put<APIResponseType>(
        `profile`,
        profile,
        setHeaders(token, contentTypeDefault),
      )
      .then((response) => {
        return response.data;
      });
  },
};
