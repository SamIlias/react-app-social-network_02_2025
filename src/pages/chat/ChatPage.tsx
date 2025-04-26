import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startMessagesListening,
  stopMessagesListening,
} from "../../redux/chat-reducer";
import { AnyAction } from "redux";
import { AppStateType } from "../../redux/redux-store";
import { ThunkDispatch } from "redux-thunk";
import { Messages } from "./ChatMessages";
import { AddMessageForm } from "./ChatAddMessageForm";

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
  }, [dispatch]);

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

export default ChatPage;
