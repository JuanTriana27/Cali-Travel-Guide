import React from "react";
import "../Footer/footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Columna 1 */}
                <div className="footer-column">
                    <h3>Visítenos</h3>
                    <p>Monumento Cristo Rey<br />Cali, Valle del Cauca<br />Colombia</p>
                    <button className="footer-button">Más información</button>
                </div>

                {/* Columna 2 */}
                <div className="footer-column">
                    <h3>Enlaces útiles</h3>
                    <ul>
                        {/* <li><a href="#">Historia</a></li>
                        <li><a href="#">Horarios</a></li>
                        <li><a href="#">Galería</a></li>
                        <li><a href="#">Contactos</a></li> */}
                    </ul>
                </div>

                {/* Columna 3 */}
                <div className="footer-column">
                    <h3>Redes Sociales</h3>
                    <div className="footer-socials">
                        <ul>
                            {/* <li><a href="#"><i className="fab fa-instagram">Instagram</i></a></li>
                            <li><a href="#"><i className="fab fa-facebook">Facebook</i></a></li>
                            <li><a href="#"><i className="fab fa-twitter">X</i></a></li>
                            <li><a href="#"><i className="fab fa-youtube">Youtube</i></a></li> */}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Barra inferior */}
            <div className="footer-bottom">
                <p>Cali Travel Guide © 2024</p>
                {/* <a href="#">Política de privacidad</a> | <a href="#">Términos y condiciones</a> */}
            </div>
        </footer>
    );
};

export default Footer;
