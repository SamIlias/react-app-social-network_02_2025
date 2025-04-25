import usersReducer, { InitialState, actions } from "./users-reducer";

let state: InitialState;

beforeEach(() => {
  state = {
    usersList: [
      {
        id: 0,
        name: "Sam",
        status: "hey",
        photos: { small: null, large: null },
        followed: false,
      },

      {
        id: 1,
        name: "Sam2",
        status: "hey2",
        photos: { small: null, large: null },
        followed: false,
      },

      {
        id: 2,
        name: "Sam3",
        status: "hey3",
        photos: { small: null, large: null },
        followed: true,
      },
    ],
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: true,
    subscribingInProgress: [],
    filter: {
      term: "",
      friend: null,
    },
  };
});

describe("reducer should return correct state", () => {
  test("follow success", () => {
    const newState = usersReducer(state, actions.subscribeSuccess(1));
    expect(newState.usersList[1].followed).toBeTruthy();
    expect(newState.usersList[0].followed).toBeFalsy();
  });

  test("follow unsuccess", () => {
    const newState = usersReducer(state, actions.unsubscribeSuccess(2));
    expect(newState.usersList[2].followed).toBeFalsy();
  });
});
