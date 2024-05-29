import { useTranslation } from 'react-i18next';
import notFoundImage from '../assets/404.jpg';
const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt={t('mainComponents.notFound')} className="img-fluid" src={notFoundImage} />
      <h1 className="h4 text-muted">{t('mainComponents.notFound')}</h1>
      <p className="text-muted">
        {t('mainComponents.but')}
        {' '}
        <a href="/">{t('mainComponents.toMainPage')}</a> {`./App.jsx`}
      </p>
    </div>
  );
};

export default NotFoundPage;
