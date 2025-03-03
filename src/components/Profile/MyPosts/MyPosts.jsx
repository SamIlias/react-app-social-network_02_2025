import s from "./MyPosts.module.css";
import Post from "./Post/Post.jsx";
import React from "react";

const MyPosts = (props) => {
  const newPostElement = React.createRef();

  const onButtonClickHandler = () => {
    props.addPost();
  };

  const onChangeNewPostHandler = () => {
    const text = newPostElement.current.value;
    props.updateNewPostText(text);
  };

  const clearArea = () => {
    props.updateNewPostText("");
  };

  const posts = props.posts.map((post) => <Post postText={post.text} />);

  return (
    <div className={s.posts}>
      <h2>My posts</h2>{" "}
      <textarea
        className={s.textarea}
        ref={newPostElement}
        onChange={onChangeNewPostHandler}
        onClick={clearArea}
        value={props.newPostText}
      />
      <button className={s.button} onClick={onButtonClickHandler}>
        Add post
      </button>
      {posts}
    </div>
  );
};

export default MyPosts;
