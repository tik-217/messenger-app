import { combineReducers } from 'redux';

import reducerDialogId from "./reducerDialogId";
import reducerCurrentUser from "./reducerCurrentUser";
import reducerCompanionId from "./reducerUsersList";
import reducerIdCurrentCompanion from './reducerIdCurrentCompanion';

const rootReducer = combineReducers({
  dialogId: reducerDialogId,
  currentUser: reducerCurrentUser,
  usersList: reducerCompanionId,
  idCurrentCompanion: reducerIdCurrentCompanion,
})

export default rootReducer;