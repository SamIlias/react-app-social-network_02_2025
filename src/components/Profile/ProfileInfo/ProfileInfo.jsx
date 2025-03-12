import s from "../Profile.module.css";
import Preloader from "../../common/Preloader";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div className={s.profileInfo}>
      <img
        className={s.mainWallpaper}
        src="https://static.vecteezy.com/system/resources/thumbnails/023/790/661/small_2x/beautiful-lake-under-the-mountains-ai-generated-photo.jpg"
        alt=""
      />
      <div className={s.description}>
        <div className={s.name}>
          <span>Full name: {props.profile.fullName}</span>
        </div>

        <div className={s.avatar}>
          <img src={props.profile.photos.large} alt="" />
        </div>
        <div className={s.userDescription}>
          <span>{`About: ${props.profile.aboutMe}`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
