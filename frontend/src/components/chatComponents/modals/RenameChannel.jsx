import React, { useRef, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import leoProfanity from 'leo-profanity';
import { closeModal } from '../../../slices/modalSlice.js';
import { selectCurrentChannel } from '../../../slices/channelsSlice.js';
import { useEditChannelMutation } from '../../../services/channelsApi.js';

const RenameChannelComponent = ({ modal, selectedChannel, channels }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const addChannelRef = useRef();

  useEffect(() => {
    addChannelRef.current.focus();
  }, []);

  const [editChannel] = useEditChannelMutation();

  const channelsNames = channels.map((channel) => channel.name);

  const validationSchema = Yup.object().shape({
    channelName: Yup.string()
      .trim()
      .required(t('yup.required'))
      .min(3, t('yup.minAndMax'))
      .max(20, t('yup.minAndMax'))
      .notOneOf(channelsNames, t('yup.notOneOf')),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const clearedName = leoProfanity.clean(values.channelName);
      const newChannel = {
        id: modal.id,
        body: { name: clearedName },
      };
      await editChannel(newChannel).unwrap();
      dispatch(closeModal());
      if (selectedChannel.currentChannelId.toString() === modal.id) {
        dispatch(
          selectCurrentChannel({
            id: selectedChannel.currentChannelId,
            name: values.channelName,
          })
        );
      }
      toast.success(t('toastify.renameChannel'));
    } catch (error) {
      toast.error(t('toastify.loadingError'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal centered show={modal.isOpen} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title h4="true">{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ channelName: selectedChannel.name }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body>
              <Field
                className="mb-2"
                id="channelName"
                name="channelName"
                required=""
                ref={addChannelRef}
                autoFocus
                onFocus={(e) => e.target.select()}
                as="input"
              />
              <ErrorMessage name="channelName" component="div" className="invalid-feedback" />
              <div className="d-flex justify-content-end">
                <Button className="me-2" variant="secondary" type="button" onClick={() => dispatch(closeModal())}>
                  {t('cancel')}
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {t('send')}
                </Button>
              </div>
            </Modal.Body>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default RenameChannelComponent;