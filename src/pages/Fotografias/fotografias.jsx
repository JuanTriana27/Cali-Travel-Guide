import React from 'react';
import '../../pages/Fotografias/fotografias.css'; // Asegúrate de que el archivo CSS esté enlazado correctamente

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

    return (
        <div className="fotografias">
            <header className="fotografiasHeader">
                <h1 className="fotografiasTitle">Fotografías</h1>
                <p className="fotografiasSubtitle">
                    Explora momentos únicos capturados en imágenes.
                </p>
            </header>

            <section className="galeria">
                {images.map((image, index) => (
                    <div key={index} className="galeriaItem">
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="galeriaImage"
                        />
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Fotografias;
