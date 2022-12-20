import { ID_CURRENT_COMPANION } from "../actions/actionIdCurrentCompanion";

function creatorDialogId(idCurrentCompanion: number) {
  return {
    type: ID_CURRENT_COMPANION,
    idCurrentCompanion
  }
}

export default creatorDialogId;