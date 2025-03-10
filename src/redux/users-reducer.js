const SUBSCRIBE = "SUBSCRIBE";
const UNSUBSCRIBE = "UNSUBSCRIBE";
const SET_USERS = "SET_USERS";

const initialState = {
  usersList: [
    // {
    //   id: 1,
    //   photoURL: "",
    //   followed: false,
    //   fullname: "Yra",
    //   status: "I am a boss",
    //   location: { city: "Molo", country: "Belarus" },
    // },
    // {
    //   id: 2,
    //   photoURL: "",
    //   followed: true,
    //   fullname: "Sam",
    //   status: "I am a boss too",
    //   location: { city: "Minsk", country: "Belarus" },
    // },
  ],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE:
      return {
        ...state,
        usersList: state.usersList.map((u) => {
          if (u.id === action.userID) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };

    case UNSUBSCRIBE:
      return {
        ...state,
        usersList: state.usersList.map((u) => {
          if (u.id === action.userID) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };

    case SET_USERS:
      return {
        ...state,
        usersList: [...state.usersList, ...action.usersList],
      };

    default:
      return state;
  }
};

export const subscribeAC = (userID) => ({ type: SUBSCRIBE, userID });
export const unsubscribeAC = (userID) => ({ type: UNSUBSCRIBE, userID });
export const setUsersAC = (usersList) => ({ type: SET_USERS, usersList });

export default usersReducer;
