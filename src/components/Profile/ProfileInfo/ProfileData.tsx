import s from "../Profile.module.css";
import userPhoto from "../../../assets/images/userPhoto.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import { ProfileType } from "../../../redux/profile-reducer";
import { ChangeEventHandler } from "react";

type ContactPropsType = {
  blockStyle: string | undefined;
  valueStyle: string | undefined;
  contactTitle: string;
  contactValue: string | null;
};

export const Contact: React.FC<ContactPropsType> = ({
  blockStyle,
  valueStyle,
  contactTitle,
  contactValue,
}) => {
  return (
    <div className={blockStyle}>
      <>{contactTitle}: </>
      <span className={valueStyle}>{contactValue ? contactValue : "none"}</span>
    </div>
  );
};

type ProfileDataPropsType = {
  profile: ProfileType;
  status: string;
  token: string | null;
  updateUserStatus: (status: string, token: string | null) => void;
  isOwner: boolean;
  goToEditMode: () => void;
  onPhotoSelected: ChangeEventHandler<HTMLInputElement>;
};

const ProfileData: React.FC<ProfileDataPropsType> = ({
  profile,
  status,
  token,
  updateUserStatus,
  isOwner,
  goToEditMode,
  onPhotoSelected,
}) => {
  return (
    <div className={s.description}>
      <div>
        <span className={s.name}>{profile.fullName}</span>
        {isOwner && (
          <span>
            <button className={s.editProfile} onClick={goToEditMode}>
              Edit profile
            </button>
          </span>
        )}
      </div>

      <ProfileStatusWithHooks
        status={status}
        updateUserStatus={updateUserStatus}
        token={token}
      />

      <div className={s.avatar}>
        {profile.photos && profile.photos.large ? (
          <img src={profile.photos.large} alt="" />
        ) : (
          <img src={userPhoto} alt="" />
        )}
        {isOwner && <input type={"file"} onChange={onPhotoSelected} />}
      </div>

      <div className={s.userDescription}>
        About:
        <span> {profile.aboutMe ? profile.aboutMe : "Nothing about"}</span>
      </div>

      <div className={s.userDescription}>
        Looking for a job:
        <span> {profile.lookingForAJob ? "Yes" : "No"}</span>
      </div>

      {profile.lookingForAJob && (
        <div className={s.userDescription}>
          My professionals skills:
          <span> {profile.lookingForAJobDescription}</span>
        </div>
      )}

      <div className={s.userDescription}>
        Contacts:
        <div className={s.contacts}>
          {Object.keys(profile.contacts).map((key: string) => (
            <Contact
              key={key}
              blockStyle={s.userDescription}
              valueStyle={undefined}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
