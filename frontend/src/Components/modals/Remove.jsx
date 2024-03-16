import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../slices/modalsSlice.js';
import { useSocket } from '../../hooks/index.js';

const Remove = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const socket = useSocket();
  const isOpened = useSelector((state) => state.modals.isOpened);
  const channalId = useSelector((state) => state.modals.extra.channalId);

  const handleClose = () => dispatch(closeModal());
  const handleRemove = async () => {
    setLoading(true);
    try {
      await socket.removeChannel(channalId);
      toast.success(t('notifications.removeChannel'));
      dispatch(closeModal());
    } catch (error) {
      toast.error(t('notifications.errorRemoveChannel'));
      setLoading(false);
    }
  };

  return (
    <Modal show={isOpened} centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirmSure')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
            disabled={loading}
          >
            {t('modals.cancel')}
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemove}
            disabled={loading}
          >
            {t('modals.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default Remove;
