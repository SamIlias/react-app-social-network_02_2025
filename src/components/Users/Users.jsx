import React from "react";
import styles from "./Users.module.css";
import Pagination from "../common/Pagination";
import User from "./User";

const Users = ({
  totalUsersCount,
  currentPage,
  onChangePageNumber,
  pageSize,
  portionSize,
  user,
  subscribingInProgress,
  unsubscribe,
  subscribe,
  token,
  ...props
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

      {props.usersList.map((u) => (
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
