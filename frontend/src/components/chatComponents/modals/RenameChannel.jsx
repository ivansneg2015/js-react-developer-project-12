import { Modal, Button, Form } from 'react-bootstrap';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useUpdateChannelMutation } from '../../../services/channelsApi.js';
import { closeModal } from '../../../slices/modalSlice.js';
import { selectCurrentChannel } from '../../../slices/channelsSlice.js';
import { useSelectedChannel } from '../../../hooks/hooks';

const RenameChannelComponent = () => {
  const { t } = useTranslation();
  const selectedChannel = useSelectedChannel();
  const dispatch = useDispatch();
  const [updateChannel] = useUpdateChannelMutation();
  const channels = useSelector(state => state.channels.data);
  const channelsNames = channels.map(channel => channel.name);
  
  const validationSchema = Yup.object().shape({
    channelName: Yup.string()
      .trim()
      .required(t('yup.required'))
      .min(3, t('yup.minAndMax'))
      .max(20, t('yup.minAndMax'))
      .notOneOf([...channelsNames], t('yup.notOneOf')),
  });

  useEffect(() => {
    // Устанавливаем фокус и выделяем текст в поле ввода при открытии модального окна
    const inputField = document.getElementById('channelName');
    if (inputField) {
      inputField.focus();
      inputField.select();
    }
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const clearedName = leoProfanity.clean(values.channelName);
      const newChannel = {
        id: selectedChannel.id,
        body: { name: clearedName },
      };
      await updateChannel(newChannel);
      dispatch(closeModal());
      dispatch(selectCurrentChannel({ id: selectedChannel.id, name: values.channelName }));
      toast.success(t('toastify.renameChannel'));
    } catch (e) {
      toast.error(t('toastify.loadingError'));
    }
  };

  return (
    <Modal centered show={modal.isOpen} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title h4="true">{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: selectedChannel.name }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Control
                className="mb-2"
                id="channelName"
                name="channelName"
                required=""
                onChange={handleChange}
                value={values.channelName}
                isInvalid={!!errors.channelName}
                autoFocus // Устанавливаем фокус на поле ввода при открытии модального окна
                onFocus={(e) => e.target.select()} // Выделяем текст в поле ввода при получении фокуса
              />
              <Form.Control.Feedback type="invalid">
                {errors.channelName}
              </Form.Control.Feedback>
              <div className="d-flex justify-content-end">
                <Button className="me-2" variant="secondary" type="button" onClick={() => dispatch(closeModal())}>{t('cancel')}</Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>{t('send')}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelComponent;
