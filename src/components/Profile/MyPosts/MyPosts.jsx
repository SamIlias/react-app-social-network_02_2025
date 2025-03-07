import s from "./MyPosts.module.css";
import Post from "./Post/Post.jsx";
import React from "react";

const MyPosts = (props) => {
  const newPostElement = React.createRef();

  const onAddPost = () => {
    props.addPost();
  };

  const onPostTextChange = (e) => {
    const text = e.target.value;
    props.updateNewPostText(text);
  };

  const posts = props.posts.map((post) => <Post postText={post.text} />);

  return (
    <div className={s.posts}>
      <h2>My posts</h2>{" "}
      <textarea
        className={s.textarea}
        ref={newPostElement}
        onChange={onPostTextChange}
        value={props.newPostText}
        placeholder="Write your post here..."
      />
      <button className={s.button} onClick={onAddPost}>
        Add post
      </button>
      {posts}
    </div>
  );
};

export default MyPosts;
