import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './contactenos.css';

// Configuración EmailJS con tus IDs reales
emailjs.init('ocCME3mw3tE_Fhlkk');

const Contactenos = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.send(
      'service_0mtghnm',
      'template_bx4u3em',
      {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
        to_email: 'trianajuan28@gmail.com'
      }
    )
    .then(() => {
      alert('🎉 Mensaje enviado con éxito!');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      console.error('Error detallado:', error);
      alert('❌ Error: ' + error.text || 'Intenta nuevamente');
    })
    .finally(() => setIsSending(false));
  };

  return (
    <main className="contact-container">
      <div className="contact-card">
        {/* Sección del Formulario */}
        <div className="form-section">
          <h2>Escríbenos</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Nombre completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                required
              />
            </div>

            <div className="input-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>

            <div className="input-group">
              <label>Tu mensaje</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí..."
                rows="5"
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSending}
            >
              {isSending ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </div>

        {/* Sección de Información de Contacto */}
        <div className="info-section">
          <h3>Contacto Directo</h3>
          
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <div>
              <h4>Oficina Principal</h4>
              <p>Carrera 24 #52-01<br/>Cali, Valle del Cauca</p>
            </div>
          </div>

          <div className="contact-item">
            <i className="fas fa-phone-alt"></i>
            <div>
              <h4>Teléfono</h4>
              <p>+57 (602) 555-1234</p>
            </div>
          </div>

          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <div>
              <h4>Correo Electrónico</h4>
              <p>contacto@calitravelguide.com</p>
            </div>
          </div>

          <div className="contact-item">
            <i className="fas fa-clock"></i>
            <div>
              <h4>Horarios</h4>
              <p>Lun-Vie: 8AM - 6PM<br/>Sáb: 9AM - 1PM</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contactenos;