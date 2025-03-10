import blueCircle from "../assets/images/blueCircle.png";
import messageAvaOrange from "../assets/images/messageAvaOrange.png";

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
      id: 1,
      message: "Hello, my friend!",
      image: messageAvaOrange,
    },
    {
      id: 2,
      message: "Look at this!",
      image: blueCircle,
    },
    {
      id: 3,
      message: "What in the world you doing!",
      image: blueCircle,
    },
  ],
};

const setID = (seed) => seed.length + 1;

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      return {
        ...state,
        newMessageText: action.text,
      };
    case SEND_MESSAGE:
      if (!state.newMessageText) {
        return state;
      }
      const newMessage = {
        id: setID(state.messagesList),
        message: state.newMessageText,
        image: messageAvaOrange,
      };
      return {
        ...state,
        messagesList: [...state.messagesList, newMessage],
        newMessageText: "",
      };
    default:
      return state;
  }
};

export default messagesReducer;
