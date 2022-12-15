import { CURRENT_USER_ID } from "../actions/actionCurretUserId";

function creatorDialogId(currentUserId: number) {
  return {
    type: CURRENT_USER_ID,
    currentUserId
  }
}

export default creatorDialogId;