import React from "react";
import styles from "./Users.module.css";
import Pagination from "../common/Pagination";
import User from "./User";
import { UserType } from "../../redux/users-reducer";

type PropsType = {
  totalUsersCount: number;
  currentPage: number;
  onChangePageNumber: (pageNumber: number) => void;
  pageSize?: number;
  portionSize?: number;
  usersList: Array<UserType>;
  subscribingInProgress: Array<number>;
  unsubscribe: (userId: number, token: string | null) => void;
  subscribe: (userId: number, token: string | null) => void;
  token: string | null;
};

const Users: React.FC<PropsType> = ({
  totalUsersCount,
  currentPage,
  onChangePageNumber,
  pageSize,
  portionSize,
  usersList,
  subscribingInProgress,
  unsubscribe,
  subscribe,
  token,
}) => {
  return (
    <div className={styles.content}>
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
            unsubscribe={unsubscribe}
            subscribe={subscribe}
            token={token}
          />
        </div>
      ))}
    </div>
  );
};

export default Users;
