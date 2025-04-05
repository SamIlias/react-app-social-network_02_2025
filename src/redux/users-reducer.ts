import { usersAPI } from "../api/api";
import { PhotosType } from "./profile-reducer";

const SUBSCRIBE = "samurai/users/SUBSCRIBE";
const UNSUBSCRIBE = "samurai/users/UNSUBSCRIBE";
const SET_USERS = "samurai/users/SET_USERS";
const SET_CURRENT_PAGE = "samurai/users/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "samurai/users/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "samurai/users/TOGGLE_IS_FETCHING";
const TOGGLE_SUBSCRIBING_IN_PROGRESS =
  "samurai/users/TOGGLE_SUBSCRIBING_IN_PROGRESS";

export type UserType = {
  id: number;
  name: string;
  status: string | null;
  photos: PhotosType;
  followed: boolean;
};

const initialState = {
  usersList: [] as Array<UserType>,
  totalUsersCount: 0,
  pageSize: 5,
  currentPage: 1,
  isFetching: true,
  subscribingInProgress: [] as Array<number>, // array of users Ids
};

export type InitialState = typeof initialState;

const usersReducer = (state = initialState, action: any): InitialState => {
  switch (action.type) {
    case SUBSCRIBE:
      return {
        ...state,
        usersList: state.usersList.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };

    case UNSUBSCRIBE:
      return {
        ...state,
        usersList: state.usersList.map((u) => {
          if (u.id === action.userId) {
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

export default usersReducer;

//action creators ----------------------------------------------
// export ?????
type SubscribeSuccessAcionType = {
  type: typeof SUBSCRIBE;
  userId: number;
};

type UnsubscribeSuccessAcionType = {
  type: typeof UNSUBSCRIBE;
  userId: number;
};

type SetUsersAcionType = {
  type: typeof SET_USERS;
  usersList: Array<UserType>;
};

type SetCurrentPageAcionType = {
  type: typeof SET_CURRENT_PAGE;
  pageNum: number;
};

type SetTotalUsersCountAcionType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  count: number;
};

type ToggleIsFetchingAcionType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};

type ToggleSubscribingInProgressAcionType = {
  type: typeof TOGGLE_SUBSCRIBING_IN_PROGRESS;
  isFetching: boolean;
  userId: number;
};

export const subscribeSuccess = (
  userId: number,
): SubscribeSuccessAcionType => ({ type: SUBSCRIBE, userId });
export const unsubscribeSuccess = (
  userId: number,
): UnsubscribeSuccessAcionType => ({ type: UNSUBSCRIBE, userId });
export const setUsers = (usersList: Array<UserType>): SetUsersAcionType => ({
  type: SET_USERS,
  usersList,
});
export const setCurrentPage = (pageNum: number): SetCurrentPageAcionType => ({
  type: SET_CURRENT_PAGE,
  pageNum,
});
export const setTotalUsersCount = (
  count: number,
): SetTotalUsersCountAcionType => ({
  type: SET_TOTAL_USERS_COUNT,
  count,
});
export const toggleIsFetching = (
  isFetching: boolean,
): ToggleIsFetchingAcionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
export const toggleSubscribingInProgress = (
  isFetching: boolean,
  userId: number,
): ToggleSubscribingInProgressAcionType => ({
  type: TOGGLE_SUBSCRIBING_IN_PROGRESS,
  isFetching,
  userId,
});

// thunk creators -----------------------------------------------
export const requestUsers = (currentPage: number, pageSize?: number) => {
  return async (dispatch: any) => {
    dispatch(toggleIsFetching(true));

    const data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

const subscribeUnsubscribeFlow = async (
  dispatch: any,
  userId: number,
  apiMethod: (userId: number, token: string | null) => any,
  actionCreator: (userId: number) => void,
  token: string | null,
) => {
  dispatch(toggleSubscribingInProgress(true, userId));
  const data = await apiMethod(userId, token);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleSubscribingInProgress(false, userId));
};

export const unsubscribe = (userId: number, token: string | null) => {
  return (dispatch: any) => {
    subscribeUnsubscribeFlow(
      dispatch,
      userId,
      usersAPI.unsubscribeFromUser,
      unsubscribeSuccess,
      token,
    );
  };
};

export const subscribe = (userId: number, token: string | null) => {
  return (dispatch: any) => {
    subscribeUnsubscribeFlow(
      dispatch,
      userId,
      usersAPI.subscribeToUser,
      subscribeSuccess,
      token,
    );
  };
};
