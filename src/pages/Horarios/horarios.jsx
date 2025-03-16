import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../Horarios/horarios.css';

const Horarios = () => {
  const { t } = useTranslation();

  return (
    <div className="horarios-container">
      <header className="horarios-header">
        <h1>{t('horarios.title')}</h1>
        <Link to="/lugares" className="back-link">
          {t('horarios.backLink')}
        </Link>
      </header>

      <div className="content-wrapper">
        {/* Sección de Información Principal */}
        <div className="info-section">
          <div className="schedule-card">
            <div className="schedule-section">
              <h2>
                <i className="fas fa-calendar-check"></i> {t('horarios.scheduleTitle')}
              </h2>
              <div className="highlight-box">
                <p>
                  <strong>{t('horarios.reopenLabel')}:</strong> {t('horarios.reopenDate')}
                </p>
                <p>
                  <strong>{t('horarios.adminLabel')}:</strong> {t('horarios.adminName')}
                </p>
                <p>
                  <strong>{t('horarios.entryLabel')}:</strong> {t('horarios.entryInfo')}
                </p>
              </div>

              <div className="time-grid">
                <div className="time-slot">
                  <span className="time">9:00 AM</span>
                  <span className="slot-label">{t('horarios.firstShift')}</span>
                </div>
                <div className="time-slot">
                  <span className="time">12:00 PM</span>
                  <span className="slot-label">{t('horarios.middayShift')}</span>
                </div>
                <div className="time-slot">
                  <span className="time">3:00 PM</span>
                  <span className="slot-label">{t('horarios.afternoonShift')}</span>
                </div>
              </div>
              <p className="note">{t('horarios.note')}</p>
            </div>

            <div className="requirements-section">
              <h2>
                <i className="fas fa-clipboard-check"></i> {t('horarios.requirementsTitle')}
              </h2>
              <ul>
                <li>
                  <i className="fas fa-qrcode"></i> {t('horarios.req1')}
                </li>
                <li>
                  <i className="fas fa-id-card"></i> {t('horarios.req2')}
                </li>
                <li>
                  <i className="fas fa-paw"></i> {t('horarios.req3')}
                </li>
              </ul>
            </div>
          </div>

          <div className="registration-section">
            <h2>
              <i className="fas fa-mobile-alt"></i> {t('horarios.registrationTitle')}
            </h2>
            <div className="steps-container">
              <div className="step">
                <div className="step-number">1</div>
                <p>
                  {t('horarios.regStep1')}<br />
                  <a
                    href="https://www.cali.gov.co/dagma"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.cali.gov.co/dagma
                  </a>
                </p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <p>
                  {t('horarios.regStep2')}<br />
                  <a
                    href="https://registerapp.testweb2024.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    registerapp.testweb2024.com
                  </a>
                </p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <p>{t('horarios.regStep3')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección del Mapa */}
        <div className="map-section">
          <h2>
            <i className="fas fa-map-marked-alt"></i> {t('horarios.mapTitle')}
          </h2>
          <div className="map-container">
            <iframe
              title={t('horarios.mapTitle')}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.745754892363!2d-76.56711368524078!3d3.436019597517712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a500540babf1%3A0xb09e9197f74835bf!2sMonumento%20a%20Cristo%20Rey!5e0!3m2!1ses!2sco!4v1718861230431!5m2!1ses!2sco"
              className="google-map"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://www.google.com/maps/place/3.4360243,-76.5647906"
              target="_blank"
              rel="noopener noreferrer"
              className="map-button"
            >
              <i className="fas fa-directions"></i> {t('horarios.mapButton')}
            </a>
          </div>
        </div>
      </div>

      <div className="important-notice">
        <i className="fas fa-exclamation-triangle"></i>
        <p>{t('horarios.importantNotice')}</p>
      </div>
    </div>
  );
};

export default Horarios;
