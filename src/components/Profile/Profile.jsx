import style from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts.jsx";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div className={style.mainContent}>
      <ProfileInfo />
      <MyPosts posts={props.data.posts} addPost={props.addPost} />
    </div>
  );
};

export default Profile;
