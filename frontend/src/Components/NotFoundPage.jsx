import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import routes from './routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Card className="text-center h-100">
      <Card.Body>
        <Card.Text>{t('errors.body')}</Card.Text>
        <Card.Text>{t('errors.errorName')}</Card.Text>
        <Link to={routes.chatPageLogin}>{t('errors.home')}</Link>
      </Card.Body>
    </Card>
  );
};

export default NotFoundPage;
