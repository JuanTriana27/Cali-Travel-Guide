import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import '../../pages/Fotografias/fotografias.css';

const importAll = (r) => r.keys().map(r);
const imagesContext = require.context('../../assets/imagenes', false, /\.(jpg|JPG)$/);
const imagePaths = importAll(imagesContext);

const Fotografias = () => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [loadedIndices, setLoadedIndices] = useState(new Set());

    // Precarga de imágenes
    const preloadImages = useCallback((index) => {
        const preload = (idx) => {
            if (idx >= 0 && idx < imagePaths.length && !loadedIndices.has(idx)) {
                const img = new Image();
                img.src = imagePaths[idx];
                setLoadedIndices(prev => new Set([...prev, idx]));
            }
        };

        [index - 1, index, index + 1].forEach(preload);
    }, [loadedIndices]); // Eliminamos imagePaths.length de las dependencias

    useEffect(() => {
        preloadImages(currentIndex);
    }, [currentIndex, preloadImages]);

    useEffect(() => {
        if (loadedIndices.size === imagePaths.length) {
            setShowModal(true);
        }
    }, [loadedIndices]); // Eliminamos imagePaths.length de las dependencias

    const navigationHandler = useCallback((direction) => {
        setCurrentIndex(prev => {
            const newIndex = direction === 'next' 
                ? (prev + 1) % imagePaths.length 
                : (prev - 1 + imagePaths.length) % imagePaths.length;
            return newIndex;
        });
    }, []); // Eliminamos imagePaths.length de las dependencias

    const closeModal = useCallback(() => {
        setShowModal(false);
        setLoadedIndices(new Set());
    }, []);

    return (
        <div className="fotografias">
            <header className="fotografiasHeader">
                <h1 className="fotografiasTitle">{t('fotografias.title')}</h1>
                <p className="fotografiasSubtitle">{t('fotografias.subtitle')}</p>
            </header>

            <section className="slider">
                <div className="sliderItem">
                    <img
                        src={imagePaths[currentIndex]}
                        alt={t(`fotografias.imageAlt${currentIndex + 1}`, 
                             { defaultValue: t('fotografias.imageAlt') })}
                        className="sliderImage"
                        loading="lazy"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder.jpg';
                        }}
                    />
                </div>
                
                <div className="sliderButtons">
                    <button 
                        className="prevButton" 
                        onClick={() => navigationHandler('prev')}
                        aria-label={t('fotografias.prev')}
                    >
                        {t('fotografias.prev')}
                    </button>
                    <button 
                        className="nextButton" 
                        onClick={() => navigationHandler('next')}
                        aria-label={t('fotografias.next')}
                    >
                        {t('fotografias.next')}
                    </button>
                </div>
            </section>

            {showModal && (
                <div className="modalOverlay" role="dialog">
                    <div className="modalContent">
                        <h2>{t('fotografias.congratulations')}</h2>
                        <p>{t('fotografias.modalMessage')}</p>
                        <button 
                            className="closeButton" 
                            onClick={closeModal}
                            aria-label={t('fotografias.close')}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(Fotografias);