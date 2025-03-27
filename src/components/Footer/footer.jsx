import React from "react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Traduccion
import "../Footer/footer.css"; // Estilos específicos del footer

const Footer = () => {
    const { t } = useTranslation(); // Hook para traducciones

    return (
        <footer className="footer">
            <div className="footerContainer">
                {/* Columna 1: Información de contacto y ubicación */}
                <div className="footerColumn">
                    <h3>{t('footer.visitUs')}</h3>
                    <p>
                        {t('footer.addressLine1')}<br />
                        {t('footer.addressLine2')}<br />
                        {t('footer.addressLine3')}
                    </p>
                    <li><Link to="/historia"><button className="footerButton">{t('footer.moreInfo')}</button></Link></li>
                </div>

                {/* Columna 2: Enlaces útiles */}
                <div className="footerColumn">
                    <h3>{t('footer.usefulLinks')}</h3>
                    <ul>
                        <li><Link to="/horarios">{t('footer.schedule')}</Link></li>
                        <li><Link to="/fotografias">{t('footer.gallery')}</Link></li>
                        <li><Link to="/contactenos">{t('footer.contactUs')}</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;