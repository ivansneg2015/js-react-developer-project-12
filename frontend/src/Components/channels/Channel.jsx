import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Channel = ({
  channel,
  handleChoose,
  currentChannelId,
  handleRemoveChannel,
  handleRenameChannel,
}) => {
  const { t } = useTranslation();
  const variant = channel.id === currentChannelId ? 'secondary' : null;

  return (
    <li key={channel.id} className="nav-item w-100">
      {channel.removable ? (
        <div role="group" className="d-flex dropdown btn-group">
          <Button
            type="button"
            key={channel.id}
            className="w-100 rounded-0 text-start text-truncate"
            onClick={() => handleChoose(channel.id)}
            variant={variant}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          <Dropdown as={ButtonGroup} className="d-flex">
            <Dropdown.Toggle split className="flex-grow-0" variant={variant}>
              <span className="visually-hidden">{t('channels.menu')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleRemoveChannel(channel.id)}>
                {t('channels.remove')}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleRenameChannel(channel.id)}>
                {t('channels.rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ) : (
        <Button
          type="button"
          key={channel.id}
          className="w-100 rounded-0 text-start"
          onClick={() => handleChoose(channel.id)}
          variant={variant}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      )}
    </li>
  );
};

export default Channel;
