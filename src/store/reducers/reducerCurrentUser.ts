import { CURRENT_USER_ID } from "../actions/actionCurretUserId";

function currentUser(state = {}, action) {
  switch (action.type) {
    case CURRENT_USER_ID:
      return {
        ...state,
        currentUser: action.currentUser
      }
    default:
      return {
        ...state
      }
  }
}

export default currentUser;