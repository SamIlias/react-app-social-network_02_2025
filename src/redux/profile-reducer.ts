import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/profile-api";

const ADD_POST = "samurai/profile/ADD-POST";
const DELETE_POST = "samurai/profile/DELETE_POST";
const SET_USER_PROFILE = "samurai/profile/SET_USER_PROFILE";
const SET_USER_STATUS = "samurai/profile/SET_USER_STATUS";
const SAVE_PHOTO_SUCCESS = "samurai/profile/SAVE_PHOTO_SUCCESS";

const generateId = (seed: Array<any>) => {
  return seed.length + 1;
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
};

export type PhotosType = {
  small: string | null;
  large: string | null;
};

export type ProfileType = {
  userId: number | null;
  lookingForAJob: boolean | null;
  lookingForAJobDescription: string | null;
  fulName: string | null;
  contacts: ContactsType | {};
  photos: PhotosType | null;
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
    fulName: null,
    contacts: {},
    photos: null,
  } as ProfileType,
  status: "---------------",
};

export type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: any,
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

// action creators ----------------------------------------
type addPostActionType = { type: typeof ADD_POST; newPostText: string };
type deletePostActionType = { type: typeof DELETE_POST; postId: number };
type savePhotoActionType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};
type setUserProfileActionType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
type setUserStatusActionType = { type: typeof SET_USER_STATUS; status: string };

export const addPost = (newPostText: string): addPostActionType => ({
  type: ADD_POST,
  newPostText,
});
export const deletePost = (postId: number): deletePostActionType => ({
  type: DELETE_POST,
  postId,
});
export const savePhotoSuccess = (photos: PhotosType): savePhotoActionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});
export const setUserProfile = (
  profile: ProfileType,
): setUserProfileActionType => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setUserStatus = (status: string): setUserStatusActionType => ({
  type: SET_USER_STATUS,
  status,
});

// thunk creators -----------------------------------------
export const getUserProfileThunkCreator = (id: number) => {
  return async (dispatch: any) => {
    const data = await profileAPI.getProfile(id);
    dispatch(setUserProfile(data));
  };
};

export const getUserStatusTC = (id: number) => {
  return async (dispatch: any) => {
    const data = await profileAPI.getStatus(id);
    dispatch(setUserStatus(data));
  };
};

export const updateUserStatusTC = (status: string, token: string | null) => {
  return async (dispatch: any) => {
    const data = await profileAPI.updateStatus(status, token);
    if (data.resultCode === 0) {
      dispatch(setUserStatus(status));
    }
  };
};

export const saveProfilePhoto = (profilePhoto: any, token: string) => {
  return async (dispatch: any) => {
    const data = await profileAPI.saveProfilePhoto(profilePhoto, token);
    if (data.resultCode === 0) {
      dispatch(savePhotoSuccess(data.data));
    }
  };
};

export const saveProfile = (
  profile: ProfileType,
  token: string | null,
  callbackSuccess: () => void,
) => {
  return async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile, token);
    if (data.resultCode === 0) {
      dispatch(getUserProfileThunkCreator(userId));
      callbackSuccess();
    } else {
      const error = data.messages.length > 0 ? data.messages[0] : "some error";
      dispatch(stopSubmit("edit-profile", { _error: error }));
      // dispatch(stopSubmit("edit-profile", { contacts: { facebook: error } }));
    }
  };
};
