import { useState, useContext, useEffect, createContext, FunctionComponent, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

import { useAuth } from '../context/useAuthContext';

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
  const { loggedInUser } = useAuth();
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

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

  return <SocketContext.Provider value={{ socket, initSocket }}>{children}</SocketContext.Provider>;
};

export function useSocket(): ISocketContext {
  return useContext(SocketContext);
}
