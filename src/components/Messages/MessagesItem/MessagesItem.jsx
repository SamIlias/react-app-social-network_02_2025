import style from "../Messages.module.css";

const MessagesItem = (props) => {
  return (
    <div className={`${style.message}`}>
      <img src={`${props.itemData.image}`} alt="ava" />
      {props.itemData.message}
    </div>
  );
};

export default MessagesItem;
