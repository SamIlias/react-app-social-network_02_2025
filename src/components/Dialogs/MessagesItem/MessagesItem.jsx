import style from "../Dialogs.module.css";

const MessagesItem = (props) => {
  return <div className={`${style.message}`}>{props.message}</div>;
};

export default MessagesItem;
