import React from "react";
import Profile from "./Profile";
import {
  addPost,
  updateNewPostText,
  setUserProfile,
} from "../../redux/profile-reducer";
// import { withRouter } from "";
import axios from "axios";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const profileURL = "https://social-network.samuraijs.com/api/1.0/profile/";

// class ProfileContainer extends React.Component {
//   componentDidMount() {
//     // let userId = this.props.match.params.userId;
//     let userId = 12;
//     if (!userId) {
//       userId = 1;
//     }
//     axios
//       .get(`${profileURL}${userId}`) //todo handle user id
//       .then((response) => {
//         this.props.setUserProfile(response.data);
//       });
//   }
//
//   render() {
//     return <Profile {...this.props} profile={this.props.profile} />;
//   }
// }
const ProfileContainer = ({ profile, setUserProfile, ...props }) => {
  const { userId } = useParams(); // Get userId from URL

  useEffect(() => {
    let id = userId || 1; // Default to 1 if no userId
    axios.get(`${profileURL}${id}`).then((response) => {
      setUserProfile(response.data);
    });
  }, [userId, setUserProfile]);

  return <Profile {...props} profile={profile} />;
};

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
  };
};

// const WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
  addPost,
  updateNewPostText,
  setUserProfile,
})(ProfileContainer);
