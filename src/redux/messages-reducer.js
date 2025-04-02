import blueCircle from "../assets/images/blueCircle.png";
import messageAvaOrange from "../assets/images/messageAvaOrange.png";

const SEND_MESSAGE = "samurai/messages/SEND-MESSAGE";

const initialState = {
  dialogsList: [
    { id: 1, name: "Sam" },
    { id: 2, name: "Andrew" },
    { id: 3, name: "Nastya" },
    { id: 4, name: "Victor" },
    { id: 5, name: "Bro" },
  ],
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

const generateID = (seed) => seed.length + 1;

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      if (!action.newMessageText) {
        return state;
      }
      const newMessage = {
        id: generateID(state.messagesList),
        message: action.newMessageText,
        image: messageAvaOrange,
      };
      return {
        ...state,
        messagesList: [...state.messagesList, newMessage],
      };
    default:
      return state;
  }
};

export default messagesReducer;

// action creators ---------------------------------------------
export const sendMessageActionCreator = (newMessageText) => ({
  type: SEND_MESSAGE,
  newMessageText: newMessageText,
});
