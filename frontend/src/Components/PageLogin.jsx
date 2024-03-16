import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/index.js';
import avatar from '../assets/avatar.jpg';
import routes from './routes.js';

const PageLogin = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post(routes.loginPath(), values);
        auth.logIn(response.data);
        navigate(location.state.from);
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('errors.unknown'));
          return;
        }
        if (error.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
        } else {
          toast.error(t('errors.network'));
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={avatar} className="rounded-circle" alt={t('alt')} />
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
              >
                <h1 className="text-center mb-4">{t('submit')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    name="username"
                    value={formik.values.username}
                    id="username"
                    autoComplete="username"
                    isInvalid={authFailed}
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">{t('username')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={authFailed}
                    required
                  />
                  <Form.Label htmlFor="password">{t('password')}</Form.Label>
                  {authFailed && (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {t('validation.authFailed')}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  {t('submit')}
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('newToChat')}</span>
                {' '}
                <Link to={routes.chatSignup}>{t('signup.header')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
