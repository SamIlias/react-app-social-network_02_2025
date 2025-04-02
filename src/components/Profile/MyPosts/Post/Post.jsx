import s from "./Post.module.css";

const Post = ({ postText }) => {
  return (
    <div className={s.item}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDl6bQlvEFpaiRXfXAYDF9wkS8MulY4IrqkA&s" //todo
        alt=""
      />
      <span>{postText}</span>
    </div>
  );
};

export default Post;
