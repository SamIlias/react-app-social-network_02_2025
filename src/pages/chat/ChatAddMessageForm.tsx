import { useState } from "react";
import { AppStateType } from "../../redux/redux-store";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { sendMessage } from "../../redux/chat-reducer";
import { AnyAction } from "redux";

export const AddMessageForm: React.FC = () => {
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
