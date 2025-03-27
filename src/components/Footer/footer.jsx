import React from "react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "../Footer/footer.css";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="footerContainer">
                <div className="footerColumn">
                    <h3>{t('footer.visitUs')}</h3>
                    <p>
                        {t('footer.addressLine1')}<br />
                        {t('footer.addressLine2')}<br />
                        {t('footer.addressLine3')}
                    </p>
                    <li><Link to="/contactenos"><button className="footerButton">{t('footer.moreInfo')}</button></Link></li>
                </div>

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
