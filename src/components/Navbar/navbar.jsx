import React from "react";
import "./navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <h1>CALI TRAVEL GUIDE</h1>

    {/* Checkbox para el menú hamburguesa */}
    <input type="checkbox" id="menu-toggle" />
    <label htmlFor="menu-toggle" id="menu-icon">☰</label>

    {/* Menú */}
    <ul className="navbarMenu" id="menu-icon-acction">
      <li>INICIO</li>
      <li>LUGARES</li>
      <li>CONTACTENOS</li>
    </ul>
  </nav>
);

export default Navbar;