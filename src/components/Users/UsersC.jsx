import React from "react";
import axios from "axios";
import userPhoto from "../../assets/images/userPhoto.png";
import styles from "./Users.module.css";

const URL = "https://social-network.samuraijs.com/api/1.0/users";

const Users = (props) => {
  const getUsers = () => {
    if (props.usersList.length === 0) {
      axios.get(URL).then((response) => {
        props.setUsers(response.data.items);
      });
    }
  };

  return (
    <div>
      <button onClick={getUsers}>Get users</button>
      {props.usersList.map((u) => (
        <div className={styles.usersItem}>
          <div className={styles.userPhoto}>
            <img
              src={u.photos.small ? u.photos.small : userPhoto}
              className={styles.userPhoto}
              alt=""
            />
          </div>

          <div className={styles.subscribeButton}>
            {u.followed ? (
              <button
                onClick={() => {
                  props.unsubscribe();
                }}
              >
                Unsubscribe
              </button>
            ) : (
              <button
                onClick={() => {
                  props.subscribe();
                }}
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
