import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cristoReyImage from '../../assets/imagenes/Image14.jpg';
import '../Lugares/lugares.css';

const Lugares = () => {
  const { t } = useTranslation();

  return (
    <div className="lugares-container">
      <h1 className="lugares-title">{t('lugares.title')}</h1>

      <div className="lugares-grid">
        <div className="lugar-card destacado">
          <img
            src={cristoReyImage}
            alt={t('lugares.cristoReyAlt')}
            className="lugar-image"
          />
          <div className="lugar-content">
            <h2>{t('lugares.cristoReyTitle')}</h2>
            <p>{t('lugares.cristoReyDescription')}</p>
            <Link to="/historia" className="lugar-button">
              {t('lugares.details')}
            </Link>
          </div>
        </div>

        <div className="proximamente-container">
          <div className="proximamente-card">
            <div className="coming-soon">
              <span>🚧</span>
              <h3>{t('lugares.comingSoonTitle')}</h3>
              <p>{t('lugares.comingSoonDescription')}</p>
              <div className="dots-animation">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lugares;
