import Messages from "./Messages";
import {
  sendMessageActionCreator,
  updateNewMessageTextActionCreator,
} from "../../redux/messages-reducer";

const MessagesContainer = (props) => {
  const sendMessage = () => {
    props.store.dispatch(sendMessageActionCreator());
  };

  const updateNewMessageText = (text) => {
    props.store.dispatch(updateNewMessageTextActionCreator(text));
  };

  return (
    <Messages
      dialogsList={props.store.getState().messagesPage.dialogsList}
      messagesList={props.store.getState().messagesPage.messagesList}
      sendMessage={sendMessage}
      updateNewMessageText={updateNewMessageText}
      newMessageText={props.store.getState().messagesPage.newMessageText}
    />
  );
};

export default MessagesContainer;
