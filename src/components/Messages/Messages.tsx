import style from "./Messages.module.css";
import DialogsItem from "./DialogsItem/DialogsItem";
import MessagesItem from "./MessagesItem/MessagesItem";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthValidatorCreator, required } from "../../utils/validators";
import { Textarea } from "../common/FormControl/FormControl";
import { DialogType, MessageType } from "../../redux/messages-reducer";

const ADD_MESSAGE_FORM = "addMessageForm";
const maxLength15 = maxLengthValidatorCreator(15);

// types ---------------------------------------------------
type PropsType = {
  dialogsList: Array<DialogType>;
  messagesList: Array<MessageType>;
  sendMessage: (newMessageText: string, form: string) => void;
};

type MessageFormValuesType = {
  newMessageText: string;
};

type OwnProps = {};

// messages component --------------------------------------
const Messages: React.FC<PropsType> = ({
  dialogsList,
  messagesList,
  sendMessage,
}) => {
  const dialogsItems = dialogsList.map((d) => (
    <DialogsItem key={d.id} id={d.id} name={d.name} />
  ));

  const messagesItems = messagesList.map((messageData) => (
    <MessagesItem key={messageData.id} itemData={messageData} />
  ));

  const onSubmit = (values: MessageFormValuesType) => {
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

const AddMessageForm: React.FC<
  InjectedFormProps<MessageFormValuesType & OwnProps> & OwnProps
> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          className={style.textarea}
          component={Textarea}
          validate={[required, maxLength15]}
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

const AddMessageReduxForm = reduxForm<MessageFormValuesType, OwnProps>({
  form: ADD_MESSAGE_FORM,
})(AddMessageForm);

export default Messages;
