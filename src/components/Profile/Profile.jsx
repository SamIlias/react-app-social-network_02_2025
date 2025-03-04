import style from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts.jsx";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div className={style.mainContent}>
      <ProfileInfo />
      <MyPosts
        posts={props.data.posts}
        newPostText={props.data.newPostText}
        dispatch={props.dispatch}
      />
    </div>
  );
};

export default Profile;
