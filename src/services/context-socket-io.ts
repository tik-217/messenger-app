// react
import React from "react";

// socket.io
import { io } from "socket.io-client";

export const socket = io("https://messenger-app.store:3000/", {
  transports: ["websocket"],
  withCredentials: true,
});
export const SocketContext = React.createContext(socket);
