import s from "./Post.module.css";

type PropsType = {
  postText: string;
};

const Post: React.FC<PropsType> = ({ postText }) => {
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
