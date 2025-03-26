import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './llegar.css';

const MapaDesdeHotel = () => {
    const { t } = useTranslation();
    const [destination] = useState(encodeURIComponent("Hotel InterContinental, Avenida Colombia, Normandia Sebastian de Belalcazar, Cali, Valle del Cauca"));

    const handleGetDirections = () => {
        if (!navigator.geolocation) {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`, '_blank');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const origin = `${position.coords.latitude},${position.coords.longitude}`;
                const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${destination}&travelmode=driving`;
                window.open(url, '_blank');
            },
            (error) => {
                console.error('Error obteniendo ubicación:', error);
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`, '_blank');
            }
        );
    };

    return (
        <div className="llegar">
            <div className="map-section">
                <div className="llegarHeader">
                    <h2>
                        <i className="fas fa-map-marked-alt"></i> {t('llegar.ruta')}
                        <p className="fotografiasSubtitle">{t('llegar.subtitle')}</p>
                    </h2>
                </div>

                <div className="map-container">
                    <iframe
                        title={t('llegar.routeFromHotel')}
                        src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d18944.720233815842!2d-76.56834813205334!3d3.438218155709733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x8e30a66530081067%3A0x948c3ed83b5ac8d8!2sHotel%20InterContinental%2C%20Avenida%20Colombia%2C%20Normandia%20Sebastian%20de%20Belalcazar%2C%20Cali%2C%20Valle%20del%20Cauca!3m2!1d3.4500876!2d-76.539202!4m5!1s0x8e30a500540babf1%3A0xb09e9197f74835bf!2sMonumento%20a%20Cristo%20Rey%2C%20Arboledas%20Santa%20Teresita%2C%20Cali%2C%20Valle%20del%20Cauca!3m2!1d3.4360242999999997!2d-76.56479!5e0!3m2!1ses!2sco!4v1742860574153!5m2!1ses!2sco"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="google-map"
                    ></iframe>
                    <button
                        onClick={handleGetDirections}
                        className="map-button"
                    >
                        <i className="fas fa-directions"></i> {t('llegar.ubicacion')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MapaDesdeHotel;