// react
import { useEffect, useState } from "react";

// components
import Search from "../Search/Search";

// types
import { UserResponse } from "../../types";

// api
import CreateTime from "../CreateTime/CreateTime";

// redux
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  dialogId,
  idCurrentCompanion,
  usersList,
} from "../../store/rootReducers";
import { currentUserSelectors, userListSelectors } from "../../store/selectors";

// socket
import { socket } from "../../services/context-socket-io";

// auth
import { useAuth0 } from "@auth0/auth0-react";

export default function Sidebar() {
  const [openDialog, setOpenDialog] = useState(false);

  const { user, isAuthenticated } = useAuth0();

  const dispatch = useAppDispatch();

  const userList = useAppSelector(userListSelectors);
  const currentUser = useAppSelector(currentUserSelectors);

  useEffect(() => {
    if (openDialog === false) return;

    if (!userList && userList && currentUser[0].length === 0) return;

    const userIds = {
      user_ids: [currentUser.id, userList && userList[0].id],
    };

    socket.emit("createChat", userIds);
    // eslint-disable-next-line
  }, [openDialog]);

  function chooseCompanion(e: React.MouseEvent<HTMLLIElement>) {
    const companionDiv = e.nativeEvent.composedPath();
    const getLiElement: object = companionDiv.filter(
      (el) => (el as HTMLElement).tagName === "LI"
    );
    const companionId = getLiElement[0].dataset.userId;

    companionId && dispatch(idCurrentCompanion(companionId));

    setOpenDialog(true);
  }

  socket.once("updateUsers", async (newUsersList) => {
    const listUsersWithoutCurrent =
      (await newUsersList) &&
      newUsersList.filter(
        (el: UserResponse) => el.email !== (user && user.email) && el
      );

    dispatch(usersList(listUsersWithoutCurrent));
  });

  socket.on("respCreateChat", async (socket) => {
    dispatch(dialogId(await socket));
  });

  return (
    <div id="plist" className="people-list">
      <div className="input-group">
        <Search />
      </div>
      <ul className="list-unstyled chat-list mt-2 mb-0">
        {isAuthenticated &&
          userList &&
          userList.map((el: UserResponse) => (
            <li
              className="clearfix d-flex align-items-center"
              key={el.id}
              data-user-id={el.id}
              onClick={(e) => chooseCompanion(e)}
            >
              <img src={el.picture} alt="avatar" />
              <div className="about">
                <div className="name">{el.name}</div>
                <div className="status">
                  <CreateTime
                    timeString={el.session === false ? el.updatedAt : false}
                  />
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
