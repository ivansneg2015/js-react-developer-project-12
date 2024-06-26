import { io } from 'socket.io-client';
import { createContext } from 'react';

export const socket = io();
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
);
