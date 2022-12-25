// react
import { Dispatch, useEffect, useState } from "react";

// auth
import { useAuth0 } from "@auth0/auth0-react";

// components
import ChatDialog from "../ChatDialog/ChatDialog";

// redux
// import { connect } from "react-redux";

// types
import { UserResponse } from "../../types";

// socket.io
import { socket } from "../../services/context-socket-io";

// services
import { createTime } from "../../services/services";
import { useAppDispatch, useAppSelector } from "../../store/store";

export default function Chat() {
  const [companionData, setCompanionData] = useState<Array<UserResponse>>([]);

  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  const userListStore: any = useAppSelector();
  const dispatch = useAppDispatch();

  const currentUserData = userListStore.currentUser;
  const usersListData = userListStore.usersList;
  const idCurrentCompanionData = userListStore.idCurrentCompanion;
  const dialogIdData = userListStore.dialogId;

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

  useEffect(() => {
    if (!idCurrentCompanionData) return;

    socket.emit("findUsers", Number(idCurrentCompanionData));

    socket.on("respFoundUsers", (foundUsers) => {
      setCompanionData(foundUsers);
    });
  }, [idCurrentCompanionData]);

  return (
    <>
      <div className="chat">
        {!dialogIdData ? (
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
              <div className="row">
                <div className="col-lg-6">
                  <img
                    src={
                      companionData.length !== 0
                        ? companionData[0].picture
                        : "/"
                    }
                    alt="avatar"
                  />
                  <div className="chat-about">
                    <h6 className="m-b-0">
                      {companionData.length !== 0 && companionData[0].name}
                    </h6>
                    <small>
                      {createTime(
                        companionData.length !== 0
                          ? companionData[0].updatedAt
                          : ""
                      )}
                    </small>
                  </div>
                </div>
                <div className="col-lg-6 hidden-sm text-right">
                  {/* <a href="/" className="btn btn-outline-secondary">
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
                  </a> */}
                  {isAuthenticated ? (
                    <button
                      onClick={() =>
                        logout({ returnTo: window.location.origin })
                      }
                    >
                      Log Out
                    </button>
                  ) : (
                    <button onClick={() => loginWithRedirect()}>Log In</button>
                  )}
                </div>
              </div>
            </div>
            <ChatDialog dialogIdData={dialogIdData} />
          </>
        )}
      </div>
    </>
  );
}
