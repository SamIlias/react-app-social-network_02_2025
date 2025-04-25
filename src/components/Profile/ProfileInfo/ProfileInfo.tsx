import Preloader from "../../common/Preloader";
import { useState } from "react";
import ProfileDataReduxForm from "./ProfileDataForm";
import ProfileData from "./ProfileData";
import { ContactsType, ProfileType } from "../../../redux/profile-reducer";

const ProfileInfo: React.FC<PropsType> = ({
  profile,
  status,
  token,
  updateUserStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  const onPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      savePhoto(e.target.files[0], token);
    }
  };

  const onSubmit = (formData: FormDataType) => {
    const newProfileData = { ...profile, ...formData };
    saveProfile(newProfileData, token, () => {
      setEditMode(false);
    });
  };

  return (
    <div>
      {editMode ? (
        <ProfileDataReduxForm
          profile={profile}
          status={status}
          token={token}
          isOwner={isOwner}
          updateUserStatus={updateUserStatus}
          onSubmit={onSubmit}
          onPhotoSelected={onPhotoSelected}
          initialValues={{
            fullName: profile.fullName || "",
            aboutMe: profile.aboutMe || "",
            lookingForAJob: profile.lookingForAJob ?? false,
            lookingForAJobDescription: profile.lookingForAJobDescription || "",
            contacts: profile.contacts || {},
          }}
        />
      ) : (
        <ProfileData
          profile={profile}
          status={status}
          token={token}
          updateUserStatus={updateUserStatus}
          isOwner={isOwner}
          goToEditMode={() => setEditMode(true)}
          onPhotoSelected={onPhotoSelected}
        />
      )}
    </div>
  );
};

export default ProfileInfo;

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

type FormDataType = {
  fullName: string;
  aboutMe?: string;
  lookingForAJob: boolean;
  lookingForAJobDescription?: string | null;
  contacts: ContactsType;
};
