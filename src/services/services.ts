// axios
import axios from "axios";

// types
import { ChatContent, UserResponse } from "../../types";

// auth
import { User } from "@auth0/auth0-react";

export const sendingMessage = async (
  confirmRequest: boolean,
  setChatHistory: React.Dispatch<React.SetStateAction<ChatContent[]>>,
  setConfirmRequest: React.Dispatch<React.SetStateAction<boolean>>,
  inputMessage: string,
  currentUserId: number,
  dialogId: number
) => {
  if (confirmRequest === false) return;

  await axios({
    method: "post",
    url: "http://localhost:3001/chat-content",
    params: {
      user_id: currentUserId,
      chat_id: dialogId,
      content: inputMessage,
    },
  })
    .then((res) => setChatHistory(res.data))
    .catch((err) => console.log(err));

  setConfirmRequest(false);
};

export const searchUser = async (
  isAuthenticated: boolean,
  user: User,
  sendCompanion: (companionId: Array<UserResponse>) => void
) => {
  if (!isAuthenticated) return;

  await axios("http://localhost:3001/users/getUsers").then((res) => {
    const listUsersWithoutCurrent =
      res.data &&
      res.data.filter((el: UserResponse) => el.email !== (user && user.email) && el );

    sendCompanion(listUsersWithoutCurrent);
  });
};
