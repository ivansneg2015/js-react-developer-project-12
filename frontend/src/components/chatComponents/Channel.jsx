import React from 'react';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSelectedChannel, useModal } from '../../hooks/hooks.js';
import { selectCurrentChannel } from '../../slices/channelsSlice.js';
import getModalComponent from './modals/index.js';
import { openModal } from '../../slices/modalSlice.js';

const Channel = ({ data }) => {
  const { t } = useTranslation();
  const { id, name, removable } = data;
  const modal = useModal();
  const selectedChannel = useSelectedChannel();
  const dispatch = useDispatch();

  const selectChannel = async (channel) => {
    const messageEnd = document.getElementById('messageEnd');
    await dispatch(selectCurrentChannel(channel));
    messageEnd.scrollIntoView();
  };

  const buttonClass = Number(id) !== selectedChannel.currentChannelId
    ? 'w-100 rounded-0 text-start btn'
    : 'w-100 rounded-0 text-start btn btn-secondary';

  if (!removable) {
    return (
      <li id={id} className="nav-item w-100">
        <button
          onClick={() => selectChannel(data)}
          type="button"
          className={buttonClass}
        >
          <span className="me-1">#</span>
          {name}
        </button>
      </li>
    );
  }

  const dropdownToggleClass = Number(id) !== selectedChannel.currentChannelId
    ? 'light'
    : 'secondary';

  return (
    <li id={id} className="nav-item w-100">
      {getModalComponent(modal.type)}
      <Dropdown className="d-flex btn-group" as={ButtonGroup}>
        <button
          onClick={() => selectChannel(data)}
          type="button"
          className={`${buttonClass} text-truncate`}
        >
          <span className="me-1">#</span>
          {name}
        </button>
        <Dropdown.Toggle
          variant={dropdownToggleClass}
          className="flex-grow-0 dropdown-toggle-split"
        >
          <span className="visually-hidden">
            {t('chatComponents.channelControls')}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => dispatch(openModal({ type: 'removeChannel', id }))}
          >
            {t('delete')}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => dispatch(openModal({ type: 'renameChannel', id }))}
          >
            {t('rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

export default Channel;
