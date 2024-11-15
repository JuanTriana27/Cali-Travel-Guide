// imortamos React, el componente Card y card.css
import React from 'react';
import Card from '../../components/Card/card.js';
import '../Home/home.css';

// Creamos un componente funcional Home que contiene tres componentes Card para la Interfaz
const Home = () => (
  <div className="home">
    <Card title="RECORRIDO" subtitle="Explora" />
    <Card title="HISTORIA" subtitle="Conoce" />
    <Card title="FOTOGRAFÍAS" subtitle="Mira" />
  </div>
);

// Exportamos el componente Home
export default Home;
