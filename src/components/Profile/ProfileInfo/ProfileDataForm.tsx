import { InjectedFormProps, reduxForm } from "redux-form";
import errorStyle from "../../common/FormControl/FormControl.module.css";
import s from "../Profile.module.css";
import { createField, Input } from "../../common/FormControl/FormControl";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/userPhoto.png";
import { required } from "../../../utils/validators";
import { ContactsType, ProfileType } from "../../../redux/profile-reducer";

type FormValuesType = {
  fullName: string;
  aboutMe?: string;
  lookingForAJob: boolean;
  lookingForAJobDescription?: string | null;
  contacts: ContactsType;
};

type OwnProps = {
  profile: ProfileType;
  status: string;
  token: string | null;
  isOwner: boolean;
  updateUserStatus: (status: string, token: string | null) => void;
  onPhotoSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type FormValuesTypeKeys = Extract<keyof FormValuesType, string>;

export const ProfileDataForm: React.FC<
  InjectedFormProps<FormValuesType, OwnProps> & OwnProps
> = ({
  profile,
  status,
  token,
  isOwner,
  updateUserStatus,
  onPhotoSelected,
  handleSubmit,
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
              {createField<FormValuesTypeKeys>(
                s.formField,
                "fullName",
                "Full name",
                Input,
                [required],
                {},
                undefined,
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
              {createField<FormValuesTypeKeys>(
                s.formField,
                "aboutMe",
                "About",
                Input,
                [required],
                {},
                undefined,
              )}
            </span>
          </div>

          <div className={s.userDescription}>
            <span> Looking for a job: </span>
            <span>
              {createField<FormValuesTypeKeys>(
                s.formField,
                "lookingForAJob",
                "Looking for a job",
                Input,
                [required],
                {},
                undefined,
              )}
            </span>
          </div>

          <div className={s.userDescription}>
            <span>My professionals skills:</span>
            <span>
              {createField<FormValuesTypeKeys>(
                s.formField,
                "lookingForAJobDescription",
                "My professional skills",
                Input,
                [required],
                {},
                undefined,
              )}
            </span>
          </div>

          <div className={s.userDescription}>
            <span>Contacts:</span>
            {Object.keys(profile.contacts).map((key) => {
              const contactKey = key as keyof ContactsType;
              return (
                <div key={key}>
                  {key}:
                  {createField(
                    s.formField,
                    `contacts. ${contactKey}`,
                    key,
                    Input,
                    [],
                    {},
                    undefined,
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </form>
    );
  };

const ProfileDataReduxForm = reduxForm<FormValuesType, OwnProps>({
  form: "edit-profile",
})(ProfileDataForm);

export default ProfileDataReduxForm;
