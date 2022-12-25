import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

import { socket } from "../../services/context-socket-io";
// types
import { UserResponse } from "../../types";
import { User } from "@auth0/auth0-react";

export const getUsers = createAsyncThunk(
  "rootReducers/getUsers",
  async (user: User, { dispatch }) => {
    let response: UserResponse[] = [];

    socket.emit("findUsers", "allUsers");

    socket.on("respFoundUsers", async (usersListData: Array<UserResponse>) => {
      const listUsersWithoutCurrent: Array<UserResponse> = usersListData.filter(
        (el: UserResponse) => el.email !== (user && user.email) && el
      );

      dispatch(usersList(listUsersWithoutCurrent));
    });
  }
);

const rootReducer = createSlice({
  name: "chat",
  initialState,
  reducers: {
    currentUser(state, action) {
      state.currentUser = action.payload;
    },
    usersList(state, action) {
      state.usersList = action.payload;
    },
    idCurrentCompanion(state, action) {
      state.idCurrentCompanion = action.payload;
    },
    dialogId(state, action) {
      state.dialogId = action.payload;
    },
  },
});

export const { currentUser, usersList, idCurrentCompanion, dialogId } =
  rootReducer.actions;

export default rootReducer.reducer;
