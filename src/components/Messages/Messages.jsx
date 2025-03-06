import React from "react";
import style from "./Messages.module.css";
import DialogsItem from "./DialogsItem/DialogsItem";
import MessagesItem from "./MessagesItem/MessagesItem";

const Messages = (props) => {
  const dialogsItems = props.dialogsList.map((d) => (
    <DialogsItem id={d.id} name={d.name} />
  ));

  const messagesItems = props.messagesList.map((messageData) => (
    <MessagesItem itemData={messageData} />
  ));

  const newMessageElement = React.createRef();

  const sendMessage = () => {
    props.sendMessage();
  };

  const onChangeMessage = (e) => {
    const messageText = e.target.value;
    props.updateNewMessageText(messageText);
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
            onChange={onChangeMessage}
            value={props.newMessageText}
            placeholder="Write your message here..."
          ></textarea>
        </div>
        <div>
          <button className={style.button} onClick={sendMessage}>
            Send message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
