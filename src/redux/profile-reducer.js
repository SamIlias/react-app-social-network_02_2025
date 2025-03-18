import { usersAPI, userProfileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";

const generateId = (seed) => {
  return seed.length + 1;
};

const initialState = {
  newPostText: "",
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
      if (!state.newPostText) {
        return state;
      }
      const seed = state.posts;
      const newPost = {
        id: generateId(seed),
        text: state.newPostText,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };
    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        newPostText: action.text,
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
    default:
      return state;
  }
};

export default profileReducer;

export const addPost = () => ({ type: ADD_POST });
export const updateNewPostText = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  text: text,
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
  return (dispatch) => {
    usersAPI.getProfile(id).then((data) => {
      dispatch(setUserProfile(data));
    });
  };
};

export const getUserStatusTC = (id) => {
  return (dispatch) => {
    userProfileAPI.getStatus(id).then((data) => {
      dispatch(setUserStatus(data));
    });
  };
};

export const updateUserStatusTC = (status) => {
  return (dispatch) => {
    userProfileAPI.updateStatus(status).then((data) => {
      if (data.resultCode === 0) {
        dispatch(setUserStatus(status));
      }
    });
  };
};
