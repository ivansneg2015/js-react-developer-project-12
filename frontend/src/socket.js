import { io } from 'socket.io-client';
import { createContext } from 'react';

const socket = io();
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default socket;
