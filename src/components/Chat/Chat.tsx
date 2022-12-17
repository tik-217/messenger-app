// react
import { useEffect } from "react";

// axios
import axios from "axios";

// auth
import { useAuth0 } from "@auth0/auth0-react";

// components
import ChatDialog from "../ChatDialog/ChatDialog";

// redux
import { connect } from "react-redux";

// types
import { ChatReduxState, UserResponse } from "../../../types";

function Chat({
  dialogId,
  companionData,
}: {
  dialogId: number;
  companionData: Array<UserResponse>;
}) {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

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
      }
    };
    createUser();
  }, []);

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
                  <img
                    src={companionData[0].picture}
                    alt="avatar"
                  />
                  <div className="chat-about">
                    <h6 className="m-b-0">{companionData[0].name}</h6>
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
    companionData: state.companionData.companionData,
  };
}

export default connect(mapStateToProps)(Chat);