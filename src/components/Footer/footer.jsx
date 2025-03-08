import React from "react"; // Importamos la librería de react
import "../Footer/footer.css"; // Importamos el archivo css
import { Link } from 'react-router-dom'; // Importamos Link para poder navegar entre páginas

// Creamos el componente Footer
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footerContainer">

                {/* Columna 1 */}
                <div className="footerColumn">
                    <h3>Visítenos</h3>
                    <p>Monumento Cristo Rey<br />Cali, Valle del Cauca<br />Colombia</p>
                    <button className="footerButton">Más información</button>
                </div>

                {/* Columna 2 */}
                <div className="footerColumn">
                    <h3>Enlaces útiles</h3>
                    <ul>
                        <li><Link to="/horarios">Horarios</Link></li>
                        <li><Link to="/fotografias">Galería</Link></li>
                        <li><Link to="/contactenos">Contactenos</Link></li>
                    </ul>
                </div>

                {/* Columna 3 */}
                <div className="footerColumn">
                    <h3>Redes Sociales</h3>
                    <div className="footerSocials">
                        <ul>
                            <li><a href="https://www.instagram.com"><i className="fab fa-instagram">Instagram</i></a></li>
                            <li><a href="https://www.facebook.com"><i className="fab fa-facebook">Facebook</i></a></li>
                            <li><a href="https://x.com"><i className="fab fa-twitter">X</i></a></li>
                            <li><a href="https://www.youtube.com"><i className="fab fa-youtube">Youtube</i></a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Barra inferior */}
            <div className="footerBottom">
                <p>Cali Travel Guide © 2024</p>
                <a href="https://www.google.com/search?client=opera&q=terminos+y+condiciones&sourceid=opera&ie=UTF-8&oe=UTF-8">Política de privacidad</a> |
                <a href="https://www.google.com/search?client=opera&q=terminos+y+condiciones&sourceid=opera&ie=UTF-8&oe=UTF-8">Términos y condiciones</a>
            </div>
        </footer>
    );
};

// Exportamos el componente Footer
export default Footer;
