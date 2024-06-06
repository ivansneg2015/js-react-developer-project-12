import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useModal, useAuth, useSelectedChannel } from '../../../hooks/hooks';
import { selectDefaultChannel } from '../../../slices/channelsSlice';
import { closeModal } from '../../../slices/modalSlice';
import { useRemoveChannelMutation } from '../../../services/channelsApi';

const RemoveChannelComponent = () => {
  const { t } = useTranslation();
  const modal = useModal();
  const auth = useAuth();
  const selectedChannel = useSelectedChannel();
  const dispatch = useDispatch();
  const defaultChannelId = useSelector((state) => state.channels.defaultChannelId);

  const [removeChannel] = useRemoveChannelMutation();

  const channel = { id: modal.id, token: auth.token };

  const removeChannelFunc = async () => {
    await removeChannel(channel)
      .then(() => {
        if (selectedChannel.currentChannelId.toString() === modal.id) {
          dispatch(selectDefaultChannel());
          const channelsBox = document.getElementById('channels-box');
          if (channelsBox) {
            channelsBox.scrollTop = 0;
          }
        }
        dispatch(closeModal());
        toast.success(t('toastify.removeChannel'));
      })
      .catch(() => {
        toast.error(t('toastify.loadingError'));
      });
  };

  return (
    <Modal centered show={modal.isOpen} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('sure')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" type="button" onClick={() => dispatch(closeModal())}>{t('cancel')}</Button>
          <Button
            variant="danger"
            type="button"
            onClick={removeChannelFunc}
          >
            {t('delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelComponent;

