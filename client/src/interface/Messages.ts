export interface Conversation {
  conversationId: string;
  recipent: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePhoto: string;
    online?: boolean;
  };
  lastMessage: string;
  seen: boolean;
  messages?: Message[];
}

export interface Message {
  read: boolean;
  _id: string;
  content: string;
  sender: string;
  createdAt: Date;
}

export interface CreateConversationAPIDataSuccess {
  success: {
    conversation: {
      participants: string[];
      messages: string[];
    };
  };
}

export interface GetConversationAPIDataSuccess {
  success: {
    conversations: Conversation[];
  };
}

export interface PostMessageAPIDataSuccess {
  success: {
    message: Message;
  };
}

export interface GetMessagesAPIDataSuccess {
  success: {
    messages: Message[];
  };
}
