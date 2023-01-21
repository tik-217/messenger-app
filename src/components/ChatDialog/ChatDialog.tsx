// react
import React, { useState, useEffect, useRef } from "react";

// types
import { ChatContent } from "../../types";

// redux
import { useAppSelector } from "../../store/store";
import { currentUserSelectors, userListSelectors } from "../../store/selectors";

// utils
import { messageTimeView } from "../../services/services";

// auth
import { useAuth0 } from "@auth0/auth0-react";

// socket.io
import { socket } from "../../services/context-socket-io";

export default function ChatDialog({ dialogIdData }: { dialogIdData: number }) {
  const [inputMessage, setInputMessage] = useState("");
  const [confirmRequest, setConfirmRequest] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<ChatContent>>([]);

  const { user } = useAuth0();

  const userList = useAppSelector(userListSelectors);
  const currentUser = useAppSelector(currentUserSelectors);

  const messgagesList = useRef<null | HTMLUListElement>(null);

  function scrollToBottom() {
    messgagesList.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  function cancelingDefaultAction(e: React.KeyboardEvent<HTMLFormElement>) {
    e.preventDefault();

    // clear input after sending
    const input = e.target as HTMLInputElement;
    input.value = "";

    setConfirmRequest(true);
  }

  useEffect(() => scrollToBottom(), [chatHistory]);

  useEffect(() => {
    if (confirmRequest === false) return;

    const chatContentData = {
      user_id: currentUser.id,
      chat_id: dialogIdData,
      content: inputMessage,
    };

    socket.emit("createChatContent", chatContentData);

    setConfirmRequest(false);
    // eslint-disable-next-line
  }, [confirmRequest]);

  useEffect(() => {
    const getDialogData = async () => {
      if (dialogIdData === undefined || dialogIdData === null) return;

      socket.emit("findChatContent");

      socket.on("findChatContent", (socket) => {
        setChatHistory(socket);
      });
    };
    getDialogData();
  }, [dialogIdData]);

  socket.on("createChatContent", (socket) => {
    setChatHistory(socket);
  });

  return (
    <>
      <div className="chat-history">
        <ul className="m-b-0" ref={messgagesList}>
          {chatHistory &&
            chatHistory.map((el: ChatContent) => (
              <React.Fragment key={el.id}>
                {el.user_id !== userList[0].id ? (
                  <li className="clearfix">
                    <div className="message-data text-right">
                      <span className="message-data-time">
                        {messageTimeView(el.createdAt)}
                      </span>
                      <img src={user?.picture} alt="avatar" />
                    </div>
                    <div className="message other-message float-right">
                      {el.content}
                    </div>
                  </li>
                ) : (
                  <li className="clearfix">
                    <div className="message-data">
                      <span className="message-data-time">
                        {messageTimeView(el.createdAt)}
                      </span>
                    </div>
                    <div className="message my-message">{el.content}</div>
                  </li>
                )}
              </React.Fragment>
            ))}
        </ul>
      </div>
      <div className="chat-message clearfix">
        <form
          className="input-group mb-0"
          onKeyDown={(e) => e.code === "Enter" && cancelingDefaultAction(e)}
        >
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-send"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Enter text here..."
            onChange={(e) => setInputMessage(e.target.value)}
          />
        </form>
      </div>
    </>
  );
}
