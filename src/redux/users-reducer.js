import { usersAPI } from "../api/api";

const SUBSCRIBE = "SUBSCRIBE";
const UNSUBSCRIBE = "UNSUBSCRIBE";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_SUBSCRIBING_IN_PROGRESS = "TOGGLE_SUBSCRIBING_IN_PROGRESS";

const initialState = {
  usersList: [],
  totalUsersCount: 0,
  pageSize: 5,
  currentPage: 1,
  isFetching: true,
  subscribingInProgress: [],
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
        usersList: [...action.usersList],
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.pageNum,
      };

    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.count,
      };

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case TOGGLE_SUBSCRIBING_IN_PROGRESS:
      return {
        ...state,
        subscribingInProgress: action.isFetching
          ? [...state.subscribingInProgress, action.userId]
          : state.subscribingInProgress.filter((id) => id !== action.userId),
      };

    default:
      return state;
  }
};

export const subscribeSuccess = (userID) => ({ type: SUBSCRIBE, userID });
export const unsubscribeSuccess = (userID) => ({ type: UNSUBSCRIBE, userID });
export const setUsers = (usersList) => ({ type: SET_USERS, usersList });
export const setCurrentPage = (pageNum) => ({
  type: SET_CURRENT_PAGE,
  pageNum,
});
export const setTotalUsersCount = (count) => ({
  type: SET_TOTAL_USERS_COUNT,
  count,
});
export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
export const toggleSubscribingInProgress = (isFetching, userId) => ({
  type: TOGGLE_SUBSCRIBING_IN_PROGRESS,
  isFetching,
  userId,
});

//getUsersThunkCreator
export const requestUsers = (currentPage, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));

    const data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

const subscribeUnsubscribeFlow = async (
  dispatch,
  userId,
  apiMethod,
  actionCreator,
  token,
) => {
  dispatch(toggleSubscribingInProgress(true, userId));
  const data = await apiMethod(userId, token);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleSubscribingInProgress(false, userId));
};

export const unsubscribe = (userId, token) => {
  return async (dispatch) => {
    subscribeUnsubscribeFlow(
      dispatch,
      userId,
      usersAPI.unsubscribeFromUser,
      unsubscribeSuccess,
      token,
    );
  };
};

export const subscribe = (userId, token) => {
  return async (dispatch) => {
    subscribeUnsubscribeFlow(
      dispatch,
      userId,
      usersAPI.subscribeToUser,
      subscribeSuccess,
      token,
    );
  };
};

export default usersReducer;
