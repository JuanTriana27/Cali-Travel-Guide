import React, { useState, useEffect } from 'react';
import '../../pages/Fotografias/fotografias.css';

// Importa las imágenes
import image1 from '../../assets/imagenes/Image1.jpg';
import image2 from '../../assets/imagenes/Image2.jpg';
import image3 from '../../assets/imagenes/Image3.jpg';
import image4 from '../../assets/imagenes/Image4.jpg';
import image5 from '../../assets/imagenes/Image5.jpg';
import image6 from '../../assets/imagenes/Image6.jpg';

const Fotografias = () => {
    // Array de imágenes con las importaciones
    const images = [
        { src: image1, alt: 'Foto 1' },
        { src: image2, alt: 'Foto 2' },
        { src: image3, alt: 'Foto 3' },
        { src: image4, alt: 'Foto 4' },
        { src: image5, alt: 'Foto 5' },
        { src: image6, alt: 'Foto 6' },
    ];

    // Estado para controlar la imagen actual
    const [currentIndex, setCurrentIndex] = useState(0);
    // Estado para llevar registro de los índices ya visitados
    const [visited, setVisited] = useState(new Set([0]));

    // Cada vez que cambia la imagen actual, se agrega el índice a "visited"
    useEffect(() => {
        setVisited((prevVisited) => new Set(prevVisited).add(currentIndex));
    }, [currentIndex]);

    // Función para pasar a la siguiente imagen
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Función para volver a la imagen anterior
    const previousImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Calcula el progreso en porcentaje
    const progress = (visited.size / images.length) * 100;
    // Comprueba si se han visto todas las imágenes
    const allVisited = visited.size === images.length;

    return (
        <div className="fotografias">
            <header className="fotografiasHeader">
                <h1 className="fotografiasTitle">Fotografías</h1>
                <p className="fotografiasSubtitle">
                    Explora momentos únicos capturados en imágenes.
                </p>
            </header>

            <section className="slider">
                <div className="sliderItem">
                    <img
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        className="sliderImage"
                    />
                </div>
                <div className="sliderButtons">
                    <button className="prevButton" onClick={previousImage}>Anterior</button>
                    <button className="nextButton" onClick={nextImage}>Siguiente</button>
                </div>

                {/* Barra de progreso */}
                <div className="progressContainer">
                    <div className="progressBar" style={{ textAlign: 'center',  width: `${progress}%` }}>
                        <span className="progressText">{Math.round(progress)}%</span>
                    </div>
                </div>


                {/* Mensaje de felicitación */}
                {allVisited && (
                    <div className="congratulations">
                        ¡Felicidades, viste todas las imágenes!
                    </div>
                )}
            </section>
        </div>
    );
};

export default Fotografias;
