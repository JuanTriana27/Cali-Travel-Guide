import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';
import './contactenos.css';

// Inicializa EmailJS con tu ID
emailjs.init('ocCME3mw3tE_Fhlkk');

const Contactenos = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // Guardar en MongoDB
      const dbResponse = await fetch('/.netlify/functions/saveContact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!dbResponse.ok) throw new Error('Error al guardar');

      // Enviar email
      await emailjs.send(
        'service_0mtghnm',
        'template_bx4u3em',
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_email: 'trianajuan28@gmail.com'
        }
      );

      alert(t('contactenos.success'));
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      alert(`${t('contactenos.error')}: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="contact-container">
      <div className="contact-card">
        {/* Sección del Formulario */}
        <div className="form-section">
          <h2>{t('contactenos.writeUs')}</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>{t('contactenos.fullName')}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contactenos.fullNamePlaceholder')}
                required
              />
            </div>
            <div className="input-group">
              <label>{t('contactenos.email')}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contactenos.emailPlaceholder')}
                required
              />
            </div>
            <div className="input-group">
              <label>{t('contactenos.message')}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contactenos.messagePlaceholder')}
                rows="5"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSending}
            >
              {isSending ? t('contactenos.sending') : t('contactenos.send')}
            </button>
          </form>
        </div>

        {/* Sección de Información de Contacto */}
        <div className="info-section">
          <h3>{t('contactenos.directContact')}</h3>
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <div>
              <h4>{t('contactenos.mainOffice')}</h4>
              <p>{t('contactenos.address')}</p>
            </div>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone-alt"></i>
            <div>
              <h4>{t('contactenos.phone')}</h4>
              <p>{t('contactenos.phoneNumber')}</p>
            </div>
          </div>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <div>
              <h4>{t('contactenos.emailTitle')}</h4>
              <p>{t('contactenos.emailAddress')}</p>
            </div>
          </div>
          <div className="contact-item">
            <i className="fas fa-clock"></i>
            <div>
              <h4>{t('contactenos.hours')}</h4>
              <p>{t('contactenos.hoursText')}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contactenos;
