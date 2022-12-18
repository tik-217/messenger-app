import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

// routs
import usersRout from "./routs/users-rout.mjs";
import chatRout from "./routs/chat-rout.mjs";
import chatContent from "./routs/chat-content-rout.mjs";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001/",
    credentials: true,
  }
});

app.use(cors());

app.use("/users", usersRout);

app.use("/chat", chatRout);

app.use("/chat-content", chatContent);

io.on("connection", (socket) => {
  socket.on("hello", (arg) => {
    console.log(arg);
  });
});

server.listen(3001, () => {
  console.log("Listen ok");
});