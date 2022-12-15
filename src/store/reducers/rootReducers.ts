import { combineReducers } from 'redux';

import reducerDialogId from "./reducerDialogId";
import reducerCurrentUserId from "./reducerCurrentUserId";

const rootReducer = combineReducers({
  dialogId: reducerDialogId,
  currentUserId: reducerCurrentUserId,
})

export default rootReducer;