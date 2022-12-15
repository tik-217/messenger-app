import { DIALOG_ID } from "../actions/actionDialogId";

function creatorDialogId(dialogId: number) {
  return {
    type: DIALOG_ID,
    dialogId
  }
}

export default creatorDialogId;