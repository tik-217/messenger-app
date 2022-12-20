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

  console.log(22);

  socket.on("respFoundUsers", (usersList) => {
    const listUsersWithoutCurrent =
      usersList &&
      usersList.filter(
        (el: UserResponse) => el.email !== (user && user.email) && el
      );
    
    console.log(listUsersWithoutCurrent);

    sendUsersList(listUsersWithoutCurrent);
  });
};

export function createTime(timeString: string | null) {
  if (timeString) {
    const date = timeString && new Date(timeString);
    const hours = date && date.getHours();
    const minutes = date && date.getMinutes();
    const getDate = date && date.getDate();
    const month = date && date.toLocaleString("en-US", { month: "long" });

    return (
      <>
        <i className="fa fa-circle offline"></i> offline since {hours}:{minutes}
        , {getDate}, {month}
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
