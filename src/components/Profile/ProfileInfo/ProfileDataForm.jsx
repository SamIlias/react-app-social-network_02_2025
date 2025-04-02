import { reduxForm } from "redux-form";
import errorStyle from "../../common/FormControl/FormControl.module.css";
import s from "../Profile.module.css";
import { createField, Input } from "../../common/FormControl/FormControl";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/userPhoto.png";
import { requared } from "../../../utils/validators";

export const ProfileDataForm = ({
  profile,
  status,
  token,
  updateUserStatus,
  isOwner,
  handleSubmit,
  onPhotoSelected,
  error,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {error && <div className={errorStyle.formSummaryError}>{error}</div>}

      <div className={s.description}>
        <div>
          <button className={s.saveChanges} type="submit">
            Save changes
          </button>
        </div>

        <div className={s.userDescription}>
          <span>Fullname: </span>
          <span>
            {createField(
              s.formField,
              "fullName",
              "Full name",
              Input,
              [requared],
              {},
              null,
            )}
          </span>
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
          <span>About Me:</span>
          <span>
            {createField(
              s.formField,
              "aboutMe",
              "About",
              Input,
              [requared],
              {},
              null,
            )}
          </span>
        </div>

        <div className={s.userDescription}>
          <span> Looking for a job: </span>
          <span>
            {createField(
              s.formField,
              "lookingForAJob",
              "Looking for a job",
              Input,
              [requared],
              {},
              null,
            )}
          </span>
        </div>

        <div className={s.userDescription}>
          <span>My professionals skills:</span>
          <span>
            {createField(
              s.formField,
              "lookingForAJobDescription",
              "My professional skills",
              Input,
              [requared],
              {},
              null,
            )}
          </span>
        </div>

        <div className={s.userDescription}>
          <span>Contacts:</span>
          {Object.keys(profile.contacts).map((key) => {
            return (
              <div key={key}>
                {key}:
                {createField(
                  s.formField,
                  "contacts." + key,
                  key,
                  Input,
                  [],
                  {},
                  null,
                )}
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
};

const ProfileDataReduxForm = reduxForm({
  form: "edit-profile",
})(ProfileDataForm);

export default ProfileDataReduxForm;
