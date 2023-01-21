import { IInitialState } from "../types";

export const initialState: IInitialState = {
  currentUser: {
    id: 0,
    given_name: "",
    nickname: "",
    name: "",
    picture: "",
    locale: "",
    session: false,
    createdAt: "",
    updatedAt: "",
    email: "",
    email_verified: false,
    sub: "",
  },
  usersList: [],
  idCurrentCompanion: 0,
  dialogId: 0,
  isOnline: false,
};
