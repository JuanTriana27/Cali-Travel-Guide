import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../pages/Fotografias/fotografias.css';

// Importa las imágenes
import image1 from '../../assets/imagenes/Image1.jpg';
import image2 from '../../assets/imagenes/Image2.jpg';
import image3 from '../../assets/imagenes/Image3.jpg';
import image4 from '../../assets/imagenes/Image4.jpg';
import image5 from '../../assets/imagenes/Image5.jpg';
import image6 from '../../assets/imagenes/Image6.jpg';

const Fotografias = () => {
    const { t } = useTranslation();

    // Array de imágenes con traducciones para los alt
    const images = [
        { src: image1, alt: t('fotografias.imageAlt1') },
        { src: image2, alt: t('fotografias.imageAlt2') },
        { src: image3, alt: t('fotografias.imageAlt3') },
        { src: image4, alt: t('fotografias.imageAlt4') },
        { src: image5, alt: t('fotografias.imageAlt5') },
        { src: image6, alt: t('fotografias.imageAlt6') },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [visited, setVisited] = useState(new Set([0]));

    useEffect(() => {
        setVisited((prevVisited) => new Set(prevVisited).add(currentIndex));
    }, [currentIndex]);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const previousImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const progress = (visited.size / images.length) * 100;
    const allVisited = visited.size === images.length;

    return (
        <div className="fotografias">
            <header className="fotografiasHeader">
                <h1 className="fotografiasTitle">{t('fotografias.title')}</h1>
                <p className="fotografiasSubtitle">
                    {t('fotografias.subtitle')}
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
                    <button className="prevButton" onClick={previousImage}>
                      {t('fotografias.prev')}
                    </button>
                    <button className="nextButton" onClick={nextImage}>
                      {t('fotografias.next')}
                    </button>
                </div>

                <div className="progressContainer">
                    <div className="progressBar" style={{ textAlign: 'center', width: `${progress}%` }}>
                        <span className="progressText">{Math.round(progress)}%</span>
                    </div>
                </div>

                {allVisited && (
                    <div className="congratulations">
                        {t('fotografias.congratulations')}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Fotografias;
