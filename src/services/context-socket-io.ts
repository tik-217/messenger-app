// react
import React from "react";

// socket.io
import { io } from "socket.io-client";

export const socket = io("http://localhost:3001/", {
  transports: ["websocket"],
  withCredentials: true,
});
export const SocketContext = React.createContext(socket);