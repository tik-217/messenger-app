// react
import { Dispatch, useEffect, useState } from "react";

// components
import Search from "../Search/Search";

// types
import {
  ChatDialogReduxState,
  DialogIdType,
  UserResponse,
} from "../../../types";

// auth
import { useAuth0 } from "@auth0/auth0-react";

// api
import { createTime, searchUser } from "../../services/services";

// redux
import { connect } from "react-redux";
import creatorDialogId from "../../store/creators/creatorDialogId";
import creatorCompanionId from "../../store/creators/creatorCompanionId";
import creatorCurrentUserId from "../../store/creators/creatorCurrentUserId";

// socket
import { socket } from "../../services/context-socket-io";

function Sidebar({
  currentUserId,
  companionData,
  sendDialogId,
  sendCurrentUser,
  sendCompanion,
}: {
  currentUserId: number;
  companionData: Array<UserResponse>;
  sendDialogId: (dialogIdValue: number) => void;
  sendCurrentUser: (currentUserId: number) => void;
  sendCompanion: (companionId: Array<UserResponse>) => void;
}) {
  const [openDialog, setOpenDialog] = useState(false);

  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    user && searchUser(isAuthenticated, user, sendCompanion);

    const userName = {
      searchUserName: user && user.email,
    };

    socket.emit("findUsers", userName);
  }, []);

  useEffect(() => {
    if (openDialog === false) return;

    const userIds = {
      user_ids: [currentUserId, companionData && companionData[0].id],
    };

    socket.emit("createChat", userIds);
  }, [openDialog]);

  function chooseCompanion() {
    setOpenDialog(true);
  }

  socket.on("respCreateChat", (socket) => {
    sendDialogId(socket);
  });

  socket.on("respFoundUsers", (socket) => {
    socket.forEach((el: UserResponse) => {
      if (el.email === (user && user.email)) {
        sendCurrentUser(el.id);
      }
    });
  });

  return (
    <div id="plist" className="people-list">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-search"></i>
          </span>
        </div>
        <div>
          <Search />
        </div>
      </div>
      <ul className="list-unstyled chat-list mt-2 mb-0">
        {companionData &&
          companionData.map((el: UserResponse) => (
            <li
              className="clearfix d-flex"
              key={el.id}
              onClick={() => chooseCompanion()}
            >
              <img src={el.picture} alt="avatar" />
              <div className="about">
                <div className="name">{el.name}</div>
                <div className="status">
                  {createTime(companionData[0].session)}
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
    sendCurrentUser: (currentUserId: number) =>
      dispatch(creatorCurrentUserId(currentUserId)),
    sendCompanion: (companionData: Array<UserResponse>) =>
      dispatch(creatorCompanionId(companionData)),
  };
}

function mapStateToProps(state: ChatDialogReduxState) {
  return {
    currentUserId: state.currentUserId.currentUserId,
    companionData: state.companionData.companionData,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
