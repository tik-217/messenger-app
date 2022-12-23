// react
import { Dispatch, useEffect } from "react";

// components
import Chat from "./Chat/Chat";
import Sidebar from "./Sidebar/Sidebar";

// auth
import { useAuth0 } from "@auth0/auth0-react";

// types
import { DialogIdType, UserResponse } from "../types";

// socket.io
import { socket } from "../services/context-socket-io";

// redux
import { connect } from "react-redux";
import creatorCurrentUserId from "../store/creators/creatorCurrentUserId";
import creatorUsersList from "../store/creators/creatorUsersList";

// images
import loaderImage from "../assets/icons/Spinner-1s-200px.gif";

function App({
  sendCurrentUser,
  sendUsersList,
}: {
  sendCurrentUser: (currentUserId: UserResponse) => void;
  sendUsersList: (companionData: Array<UserResponse>) => void;
}) {
  const { isLoading, user, isAuthenticated } = useAuth0();

  // Connection socket.io
  socket.on("connect", () => {
    console.log(socket);
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  // Get users list
  useEffect(() => {
    if (!isAuthenticated && !user) return;
    
    const userName = {
      searchUserName: user && user.email,
    };

    socket.emit("findUsers", "allUsers");

    socket.emit("findUsers", userName);

    // eslint-disable-next-line
  }, [user, isAuthenticated]);

  socket.once("respFoundUsers", (usersList) => {
    const listUsersWithoutCurrent =
      usersList &&
      usersList.filter(
        (el: UserResponse) => el.email !== (user && user.email) && el
      );

    sendUsersList(listUsersWithoutCurrent);
  });

  socket.once("respFoundUsers", (foundUser) => {
    foundUser.forEach((el: UserResponse) => {
      if (el.email === (user && user.email)) {
        sendCurrentUser(el);
      }
    });
  });

  if (isLoading) {
    setTimeout(() => {
      if (!isLoading) console.log("Проблемы с подключением к интеренту");
    }, 10000);

    return (
      <div className="loading">
        <img src={loaderImage} alt="/" />
      </div>
    );
  }

  return (
    <div id="snippetContent">
      <div className="container">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card chat-app">
              <Sidebar />
              <Chat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch: Dispatch<DialogIdType>) {
  return {
    sendCurrentUser: (currentUserId: UserResponse) =>
      dispatch(creatorCurrentUserId(currentUserId)),
    sendUsersList: (usersList: Array<UserResponse>) =>
      dispatch(creatorUsersList(usersList)),
  };
}

export default connect(null, mapDispatchToProps)(App);
