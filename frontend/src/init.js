import { createInstance } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import React from 'react';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import io from 'socket.io-client';
import filter from 'leo-profanity';
import store from './slices/index.js';
import resources from './locales/index.js';
import App from './Components/App.jsx';
import FilterProvider from './providers/FilterProvider.jsx';
import SocketProvider from './providers/SocketProvider.jsx';
import { addMessage } from './slices/messagesSlice.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from './slices/channelsSlice.js';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_CODE,
  environment: 'testenv',
};

const init = async () => {
  const i18n = createInstance();
  const options = {
    resources,
    fallbackLng: 'ru',
  };
  await i18n.use(initReactI18next).init(options);

  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));

  const socket = io();

  socket.on('newMessage', (payload) => store.dispatch(addMessage(payload)));
  socket.on('newChannel', (payload) => store.dispatch(addChannel(payload)));
  socket.on('removeChannel', ({ id }) => store.dispatch(removeChannel(id)));
  socket.on('renameChannel', (channel) => store.dispatch(
    renameChannel({
      id: channel.id,
      changes: { name: channel.name },
    }),
  ));

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <SocketProvider socket={socket}>
            <FilterProvider>
              <I18nextProvider i18n={i18n}>
                <React.StrictMode>
                  <App />
                </React.StrictMode>
              </I18nextProvider>
            </FilterProvider>
          </SocketProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
