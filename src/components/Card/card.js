// Importamos React y card.css para los estilos
import React from 'react';
import '../Card/card.css';

// Importa cada imagen con un nombre específico
import recorrido from '../../assets/imagenes/Recorrido.jpg';
import cristoRey from '../../assets/imagenes/CristoRey.jpg';
import fotografias from '../../assets/imagenes/Fotografias.jpg';

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

  // Retornamos un div con la imagen, el título y el subtítulo
  return (
    <div className="card">
      <img src={imgSrc} alt={title} className="cardImage" />
      <div className="cardContent">
        <h2 className="cardTitle">{title}</h2>
        <p className="cardSubtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default Card;
