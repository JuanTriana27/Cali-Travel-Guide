import React from 'react';
import Card from '../../components/Card/card.jsx';
import '../../pages/Home/home.css';

const Home = () => (
  <div className="home">
    <Card title="RECORRIDO" subtitle="Explora" link="recorrido"/>
    <Card title="HISTORIA" subtitle="Conoce" link="/historia" />
    <Card title="FOTOGRAFÍAS" subtitle="Mira" link="fotografias" />
  </div>
);

export default Home;