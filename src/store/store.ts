import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import rootReducers, {
  currentUser,
  usersList,
  idCurrentCompanion,
  dialogId,
} from "./reducers/rootReducers";

const store = configureStore({
  reducer: rootReducers,
});

export interface stateInterface {
  currentUser: never[];
  usersList: never[];
  idCurrentCompanion: number;
  dialogId: number;
}

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = () => useSelector<RootState>((state) => state);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
