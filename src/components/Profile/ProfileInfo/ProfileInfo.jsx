import s from "../Profile.module.css";

const ProfileInfo = () => {
  return (
    <div className={s.profileInfo}>
      <img
        className={s.mainWallpaper}
        src="https://static.vecteezy.com/system/resources/thumbnails/023/790/661/small_2x/beautiful-lake-under-the-mountains-ai-generated-photo.jpg"
        alt=""
      />
      <div>ava + descriptions</div>
    </div>
  );
};

export default ProfileInfo;
