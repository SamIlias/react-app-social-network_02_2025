import { Dispatch } from "redux";
import {
  chatAPI,
  ChatMessageApiType,
  MessageReceivedSubscriberType,
  StatusChangedSubscriberType,
  StatusType,
} from "../api/chat-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import _ from "lodash";

const LENGTH_OF_CHAT_LIST = 100;
const MESSAGE_RECEIVED = "samurai/chat/MESSAGE_RECEIVED";
const STATUS_CHANGED = "samurai/chat/STATUS_CHANGED";
const initialState = {
  messages: [] as ChatMessageType[],
  status: "pending" as StatusType,
};

export const chatReducer = (
  state = initialState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case MESSAGE_RECEIVED:
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.messages.map((m) => ({ ...m, id: _.uniqueId() })),
        ].filter((m, ind, array) => ind >= array.length - LENGTH_OF_CHAT_LIST),
      };

    case STATUS_CHANGED:
      return {
        ...state,
        status: action.payload.status,
      };

    default:
      return state;
  }
};

export const actions = {
  messageReceived: (messages: ChatMessageType[]) =>
    ({
      type: MESSAGE_RECEIVED,
      payload: { messages },
    }) as const,

  statusChanged: (status: StatusType) =>
    ({
      type: STATUS_CHANGED,
      payload: { status },
    }) as const,
};

let _newMessageHandler: MessageReceivedSubscriberType | null = null;

const getMessagesHandler = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages: ChatMessageType[]) => {
      dispatch(actions.messageReceived(messages));
    };
  }

  return _newMessageHandler;
};

let _statusChangedHandler: StatusChangedSubscriberType | null = null;

const getStatusChangedHandler = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status: StatusType) => {
      dispatch(actions.statusChanged(status));
    };
  }

  return _statusChangedHandler;
};
export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe("message-received", getMessagesHandler(dispatch));
  chatAPI.subscribe("status-changed", getStatusChangedHandler(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe("message-received", getMessagesHandler(dispatch));
  chatAPI.unsubscribe("status-changed", getStatusChangedHandler(dispatch));
  chatAPI.stop();
};

export const sendMessage =
  (message: string): ThunkType =>
  async (dispatch) => {
    chatAPI.send(message);
  };

export default chatReducer;

// types ----------------------------------------------
export type InitialState = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>;
// type DispatchActionsType = Dispatch<ActionTypes>;
export type ThunkType = BaseThunkType<ActionTypes>;
export type ChatMessageType = ChatMessageApiType & { id: string };
