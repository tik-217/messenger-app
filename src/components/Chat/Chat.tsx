// react
import { Dispatch, useEffect, useState } from "react";

// auth
import { useAuth0 } from "@auth0/auth0-react";

// components
import ChatDialog from "../ChatDialog/ChatDialog";

// redux
import { connect } from "react-redux";

// types
import { ChatReduxState, DialogIdType, UserResponse } from "../../types";
import { socket } from "../../services/context-socket-io";
import { createTime } from "../../services/services";
import creatorIdCurrentCompanion from "../../store/creators/creatorIdCurrentCompanion";
import creatorUsersList from "../../store/creators/creatorUsersList";

function Chat({
  dialogId,
  currentUser,
  idCurrentCompanion,
}: {
  dialogId: number;
  currentUser: UserResponse;
    idCurrentCompanion: string;
  }) {
  const [companionData, setCompanionData] = useState<Array<UserResponse>>([]);
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  /*
    Creating a user based on the information received from the registration form.

    The user must be registered and the user variable must not be empty.
  */
  useEffect(() => {
    if (!isAuthenticated && user && Object.keys(user).length !== 0) return;

    socket.emit("createUsers", user && { ...user, session: false });

    socket.on("respCreatedUser", (socket) => console.log(socket));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const date = new Date().toISOString();

    const sessionDate = {
      session: true,
    };

    const sessionNull = {
      session: false,
    };

    window.addEventListener("focus", () => {
      console.log("online");
      socket.emit("updateUsers", currentUser.id, sessionNull);
    });

    window.addEventListener("blur", () => {
      console.log("offline");
      socket.emit("updateUsers", currentUser.id, sessionDate);
    });
  }, [currentUser]);

  useEffect(() => {
    if (!idCurrentCompanion) return;

    socket.emit("findUsers", Number(idCurrentCompanion));

    socket.on("respFoundUsers", (foundUsers) => {
      setCompanionData(foundUsers);
    });
  }, [idCurrentCompanion]);

  return (
    <>
      <div className="chat">
        {dialogId === undefined ? (
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
                  <img src={companionData.length !== 0 ? companionData[0].picture : "/"} alt="avatar" />
                  <div className="chat-about">
                    <h6 className="m-b-0">{companionData.length !== 0 && companionData[0].name}</h6>
                    <small>{createTime(companionData.length !== 0 ? companionData[0].updatedAt : "")}</small>
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
            <ChatDialog dialogId={dialogId} />
          </>
        )}
      </div>
    </>
  );
}

function mapStateToProps(state: ChatReduxState) {
  return {
    dialogId: state.dialogId.dialogId,
    currentUser: state.currentUser.currentUser,
    idCurrentCompanion: state.idCurrentCompanion.idCurrentCompanion,
  };
}

function mapDispatchToProps(dispatch: Dispatch<DialogIdType>) {
  return {
    sendIdCurrentCompanion: (idCurrentCompanion: number) =>
      dispatch(creatorIdCurrentCompanion(idCurrentCompanion)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);