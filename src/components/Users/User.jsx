import { NavLink } from "react-router-dom";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/userPhoto.png";

const User = ({
  user,
  subscribingInProgress,
  unsubscribe,
  subscribe,
  token,
}) => {
  return (
    <div className={styles.usersItem}>
      <div className={styles.userPhoto}>
        <NavLink to={`/profile/${user.id}`}>
          <img
            src={user.photos.small ? user.photos.small : userPhoto}
            className={styles.userPhoto}
            alt=""
          />
        </NavLink>
      </div>

      <div>
        {user.followed ? (
          <button
            disabled={subscribingInProgress.some((id) => id === user.id)}
            onClick={() => {
              unsubscribe(user.id, token);
            }}
            className={styles.subscribeButton}
          >
            Unsubscribe
          </button>
        ) : (
          <button
            disabled={subscribingInProgress.some((id) => id === user.id)}
            onClick={() => {
              subscribe(user.id, token);
            }}
            className={styles.subscribeButton}
          >
            Subscribe
          </button>
        )}
      </div>

      <div className={styles.userInfo}>
        <div className={styles.userName}>{user.name}</div>
        <div className={styles.userStatus}>
          {user.status ? user.status : "Status not specified"}
        </div>
        <div className={styles.userLocation}>"user.location"</div>
      </div>
    </div>
  );
};

export default User;
