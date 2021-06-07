import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { getConversations, getMessages } from '../helpers/APICalls/messages';
import { Conversation, Message, GetConversationAPIDataSuccess } from '../interface/Messages';

interface IMessageContext {
  conversations: Conversation[];
  updateConversations: (data: GetConversationAPIDataSuccess) => void;
  addConversation: (conversation: Conversation) => void;
  activeConversation: string | null;
  messages: Message[];
  addMessage: (message: Message) => void;
  setActiveConversation: (conversationId: string) => void;
  loading: boolean;
}

export const MessageContext = createContext<IMessageContext>({
  conversations: [],
  activeConversation: null,
  messages: [],
  addMessage: () => null,
  setActiveConversation: () => null,
  updateConversations: () => null,
  addConversation: () => null,
  loading: false,
});

export const MessageContextProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeConversation, setActiveConvo] = useState<string | null>(null);
  const history = useHistory();

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
  }, [history]);

  return (
    <MessageContext.Provider
      value={{
        conversations,
        activeConversation,
        messages,
        addMessage,
        setActiveConversation,
        updateConversations,
        addConversation,
        loading,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export function useMessages(): IMessageContext {
  return useContext(MessageContext);
}
