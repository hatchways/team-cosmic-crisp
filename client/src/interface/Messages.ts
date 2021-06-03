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
