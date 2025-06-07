import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import '../../pages/Fotografias/fotografias.css';

// Se actualiza el intervalo a 3000 ms para 3 segundos
const PRELOAD_CONCURRENCY = 3;
const SLIDER_INTERVAL = 3000;

const mediaContext = require.context('../../assets/imagenes', false, /\.(jpg|jpeg|JPG|JPEG)$/i);
const mediaFiles = mediaContext.keys().map(path => ({
    src: mediaContext(path)
}));

const Fotografias = () => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSlidingPaused, setIsSlidingPaused] = useState(false);
    const [viewedMedia, setViewedMedia] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [hasCompleted, setHasCompleted] = useState(false);
    const currentMedia = mediaFiles[currentIndex];

    const navigationHandler = useCallback((direction) => {
        setCurrentIndex(prev => {
            let newIndex = direction === 'next'
                ? (prev + 1) % mediaFiles.length
                : (prev - 1 + mediaFiles.length) % mediaFiles.length;
            return newIndex;
        });
    }, []);

    const preloadMedia = useCallback(async () => {
        setIsLoading(true);
        for (let i = 0; i < mediaFiles.length; i += PRELOAD_CONCURRENCY) {
            const batch = mediaFiles.slice(i, i + PRELOAD_CONCURRENCY);
            await Promise.all(batch.map(file => new Promise(resolve => {
                const img = new Image();
                img.src = file.src;
                img.onload = resolve;
                img.onerror = resolve;
            })));
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!hasCompleted) {
            setViewedMedia(prev => new Set([...prev, currentIndex]));
        }
    }, [currentIndex, hasCompleted]);

    useEffect(() => {
        if (!hasCompleted && viewedMedia.size === mediaFiles.length && !isLoading) {
            setShowModal(true);
            setHasCompleted(true);
        }
    }, [viewedMedia, isLoading, hasCompleted]);

    const closeModal = useCallback(() => {
        setShowModal(false);
        setViewedMedia(new Set([currentIndex]));
        setHasCompleted(false);
    }, [currentIndex]);

    // Se establece un interval de 3 segundos para el cambio automático de fotos
    useEffect(() => {
        if (isSlidingPaused || showModal || isLoading) return;
        const timer = setInterval(() => {
            navigationHandler('next');
        }, SLIDER_INTERVAL);
        return () => clearInterval(timer);
    }, [isSlidingPaused, showModal, isLoading, navigationHandler]);

    useEffect(() => {
        preloadMedia();
    }, [preloadMedia]);

    const handleMediaError = (e) => {
        e.target.src = '/placeholder.jpg';
        e.target.onerror = null;
    };

    return (
        <div className="fotografias"
            onMouseEnter={() => setIsSlidingPaused(true)}
            onMouseLeave={() => setIsSlidingPaused(false)}>

            <header className="fotografiasHeader">
                <h1 className="fotografiasTitle">{t('fotografias.title')}</h1>
                <p className="fotografiasSubtitle">{t('fotografias.subtitle')}</p>
            </header>

            <section className="slider">
                <div className="sliderItem">
                    <img
                        src={currentMedia.src}
                        alt={t(`fotografias.imageAlt${currentIndex + 1}`, {
                            defaultValue: t('fotografias.imageAlt')
                        })}
                        className="mediaElement"
                        loading="lazy"
                        decoding="async"
                        onError={handleMediaError}
                        style={{ width: '100%', height: '700px' }}
                    />
                </div>

                <div className="sliderButtons">
                    <button
                        className="navButton prevButton"
                        onClick={() => navigationHandler('prev')}
                        aria-label={t('fotografias.prev')}
                    >
                        {t('fotografias.prev')}
                    </button>

                    <span className="mediaCounter">
                        {currentIndex + 1} / {mediaFiles.length}
                    </span>

                    <button
                        className="navButton nextButton"
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
                            {t('fotografias.close')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Fotografias;