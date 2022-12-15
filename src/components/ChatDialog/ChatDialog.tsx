// react
import React, { useState, useEffect } from "react";

// axios
import axios from "axios";

// types
import { ChatContent, ChatDialogReduxState } from "../../../types";

// redux
import { connect } from "react-redux";

function ChatDialog({
  dialogId,
  currentUserId,
  getChatContent
}: {
  dialogId: number;
    currentUserId: number;
    getChatContent: (chat: Array<ChatContent>) => void;
}) {
  const [inputMessage, setInputMessage] = useState("");
  const [confirmRequest, setConfirmRequest] = useState(false);
  const [chatContent, setChatContent] = useState<Array<ChatContent>>([]);

  function cancelingDefaultAction(e: React.KeyboardEvent<HTMLFormElement>) {
    e.preventDefault();
    setConfirmRequest(true);
  }

  useEffect(() => {
    if (chatContent.length !== 0) {
      getChatContent(chatContent);
    }
  }, [chatContent]);

  useEffect(() => {
    const sendingMessage = async () => {
      if (confirmRequest === false) return;

      // api для отправки сообщения содержащее id отправителя и chatId беседы
      await axios({
        method: "post",
        url: "http://localhost:3001/chat-content",
        params: {
          user_id: currentUserId,
          chat_id: dialogId,
          content: inputMessage,
        },
      })
        .then((res) => setChatContent(res.data[0]))
        .catch((err) => console.log(err));

      setConfirmRequest(false);
    };
    sendingMessage();
  }, [confirmRequest]);

  return (
    <>
      <div className="chat-history">
        <ul className="m-b-0">
          {/* <li className="clearfix">
            <div className="message-data text-right">
              <span className="message-data-time">10:10 AM, Today</span>
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="avatar"
              />
            </div>
            <div className="message other-message float-right">
              Hi Aiden, how are you? How is the project coming along?
            </div>
          </li>
          <li className="clearfix">
            <div className="message-data">
              <span className="message-data-time">10:12 AM, Today</span>
            </div>
            <div className="message my-message">Are we meeting today?</div>
          </li>
          <li className="clearfix">
            <div className="message-data">
              <span className="message-data-time">10:15 AM, Today</span>
            </div>
            <div className="message my-message">
              Project has been already finished and I have results to show you.
            </div>
          </li> */}
          <li>
            <div className="message other-message float-right">
              
            </div>
          </li>
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

function mapStateToProps(state: ChatDialogReduxState) {
  return {
    currentUserId: state.currentUserId.currentUserId,
  };
}

export default connect(mapStateToProps)(ChatDialog);
