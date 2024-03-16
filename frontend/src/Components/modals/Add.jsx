import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { selectorsChannels, setCurrentChannel } from '../../slices/channelsSlice.js';
import { closeModal } from '../../slices/modalsSlice.js';
import { useSocket, useFilter } from '../../hooks/index';

const Add = () => {
  const { t } = useTranslation();
  const socket = useSocket();
  const inputRef = useRef(null);
  const filterWords = useFilter();
  const dispatch = useDispatch();

  const existingChannels = useSelector(selectorsChannels.selectAll).map(
    ({ name }) => name,
  );
  const isOpened = useSelector((state) => state.modals.isOpened);

  const handlerClose = () => dispatch(closeModal());

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: { name: '' },

    validationSchema: yup.object().shape({
      name: yup
        .string()
        .trim()
        .required(t('validation.emptyField'))
        .min(3, t('validation.minMaxsimSymbols'))
        .max(20, t('validation.minMaxsimSymbols'))
        .test(
          'is-unique',
          t('validation.uniqueness'),
          (value) => !existingChannels.includes(value),
        ),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ name }, { resetForm }) => {
      const filteredNameChannel = filterWords(name);

      try {
        const { data: { id } } = await socket.newChannel(filteredNameChannel);
        toast.success(t('notifications.addChannel'));
        dispatch(setCurrentChannel(id));
        resetForm();
      } catch (error) {
        toast.error(t('notifications.errorAddChannel'));
      } finally {
        handlerClose();
      }
    },
  });

  return (
    <Modal show={isOpened} centered>
      <Modal.Header closeButton onHide={handlerClose}>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              data-testid="input-name"
              name="name"
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Label visuallyHidden>{t('modals.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlerClose}>
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
export default Add;
