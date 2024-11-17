// Importamos React y card.css para los estilos
import React from 'react';
import '../Card/card.css';

// Importamos cada imagen con un nombre específico
import recorrido from '../../assets/imagenes/Recorrido.jpg';
import fotografias from '../../assets/imagenes/CristoRey.jpg';
import cristoRey from '../../assets/imagenes/Fotografias.jpg';

// Creamos un componente funcional Card que recibe dos propiedades: title y subtitle
const Card = ({ title, subtitle }) => {
  let imgSrc;
  if (title === "HISTORIA") {
    imgSrc = cristoRey;
  } else if (title === "RECORRIDO") {
    imgSrc = recorrido;
  } else if (title === "FOTOGRAFÍAS") {
    imgSrc = fotografias;
  }

  // Retornamos un div con la imagen, el título, el subtítulo y el overlay rojo
  return (
    <div className="card">
      <img src={imgSrc} alt={title} className="cardImage" />

      {/* Contenido de la tarjeta */}
      <div className="cardContent">
        <h2 className="cardTitle">{title}</h2>
        <p className="cardSubtitle">{subtitle}</p>
      </div>

      {/* Overlay rojo que aparece desde abajo */}
      <div className="cardOverlay"></div>
    </div>
  );
};

export default Card;