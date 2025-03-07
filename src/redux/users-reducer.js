const SUBSCRIBE = "SUBSCRIBE";
const UNSUBSCRIBE = "UNSUBSCRIBE";
const SET_USERS = "SET_USERS";

const initialState = {
  users: [
    {
      id: 1,
      photoURL: "",
      followed: false,
      fullname: "Yra",
      status: "I am a boss",
      location: { city: "Molo", country: "Belarus" },
    },
  ],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUBSCRIBE":
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userID) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };

    case "UNSUBSCRIBE":
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userID) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };

    case "SET_USERS":
      return {
        ...state,
        users: [...state.users, ...action.users],
      };

    default:
      return state;
  }
};

export const subscribeAC = (userID) => ({ type: SUBSCRIBE, userID });
export const unsubscribeAC = (userID) => ({ type: UNSUBSCRIBE, userID });
export const setUsersAC = (users) => ({ type: SET_USERS, users });

export default usersReducer;
