import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import '../../pages/Fotografias/fotografias.css';

const PRELOAD_CONCURRENCY = 3;
const SLIDER_INTERVAL = 3000;

const importAll = (r) => r.keys().map(r);
const imagesContext = require.context('../../assets/imagenes', false, /\.(jpg|JPG)$/);
const imagePaths = importAll(imagesContext);

const Fotografias = () => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isSlidingPaused, setIsSlidingPaused] = useState(false);
    const [viewedImages, setViewedImages] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const preloadImages = useCallback(async () => {
        setIsLoading(true);
        const totalImages = imagePaths.length;
        let loaded = 0;

        const loadImageBatch = async (startIndex) => {
            const batch = imagePaths.slice(startIndex, startIndex + PRELOAD_CONCURRENCY);
            await Promise.all(batch.map((src) =>
                new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => {
                        loaded++;
                        setLoadingProgress(Math.round((loaded / totalImages) * 100));
                        resolve();
                    };
                    img.onerror = resolve;
                })
            ));
        };

        for (let i = 0; i < totalImages; i += PRELOAD_CONCURRENCY) {
            await loadImageBatch(i);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        setViewedImages(prev => new Set([...prev, currentIndex]));
    }, [currentIndex]);

    useEffect(() => {
        if (viewedImages.size === imagePaths.length && !isLoading) {
            setShowModal(true);
        }
    }, [viewedImages, isLoading]);

    const navigationHandler = useCallback((direction) => {
        setCurrentIndex(prev => {
            const newIndex = direction === 'next'
                ? (prev + 1) % imagePaths.length
                : (prev - 1 + imagePaths.length) % imagePaths.length;
            return newIndex;
        });
    }, []);

    const closeModal = useCallback(() => {
        setShowModal(false);
        setViewedImages(new Set([currentIndex])); // Reinicio controlado
    }, [currentIndex]);

    useEffect(() => {
        if (isSlidingPaused || showModal || isLoading) return;

        const timer = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % imagePaths.length);
        }, SLIDER_INTERVAL);

        return () => clearInterval(timer);
    }, [isSlidingPaused, showModal, isLoading]);

    useEffect(() => {
        preloadImages();
    }, [preloadImages]);

    return (
        <div className="fotografias"
            onMouseEnter={() => setIsSlidingPaused(true)}
            onMouseLeave={() => setIsSlidingPaused(false)}>

            <header className="fotografiasHeader">
                <h1 className="fotografiasTitle">{t('fotografias.title')}</h1>
                <p className="fotografiasSubtitle">{t('fotografias.subtitle')}</p>

                {isLoading && (
                    <div className="loading-bar">
                        <div className="loading-progress" style={{ width: `${loadingProgress}%` }} />
                    </div>
                )}
            </header>

            <section className="slider">
                <div className="sliderItem">
                    <img
                        src={imagePaths[currentIndex]}
                        alt={t(`fotografias.imageAlt${currentIndex + 1}`, {
                            defaultValue: t('fotografias.imageAlt')
                        })}
                        className="sliderImage"
                        loading="lazy"
                        decoding="async"
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

                    <span className="image-counter">
                        {currentIndex + 1} / {imagePaths.length}
                    </span>

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

export default Fotografias;