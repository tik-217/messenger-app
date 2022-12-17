import { COMPANION_DATA } from "../actions/actionCompanionId";

function reducerCompanionId(state = {}, action) {
  switch (action.type) {
    case COMPANION_DATA:
      return {
        ...state,
        companionData: action.companionData
      }
    default:
      return {
        ...state
      }
  }
}

export default reducerCompanionId;