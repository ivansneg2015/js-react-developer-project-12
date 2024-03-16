import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { animateScroll } from 'react-scroll';
import Channel from './Channel.jsx';
import Channelicon from '../../icons/Channelicon.jsx';
import { openModal } from '../../slices/modalsSlice.js';
import { selectorsChannels, setCurrentChannel, defaultChannelId } from '../../slices/channelsSlice.js';

const ChannelsBox = () => {
  const { t } = useTranslation();
  const channels = useSelector(selectorsChannels.selectAll);
  const dispatch = useDispatch();

  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );

  const lastChannelId = useSelector(selectorsChannels.selectAll).at(-1).id;
  useEffect(() => {
    const argument = { containerId: 'channels-box', delay: 0, duration: 0 };
    if (currentChannelId === defaultChannelId) {
      animateScroll.scrollToTop(argument);
    } if (currentChannelId === lastChannelId) {
      animateScroll.scrollToBottom(argument);
    }
  }, [currentChannelId, lastChannelId]);

  const handleAddChannel = () => dispatch(openModal({ type: 'addChannel' }));

  const handleChoose = (id) => dispatch(setCurrentChannel(id));

  const handleRemoveChannel = (id) => dispatch(
    openModal({
      type: 'removeChannel',
      extra: { channalId: id },
    }),
  );
  const handleRenameChannel = (id) => dispatch(
    openModal({
      type: 'renameChannel',
      extra: { channalId: id },
    }),
  );
  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={handleAddChannel}
        >
          <Channelicon />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            handleChoose={handleChoose}
            currentChannelId={currentChannelId}
            handleRemoveChannel={handleRemoveChannel}
            handleRenameChannel={handleRenameChannel}
          />
        ))}
      </ul>
    </>
  );
};
export default ChannelsBox;
