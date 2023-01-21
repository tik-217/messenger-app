// types
import { UserResponse } from "../types";

// auth
import { User } from "@auth0/auth0-react";

// socket.io
import { socket } from "./context-socket-io";

export const searchUser = async (
  isAuthenticated: boolean,
  user: User,
  sendUsersList: (companionData: Array<UserResponse>) => void
) => {
  if (!isAuthenticated) return;

  socket.emit("findUsers", "allUsers");

  socket.on("respFoundUsers", (usersList) => {
    const listUsersWithoutCurrent =
      usersList &&
      usersList.filter(
        (el: UserResponse) => el.email !== (user && user.email) && el
      );

    sendUsersList(listUsersWithoutCurrent);
  });
};

export function messageTimeView(createdAt: string) {
  const date = new Date(createdAt);

  const dateString = `${date.getHours()}:${date.getMinutes()}, ${date.toLocaleString(
    "en-us",
    { weekday: "long" }
  )}`;

  return dateString;
}
