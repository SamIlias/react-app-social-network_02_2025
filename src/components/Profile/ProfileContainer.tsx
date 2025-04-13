import React from "react";
import Profile from "./Profile";
import {
  getUserProfileThunkCreator,
  getUserStatusTC,
  updateUserStatusTC,
  saveProfilePhoto,
  saveProfile,
  ProfileType,
} from "../../redux/profile-reducer";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { AppStateType } from "../../redux/redux-store";

const ProfileContainer: React.FC<PropsType> = (props) => {
  const { userId } = useParams(); // Get userId from URL

  useEffect(() => {
    let id = Number(userId) || props.authorisedUserId;
    props.getUserProfileThunkCreator(id);
    props.getUserStatusTC(id);
  }, [userId, props.authorisedUserId]);

  return (
    <Profile
      isOwner={!userId}
      profile={props.profile}
      status={props.status}
      token={props.token}
      updateUserStatus={props.updateUserStatusTC}
      savePhoto={props.saveProfilePhoto}
      saveProfile={props.saveProfile}
    />
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status || "Status not specified",
    authorisedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    token: state.auth.token,
  };
};

export default compose(
  withAuthRedirect,
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    {
      getUserProfileThunkCreator,
      getUserStatusTC,
      updateUserStatusTC,
      saveProfilePhoto,
      saveProfile,
    },
  ),
)(ProfileContainer);

// types ------------------------------------------------------------------
type MapStatePropsType = {
  authorisedUserId: number | null;
  profile: ProfileType;
  status: string;
  token: string | null;
  // isAuth: boolean;
};

type MapDispatchPropsType = {
  updateUserStatusTC: (status: string, token: string | null) => void;
  getUserProfileThunkCreator: (id: number | null) => void;
  getUserStatusTC: (id: number | null) => void;
  saveProfilePhoto: (profilePhoto: File, token: string | null) => void;
  saveProfile: (
    profile: ProfileType,
    token: string | null,
    callbackSuccess: () => void,
  ) => void;
};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;
