// react
import React, { Dispatch, useState, useEffect } from "react";

// types
import { DialogIdType, UserResponse } from "../../../types";

// auth
import { useAuth0 } from "@auth0/auth0-react";

// redux
import { connect } from "react-redux";
import creatorDialogId from "../../store/creators/creatorDialogId";
import creatorCurrentUserId from "../../store/creators/creatorCurrentUserId";

// socket.io
import { socket } from "../../services/context-socket-io";

function Search({
  sendDialogId,
  sendCurrentUser,
  currentUserId,
  companionData,
}: {
  sendDialogId: (dialogIdValue: number) => void;
  sendCurrentUser: (currentUserId: number) => void;
  currentUserId: number;
  companionData: Array<UserResponse>;
}) {
  const [searchText, setSearchText] = useState<string>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [searchResponse, setSearchResponse] = useState<Array<UserResponse>>([]);

  const { user, isAuthenticated } = useAuth0();

  /* 
    Global user search system (output input search).

    The id of the current user is passed to сurrentUser.

    A filtered array is passed to SearchResponse excluding
    the currently registered user.
  */
  useEffect(() => {
    if (searchText === undefined || searchText === "") return;

    socket.emit("findUsers", searchText);

    socket.once("respFoundUsers", (searchUser) => {
      const filteredDeleteCurrentUser =
        searchUser &&
        searchUser.filter((el: UserResponse) => {
          if (el.email !== (user && user.email)) {
            return el.email;
          } else {
            sendCurrentUser(el.id);
          }
        });

      setSearchResponse(filteredDeleteCurrentUser);
    });
    socket.emit("searchTextOnline", searchText);
  }, [searchText]);

  socket.once("searchTextOnline", (socket) => {
    setSearchText(socket);
  });

  /* 
    Chat initialization function that accepts the current user and the user found
    in the search (input search).

    In response, the function accepts the id of the created dialog on the
    server side.
  */
  useEffect(() => {
    if (openDialog === false) return;

    const userIds = {
      user_ids: [currentUserId, companionData && companionData[0].id],
    };

    socket.emit("createChat", userIds);

    socket.on("respCreateChat", (chatId) => {
      sendDialogId(chatId);
    });
  }, [openDialog]);

  function registrationWarning(e: React.ChangeEvent<HTMLInputElement>) {
    
    if (!isAuthenticated) {
      alert("Please, register before searching");
    } else {
      setSearchText(e.target.value);
    }
  }

  function getCompanionId(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();

    setSearchText("");
    setSearchResponse([]);
    setOpenDialog(true);
  }

  useEffect(() => {
    if (searchResponse.length !== 0) {
      localStorage.setItem("lastОpenDialog", JSON.stringify(searchResponse));
    }
  }, [searchResponse]);

  return (
    <>
      <div className="dropdown-content">
        <input
          className=" form-control"
          id="myInput"
          placeholder="Search by email or name"
          value={searchText === undefined ? "" : searchText}
          onChange={(e) => registrationWarning(e)}
        />
        {searchResponse &&
          searchResponse.map((el: UserResponse) => (
            <React.Fragment key={el.id}>
              <div
                className="listUsers"
                data-userid={el.id}
                onClick={(e) => getCompanionId(e)}
              >
                <img src={el.picture} alt="" />
                <a href="/">{el.email}</a>
              </div>
            </React.Fragment>
          ))}
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    currentUserId: state.currentUserId.currentUserId,
    companionData: state.companionData.companionData,
  };
}

function mapDispatchToProps(dispatch: Dispatch<DialogIdType>) {
  return {
    sendDialogId: (dialogIdValue: number) =>
      dispatch(creatorDialogId(dialogIdValue)),
    sendCurrentUser: (currentUserId: number) =>
      dispatch(creatorCurrentUserId(currentUserId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
