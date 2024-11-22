import React from "react"; // Importar la librería React
import { Link } from 'react-router-dom'; // Link para navegación
import "./navbar.css"; // Estilos del Navbar

// Componente Navbar
const Navbar = () => (
  <nav className="navbar">
    <h1><Link to="/ " className="navbarTittle">CALI TRAVEL GUIDE</Link></h1>

    {/* Checkbox para el menú hamburguesa */}
    <input type="checkbox" id="menuToggle" />
    <label htmlFor="menuToggle" id="menuIcon">☰</label>

    {/* Menú */}
    <ul className="navbarMenu" id="menuIconAcction">
      <li><Link to="/" className="navbarLink">INICIO</Link></li> {/* Redirige al Home */}
      <li>LUGARES</li>
      <li>CONTACTENOS</li>
    </ul>
  </nav>
);

// Exportar el componente Navbar
export default Navbar;