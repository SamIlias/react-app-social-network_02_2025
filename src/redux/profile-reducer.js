import { usersAPI, userProfileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";

const generateId = (seed) => {
  return seed.length + 1;
};

const initialState = {
  posts: [
    { id: 1, text: "Here is my first post!" },
    { id: 2, text: "Yo! It is cool!" },
  ],
  profile: null,
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
