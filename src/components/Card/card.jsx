import React from 'react'; // Importamos React para poder usar sus funcionalidades
import { Link } from 'react-router-dom'; // Link para navegación
import '../Card/card.css'; // Importamos el archivo de estilos

// Importamos las imágenes que se mostrarán en las tarjetas
import recorrido from '../../assets/imagenes/Recorrido.jpg';
import fotografias from '../../assets/imagenes/CristoRey.jpg';
import cristoRey from '../../assets/imagenes/Fotografias.jpg';

// Creamos el componente Card
const Card = ({ title, subtitle, link }) => {
  let imgSrc;
  if (title === "HISTORIA") {
    imgSrc = cristoRey;
  } else if (title === "RECORRIDO") {
    imgSrc = recorrido;
  } else if (title === "FOTOGRAFÍAS") {
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

// Exportamos el componente Card
export default Card;