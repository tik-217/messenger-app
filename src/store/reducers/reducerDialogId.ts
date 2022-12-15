import { DIALOG_ID } from "../actions/actionDialogId";

function reducerDialogId(state = {}, action) {
  switch (action.type) {
    case DIALOG_ID:
      return {
        ...state,
        dialogId: action.dialogId
      }
    default:
      return {
        ...state
      }
  }
}

export default reducerDialogId;