import messageAvaOrange from "../assets/messageAvaOrange.png";
const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

export const sendMessageActionCreator = (text) => ({
  type: SEND_MESSAGE,
  text: text,
});
export const updateNewMessageTextActionCreator = (text) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  text: text,
});

const messagesReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      state.newMessageText = action.text;
      return state;
    case SEND_MESSAGE:
      if (!state.newMessageText) {
        return;
      }
      const newMessage = {
        message: state.newMessageText,
        image: messageAvaOrange,
      };
      state.messagesData.push(newMessage);
      state.newMessageText = "";
      return state;
    default:
      return state;
  }
};

export default messagesReducer;
