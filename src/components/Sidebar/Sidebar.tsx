// react
import { Dispatch, useEffect, useState } from "react";

// components
import Search from "../Search/Search";

// types
import { ChatDialogReduxState, DialogIdType, UserResponse } from "../../types";

// api
import { createTime } from "../../services/services";

// redux
import { connect } from "react-redux";
import creatorDialogId from "../../store/creators/creatorDialogId";

// socket
import { socket } from "../../services/context-socket-io";
import creatorIdCurrentCompanion from "../../store/creators/creatorIdCurrentCompanion";
import creatorUsersList from "../../store/creators/creatorUsersList";
import { useAuth0 } from "@auth0/auth0-react";

function Sidebar({
  currentUser,
  usersList,
  sendDialogId,
  sendIdCurrentCompanion,
  sendUsersList,
}: {
  currentUser: UserResponse;
  usersList: Array<UserResponse>;
  sendDialogId: (dialogIdValue: number) => void;
  sendIdCurrentCompanion: (idCurrentCompanion: number) => void;
  sendUsersList: (usersList: Array<UserResponse>) => void;
}) {
  const [openDialog, setOpenDialog] = useState(false);

  const { user } = useAuth0();

  // useEffect(() => {
  //   const lastOpenDialog = localStorage.getItem("lastОpenDialog");

  //   setSearchResponse(lastOpenDialog && JSON.parse(lastOpenDialog))
  // }, [])

  useEffect(() => {
    if (openDialog === false) return;

    const userIds = {
      user_ids: [currentUser.id, usersList && usersList[0].id],
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
    
    sendUsersList(listUsersWithoutCurrent);
  });

  function chooseCompanion(e: React.MouseEvent<HTMLLIElement>) {
    const companionDiv = e.nativeEvent.composedPath();
    const getLiElement: object = companionDiv.filter(
      (el) => (el as HTMLElement).tagName === "LI"
    );
    const companionId = getLiElement[0].dataset.userId;

    companionId && sendIdCurrentCompanion(companionId);

    setOpenDialog(true);
  }

  console.log(usersList);

  socket.on("respCreateChat", (socket) => {
    sendDialogId(socket);
  });

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
        {usersList &&
          usersList.map((el: UserResponse) => (
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
                  {createTime(usersList[0].updatedAt)}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

function mapDispatchToProps(dispatch: Dispatch<DialogIdType>) {
  return {
    sendDialogId: (dialogIdValue: number) =>
      dispatch(creatorDialogId(dialogIdValue)),
    sendIdCurrentCompanion: (idCurrentCompanion: number) =>
      dispatch(creatorIdCurrentCompanion(idCurrentCompanion)),
    sendUsersList: (usersList: Array<UserResponse>) =>
      dispatch(creatorUsersList(usersList)),
  };
}

function mapStateToProps(state: ChatDialogReduxState) {
  return {
    currentUser: state.currentUser.currentUser,
    usersList: state.usersList.usersList,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
