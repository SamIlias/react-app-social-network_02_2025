import { stopSubmit } from "redux-form";
import { usersAPI, userProfileAPI } from "../api/api";
const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

const generateId = (seed) => {
  return seed.length + 1;
};

const initialState = {
  posts: [
    { id: 1, text: "Here is my first post!" },
    { id: 2, text: "Yo! It is cool!" },
  ],
  profile: null,
  photo: null,
  status: "---------------",
};

const profileReducer = (state = initialState, action) => {
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

export const addPost = (newPostText) => ({ type: ADD_POST, newPostText });

export const deletePost = (postId) => ({ type: DELETE_POST, postId });

export const savePhotoSuccess = (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  status,
});

export const getUserProfileThunkCreator = (id) => {
  return async (dispatch) => {
    const data = await usersAPI.getProfile(id);
    dispatch(setUserProfile(data));
  };
};

export const getUserStatusTC = (id) => {
  return async (dispatch) => {
    const data = await userProfileAPI.getStatus(id);
    dispatch(setUserStatus(data));
  };
};

export const updateUserStatusTC = (status, token) => {
  return async (dispatch) => {
    const data = await userProfileAPI.updateStatus(status, token);
    if (data.resultCode === 0) {
      dispatch(setUserStatus(status));
    }
  };
};

export const saveProfilePhoto = (profilePhoto, token) => {
  return async (dispatch) => {
    const data = await userProfileAPI.saveProfilePhoto(profilePhoto, token);
    if (data.resultCode === 0) {
      dispatch(savePhotoSuccess(data.data.photos));
    }
  };
};

export const saveProfile = (profile, token, callbackSuccess) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await userProfileAPI.saveProfile(profile, token);
    if (data.resultCode === 0) {
      dispatch(getUserProfileThunkCreator(userId));
      callbackSuccess();
    } else {
      const error = data.messages.length > 0 ? data.messages[0] : "";
      dispatch(stopSubmit("edit-profile", { _error: error }));
      // dispatch(stopSubmit("edit-profile", { contacts: { facebook: error } }));
    }
  };
};
