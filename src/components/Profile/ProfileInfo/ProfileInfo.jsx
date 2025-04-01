import Preloader from "../../common/Preloader";
import { useState } from "react";
import ProfileDataReduxForm from "./ProfileDataForm";
import ProfileData from "./ProfileData";

const ProfileInfo = ({
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

  const onPhotoSelected = (e) => {
    savePhoto(e.target.files[0], token);
  };

  const onSubmit = (formData) => {
    saveProfile(formData, token, () => {
      setEditMode(false);
    });
  };

  return (
    <div>
      {editMode ? (
        <ProfileDataReduxForm
          initialValues={profile}
          profile={profile}
          status={status}
          token={token}
          updateUserStatus={updateUserStatus}
          isOwner={isOwner}
          onSubmit={onSubmit}
          onPhotoSelected={onPhotoSelected}
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
