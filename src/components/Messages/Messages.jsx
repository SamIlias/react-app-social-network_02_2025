import style from "./Messages.module.css";
import DialogsItem from "./DialogsItem/DialogsItem";
import MessagesItem from "./MessagesItem/MessagesItem";
import { Field, reduxForm, reset } from "redux-form";
import { maxLengthValidatorCreator, requared } from "../../utils/validators.js";
import { Textarea } from "../common/FormControl/FormControl.js";

const ADD_MESSAGE_FORM = "addMessageForm";
const maxLength15 = maxLengthValidatorCreator(15);

const Messages = ({ dialogsList, messagesList, sendMessage }) => {
  const dialogsItems = dialogsList.map((d) => (
    <DialogsItem key={d.id} id={d.id} name={d.name} />
  ));

  const messagesItems = messagesList.map((messageData) => (
    <MessagesItem key={messageData.id} itemData={messageData} />
  ));

  const onSubmit = (values) => {
    sendMessage(values.newMessageText, ADD_MESSAGE_FORM);
  };

  return (
    <div className={style.mainContent}>
      <div className={style.dialogsItems}>{dialogsItems}</div>
      <div>
        <div className={style.messages}>{messagesItems}</div>
        <AddMessageReduxForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

const AddMessageForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
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

const AddMessageReduxForm = reduxForm({ form: ADD_MESSAGE_FORM })(
  AddMessageForm,
);

export default Messages;
