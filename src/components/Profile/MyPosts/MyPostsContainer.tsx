import MyPosts from "./MyPosts";
import {
  actions,
  DispatchActionsType,
  PostType,
} from "../../../redux/profile-reducer";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { reset } from "redux-form";

type OwnPropsType = {};

type MapStatePropsType = {
  posts: Array<PostType>;
};

type MapDispatchPropsType = {
  addPost: (newPostText: string, form: string) => void;
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    posts: state.profilePage.posts,
  };
};

const mapDispatchToProps = (
  dispatch: DispatchActionsType,
): MapDispatchPropsType => {
  return {
    addPost: (newPostText, form) => {
      const action = actions.addPost(newPostText);
      dispatch(action);
      // todo find appropriate type instead of any
      dispatch(reset(form) as any);
    },
  };
};

const MyPostsContainer = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  AppStateType
>(
  mapStateToProps,
  mapDispatchToProps,
)(MyPosts);

export default MyPostsContainer;
