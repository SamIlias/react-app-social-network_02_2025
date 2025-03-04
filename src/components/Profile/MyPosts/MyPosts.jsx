import s from "./MyPosts.module.css";
import Post from "./Post/Post.jsx";
import React from "react";
import {
  addPostActionCreator,
  updateNewPostActionCreator,
} from "../../../redux/profile-reducer";

const MyPosts = (props) => {
  const newPostElement = React.createRef();

  const addPost = () => {
    props.dispatch(addPostActionCreator());
  };

  const onChangeNewPost = (e) => {
    const text = e.target.value;
    props.dispatch(updateNewPostActionCreator(text));
  };

  const posts = props.posts.map((post) => <Post postText={post.text} />);

  return (
    <div className={s.posts}>
      <h2>My posts</h2>{" "}
      <textarea
        className={s.textarea}
        ref={newPostElement}
        onChange={onChangeNewPost}
        value={props.newPostText}
        placeholder="Write your post here..."
      />
      <button className={s.button} onClick={addPost}>
        Add post
      </button>
      {posts}
    </div>
  );
};

export default MyPosts;
