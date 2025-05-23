import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";

export const getUsers = (state: AppStateType) => {
  return state.usersPage.usersList;
};

export const getUsersSuper = createSelector(getUsers, (users) => {
  return users.filter((u) => true);
});

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
};

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};

export const getSubscribingInProgress = (state: AppStateType) => {
  return state.usersPage.subscribingInProgress;
};

export const getToken = (state: AppStateType) => {
  return state.auth.token;
};

export const getUsersFilter = (state: AppStateType) => {
  return state.usersPage.filter;
};
