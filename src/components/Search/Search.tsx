// react
import React, { useState, useEffect } from "react";

// types
import { UserResponse } from "../../types";

// auth
import { useAuth0 } from "@auth0/auth0-react";

// socket.io
import { socket } from "../../services/context-socket-io";

// redux
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  currentUser,
  dialogId,
  idCurrentCompanion,
} from "../../store/rootReducers";
import {
  currentUserSelectors,
  idCurrCompanSelecltor,
  userListSelectors,
} from "../../store/selectors";

export default function Search() {
  const [searchText, setSearchText] = useState<string>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [searchResponse, setSearchResponse] = useState<Array<UserResponse>>([]);

  const { user, isAuthenticated } = useAuth0();

  const dispatch = useAppDispatch();

  const userList = useAppSelector(userListSelectors);
  const currentUserData = useAppSelector(currentUserSelectors);
  const idCurrCompan = useAppSelector(idCurrCompanSelecltor);

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

  useEffect(() => {
    if (openDialog === false) return;

    if (!userList) return;

    const userIds = {
      user_ids: [currentUserData.id, idCurrCompan],
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

  socket.once("searchTextOnline", (socket) => {
    setSearchText(socket);
  });

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
