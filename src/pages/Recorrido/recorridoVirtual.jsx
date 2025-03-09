import React from 'react';
import '../Recorrido/recorridoVirtual.css';

const RecorridoVirtual = () => {
    return (
        <section className="recorrido-container">
            <div className="visor-recorrido">
                <div className="sketchfab-embed-wrapper">
                    <iframe
                        title="Simple Satellite Design"
                        frameBorder="0"
                        allowFullScreen
                        mozallowfullscreen="true"
                        webkitallowfullscreen="true"
                        allow="autoplay; fullscreen; xr-spatial-tracking"
                        src="https://sketchfab.com/models/b378a2742d84430db3503046f473ab8f/embed"
                    />
                </div>
            </div>

            <div className="attribution-text">
                Modelo 3D por {" "}
                <a
                    href="https://sketchfab.com/VIS-All"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="attribution-link"
                >
                    VIS-All-3D
                </a> en {" "}
                <a
                    href="https://sketchfab.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="attribution-link"
                >
                    Sketchfab
                </a>
            </div>
        </section>
    );
};

export default RecorridoVirtual;