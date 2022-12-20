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
  currentUserId?: number;
  companionData?: Array<UserResponse>;
}

interface StateDialogId {
  dialogId: number;
}

interface StateCompanionData {
  companionData: Array<UserResponse>;
}

interface StateCurrentUserId {
  currentUserId: number;
}

export interface ChatReduxState {
  dialogId: StateDialogId;
  companionData: StateCompanionData;
  currentUserId: StateCurrentUserId
}

export interface ChatDialogReduxState {
  currentUserId: StateCurrentUserId;
  companionData: StateCompanionData;
}