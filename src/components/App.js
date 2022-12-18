// react
import React, { useContext } from "react";

// components
import Chat from "./Chat/Chat.tsx";
import Sidebar from "./Sidebar/Sidebar";

// auth
import { useAuth0 } from "@auth0/auth0-react";

// socket.io
import { SocketContext } from "../services/context-socket-io.js";

// images
import loaderImage from "../assets/icons/Spinner-1s-200px.gif";

export default function App() {
  const { isLoading } = useAuth0();

  const socket = useContext(SocketContext);

  socket.on("connect", () => {
    console.log(socket);
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
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

      <script type="text/javascript"></script>
    </div>
  );
}
