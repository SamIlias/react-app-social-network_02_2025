// @ts-ignore
import blueCircle from "../assets/images/blueCircle.png";
// @ts-ignore
import messageAvaOrange from "../assets/images/messageAvaOrange.png";
import { InferActionsTypes } from "./redux-store";

const SEND_MESSAGE = "samurai/messages/SEND-MESSAGE";

const initialState = {
  dialogsList: [
    { id: 1, name: "Sam" },
    { id: 2, name: "Andrew" },
    { id: 3, name: "Nastya" },
    { id: 4, name: "Victor" },
    { id: 5, name: "Bro" },
  ] as Array<DialogType>,
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
  ] as Array<MessageType>,
};

const generateID = (seed: Array<any>) => seed.length + 1;

const messagesReducer = (
  state = initialState,
  action: ActionTypes,
): InitialStateType => {
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

export const actions = {
  sendMessage: (newMessageText: string) => ({
    type: SEND_MESSAGE,
    newMessageText: newMessageText,
  }),
};

// types ---------------------------
export type DialogType = {
  id: number;
  name: string;
};

export type MessageType = {
  id: number;
  message: string;
  image: string; // check type ????
};

export type InitialStateType = typeof initialState;

type ActionTypes = InferActionsTypes<typeof actions>;
