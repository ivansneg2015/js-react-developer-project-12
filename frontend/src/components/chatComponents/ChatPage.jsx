import React from 'react';
import ChannelsComponent from './ChannelsComponent.jsx';
import MessagesComponent from './MessagesComponent.jsx';
import DataLoader from '../../utils/DataLoader.js';
import CheckTokenPage from '../../utils/CheckTokenPage.js';

const ChatPage = () => (
  <CheckTokenPage>
    <DataLoader>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <ChannelsComponent />
          <MessagesComponent />
        </div>
      </div>
    </DataLoader>
  </CheckTokenPage>
);

export default ChatPage;
