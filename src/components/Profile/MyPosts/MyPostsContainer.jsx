import MyPosts from "./MyPosts";
import { addPostAC, updateNewPostAC } from "../../../redux/profile-reducer";

const MyPostsContainer = (props) => {
  //props.store
  const addPost = () => {
    const action = addPostAC();
    props.store.dispatch(action);
  };

  const updateNewPost = (text) => {
    const action = updateNewPostAC(text);
    props.store.dispatch(action);
  };

  return (
    <MyPosts
      updateNewPost={updateNewPost}
      addPost={addPost}
      posts={props.store.getState().profilePage.posts}
      newPostText={props.store.getState().profilePage.newPostText}
    />
  );
};

export default MyPostsContainer;
