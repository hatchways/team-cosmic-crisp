import { useState, useContext, useEffect, createContext, FunctionComponent, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

import { useAuth } from '../context/useAuthContext';
import { useMessages } from './useMessageContext';

const ENDPOINT = 'ws://localhost:3001';

interface ISocketContext {
  socket: Socket | undefined;
  initSocket: () => void;
}

export const SocketContext = createContext<ISocketContext>({
  socket: undefined,
  initSocket: () => null,
});

export const SocketProvider: FunctionComponent = ({ children }): JSX.Element => {
  const { loggedInUser, loggedInUserDetails } = useAuth();
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const { addOnlineUser, removeOfflineUser, addNewMessage } = useMessages();

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

  const socketEvents = useCallback(() => {
    let onlineUsers: string[] = [];
    if (socket && loggedInUser) {
      socket.on('connect', () => {
        socket.emit('go-online', loggedInUserDetails?._id);

        socket.on('add-online-user', (id) => {
          if (!onlineUsers.includes(id)) {
            if (id !== null && id !== loggedInUserDetails?._id) {
              addOnlineUser(id);
            }
          }
        });

        socket.on('remove-offline-user', (id) => {
          if (onlineUsers.includes(id)) {
            onlineUsers = onlineUsers.filter((user) => user !== id);
            if (id && id !== loggedInUserDetails?._id) {
              removeOfflineUser(id);
            }
          }
        });

        socket.on('new-message', (data) => {
          addNewMessage(data);
        });
        socket.on('user-typing', (conversationId) => {
          console.log('user typing');
        });
        socket.on('stop-user-typing', (conversationId) => {
          console.log('user not typing');
        });
      });
    }
  }, [socket, loggedInUserDetails]);
  socketEvents();

  return <SocketContext.Provider value={{ socket, initSocket }}>{children}</SocketContext.Provider>;
};

export function useSocket(): ISocketContext {
  return useContext(SocketContext);
}
