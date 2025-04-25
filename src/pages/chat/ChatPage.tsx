import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ChatMessageType,
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from "../../redux/chat-reducer";
import { AnyAction } from "redux";
import { AppStateType } from "../../redux/redux-store";
import { ThunkDispatch } from "redux-thunk";

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />{" "}
    </div>
  );
};

const Chat: React.FC = () => {
  const status = useSelector((state: AppStateType) => state.chat.status);

  type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>;
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      {status === "error" ? (
        <div>Some error occured. Please refresh the page</div>
      ) : (
        <>
          <Messages />
          <AddMessageForm />
        </>
      )}
    </div>
  );
};

const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight,
      ) < 300
    ) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAutoScroll]);

  return (
    <div style={{ height: "600px", overflow: "auto" }} onScroll={scrollHandler}>
      {messages.map((m) => (
        <Message key={m.id} message={m} />
      ))}{" "}
      <div ref={messagesAnchorRef}></div>
    </div>
  );
};

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState("");

  const status = useSelector((state: AppStateType) => state.chat.status);

  type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>;
  const dispatch: AppDispatch = useDispatch();

  const sendMessageHandler = () => {
    if (!message) return;
    dispatch(sendMessage(message));
    setMessage("");
  };

  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        ></textarea>{" "}
      </div>
      <div>
        <button disabled={status !== "ready"} onClick={sendMessageHandler}>
          Send
        </button>{" "}
      </div>
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageType }> = React.memo(
  ({ message }) => {
    return (
      <div className={styles.message}>
        <img src={message.photo} alt="ava" /> <b>{message.userName}</b>
        <br />
        {message.message}
      </div>
    );
  },
);

export default ChatPage;
