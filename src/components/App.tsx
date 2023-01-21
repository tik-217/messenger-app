// react
import { useEffect, useState } from "react";

// components
import Chat from "./Chat/Chat";
import Sidebar from "./Sidebar/Sidebar";

// auth
import { useAuth0 } from "@auth0/auth0-react";

// types
import { UserResponse } from "../types";

// socket.io
import { socket } from "../services/context-socket-io";

// redux
import { currentUser } from "../store/rootReducers";
import { getUsers } from "../store/thunks";
import { useAppDispatch, useAppSelector } from "../store/store";

// images
import loaderImage from "../assets/icons/Spinner-1s-200px.gif";
import { userListSelectors } from "../store/selectors";

export default function App() {
  const [connectedDB, setConnectedDB] = useState(false);

  const { isLoading, user, isAuthenticated } = useAuth0();

  const dispatch = useAppDispatch();
  const userList = useAppSelector(userListSelectors);

  const connection = socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  // Get users list
  useEffect(() => {
    if (!isAuthenticated && !user) return;

    const userName = {
      searchUserName: user && user.email,
    };

    // sending a search request for the current registered user
    socket.emit("findUsers", userName);

    // asynchronous receipt of users from the store
    user && dispatch(getUsers(user));

    // eslint-disable-next-line
  }, [user, isAuthenticated]);

  // getting the currently registered user
  socket.on("respFoundUsers", (foundUser) => {
    foundUser.forEach((el: UserResponse) => {
      if (Object.keys(userList).length !== 0) return;
      if (el.email === (user && user.email)) {
        dispatch(currentUser(el));
      }
    });
  });

  /*
    Creating a user based on the information received from the registration form.

    The user must be registered and the user variable must not be empty.
  */
  useEffect(() => {
    if (!isAuthenticated && user && Object.keys(user).length !== 0) return;

    socket.emit("createUsers", user && { ...user, session: false });
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (!connection.connected) setConnectedDB(true);
    // eslint-disable-next-line
  }, [connection]);

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
      <div>
        <div className="clearfix">
          <div className="col-lg-12">
            {!connectedDB ? (
              <h2>Проблемы с подключением к БД</h2>
            ) : (
              <div className="card chat-app">
                <>
                  <Sidebar />
                  <Chat />
                </>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
