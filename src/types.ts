export interface UserResponse {
  id: number;
  given_name?: string;
  nickname: string;
  name: string;
  picture: string;
  locale?: string;
  session: string | null;
  createdAt: string;
  updatedAt: string;
  email: string;
  email_verified: boolean;
  sub: string;
}

export interface ChatContent {
  id: number;
  user_id: number;
  chat_id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface DialogIdType {
  type: string;
  dialogId?: number;
  currentUser?: UserResponse;
  usersList?: Array<UserResponse>;
}

interface StateDialogId {
  dialogId: number;
}

interface StateUsersList {
  usersList: Array<UserResponse>;
}

interface StateCurrentUserId {
  currentUser: UserResponse;
}

interface StateIdCurrentCompanion {
  idCurrentCompanion: string;
}

export interface ChatReduxState {
  dialogId: StateDialogId;
  usersList: StateUsersList;
  currentUser: StateCurrentUserId;
  idCurrentCompanion: StateIdCurrentCompanion
}

export interface ChatDialogReduxState {
  currentUser: StateCurrentUserId;
  usersList: StateUsersList;
  idCurrentCompanion: StateIdCurrentCompanion;
}