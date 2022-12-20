import { UserResponse } from "../../types";
import { USERS_LIST } from "../actions/actionUsersList";

function creatorDialogId(usersList: Array<UserResponse>) {
  return {
    type: USERS_LIST,
    usersList
  }
}

export default creatorDialogId;