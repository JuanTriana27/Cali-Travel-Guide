import React from 'react';
import '../Recorrido/recorridoVirtual.css';

const RecorridoVirtual = () => {
    return (
        <section className="recorrido-container">
            <div className="visor-recorrido">
                <div className="placeholder-recorrido">
                    <span className="icono-camara">📷</span>
                    <p>Recorrido virtual disponible próximamente</p>
                    <div className="loading-bar"></div>
                </div>
            </div>

            {/* <div className="controles-navegacion">
                <button className="control-btn anterior">
                    ◄ Anterior
                </button>
                <div className="indicador-pasos">
                    Paso 1 de 4
                </div>
                <button className="control-btn siguiente">
                    Siguiente ►
                </button>
            </div> */}
        </section>
    );
};

export default RecorridoVirtual;