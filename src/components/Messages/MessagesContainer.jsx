import Messages from "./Messages";
import {
  sendMessageActionCreator,
  updateNewMessageTextActionCreator,
} from "../../redux/messages-reducer";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    dialogsList: state.messagesPage.dialogsList,
    messagesList: state.messagesPage.messagesList,
    newMessageText: state.messagesPage.newMessageText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (text) => {
      const action = sendMessageActionCreator(text);
      dispatch(action);
    },

    updateNewMessageText: (text) => {
      const action = updateNewMessageTextActionCreator(text);
      dispatch(action);
    },
  };
};

const MessagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Messages);

export default MessagesContainer;
