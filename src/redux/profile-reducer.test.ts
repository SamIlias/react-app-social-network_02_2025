import profileReducer, { actions, ProfileType } from "./profile-reducer";

const state = {
  posts: [
    { id: 1, text: "Here is my first post!" },
    { id: 2, text: "Yo! It is cool!" },
  ],
  profile: {
    userId: null,
    lookingForAJob: null,
    lookingForAJobDescription: null,
    fullName: null,
    contacts: {},
    photos: null,
  } as ProfileType,
  status: "---------------",
};

test("length of posts should be increased", () => {
  const action = actions.addPost("Hi my dear friend");
  expect(profileReducer(state, action).posts.length).toBe(3);
});

test("message should be correct", () => {
  const action = actions.addPost("Hi my dear friend");
  const newState = profileReducer(state, action);
  expect(newState.posts[2].text).toBe("Hi my dear friend");
});

test("after deleting length of posts should be decremented", () => {
  const action = actions.deletePost(1);
  const newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(1);
});
