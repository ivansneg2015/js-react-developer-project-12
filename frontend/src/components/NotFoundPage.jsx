import React from 'react';
import { useTranslation } from 'react-i18next';
import notFoundImage from '../assets/404.jpg';
import routes from '../routes';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt={t('mainComponents.notFound')} className="img-fluid" src={notFoundImage} />
      <h1 className="h4 text-muted">{t('mainComponents.notFound')}</h1>
      <p className="text-muted">
        {t('mainComponents.but')}
        <a href={routes.chatPage()}>{t('mainComponents.toMainPage')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
