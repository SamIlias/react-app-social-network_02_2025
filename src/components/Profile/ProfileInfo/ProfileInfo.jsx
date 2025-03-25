import s from "../Profile.module.css";
import Preloader from "../../common/Preloader";
// import ProfileStatus from "./ProfileStatus";
import userPhoto from "../../../assets/images/userPhoto.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div className={s.profileInfo}>
      <div className={s.description}>
        <div className={s.name}>
          <span>{props.profile.fullName}</span>
        </div>

        <div className={s.avatar}>
          {props.profile.photos.large ? (
            <img src={props.profile.photos.large} alt="" />
          ) : (
            <img src={userPhoto} alt="" />
          )}
        </div>

        <div className={s.userDescription}>
          {props.profile.aboutMe ? (
            <span>{`About: ${props.profile.aboutMe}`}</span>
          ) : (
            <span>Nothing about</span>
          )}
        </div>
        <ProfileStatusWithHooks
          status={props.status}
          updateUserStatus={props.updateUserStatus}
          token={props.token}
        />

        <hr />
      </div>
    </div>
  );
};

export default ProfileInfo;
