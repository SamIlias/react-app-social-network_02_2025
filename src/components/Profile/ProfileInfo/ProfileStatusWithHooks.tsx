import { ChangeEvent, useEffect, useState } from "react";
import s from "../Profile.module.css";

type PropsType = {
  status: string;
  updateUserStatus: (status: string, token: string | null) => void;
  token: string | null;
};

const ProfileStatusWithHooks: React.FC<PropsType> = ({
  status,
  updateUserStatus,
  token,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [curStatus, setStatus] = useState<string>(status || "");
  useEffect(() => {
    setStatus(status);
  }, [status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    updateUserStatus(curStatus, token);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div className={s.profileStatus}>
      {editMode ? (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={curStatus}
          />
        </div>
      ) : (
        <div>
          <span onDoubleClick={activateEditMode}>{status}</span>
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
