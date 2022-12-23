// types
import { UserResponse } from "../types";

// auth
import { User } from "@auth0/auth0-react";
import { socket } from "./context-socket-io";

export const searchUser = async (
  isAuthenticated: boolean,
  user: User,
  sendUsersList: (companionData: Array<UserResponse>) => void,
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
    const hours = date && date.toLocaleTimeString().slice(0,5);
    const minutes = date && date.getMinutes();
    const getDate = date && date.getDate();
    const month = date && date.toLocaleString("en-US", { month: "long" });

    return (
      <>
        <i className="fa fa-circle offline"></i> offline since {hours}
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
