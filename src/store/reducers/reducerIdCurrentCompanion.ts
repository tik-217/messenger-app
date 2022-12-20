import { ID_CURRENT_COMPANION } from "../actions/actionIdCurrentCompanion";

function reducerIdCurrentCompanion(state = {}, action) {
  switch (action.type) {
    case ID_CURRENT_COMPANION:
      return {
        ...state,
        idCurrentCompanion: action.idCurrentCompanion
      }
    default:
      return {
        ...state
      }
  }
}

export default reducerIdCurrentCompanion;