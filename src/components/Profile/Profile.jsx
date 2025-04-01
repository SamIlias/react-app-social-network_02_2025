import style from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = ({
  isOwner,
  profile,
  status,
  updateUserStatus,
  token,
  savePhoto,
  saveProfile,
}) => {
  return (
    <div className={style.mainContent}>
      <ProfileInfo
        isOwner={isOwner}
        profile={profile}
        status={status}
        updateUserStatus={updateUserStatus}
        token={token}
        savePhoto={savePhoto}
        saveProfile={saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
