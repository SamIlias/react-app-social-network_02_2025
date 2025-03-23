import React from "react";
import style from "./Messages.module.css";
import DialogsItem from "./DialogsItem/DialogsItem";
import MessagesItem from "./MessagesItem/MessagesItem";
import { Field, reduxForm } from "redux-form";
import {
  maxLengthValidatorCrerator,
  requared,
} from "../../utils/validators.js";
import { Textarea } from "../common/FormControl/FormControl.js";

const maxLength15 = maxLengthValidatorCrerator(15);

const Messages = (props) => {
  const dialogsItems = props.dialogsList.map((d) => (
    <DialogsItem key={d.id} id={d.id} name={d.name} />
  ));

  const messagesItems = props.messagesList.map((messageData) => (
    <MessagesItem key={messageData.id} itemData={messageData} />
  ));

  const sendMessage = (values) => {
    props.sendMessage(values.newMessageText);
  };

  return (
    <div className={style.mainContent}>
      <div className={style.dialogsItems}>{dialogsItems}</div>
      <div>
        <div className={style.messages}>{messagesItems}</div>
        <AddMessageReduxForm onSubmit={sendMessage} />
      </div>
    </div>
  );
};

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          className={style.textarea}
          component={Textarea}
          validate={[requared, maxLength15]}
          name="newMessageText"
          placeholder="Write your message here..."
        />
      </div>
      <div>
        <button className={style.button}>Send message</button>
      </div>
    </form>
  );
};

const AddMessageReduxForm = reduxForm({ form: "addMessage" })(AddMessageForm);

export default Messages;
