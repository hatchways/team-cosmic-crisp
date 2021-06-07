import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { getConversations, getMessages } from '../helpers/APICalls/messages';
import { Conversation, Message, GetConversationAPIDataSuccess } from '../interface/Messages';
import { useAuth } from './useAuthContext';

interface IMessageContext {
  conversations: Conversation[];
  updateConversations: (data: GetConversationAPIDataSuccess) => void;
  addConversation: (conversation: Conversation) => void;
  activeConversation: string | null;
  messages: Message[];
  addMessage: (message: Message) => void;
  addNewMessage: (message: Message) => void;
  setActiveConversation: (conversationId: string) => void;
  loading: boolean;
  addOnlineUser: (id: string) => void;
  removeOfflineUser: (id: string) => void;
}

export const MessageContext = createContext<IMessageContext>({
  conversations: [],
  activeConversation: null,
  messages: [],
  addMessage: () => null,
  addNewMessage: () => null,
  setActiveConversation: () => null,
  updateConversations: () => null,
  addConversation: () => null,
  loading: false,
  addOnlineUser: () => null,
  removeOfflineUser: () => null,
});

export const MessageContextProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeConversation, setActiveConvo] = useState<string | null>(null);
  const history = useHistory();
  const { loggedInUser } = useAuth();

  const updateConversations = useCallback(
    (data) => {
      setConversations(data.success.conversations);
    },
    [history],
  );

  const addConversation = useCallback(
    (conversation) => {
      const temp = conversations.find((convo) => convo.conversationId === conversation.conversationId);
      if (!temp) {
        setConversations([...conversations, conversation]);
        setActiveConversation(conversation._id);
      }
    },
    [history, conversations],
  );

  const setActiveConversation = useCallback(
    (conversationId) => {
      setLoading(true);
      const convo = conversations.find((convo) => convo.conversationId === conversationId);
      if (convo) {
        // if messages are already saved
        if (convo?.messages !== undefined && convo?.messages.length > 0) {
          setMessages(convo.messages);
        } else {
          getMessages(convo?.conversationId).then((res) => {
            if (res.success) {
              setMessages(res.success.messages);
              saveMessages(convo.conversationId, res.success.messages);
            } else if (res.error) setError(res.error.message);
          });
        }
        setActiveConvo(convo.conversationId);
      }
      setLoading(false);
    },
    [history, conversations, activeConversation],
  );

  // saves messages to conversations array
  const saveMessages = useCallback(
    (conversationId, messages) => {
      const convos = conversations.map((convo) =>
        convo.conversationId === conversationId ? { ...convo, messages: [...messages] } : convo,
      );
      setConversations(convos);
    },
    [history, conversations],
  );

  const addNewMessage = useCallback(
    (message) => {
      const convo = conversations.find((convo) => convo.recipient._id === message.sender);
      if (convo && convo.conversationId === activeConversation) {
        addMessage(message);
      } else {
        const temp = conversations.map((convo) =>
          convo.recipient._id === message.sender && convo.messages
            ? { ...convo, messages: [...convo.messages, message] }
            : convo,
        );
        setConversations(temp);
      }
    },
    [history, conversations],
  );

  const addMessage = useCallback(
    (message) => {
      const temp = [...messages, message];
      setMessages(temp);
      saveMessages(activeConversation, temp);
    },
    [history, messages, activeConversation],
  );

  useEffect(() => {
    getConversations().then((res) => {
      if (res.success) updateConversations(res);
      else if (res.error) setError(res.error.message);
    });
  }, [history, loggedInUser]);

  const addOnlineUser = useCallback(
    (id: string) => {
      const temp = conversations.map((convo) =>
        convo.recipient._id === id ? { ...convo, recipient: { ...convo.recipient, online: true } } : convo,
      );
      setConversations(temp);
    },
    [history, conversations],
  );

  const removeOfflineUser = useCallback(
    (id: string) => {
      const temp = conversations.map((convo) =>
        convo.recipient._id === id ? { ...convo, recipient: { ...convo.recipient, online: false } } : convo,
      );

      setConversations(temp);
    },
    [history, conversations],
  );

  return (
    <MessageContext.Provider
      value={{
        conversations,
        activeConversation,
        messages,
        addMessage,
        addNewMessage,
        setActiveConversation,
        updateConversations,
        addConversation,
        loading,
        addOnlineUser,
        removeOfflineUser,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export function useMessages(): IMessageContext {
  return useContext(MessageContext);
}
