import s from "./MyPosts.module.css";
import Post from "./Post/Post.jsx";
import React from "react";

const MyPosts = (props) => {
  const newPostElement = React.createRef();

  const addPost = () => {
    const text = newPostElement.current.value;
    props.addPost(text);
  };

  const posts = props.posts.map((post) => <Post postText={post.text} />);
  return (
    <div className={s.posts}>
      <h2>My posts</h2>{" "}
      <textarea className={s.textarea} ref={newPostElement}></textarea>
      <button className={s.button} onClick={addPost}>
        Add post
      </button>
      {posts}
    </div>
  );
};

export default MyPosts;
