import React from "react";
import { Link } from 'react-router-dom';
import "./navbar.css";

const Navbar = () => {
  // Función para cerrar el menú
  const closeMenu = () => {
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) menuToggle.checked = false;
  };

  return (
    <nav className="navbar">
      <h1><Link to="/" className="navbarTittle">CALI TRAVEL GUIDE</Link></h1>

      <input type="checkbox" id="menuToggle" />
      <label htmlFor="menuToggle" id="menuIcon">☰</label>

      <ul className="navbarMenu" id="menuIconAcction">
        <li><Link to="/" className="navbarLink" onClick={closeMenu}>INICIO</Link></li>
        <li><Link to="/lugares" className="navbarLink" onClick={closeMenu}>LUGARES</Link></li>
        <li><Link to="/contactenos" className="navbarLink" onClick={closeMenu}>CONTACTENOS</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;