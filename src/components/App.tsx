// react
import { Dispatch, useEffect } from "react";

// components
import Chat from "./Chat/Chat";
import Sidebar from "./Sidebar/Sidebar";

// auth
import { User, useAuth0 } from "@auth0/auth0-react";

// types
import { DialogIdType, UserResponse } from "../types";

// socket.io
import { socket } from "../services/context-socket-io";

// redux
import { connect, useDispatch, useSelector } from "react-redux";
import {
  // getUsers,
  currentUser,
  getUsers,
  usersList,
} from "../store/reducers/rootReducers";
import { useAppSelector, useAppDispatch, AppDispatch } from "../store/store";

// images
import loaderImage from "../assets/icons/Spinner-1s-200px.gif";

function App() {
  const { isLoading, user, isAuthenticated } = useAuth0();

  const userListStore = useAppSelector();
  const dispatch = useAppDispatch();

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  // Get users list
  useEffect(() => {
    if (!isAuthenticated && !user) return;

    const userName = {
      searchUserName: user && user.email,
    };

    socket.emit("findUsers", userName);

    user && dispatch(getUsers(user));

    // eslint-disable-next-line
  }, [user, isAuthenticated]);

  socket.on("respFoundUsers", (foundUser) => {
    foundUser.forEach((el: UserResponse) => {
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

export default connect()(App);
