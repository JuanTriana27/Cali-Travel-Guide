import React from 'react';
import Card from '../../components/Card/card.jsx';
import { useTranslation } from 'react-i18next';
import '../../pages/Home/home.css';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      <Card
        title={t('home.recorrido.title')}
        subtitle={t('home.recorrido.subtitle')}
        link="recorrido"
        imageKey="recorrido"
      />
      <Card
        title={t('home.historia.title')}
        subtitle={t('home.historia.subtitle')}
        link="/historia"
        imageKey="historia"
      />
      <Card
        title={t('home.fotografias.title')}
        subtitle={t('home.fotografias.subtitle')}
        link="fotografias"
        imageKey="fotografias"
      />
    </div>
  );
};

export default Home;
