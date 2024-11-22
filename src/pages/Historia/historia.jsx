import React from 'react';
import '../../pages/Historia/historia.css'; // Agrega estilos si los necesitas

const Historia = () => {
  return (
    <div className="historia">
      <header className="historiaHeader">
        <h1 className="historiaTitle">Cristo Rey</h1>
        <p className="historiaSubtitle">Descubre los orígenes y el legado de este icónico monumento.</p>
      </header>

      <section className="historiaContent">
        <div className="historiaImageContainer">
          <img
            src="https://via.placeholder.com/800x400"
            alt="Cristo Rey"
            className="historiaImage"
          />
        </div>

        <div className="historiaText">
          <h2>Un poco de historia</h2>
          <p>
            El monumento de Cristo Rey es uno de los puntos turísticos más reconocidos en la región.
            Construido en 1953, este lugar ofrece una vista panorámica increíble de la ciudad de Cali.
          </p>
          <p>
            Diseñado como un símbolo de paz, el monumento mide 26 metros de altura y atrae a miles de visitantes cada año,
            quienes no solo admiran su arquitectura, sino también el entorno natural que lo rodea.
          </p>
        </div>
      </section>

      <section className="historiaTimeline">
        <h2>Línea de tiempo</h2>
        <ul className="timeline">
          <li>
            <span className="year">1950</span>
            Inicio de la construcción del monumento.
          </li>
          <li>
            <span className="year">1953</span>
            Inauguración oficial de Cristo Rey.
          </li>
          <li>
            <span className="year">1980</span>
            Reconocido como patrimonio cultural de la región.
          </li>
        </ul>
      </section>

      
    </div>
  );
};

export default Historia;
