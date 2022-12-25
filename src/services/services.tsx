// types
import { UserResponse } from "../types";

// auth
import { User } from "@auth0/auth0-react";
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

export function createTime(timeString: string) {
  if (timeString) {
    const date = timeString && new Date(timeString);
    const time = date && date.toLocaleTimeString().slice(0, 5);

    return (
      <>
        <i className="fa fa-circle offline"></i> offline since {time}
      </>
    );
  } else {
    return (
      <>
        <i className="fa fa-circle online"></i> online
      </>
    );
  }
}

export function writingToLocalStorage(dialogData) {
  localStorage.setItem("lastОpenDialog", JSON.stringify(dialogData));
}
