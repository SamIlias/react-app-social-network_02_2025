import blueCircle from "../assets/blueCircle.png";
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

const initialState = {
  dialogsList: [
    { id: 1, name: "Sam" },
    { id: 2, name: "Andrew" },
    { id: 3, name: "Nastya" },
    { id: 4, name: "Victor" },
    { id: 5, name: "Bro" },
  ],
  newMessageText: "",
  messagesList: [
    {
      message: "Hello, my friend!",
      image: messageAvaOrange,
    },
    {
      message: "Look at this!",
      image: blueCircle,
    },
    {
      message: "What in the world you doing!",
      image: blueCircle,
    },
  ],
};

const messagesReducer = (state = initialState, action) => {
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
      state.messagesList.push(newMessage);
      state.newMessageText = "";
      return state;
    default:
      return state;
  }
};

export default messagesReducer;
