import React from "react";
import Profile from "./Profile";
import {
  addPost,
  updateNewPostText,
  setUserProfileThunkCreator,
} from "../../redux/profile-reducer";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

const ProfileContainer = ({
  profile,
  setUserProfileThunkCreator,
  ...props
}) => {
  const { userId } = useParams(); // Get userId from URL

  useEffect(() => {
    let id = userId || 32241;
    setUserProfileThunkCreator(id);
  }, [userId, setUserProfileThunkCreator]);

  return <Profile {...props} profile={profile} />;
};

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
  };
};

export default withAuthRedirect(
  connect(mapStateToProps, {
    addPost,
    updateNewPostText,
    setUserProfileThunkCreator,
  })(ProfileContainer),
);
