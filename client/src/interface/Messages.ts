export interface Conversation {
  conversationId: string;
  recipient: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePhoto: string;
    online?: boolean;
    typing?: boolean;
  };
  lastMessage: string;
  seen: boolean;
  messages?: Message[];
  getNewMessages?: boolean; // value to save if we should get new messages from server
}

export interface Message {
  read: boolean;
  _id: string;
  content: string;
  sender: string;
  createdAt: Date;
  receiver?: string;
  conversationId?: string;
}

export interface CreateConversationAPIDataSuccess {
  success: {
    conversation: Conversation;
  };
  error?: { message: string };
}

export interface GetConversationAPIDataSuccess {
  success: {
    conversations: Conversation[];
  };
  error?: { message: string };
}

export interface PostMessageAPIDataSuccess {
  success: {
    message: Message;
  };
  error?: { message: string };
}

export interface GetMessagesAPIDataSuccess {
  success: {
    messages: Message[];
  };
  error?: { message: string };
}
