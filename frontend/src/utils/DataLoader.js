import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useGetChannelsQuery } from '../services/channelsApi.js';
import { useGetMessagesQuery } from '../services/messagesApi.js';
import { addChannelData } from '../slices/channelsSlice.js';
import { addMessageData } from '../slices/messagesSlice.js';
import { logOut } from '../slices/authSlice.js';
import getPath from '../routes.js';

const DataLoader = ({ children }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: channelsData,
    error: channelsError,
    isLoading: channelsLoading,
  } = useGetChannelsQuery();

  const {
    data: messagesData,
    error: messagesError,
    isLoading: messagesLoading,
  } = useGetMessagesQuery();

  useEffect(() => {
    if (channelsData) {
      dispatch(addChannelData(channelsData));
    }
    if (messagesData) {
      dispatch(addMessageData(messagesData));
    }
  }, [channelsData, messagesData, dispatch]);

  useEffect(() => {
    if (channelsError || messagesError) {
      const error = channelsError || messagesError;
      if (error.status === 401) {
        dispatch(logOut());
        navigate(getPath.loginPage());
        toast.error(t('toastify.sessionExpired'));
      } else {
        toast.error(t('toastify.loadingError'));
      }
    }
  }, [channelsError, messagesError, dispatch, navigate, t]);

  if (channelsLoading || messagesLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return children;
};

export default DataLoader;

