import Messages from "./Messages";
import {
  DialogType,
  DispatchActionsType,
  MessageType,
  actions,
} from "../../redux/messages-reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { reset } from "redux-form";
import { AppStateType } from "../../redux/redux-store";

type OwnPropsType = {};

type MapStatePropsType = {
  dialogsList: Array<DialogType>;
  messagesList: Array<MessageType>;
};

type MapDispatchPropsType = {
  sendMessage: (newMessageText: string, form: string) => void;
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    dialogsList: state.messagesPage.dialogsList,
    messagesList: state.messagesPage.messagesList,
  };
};

const mapDispatchToProps = (
  dispatch: DispatchActionsType,
): MapDispatchPropsType => {
  return {
    sendMessage: (newMessageText, form) => {
      const action = actions.sendMessage(newMessageText);
      dispatch(action);
      dispatch(reset(form) as any);
    },
  };
};

export default compose(
  withAuthRedirect,
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Messages);
