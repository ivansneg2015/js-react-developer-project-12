import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSelectedChannel, useModal } from '../../hooks/hooks';
import { selectCurrentChannel, selectDefaultChannel } from '../../slices/channelsSlice';
import getModalComponent from './modals';
import { openModal } from '../../slices/modalSlice';

const Channel = ({ data }) => {
  const { t } = useTranslation();
  const { id, name, removable } = data;
  const modal = useModal();
  const selectedChannel = useSelectedChannel();
  const dispatch = useDispatch();
  const selectedChannelId = useSelector((state) => state.channels.selectedChannel.currentChannelId);

  const selectChannel = async (channel) => {
    await dispatch(selectCurrentChannel(channel));
    const messageEnd = document.getElementById('messageEnd');
    if (messageEnd) {
      messageEnd.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRemoveChannel = () => {
    if (selectedChannelId === id) {
      dispatch(selectDefaultChannel());
    }
    dispatch(openModal({ type: 'removeChannel', id }));
  };

  if (!removable) {
    return (
      <li id={id} className="nav-item w-100">
        <button
          onClick={() => selectChannel(data)}
          type="button"
          className={
            Number(id) !== selectedChannelId
              ? 'w-100 rounded-0 text-start btn'
              : 'w-100 rounded-0 text-start btn btn-secondary'
          }
        >
          <span className="me-1">#</span>
          {name}
        </button>
      </li>
    );
  }

  return (
    <li id={id} className="nav-item w-100">
      {getModalComponent(modal.type)}
      <Dropdown className="d-flex btn-group" as={ButtonGroup}>
        <button
          onClick={() => selectChannel(data)}
          className={`w-100 rounded-0 text-start ${
            Number(id) !== selectedChannelId
              ? ''
              : 'text-truncate btn btn-secondary'
          }`}
          type="button"
        >
          <span className="me-1">#</span>
          {name}
        </button>
        <Dropdown.Toggle
          variant={
            Number(id) !== selectedChannelId
              ? 'light'
              : 'secondary'
          }
          className="flex-grow-0 dropdown-toggle-split"
        >
          <span className="visually-hidden">
            {t('chatComponents.channelControls')}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleRemoveChannel}>
            {t('delete')}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(openModal({ type: 'renameChannel', id }))}>
            {t('rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

export default Channel;


