import React from "react";
import Profile from "./Profile";
import {
  getUserProfileThunkCreator,
  getUserStatusTC,
  updateUserStatusTC,
  saveProfilePhoto,
  saveProfile,
} from "../../redux/profile-reducer";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

const ProfileContainer = (props) => {
  const { userId } = useParams(); // Get userId from URL

  useEffect(() => {
    let id = userId || props.authorisedUserId;
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

const mapStateToProps = (state) => {
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
  connect(mapStateToProps, {
    getUserProfileThunkCreator,
    getUserStatusTC,
    updateUserStatusTC,
    saveProfilePhoto,
    saveProfile,
  }),
)(ProfileContainer);
