import s from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts.jsx";

const Profile = () => {
  return (
    <div className={s.mainContent}>
      <img
        className={s.mainWallpaper}
        src="https://static.vecteezy.com/system/resources/thumbnails/023/790/661/small_2x/beautiful-lake-under-the-mountains-ai-generated-photo.jpg"
        alt=""
      />
      <div>ava + descriptions</div>
      <MyPosts />
    </div>
  );
};

export default Profile;
