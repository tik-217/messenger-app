import { RootState } from "./store";

export const userListSelectors = (state: RootState) => state.usersList;
export const currentUserSelectors = (state: RootState) => state.currentUser;
export const idCurrCompanSelecltor = (state: RootState) =>
  state.idCurrentCompanion;
export const dialogIdSelectors = (state: RootState) => state.dialogId;
