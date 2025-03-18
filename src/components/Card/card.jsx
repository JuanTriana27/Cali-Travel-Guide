import React from 'react'; // Importamos React para poder usar sus funcionalidades
import { Link } from 'react-router-dom'; // Link para navegación
import '../Card/card.css'; // Importamos el archivo de estilos

// Importamos las imágenes que se mostrarán en las tarjetas
import recorrido from '../../assets/imagenes/Recorrido.JPG';
import fotografias from '../../assets/imagenes/Historia.JPG';
import cristoRey from '../../assets/imagenes/Fotografia.JPG';

// Creamos el componente Card
// Se agrega la prop "imageKey" para identificar la imagen de forma fija
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
      {/* Envolvemos toda la tarjeta con un enlace */}
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
