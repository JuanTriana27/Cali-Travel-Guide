import React from 'react'; // Importamos la librería de React
import { Link } from 'react-router-dom';  // Importamos el componente Link de react-router-dom
import '../Card/card.css'; // Importamos el archivo de estilos
import recorrido from '../../assets/imagenes/Recorrido.jpg'; // Importamos las imagenes
import fotografias from '../../assets/imagenes/Historia.jpg';
import cristoRey from '../../assets/imagenes/Fotografia.jpg';

// Creamos un componente funcional llamado Card
const Card = ({ title, subtitle, link, imageKey }) => {
  let imgSrc;
  if (imageKey === "historia") {
    imgSrc = cristoRey;
  } else if (imageKey === "recorrido") {
    imgSrc = recorrido;
  } else if (imageKey === "fotografias") {
    imgSrc = fotografias;
  }

  // Retornamos la estructura HTML de la tarjeta
  return (
    <div className="card">
      <Link to={link || "#"} className="cardLink">
        <img src={imgSrc} alt={title} className="cardImage" />

        <div className="cardContent">
          <h2 className="cardTitle">{title}</h2>
          <p className="cardSubtitle">{subtitle}</p>
        </div>

        <div className="cardOverlay"></div>
      </Link>
    </div>
  );
};

export default Card;
