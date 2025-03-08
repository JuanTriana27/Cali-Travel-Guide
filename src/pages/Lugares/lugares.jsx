import React from 'react';
import { Link } from 'react-router-dom';
import cristoReyImage from '../../assets/imagenes/Image14.jpg';
import '../Lugares/lugares.css';

const Lugares = () => {
  return (
    <div className="lugares-container">
      <h1 className="lugares-title">Lugares Disponibles</h1>
      
      <div className="lugares-grid">
        <div className="lugar-card destacado">
          <img 
            src={cristoReyImage} 
            alt="Cristo Rey" 
            className="lugar-image"
          />
          <div className="lugar-content">
            <h2>Cristo Rey</h2>
            <p>El icónico monumento que vigila la ciudad desde los cerros</p>
            <Link to="/historia" className="lugar-button">
              Ver Detalles
            </Link>
          </div>
        </div>

        <div className="proximamente-container">
          <div className="proximamente-card">
            <div className="coming-soon">
              <span>🚧</span>
              <h3>Próximamente</h3>
              <p>Estamos trabajando para agregar más lugares emblemáticos</p>
              <div className="dots-animation">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lugares;