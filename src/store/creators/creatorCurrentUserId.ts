import { UserResponse } from "../../types";
import { CURRENT_USER_ID } from "../actions/actionCurretUserId";

function creatorCurrentUserId(currentUser: UserResponse) {
  return {
    type: CURRENT_USER_ID,
    currentUser
  }
}

export default creatorCurrentUserId;