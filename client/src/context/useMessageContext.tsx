import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { getConversations, getMessages } from '../helpers/APICalls/messages';
import { Conversation, Message, GetConversationAPIDataSuccess } from '../interface/Messages';
import { useAuth } from './useAuthContext';

interface IMessageContext {
  conversations: Conversation[];
  messages: Message[];
  updateConversations: (data: GetConversationAPIDataSuccess) => void;
  addConversation: (conversation: Conversation) => void;
  activeConversation: string | null;
  addMessage: (message: Message) => void;
  addNewMessage: (message: Message) => void;
  setActiveConversation: (conversationId: string) => void;
  loading: boolean;
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
  removeOfflineUser: () => null,
});

export const MessageContextProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeConversation, setActiveConvo] = useState<string | null>(null);
  const history = useHistory();
  const { loggedInUserDetails } = useAuth();

  const updateConversations = useCallback(
    (data) => {
      setConversations(data.success.conversations);
    },
    [history],
  );

  useEffect(() => {
    getConversations().then((res) => {
      if (res.success) updateConversations(res);
      else if (res.error) setError(res.error.message);
    });
  }, [history, loggedInUserDetails]);

  useEffect(() => {
    if (activeConversation) {
      const temp = conversations.find((convo) => convo.conversationId === activeConversation);
      if (temp?.messages && temp.messages.length > 0) setMessages(temp?.messages);
    }
  }, [conversations, activeConversation]);

  const addConversation = useCallback(
    (conversation) => {
      const temp = conversations.find((convo) => convo.conversationId === conversation.conversationId);
      if (!temp) {
        setConversations((conversations) => [...conversations, conversation]);
        setActiveConversation(conversation._id);
      }
    },
    [history, conversations],
  );

  const setActiveConversation = useCallback(
    (conversationId) => {
      const convo = conversations.find((convo) => convo.conversationId === conversationId);
      if (convo) {
        // if messages are already saved
        if (convo?.messages === undefined || convo?.messages.length === 0) {
          setLoading(true);
          getMessages(convo?.conversationId)
            .then((res) => {
              if (res.success) {
                saveMessages(convo.conversationId, res.success.messages);
              } else if (res.error) setError(res.error.message);
            })
            .finally(() => setLoading(false));
        }
        setActiveConvo(convo.conversationId);
      }
    },
    [history, conversations, activeConversation],
  );

  // saves messages to conversations array
  const saveMessages = useCallback(
    (conversationId, messages) => {
      setConversations((conversations) => {
        const convos = conversations.map((convo) =>
          convo.conversationId === conversationId ? { ...convo, messages: [...messages] } : convo,
        );
        return convos;
      });
    },
    [history, conversations],
  );

  const addNewMessage = (message: Message) => {
    setConversations((conversations) => {
      //if message is already added
      const convo = conversations.find((convo) => convo.conversationId === message.conversationId);
      if (convo?.messages && convo.messages.find((msg) => msg._id === message._id)) {
        return conversations;
      }
      // add messages to conversation
      const temp = conversations.map((convo) =>
        convo.conversationId === message.conversationId && convo.messages
          ? { ...convo, messages: [...convo.messages, message] }
          : convo,
      );
      return temp;
    });
  };

  const addMessage = useCallback(
    (message) => {
      setMessages((messages) => {
        const temp = [...messages, message];
        saveMessages(activeConversation, temp);
        return temp;
      });
    },
    [history, messages, activeConversation],
  );

  const removeOfflineUser = useCallback(
    (id) => {
      setConversations((conversations) =>
        conversations.map((convo) =>
          convo.recipient._id === id ? { ...convo, recipient: { ...convo.recipient, online: false } } : convo,
        ),
      );
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
