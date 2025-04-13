import style from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { ProfileType } from "../../redux/profile-reducer";

type PropsType = {
  profile: ProfileType;
  status: string;
  token: string | null;
  updateUserStatus: (status: string, token: string | null) => void;
  isOwner: boolean;
  savePhoto: (profilePhoto: File, token: string | null) => void;
  saveProfile: (
    profile: ProfileType,
    token: string | null,
    callbackSuccess: () => void,
  ) => void;
};

const Profile: React.FC<PropsType> = ({
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
