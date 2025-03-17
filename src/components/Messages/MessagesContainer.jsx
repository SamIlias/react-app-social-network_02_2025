import Messages from "./Messages";
import {
  sendMessageActionCreator,
  updateNewMessageTextActionCreator,
} from "../../redux/messages-reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

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

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, mapDispatchToProps),
)(Messages);
