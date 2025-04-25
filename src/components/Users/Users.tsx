import React, { useEffect } from "react";
import styles from "./Users.module.css";
import Pagination from "../common/Pagination";
import User from "./User";
import {
  actions,
  FilterType,
  requestUsers,
  subscribe,
  unsubscribe,
} from "../../redux/users-reducer";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentPage,
  getPageSize,
  getSubscribingInProgress,
  getToken,
  getTotalUsersCount,
  getUsersFilter,
  getUsersSuper,
} from "../../redux/users-selectors";
import { ThunkDispatch } from "redux-thunk";
import { AppStateType } from "../../redux/redux-store";
import { AnyAction } from "redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchForm } from "./UsersSearchForm";

type PropsType = {
  portionSize?: number;
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const Users: React.FC<PropsType> = ({ portionSize }) => {
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const usersList = useSelector(getUsersSuper);
  const subscribingInProgress = useSelector(getSubscribingInProgress);
  const token = useSelector(getToken);

  type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>;
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const query = useQuery();

  useEffect(() => {
    let actualPage = currentPage;
    let actualFilter = filter;

    const queryPage = query.get("page");
    const queryTerm = query.get("term");
    const queryFriend = query.get("friend");

    if (!!queryPage) actualPage = Number(queryPage);
    if (!!queryTerm) {
      actualFilter = { ...actualFilter, term: query.get("term") };
    }
    switch (queryFriend) {
      case "null":
        actualFilter = { ...actualFilter, friend: null };
        break;
      case "true":
        actualFilter = { ...actualFilter, friend: true };
        break;
      case "false":
        actualFilter = { ...actualFilter, friend: false };
        break;
    }

    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    navigate(
      `?page=${currentPage}&count=${pageSize}${filter.term ? `&term=${filter.term}` : ""}${filter.friend === null ? "" : `&friend=${filter.friend}`}`,
    );
  }, [filter, currentPage, pageSize, navigate]);

  const onChangePageNumber = (pageNumber: number) => {
    if (currentPage === pageNumber) {
      return;
    }
    dispatch(actions.setCurrentPage(pageNumber));
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };

  const onFilterChanged = (filter: FilterType) => {
    //todo onFilterChange must go to 1 page
    dispatch(requestUsers(1, pageSize, filter));
  };

  const subscribeTo = (userId: number, token: string | null) => {
    dispatch(subscribe(userId, token));
  };

  const unsubscribeFrom = (userId: number, token: string | null) => {
    dispatch(unsubscribe(userId, token));
  };

  return (
    <div className={styles.content}>
      <SearchForm onFilterChanged={onFilterChanged} />
      <Pagination
        totalItemsCount={totalUsersCount}
        currentPage={currentPage}
        onChangePageNumber={onChangePageNumber}
        pageSize={pageSize}
        portionSize={portionSize}
      />

      {usersList.map((u) => (
        <div key={u.id}>
          <User
            user={u}
            subscribingInProgress={subscribingInProgress}
            unsubscribe={unsubscribeFrom}
            subscribe={subscribeTo}
            token={token}
          />
        </div>
      ))}
    </div>
  );
};
