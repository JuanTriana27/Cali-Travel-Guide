// src/components/Navbar/Navbar.js
import React from 'react';
import '../Navbar/navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <h1>CALI TRAVEL GUIDE</h1>
    <ul className="navbarMenu">
      <li>INICIO</li>
      <li>LUGARES</li>
      <li>CONTACTENOS</li>
    </ul>
  </nav>
);

export default Navbar;