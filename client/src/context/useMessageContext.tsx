import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { JsxEmit } from 'typescript';
import { Conversation, Message } from '../interface/Messages';

interface IMessageContext {
  conversations: Conversation[];
  messages: Message[];
  updateConversations: (data: { success: string }) => void;
  updateMessages: (data: { success: string }) => void;
  //   sendMessage: () => void;
  //   getMessage: () => void;
}

export const MessageContext = createContext<IMessageContext>({
  conversations: [],
  messages: [],
  updateConversations: () => null,
  updateMessages: () => null,
  //   sendMessage: () => null,
  //   getMessage: () => null,
});

export const MessageContextProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const history = useHistory();

  const updateConversations = useCallback(
    (data) => {
      setConversations(data.conversations);
    },
    [history],
  );

  const updateMessages = useCallback(
    (data) => {
      setMessages(data.conversations);
    },
    [history],
  );

  return (
    <MessageContext.Provider
      value={{
        conversations,
        messages,
        updateConversations,
        updateMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
