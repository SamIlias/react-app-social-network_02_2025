import s from "./MyPosts.module.css";
import Post from "./Post/Post.jsx";

const MyPosts = () => {
  return (
    <div className={s.posts}>
      My posts
      <textarea className={s.textArea}></textarea>
      <button className={s.button}>Send</button>
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default MyPosts;
