import { initialState } from "./initialState";

// redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types
import { UserResponse } from "../types";

const rootReducer = createSlice({
  name: "chat",
  initialState,
  reducers: {
    currentUser(state, action) {
      state.currentUser = action.payload;
    },
    usersList(state, action: PayloadAction<UserResponse[]>) {
      state.usersList = action.payload;
    },
    idCurrentCompanion(state, action: PayloadAction<number>) {
      state.idCurrentCompanion = action.payload;
    },
    dialogId(state, action) {
      state.dialogId = action.payload;
    },
    isOnline(state, action: PayloadAction<boolean>) {
      state.isOnline = action.payload;
    },
  },
});

export const {
  currentUser,
  usersList,
  idCurrentCompanion,
  dialogId,
  isOnline,
} = rootReducer.actions;

export default rootReducer.reducer;
