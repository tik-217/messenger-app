// socket
import { socket } from "../services/context-socket-io";

// redux
import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersList } from "./rootReducers";

// types
import { UserResponse } from "../types";

// auth
import { User } from "@auth0/auth0-react";

export const getUsers = createAsyncThunk(
  "rootReducers/getUsers",
  async (user: User, { dispatch }) => {
    socket.emit("findUsers", "allUsers");

    socket.on("respFoundUsers", async (usersListData: Array<UserResponse>) => {
      const listUsersWithoutCurrent: Array<UserResponse> = usersListData.filter(
        (el: UserResponse) => el.email !== (user && user.email) && el
      );

      dispatch(usersList(listUsersWithoutCurrent));
    });
  }
);
