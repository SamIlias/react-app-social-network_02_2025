import React from "react";
import userPhoto from "../../assets/images/userPhoto.png";
import styles from "./Users.module.css";
import { NavLink } from "react-router-dom";

const Users = (props) => {
  // const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  const pagesCount = 10;
  const pages = [];

  for (let i = 1; i <= pagesCount; i += 1) {
    pages.push(i);
  }

  return (
    <div className={styles.content}>
      <div className={styles.pageNumbers}>
        {pages.map((p) => {
          return (
            <span
              className={props.currentPage === p ? styles.selectedPage : ""}
              onClick={() => {
                props.onChangePageNumber(p);
              }}
            >
              {p}
            </span>
          );
        })}
      </div>

      {props.usersList.map((u) => (
        <div className={styles.usersItem}>
          <div className={styles.userPhoto}>
            <NavLink to={`/profile/${u.id}`}>
              <img
                src={u.photos.small ? u.photos.small : userPhoto}
                className={styles.userPhoto}
                alt=""
              />
            </NavLink>
          </div>

          <div>
            {u.followed ? (
              <button
                disabled={props.subscribingInProgress.some((id) => id === u.id)}
                onClick={() => {
                  props.unsubscribe(u.id);
                }}
                className={styles.subscribeButton}
              >
                Unsubscribe
              </button>
            ) : (
              <button
                disabled={props.subscribingInProgress.some((id) => id === u.id)}
                onClick={() => {
                  props.subscribe(u.id);
                }}
                className={styles.subscribeButton}
              >
                Subscribe
              </button>
            )}
          </div>

          <div className={styles.userInfo}>
            <div className={styles.userName}>{u.name}</div>
            <div className={styles.userStatus}>
              {u.status ? u.status : "Status not specified"}
            </div>
            <div className={styles.userLocation}>"u.location"</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
