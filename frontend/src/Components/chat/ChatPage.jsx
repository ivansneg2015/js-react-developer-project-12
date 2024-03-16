import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { addMessages } from '../../slices/messagesSlice.js';
import { loadChannels } from '../../slices/channelsSlice.js';
import ChannelsBox from '../channels/ChannelsBox.jsx';
import getModalComponent from '../modals/index.js';
import ChatBox from './ChatBox.jsx';
import routes from '../routes.js';
import { useAuth } from '../../hooks/index.js';

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(true);
  const type = useSelector((state) => state.modals.type);
  const { getAuthToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { channels, messages },
        } = await axios.get(routes.usersPath(), {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        });

        dispatch(loadChannels(channels));
        dispatch(addMessages(messages));
        setFetching(false);
      } catch (error) {
        if (error.isAxiosError) {
          console.error(error.response.status);
          toast.error(t('notifications.notАuthorized'));
        }
        if (error.response.status === 401) {
          toast.error(t('notifications.notАuthorized'));
          navigate(`${routes.chatPageLogin}`);
        } else {
          toast.error(t('notifications.another'));
        }
      }
    };
    fetchData();
  }, [dispatch, getAuthToken, t, navigate]);

  return fetching ? (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">{t('spinner')}</span>
      </Spinner>
    </div>
  ) : (
    <>
      {getModalComponent(type)}
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <ChannelsBox />
          </div>
          <div className="col p-0 h-100">
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatPage;
