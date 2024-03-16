import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { selectorsChannels } from '../../slices/channelsSlice.js';
import { closeModal } from '../../slices/modalsSlice.js';
import { useSocket, useFilter } from '../../hooks';

const Rename = () => {
  const filterWords = useFilter();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socket = useSocket();
  const inputRef = useRef(null);
  const channalId = useSelector((state) => state.modals.extra.channalId);
  const existingChannels = useSelector(selectorsChannels.selectAll).map(
    ({ name }) => name,
  );

  const oldNameChannel = useSelector(selectorsChannels.selectAll).find(({ id }) => id === channalId)?.name || '';

  const formik = useFormik({
    initialValues: { name: oldNameChannel },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required(t('validation.required'))
        .min(3, t('validation.min'))
        .max(20, t('validation.max'))
        .notOneOf(existingChannels, t('validation.notOneOf')),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ name }) => {
      const filteredRename = filterWords(name);
      try {
        await socket.renameChannel(channalId, filteredRename);
        toast.success(t('notifications.renameChannel'));
        dispatch(closeModal());
      } catch (error) {
        toast.error(t('notifications.errorRenameChannel'));
      }
    },
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show centered onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} controlid="name">
          <Form.Group>
            <Form.Control
              type="text"
              ref={inputRef}
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              disabled={formik.isSubmitting}
              name="name"
              isInvalid={formik.errors.name}
            />
            <Form.Label htmlFor="name" visuallyHidden>
              {t('modals.channelName')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => dispatch(closeModal())}
            >
              {t('modals.cancel')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={formik.isSubmitting}
            >
              {t('modals.send')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
