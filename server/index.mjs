import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

// actions
import { createUsers, findUsers, updateUsers, deleteUsers } from "./acions/action-users.mjs";
import { createChat, findChat, deleteChat } from "./acions/action-chat.mjs";
import {
  createChatContent,
  findChatContent,
  deleteChatContent,
} from "./acions/action-chat-content.mjs";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001/",
    credentials: true,
  },
});

app.use(cors());

io.on("connection", (socket) => {
  socket.on("createUsers", async (user) => createUsers(socket, user));
  socket.on("findUsers", async (searchText) => findUsers(socket, searchText));
  socket.on("updateUsers", async (io, userId, updateString) =>
    updateUsers(socket, userId, updateString)
  );
  socket.on("deleteUsers", async (user) => deleteUsers(socket, user));

  socket.on("createChat", async (users) => createChat(socket, users));
  socket.on("findChat", async (chat) => findChat(socket, chat));
  socket.on("deleteChat", async (chat) => deleteChat(socket, chat));

  socket.on("createChatContent", async (users) => createChatContent(io, users));
  socket.on("findChatContent", async (chat) => findChatContent(socket, chat));
  socket.on("deleteChatContent", async (chat) =>
    deleteChatContent(socket, chat)
  );
});

io.engine.on("connection_error", (err) => {
  console.log(err.req); // the request object
  console.log(err.code); // the error code, for example 1
  console.log(err.message); // the error message, for example "Session ID unknown"
  console.log(err.context); // some additional error context
});

server.listen(3001, () => {
  console.log("Listen ok");
});
