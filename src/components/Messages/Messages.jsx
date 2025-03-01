import React from "react";
import style from "./Messages.module.css";
import DialogsItem from "./DialogsItem/DialogsItem";
import MessagesItem from "./MessagesItem/MessagesItem";

const Messages = ({ data }) => {
  const dialogsItems = data.dialogsData.map((d) => (
    <DialogsItem id={d.id} name={d.name} />
  ));

  const messagesItems = data.messagesData.map((messageData) => (
    <MessagesItem itemData={messageData} />
  ));

  const newMessageElement = React.createRef();
  const addMessage = () => {
    const messageText = newMessageElement.current.value;
    alert(messageText);
  };

  return (
    <div className={style.mainContent}>
      <div className={style.dialogsItems}>{dialogsItems}</div>
      <div>
        <div className={style.messages}>{messagesItems}</div>
        <div>
          <textarea
            className={style.textarea}
            ref={newMessageElement}
          ></textarea>
        </div>
        <div>
          <button className={style.button} onClick={addMessage}>
            Send message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
