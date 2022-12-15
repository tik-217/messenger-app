import express from "express";
import cors from "cors";

// routs
import usersRout from "./routs/users-rout.mjs";
import chatRout from "./routs/chat-rout.mjs";
import chatContent from "./routs/chat-content-rout.mjs";

const app = express();

app.use(cors());

app.use("/users", usersRout);

app.use("/chat", chatRout);

app.use("/chat-content", chatContent);

app.listen(3001, () => {
  console.log("Listen ok");
});