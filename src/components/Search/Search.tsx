// react
import React, { Dispatch, useState, useEffect } from "react";

// axios
import axios from "axios";

// types
import { DialogIdType, UserResponse } from "../../../types";

// auth
import { useAuth0 } from "@auth0/auth0-react";

// redux
import { connect } from "react-redux";
import creatorDialogId from "../../store/creators/creatorDialogId";
import creatorCurrentUserId from "../../store/creators/creatorCurrentUserId";

function Search({
  sendDialogId,
  sendCurrentUser,
  currentUserId,
}: {
  sendDialogId: (dialogIdValue: number) => void;
  sendCurrentUser: (currentUserId: number) => void;
  currentUserId: number;
}) {
  const [searchText, setSerchText] = useState<string>("");
  const [searchResponse, setSearchResponse] = useState<Array<UserResponse>>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [companionId, setCompanionId] = useState<number>(0);

  const { user, isAuthenticated } = useAuth0();

  /* 
    Global user search system (output input search).

    The id of the current user is passed to сurrentUser.

    A filtered array is passed to SearchResponse excluding
    the currently registered user.
  */
  useEffect(() => {
    const searchUser = async () => {
      if (searchText === "") return;

      await axios({
        method: "get",
        url: "http://localhost:3001/users",
        params: { searchUserName: searchText },
      }).then((res) => {
        const filteredDeleteCurrentUser =
          res.data &&
          res.data.filter((el: UserResponse) => {
            if (el.email !== (user && user.email)) {
              return el.email;
            } else {
              sendCurrentUser(el.id);
            }
          });

        setSearchResponse(filteredDeleteCurrentUser);
      });
      console.log("Отправлен GET запрос");
    };
    searchUser();
  }, [searchText]);

  /* 
    Chat initialization function that accepts the current user and the user found
    in the search (input search).

    In response, the function accepts the id of the created dialog on the
    server side.
  */
  useEffect(() => {
    const initializationsChat = async () => {
      if (openDialog === false) return;

      const chatId = await axios({
        method: "post",
        url: "http://localhost:3001/chat",
        params: {
          user_ids: [currentUserId, companionId]
        },
      }).then((res) => res.data);

      sendDialogId(chatId);
    };
    initializationsChat();
  }, [openDialog]);

  function registrationWarning(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isAuthenticated) {
      alert("Please, register before searching");
    } else {
      setSerchText(e.target.value);
    }
  }

  function getCompanionId(e: React.MouseEvent<HTMLDivElement>) {
    const divCompanion = e.target as HTMLAnchorElement | HTMLImageElement;
    if (divCompanion.tagName === "IMG" || divCompanion.tagName === "A") {
      const userId = (divCompanion.parentNode as HTMLDivElement).attributes[1]
        .value;
      setCompanionId(+userId);
    }
    setOpenDialog(true);
  }

  return (
    <div>
      <div id="myDropdown" className="dropdown-content">
        <input
          className="form-control"
          id="myInput"
          placeholder="Search by email or name"
          value={searchText}
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
                <a href="#">{el.email}</a>
              </div>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentUserId: state.currentUserId.currentUserId,
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
