// react
import React, { Dispatch, useState, useEffect } from "react";

// types
import { DialogIdType, UserResponse } from "../../types";

// auth
import { useAuth0 } from "@auth0/auth0-react";

// redux
import { connect } from "react-redux";

// socket.io
import { socket } from "../../services/context-socket-io";
import { writingToLocalStorage } from "../../services/services";
import {
  currentUser,
  dialogId,
  idCurrentCompanion,
} from "../../store/reducers/rootReducers";
import { useAppDispatch, useAppSelector } from "../../store/store";

function Search() {
  const [searchText, setSearchText] = useState<string>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [searchResponse, setSearchResponse] = useState<Array<UserResponse>>([]);

  const { user, isAuthenticated } = useAuth0();

  const userListStore: any = useAppSelector();
  const dispatch = useAppDispatch();

  const currentUserData = userListStore.currentUser;
  const usersListData = userListStore.usersList;
  const idCurrentCompanionData = userListStore.idCurrentCompanion;

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
        // eslint-disable-next-line
        searchUser.filter((el: UserResponse) => {
          if (el.email !== (user && user.email)) {
            return el.email;
          } else {
            dispatch(currentUser(el));
          }
        });

      setSearchResponse(filteredDeleteCurrentUser);
    });
    socket.emit("searchTextOnline", searchText);
    // eslint-disable-next-line
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

    if (!usersListData) return;

    writingToLocalStorage(usersListData);

    const userIds = {
      user_ids: [currentUserData.id, idCurrentCompanionData],
    };

    socket.emit("createChat", userIds);

    socket.on("respCreateChat", (chatId) => {
      dispatch(dialogId(chatId));
    });

    // eslint-disable-next-line
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

    const companionDiv = e.nativeEvent.composedPath()[1] as HTMLDivElement;
    const companionId = companionDiv && Number(companionDiv.dataset.userid);

    companionId && dispatch(idCurrentCompanion(companionId));

    setSearchText("");
    setSearchResponse([]);
    setOpenDialog(true);
  }

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
  return {};
}

export default connect(mapStateToProps)(Search);
