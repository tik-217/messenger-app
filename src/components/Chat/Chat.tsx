// react
import React, { useState, useEffect } from "react";

// axios
import axios from "axios";

// auth
import { useAuth0 } from "@auth0/auth0-react";

// redux
import { connect } from "react-redux";
import ChatDialog from "../ChatDialog/ChatDialog";

// types
import { ChatContent, ChatReduxState } from "../../../types";

function Chat({ dialogId }: { dialogId: number }) {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  const [chatContent, setChatContent] = useState<Array<ChatContent>>([]);

  /*
    Creating a user based on the information received from the registration form.

    The user must be registered and the user variable must not be empty.
  */
  useEffect(() => {
    const createUser = async () => {
      if (isAuthenticated && user && Object.keys(user).length !== 0) {
        await axios({
          method: "post",
          url: "http://localhost:3001/users",
          params: user,
        }).then((res) => console.log(res.data));
        console.log("Отправлен POST запрос");
      }
    };
    createUser();
  }, []);

  useEffect(() => {
    const getDialogData = async () => {
      if (dialogId === undefined || dialogId === null) return;
      await axios({
        method: "get",
        url: "http://localhost:3001/chat-content",
        params: {dialogId: dialogId},
      }).then((res) => console.log(res.data)
      );
      console.log("Полуена информация выбранного чата");
    };
    getDialogData();
  }, [dialogId])

  function getChatContent(chat: Array<ChatContent>) {
    setChatContent(chat);
  }

  return (
    <div className="chat">
      <div className="chat-header clearfix">
        <div className="row">
          <div className="col-lg-6">
            <a href="/" data-toggle="modal" data-target="#view_info">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar2.png"
                alt="avatar"
              />
            </a>
            <div className="chat-about">
              <h6 className="m-b-0">Aiden Chavez</h6>
              <small>Last seen: 2 hours ago</small>
            </div>
          </div>
          <div className="col-lg-6 hidden-sm text-right">
            <a href="/" className="btn btn-outline-secondary">
              <i className="fa fa-camera"></i>
            </a>
            <a href="/" className="btn btn-outline-primary">
              <i className="fa fa-image"></i>
            </a>
            <a href="/" className="btn btn-outline-info">
              <i className="fa fa-cogs"></i>
            </a>
            <a href="/" className="btn btn-outline-warning">
              <i className="fa fa-question"></i>
            </a>
            {isAuthenticated ? (
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Log Out
              </button>
            ) : (
              <button onClick={() => loginWithRedirect()}>Log In</button>
            )}
          </div>
        </div>
      </div>
      <ChatDialog dialogId={dialogId} getChatContent={getChatContent} />
    </div>
  );
}

function mapStateToProps(state: ChatReduxState) {
  return {
    dialogId: state.dialogId.dialogId,
  };
}

export default connect(mapStateToProps)(Chat);
