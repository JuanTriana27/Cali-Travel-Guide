// src/components/Navbar/navbar.jsx
import React from "react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "./navbar.css";

const Navbar = () => {
  const { t, i18n } = useTranslation();

  // Función para cambiar el idioma
  const handleChangeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  // Función para cerrar el menú
  const closeMenu = () => {
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) menuToggle.checked = false;
  };

  return (
    <nav className="navbar">
      <h1>
        <Link to="/" className="navbarTittle">
          {t('titulo')}
        </Link>
      </h1>

      <input type="checkbox" id="menuToggle" />
      <label htmlFor="menuToggle" id="menuIcon">☰</label>

      <ul className="navbarMenu" id="menuIconAcction">
        <li>
          <Link to="/" className="navbarLink" onClick={closeMenu}>
            {t('navbar.inicio')}
          </Link>
        </li>
        <li>
          <Link to="/lugares" className="navbarLink" onClick={closeMenu}>
            {t('navbar.lugares')}
          </Link>
        </li>
        <li>
          <Link to="/contactenos" className="navbarLink" onClick={closeMenu}>
            {t('navbar.contactenos')}
          </Link>
        </li>
        <li>
          {/* Opción de selección de idioma */}
          <select onChange={handleChangeLanguage} value={i18n.language} className="languageSelect">
            <option value="es">ES</option>
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="pt">PT</option>
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
