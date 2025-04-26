import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatPage.module.css";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { ChatMessageType } from "../../redux/chat-reducer";

export const Messages: React.FC = () => {
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
      ))}
      <div ref={messagesAnchorRef}></div>
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
