import { UserResponse } from "../../../types";
import { COMPANION_DATA } from "../actions/actionCompanionId";

function creatorDialogId(companionData: Array<UserResponse>) {
  return {
    type: COMPANION_DATA,
    companionData
  }
}

export default creatorDialogId;