import { useState, useContext, useEffect, createContext, FunctionComponent, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

import { useAuth } from '../context/useAuthContext';
import { useMessages } from './useMessageContext';
import { getUnreadNotifications, createNewNotification } from '../helpers/APICalls/notifications';

const ENDPOINT = 'ws://localhost:3001';

interface ISocketContext {
  socket: Socket | undefined;
  initSocket: () => void;
  onlineUsers: string[];
  usersTyping: string[]; // conversation Ids of user typing
}

export const SocketContext = createContext<ISocketContext>({
  socket: undefined,
  initSocket: () => null,
  onlineUsers: [],
  usersTyping: [],
});

export const SocketProvider: FunctionComponent = ({ children }): JSX.Element => {
  const { loggedInUser, loggedInUserDetails, updateNotificationsContext, notifications } = useAuth();
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const { addNewMessage, removeOfflineUser, addOnlineUser } = useMessages();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [usersTyping, setUsersTyping] = useState<string[]>([]);

  const initSocket = useCallback(() => {
    console.log('Trying to connect');
    setSocket(
      io(ENDPOINT, {
        withCredentials: true,
        transports: ['websocket'],
      }),
    );
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      initSocket();
    }
  }, [loggedInUser]);

  useEffect(() => {
    socket?.on('connect', () => {
      socket.on('add-online-user', (id) => {
        setOnlineUsers((onlineUsers) => [...onlineUsers, id]);
        addOnlineUser(id);
      });

      socket.on('remove-offline-user', (id) => {
        setOnlineUsers((onlineUsers) => onlineUsers.filter((user) => user !== id));
        removeOfflineUser(id);
      });

      socket.on('new-message', (data) => {
        addNewMessage(data);
      });

      socket.on('user-typing', (conversationId) => {
        setUsersTyping((usersTyping) => [...usersTyping, conversationId]);
      });

      socket.on('user-stop-typing', (conversationId) => {
        setUsersTyping((usersTyping) => usersTyping.filter((convo) => convo !== conversationId));
      });

      socket.on('update-notifications', () => {
        async function fetchNotification() {
          try {
            const res = await getUnreadNotifications();
            res.notifications && updateNotificationsContext(res.notifications);
          } catch (error) {
            console.log('error occurred getting notifications', error);
          }
        }
        fetchNotification();
      });
    });
  }, [socket, loggedInUserDetails, loggedInUser]);

  useEffect(() => {
    if (loggedInUserDetails) socket?.emit('go-online', loggedInUserDetails?._id);
  }, [loggedInUserDetails]);

  return (
    <SocketContext.Provider value={{ socket, initSocket, onlineUsers, usersTyping }}>{children}</SocketContext.Provider>
  );
};

export function useSocket(): ISocketContext {
  return useContext(SocketContext);
}
