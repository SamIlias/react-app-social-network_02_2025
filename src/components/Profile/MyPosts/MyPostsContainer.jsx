import MyPosts from "./MyPosts";
import { addPost } from "../../../redux/profile-reducer";
import { connect } from "react-redux";
import { reset } from "redux-form";

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostText, form) => {
      const action = addPost(newPostText);
      dispatch(action);
      dispatch(reset(form));
    },
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
