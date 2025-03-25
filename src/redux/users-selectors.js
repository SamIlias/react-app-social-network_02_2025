import { createSelector } from "reselect";

export const getUsers = (state) => {
  return state.usersPage.usersList;
};

export const getUsersSuper = createSelector(getUsers, (users) => {
  return users.filter((u) => true);
});

export const getTotalUsersCount = (state) => {
  return state.usersPage.totalUsersCount;
};

export const getPageSize = (state) => {
  return state.usersPage.pageSize;
};

export const getCurrentPage = (state) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state) => {
  return state.usersPage.isFetching;
};

export const getSubscribingInProgress = (state) => {
  return state.usersPage.subscribingInProgress;
};

export const getToken = (state) => {
  return state.auth.token;
};
