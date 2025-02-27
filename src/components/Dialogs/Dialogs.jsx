import style from "./Dialogs.module.css";
import DialogsItem from "./DialogsItem/DialogsItem";
import MessagesItem from "./MessagesItem/MessagesItem";

const Dialogs = ({ data }) => {
  const dialogsItems = data.dialogsData.map((d) => (
    <DialogsItem id={d.id} name={d.name} />
  ));

  const messagesItems = data.messagesData.map((m) => (
    <MessagesItem message={m.message} />
  ));

  return (
    <div className={style.mainContent}>
      <div className={style.dialogsItems}>{dialogsItems}</div>
      <div className={`${style.messages}`}>{messagesItems}</div>
    </div>
  );
};

export default Dialogs;
