// react
import { Dispatch, useEffect, useState } from "react";

// components
import Search from "../Search/Search";

// types
import { ChatDialogReduxState, DialogIdType, UserResponse } from "../../types";

// api
import { createTime, writingToLocalStorage } from "../../services/services";

// redux
import { connect } from "react-redux";

// socket
import { socket } from "../../services/context-socket-io";

// auth
import { useAuth0 } from "@auth0/auth0-react";
import {
  stateInterface,
  useAppDispatch,
  useAppSelector,
} from "../../store/store";
import {
  dialogId,
  idCurrentCompanion,
  usersList,
} from "../../store/reducers/rootReducers";

export default function Sidebar() {
  const [openDialog, setOpenDialog] = useState(false);

  const { user } = useAuth0();

  const userListStore: any = useAppSelector();
  const dispatch = useAppDispatch();

  const usersListData = userListStore.usersList;
  const currentUserData = userListStore.currentUser;

  useEffect(() => {
    if (openDialog === false) return;

    if (!usersListData && !currentUserData && currentUserData.length === 0)
      return;

    // writingToLocalStorage(usersListData);

    const userIds = {
      user_ids: [currentUserData.id, usersListData && usersListData[0].id],
    };

    socket.emit("createChat", userIds);
    // eslint-disable-next-line
  }, [openDialog]);

  socket.once("updateUsers", (newUsersList) => {
    const listUsersWithoutCurrent =
      newUsersList &&
      newUsersList.filter(
        (el: UserResponse) => el.email !== (user && user.email) && el
      );

    dispatch(usersList(listUsersWithoutCurrent));
  });

  function chooseCompanion(e: React.MouseEvent<HTMLLIElement>) {
    const companionDiv = e.nativeEvent.composedPath();
    const getLiElement: object = companionDiv.filter(
      (el) => (el as HTMLElement).tagName === "LI"
    );
    const companionId = getLiElement[0].dataset.userId;

    companionId && dispatch(idCurrentCompanion(companionId));

    setOpenDialog(true);
  }

  socket.on("respCreateChat", (socket) => {
    dispatch(dialogId(socket));
  });

  // useEffect(() => {
  //   const storageContent = localStorage.getItem("lastОpenDialog");

  //   if (storageContent !== null && storageContent !== "undefined") {
  //     setOpenDialog(true);
  //   }
  // }, [usersListData]);

  return (
    <div id="plist" className="people-list">
      <div className="input-group">
        <div className="input-group-prepend align-items-start p-1">
          <span
            className="input-group-text align-items-start"
            id="basic-addon1"
          >
            <i className="fa fa-search"></i>
          </span>
        </div>
        <div>
          <Search />
        </div>
      </div>
      <ul className="list-unstyled chat-list mt-2 mb-0">
        {usersListData &&
          usersListData.map((el: UserResponse) => (
            <li
              className="clearfix d-flex align-items-center"
              key={el.id}
              data-user-id={el.id}
              onClick={(e) => chooseCompanion(e)}
            >
              <img src={el.picture} alt="avatar" />
              <div className="about">
                <div className="name">{el.name}</div>
                <div className="status">{createTime(el.updatedAt)}</div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
