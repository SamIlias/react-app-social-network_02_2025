import style from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts.jsx";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = () => {
  return (
    <div className={style.mainContent}>
      <ProfileInfo />
      <MyPosts />
    </div>
  );
};

export default Profile;
