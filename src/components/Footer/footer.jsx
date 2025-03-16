import React from "react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "../Footer/footer.css";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="footerContainer">
                {/* Columna 1 */}
                <div className="footerColumn">
                    <h3>{t('footer.visitUs')}</h3>
                    <p>
                      {t('footer.addressLine1')}<br />
                      {t('footer.addressLine2')}<br />
                      {t('footer.addressLine3')}
                    </p>
                    <button className="footerButton">{t('footer.moreInfo')}</button>
                </div>

                {/* Columna 2 */}
                <div className="footerColumn">
                    <h3>{t('footer.usefulLinks')}</h3>
                    <ul>
                        <li><Link to="/horarios">{t('footer.schedule')}</Link></li>
                        <li><Link to="/fotografias">{t('footer.gallery')}</Link></li>
                        <li><Link to="/contactenos">{t('footer.contactUs')}</Link></li>
                    </ul>
                </div>

                {/* Columna 3 */}
                <div className="footerColumn">
                    <h3>{t('footer.socialMedia')}</h3>
                    <div className="footerSocials">
                        <ul>
                            <li>
                              <a href="https://www.instagram.com">
                                <i className="fab fa-instagram">Instagram</i>
                              </a>
                            </li>
                            <li>
                              <a href="https://www.facebook.com">
                                <i className="fab fa-facebook">Facebook</i>
                              </a>
                            </li>
                            <li>
                              <a href="https://x.com">
                                <i className="fab fa-twitter">X</i>
                              </a>
                            </li>
                            <li>
                              <a href="https://www.youtube.com">
                                <i className="fab fa-youtube">Youtube</i>
                              </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Barra inferior */}
            <div className="footerBottom">
                <p>{t('footer.copyRight')}</p>
                <a href="https://www.google.com/search?client=opera&q=terminos+y+condiciones&sourceid=opera&ie=UTF-8&oe=UTF-8">
                  {t('footer.privacyPolicy')}
                </a> |
                <a href="https://www.google.com/search?client=opera&q=terminos+y+condiciones&sourceid=opera&ie=UTF-8&oe=UTF-8">
                  {t('footer.termsConditions')}
                </a>
            </div>
        </footer>
    );
};

export default Footer;
