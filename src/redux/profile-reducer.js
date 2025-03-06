const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

export const addPostAC = () => ({ type: ADD_POST });
export const updateNewPostAC = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  text: text,
});

const generateId = (seed) => {
  return seed.length + 1;
};

const initialState = {
  newPostText: "",
  posts: [
    { id: 1, text: "Here is my first post!" },
    { id: 2, text: "Yo! It is cool!" },
  ],
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
      state.posts.push(newPost);
      state.newPostText = "";
      return state;
    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.text;
      return state;
    default:
      return state;
  }
};

export default profileReducer;
