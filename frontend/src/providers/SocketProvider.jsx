/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext, useMemo,
} from 'react';

export const SocketContext = createContext({});
const SocketProvider = ({ socket, children }) => {
  const newMessage = async (messageData) => {
    await socket.emitWithAck('newMessage', messageData);
  };

  const newChannel = async (newNameChannel) => socket.emitWithAck('newChannel', {
    name: newNameChannel,
  });

  const removeChannel = async (channelId) => socket.emitWithAck('removeChannel', { id: channelId });

  const renameChannel = async (channelId, newNameChannel) => socket.emitWithAck('renameChannel', { id: channelId, name: newNameChannel });

  const context = useMemo(
    () => ({
      newMessage,
      newChannel,
      removeChannel,
      renameChannel,
    }),
    [newMessage, newChannel, removeChannel, renameChannel],
  );

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};
export default SocketProvider;
