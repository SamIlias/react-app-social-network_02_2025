import { ChatMessageType } from "../redux/chat-reducer";

let subscribers = {
  "message-received": [] as MessageReceivedSubscriberType[],
  "status-changed": [] as StatusChangedSubscriberType[],
};

let ws: WSType;

const closeHandler = () => {
  notifySubscribersAboutStatus("pending");
  setTimeout(createChannel, 3000);
};

const openHandler = () => {
  notifySubscribersAboutStatus("ready");
};

const errorHandler = () => {
  notifySubscribersAboutStatus("error");
  console.log("REFRESH PAGE");
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers["message-received"].forEach((s) => s(newMessages));
};

function cleanUp() {
  ws?.removeEventListener("close", closeHandler);
  ws?.removeEventListener("message", messageHandler);
  ws?.removeEventListener("open", openHandler);
  ws?.removeEventListener("error", errorHandler);
  ws?.close();
}

function notifySubscribersAboutStatus(status: StatusType) {
  subscribers["status-changed"].forEach((s) => s(status));
}

export function createChannel() {
  cleanUp();
  ws = new WebSocket(
    `wss://social-network.samuraijs.com/handlers/ChatHandler.ashx`,
  );
  notifySubscribersAboutStatus("pending");
  ws.addEventListener("close", closeHandler);
  ws.addEventListener("message", messageHandler);
  ws.addEventListener("open", openHandler);
  ws.addEventListener("error", errorHandler);
}

export const chatAPI = {
  start: () => {
    createChannel();
  },

  stop: () => {
    subscribers["message-received"] = [];
    subscribers["status-changed"] = [];
    cleanUp();
  },

  subscribe: (
    eventName: EventNamesType,
    callback: MessageReceivedSubscriberType | StatusChangedSubscriberType,
  ) => {
    //@ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      //@ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(
        (s) => s !== callback,
      );
    };
  },

  unsubscribe: (
    eventName: EventNamesType,
    callback: MessageReceivedSubscriberType | StatusChangedSubscriberType,
  ) => {
    //@ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(
      (s) => s !== callback,
    );
  },

  send: (message: string) => {
    ws?.send(message);
  },
};

export type MessageReceivedSubscriberType = (
  messages: ChatMessageType[],
) => void;
export type StatusChangedSubscriberType = (status: StatusType) => void;

export type ChatMessageApiType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

type WSType = WebSocket | null;
type EventNamesType = "message-received" | "status-changed";
export type StatusType = "pending" | "ready" | "error";
