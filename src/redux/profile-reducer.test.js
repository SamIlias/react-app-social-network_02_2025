import profileReducer, { addPost, deletePost } from "./profile-reducer";

const state = {
  posts: [
    { id: 1, text: "Here is my first post!" },
    { id: 2, text: "Yo! It is cool!" },
  ],
};

test("length of posts should be increased", () => {
  const action = addPost("Hi my dear friend");
  expect(profileReducer(state, action).posts.length).toBe(3);
});

test("message should be correct", () => {
  const action = addPost("Hi my dear friend");
  const newState = profileReducer(state, action);
  expect(newState.posts[2].text).toBe("Hi my dear friend");
});

test("after deleting length of posts should be decremented", () => {
  const action = deletePost(1);
  const newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(1);
});
