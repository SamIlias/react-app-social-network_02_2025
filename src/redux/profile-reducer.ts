import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/profile-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { Dispatch } from "redux";

const ADD_POST = "samurai/profile/ADD-POST";
const DELETE_POST = "samurai/profile/DELETE_POST";
const SET_USER_PROFILE = "samurai/profile/SET_USER_PROFILE";
const SET_USER_STATUS = "samurai/profile/SET_USER_STATUS";
const SAVE_PHOTO_SUCCESS = "samurai/profile/SAVE_PHOTO_SUCCESS";

const generateId = (seed: Array<any>) => {
  return seed.length + 1;
};

const initialState = {
  posts: [
    { id: 1, text: "Here is my first post!" },
    { id: 2, text: "Yo! It is cool!" },
  ] as Array<PostType>,
  profile: {
    userId: null,
    lookingForAJob: null,
    lookingForAJobDescription: null,
    fullName: null,
    contacts: {},
    photos: {},
  } as ProfileType,
  status: "---------------",
};

const profileReducer = (
  state = initialState,
  action: ActionTypes,
): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      if (!action.newPostText) {
        return state;
      }
      const seed = state.posts;
      const newPost = {
        id: generateId(seed),
        text: action.newPostText,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    default:
      return state;
  }
};

export default profileReducer;

export const actions = {
  addPost: (newPostText: string) =>
    ({
      type: ADD_POST,
      newPostText,
    }) as const,
  deletePost: (postId: number) =>
    ({
      type: DELETE_POST,
      postId,
    }) as const,
  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: SAVE_PHOTO_SUCCESS,
      photos,
    }) as const,
  setUserProfile: (profile: ProfileType) =>
    ({
      type: SET_USER_PROFILE,
      profile,
    }) as const,
  setUserStatus: (status: string) =>
    ({
      type: SET_USER_STATUS,
      status,
    }) as const,
};

// thunk creators -----------------------------------------
export const getUserProfileThunkCreator = (id: number | null): ThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.getProfile(id);
    dispatch(actions.setUserProfile(data));
  };
};

export const getUserStatusTC = (id: number | null): ThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.getStatus(id);
    dispatch(actions.setUserStatus(data));
  };
};

export const updateUserStatusTC = (
  status: string,
  token: string | null,
): ThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.updateStatus(status, token);
    if (data.resultCode === 0) {
      dispatch(actions.setUserStatus(status));
    }
  };
};

export const saveProfilePhoto = (
  profilePhoto: File,
  token: string | null,
): ThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.saveProfilePhoto(profilePhoto, token);
    if (data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(data.data));
    }
  };
};

export const saveProfile = (
  profile: ProfileType,
  token: string | null,
  callbackSuccess: () => void,
): ThunkType => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile, token);
    if (data.resultCode === 0) {
      if (userId !== null) {
        dispatch(getUserProfileThunkCreator(userId));
        callbackSuccess();
      } else {
        throw new Error("user id can not be null");
      }
    } else {
      const error = data.messages.length > 0 ? data.messages[0] : "some error";
      dispatch(stopSubmit("edit-profile", { _error: error }));
      // dispatch(stopSubmit("edit-profile", { contacts: { facebook: error } }));
    }
  };
};

export type PostType = {
  id: number;
  text: string;
};

export type ContactsType = {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLink: string | null;
  [key: string]: string | null;
};

export type PhotosType = {
  small: string | null;
  large: string | null;
};

export type ProfileType = {
  userId: number | null;
  lookingForAJob: boolean | null;
  lookingForAJobDescription?: string | null;
  fullName: string | null;
  contacts: ContactsType;
  photos: PhotosType;
  aboutMe?: string;
};

export type InitialStateType = typeof initialState;

type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes | ReturnType<typeof stopSubmit>>;

export type DispatchActionsType = Dispatch<ActionTypes>;
