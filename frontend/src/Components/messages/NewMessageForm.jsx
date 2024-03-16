import React, { useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAuth, useFilter, useSocket } from '../../hooks/index.js';
import SendMessageIcon from '../../icons/SendMessagesIcons.jsx';

const NewMessageForm = () => {
  const filterWords = useFilter();
  const { t } = useTranslation();
  const socket = useSocket();
  const {
    user: { username },
  } = useAuth();
  const inputRef = useRef(null);

  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );

  const formik = useFormik({
    initialValues: { messageBody: '' },
    onSubmit: async ({ messageBody }, { resetForm }) => {
      try {
        await socket.newMessage({
          body: filterWords(messageBody),
          channelId: currentChannelId,
          username,
        });

        inputRef.current.focus();
        resetForm();
      } catch (error) {
        console.error(error);
      } finally {
        inputRef.current.focus();
      }
    },
    validationSchema: yup.object().shape({
      messageBody: yup.string().required(),
    }),
  });

  useEffect(() => {
    if (!formik.isSubmitting) {
      inputRef.current.focus();
    }
  }, [formik.isSubmitting, currentChannelId]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        onSubmit={formik.handleSubmit}
        noValidate
        className="py-1 border rounded-2"
      >
        <Form.Group className="input-group">
          <Form.Control
            ref={inputRef}
            name="messageBody"
            autoComplete="off"
            aria-label={t('chat.newMessage')}
            placeholder={t('chat.newMessagePlaceholder')}
            className="border-0 p-0 ps-2"
            onChange={formik.handleChange}
            value={formik.values.messageBody}
            disabled={formik.isSubmitting}
          />
          <Button
            type="submit"
            variant="light"
            className="border-0"
            disabled={formik.isSubmitting}
          >
            <SendMessageIcon />
            <span className="visually-hidden">{t('send')}</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewMessageForm;
