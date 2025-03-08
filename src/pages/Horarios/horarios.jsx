import React from 'react';
import { Link } from 'react-router-dom';
import '../Horarios/horarios.css';

const Horarios = () => {
    return (
        <div className="horarios-container">
            <header className="horarios-header">
                <h1>Ecoparque Cristo Rey - Visita 2025</h1>
                <Link to="/lugares" className="back-link">
                    ← Volver a Lugares
                </Link>
            </header>

            <div className="content-wrapper">
                {/* Sección de Información Principal */}
                <div className="info-section">
                    <div className="schedule-card">
                        <div className="schedule-section">
                            <h2><i className="fas fa-calendar-check"></i> Horarios de Visita</h2>
                            <div className="highlight-box">
                                <p><strong>Reapertura:</strong> 2 de Enero 2025</p>
                                <p><strong>Administración:</strong> Dagma</p>
                                <p><strong>Entrada:</strong> Gratuita con registro previo</p>
                            </div>

                            <div className="time-grid">
                                <div className="time-slot">
                                    <span className="time">9:00 AM</span>
                                    <span className="slot-label">Primer Turno</span>
                                </div>
                                <div className="time-slot">
                                    <span className="time">12:00 PM</span>
                                    <span className="slot-label">Turno Mediodía</span>
                                </div>
                                <div className="time-slot">
                                    <span className="time">3:00 PM</span>
                                    <span className="slot-label">Turno Tarde</span>
                                </div>
                            </div>
                            <p className="note">* Presentarse 15 minutos antes del turno asignado</p>
                        </div>

                        <div className="requirements-section">
                            <h2><i className="fas fa-clipboard-check"></i> Requisitos Obligatorios</h2>
                            <ul>
                                <li><i className="fas fa-qrcode"></i> Registro previo en plataforma web</li>
                                <li><i className="fas fa-id-card"></i> Documento de identidad original</li>
                                <li><i className="fas fa-paw"></i> Mascotas con collar y correa</li>
                            </ul>
                        </div>
                    </div>

                    <div className="registration-section">
                        <h2><i className="fas fa-mobile-alt"></i> Proceso de Registro</h2>
                        <div className="steps-container">
                            <div className="step">
                                <div className="step-number">1</div>
                                <p>Visite el portal oficial:<br />
                                    <a href="https://www.cali.gov.co/dagma" target="_blank" rel="noopener noreferrer">www.cali.gov.co/dagma</a></p>
                            </div>
                            <div className="step">
                                <div className="step-number">2</div>
                                <p>Complete el formulario en:<br />
                                    <a href="https://registerapp.testweb2024.com" target="_blank" rel="noopener noreferrer">registerapp.testweb2024.com</a></p>
                            </div>
                            <div className="step">
                                <div className="step-number">3</div>
                                <p>Descargue su QR válido<br />para hasta 4 personas</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección del Mapa Corregida */}
                <div className="map-section">
                    <h2><i className="fas fa-map-marked-alt"></i> Ubicación Exacta</h2>
                    <div className="map-container">
                        <iframe
                            title="Ubicación Exacta Cristo Rey"
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
                            <i className="fas fa-directions"></i> Ver Ubicación Exacta
                        </a>
                    </div>
                </div>
            </div>

            <div className="important-notice">
                <i className="fas fa-exclamation-triangle"></i>
                <p>Horarios sujetos a cambios por condiciones climáticas. Verifique actualizaciones antes de su visita.</p>
            </div>
        </div>
    );
};

export default Horarios;