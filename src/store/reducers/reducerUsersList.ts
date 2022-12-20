import { USERS_LIST } from "../actions/actionUsersList";

function reducerUsersList(state = {}, action) {
  switch (action.type) {
    case USERS_LIST:
      return {
        ...state,
        usersList: action.usersList
      }
    default:
      return {
        ...state
      }
  }
}

export default reducerUsersList;