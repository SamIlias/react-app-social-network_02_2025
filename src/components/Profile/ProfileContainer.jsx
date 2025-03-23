import React from "react";
import Profile from "./Profile";
import {
  getUserProfileThunkCreator,
  getUserStatusTC,
  updateUserStatusTC,
} from "../../redux/profile-reducer";
// import { passAuthorization } from "../../redux/auth-reducer";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { compose } from "redux";

const ProfileContainer = (props) => {
  const { userId } = useParams(); // Get userId from URL

  useEffect(() => {
    let id = userId || props.authorisedUserId || 2;
    // if (!id) {
    //   props.passAuthorization();
    //   id = props.authorisedUserId;
    // }
    props.getUserProfileThunkCreator(id);
    props.getUserStatusTC(id);
  }, [userId]);

  return <Profile {...props} />;
};

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status || "Status not specified",
    authorisedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  };
};

export default compose(
  connect(mapStateToProps, {
    getUserProfileThunkCreator,
    getUserStatusTC,
    updateUserStatusTC,
    // passAuthorization,
  }),
)(ProfileContainer);
