// react
import React, { useEffect, useState } from "react";

// auth
import { useAuth0 } from "@auth0/auth0-react";

// components
import ChatDialog from "../ChatDialog/ChatDialog";

// redux
import { useAppSelector } from "../../store/store";
import {
  currentUserSelectors,
  dialogIdSelectors,
  idCurrCompanSelecltor,
} from "../../store/selectors";

// socket.io
import { socket } from "../../services/context-socket-io";

// services
import CreateTime from "../CreateTime/CreateTime";

export default function Chat() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const currentUserData = useAppSelector(currentUserSelectors);
  const dialogId = useAppSelector(dialogIdSelectors);

  useEffect(() => {
    if (!currentUserData) return;

    const sessionDate = {
      session: true,
    };

    const sessionNull = {
      session: false,
    };

    window.addEventListener("focus", () => {
      socket.emit("updateUsers", currentUserData.id, sessionNull);
    });

    window.addEventListener("blur", () => {
      socket.emit("updateUsers", currentUserData.id, sessionDate);
    });
  }, [currentUserData]);

  return (
    <div className="chat">
      {!dialogId ? (
        <div className="chat-initial">
          {isAuthenticated === true ? (
            <div className="">
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Log Out
              </button>
            </div>
          ) : (
            <button onClick={() => loginWithRedirect()}>Log In</button>
          )}
          <hr />
          <div className="chat-initial_section-background">
            <div className="clearfix">
              {isAuthenticated === false ? (
                <h3>Register to start using the chat</h3>
              ) : (
                <h3>Hi! Choose a companion or find him</h3>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="chat-header clearfix">
            <div className="">
              <div className="col-lg-6">
                <img src={currentUserData.picture ?? "/"} alt="avatar" />
                <div className="chat-about">
                  <h6 className="m-b-0">{currentUserData.name}</h6>
                  <small>
                    <CreateTime
                      timeString={
                        currentUserData.session === false
                          ? String(currentUserData.updatedAt)
                          : false
                      }
                    />
                  </small>
                </div>
              </div>
              <div className="col-lg-6 hidden-sm text-right">
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
          <ChatDialog />
        </>
      )}
    </div>
  );
}
