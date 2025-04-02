import Messages from "./Messages";
import { sendMessageActionCreator } from "../../redux/messages-reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { reset } from "redux-form";

const mapStateToProps = (state) => {
  return {
    dialogsList: state.messagesPage.dialogsList,
    messagesList: state.messagesPage.messagesList,
    newMessageText: state.messagesPage.newMessageText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageText, form) => {
      const action = sendMessageActionCreator(newMessageText);
      dispatch(action);
      dispatch(reset(form));
    },
  };
};

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, mapDispatchToProps),
)(Messages);
