import { combineReducers } from 'redux';

import reducerDialogId from "./reducerDialogId";
import reducerCurrentUserId from "./reducerCurrentUserId";
import reducerCompanionId from "./reducerCompanionId";

const rootReducer = combineReducers({
  dialogId: reducerDialogId,
  currentUserId: reducerCurrentUserId,
  companionData: reducerCompanionId,
})

export default rootReducer;