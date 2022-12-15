import { CURRENT_USER_ID } from "../actions/actionCurretUserId";

function currentUserId(state = {}, action) {
  switch (action.type) {
    case CURRENT_USER_ID:
      return {
        ...state,
        currentUserId: action.currentUserId
      }
    default:
      return {
        ...state
      }
  }
}

export default currentUserId;