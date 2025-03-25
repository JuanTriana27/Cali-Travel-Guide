import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../../pages/Fotografias/fotografias.css';

const PRELOAD_CONCURRENCY = 3;
const SLIDER_INTERVAL = 5000;

const mediaContext = require.context('../../assets/imagenes', false, /\.(jpg|jpeg|JPG|JPEG|mp4|mov|avi)$/i);
const mediaFiles = mediaContext.keys().map(path => ({
  src: mediaContext(path),
  type: path.split('.').pop().toLowerCase()
}));

const Fotografias = () => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isSlidingPaused, setIsSlidingPaused] = useState(false);
    const [viewedMedia, setViewedMedia] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [hasCompleted, setHasCompleted] = useState(false);
    const videoRef = useRef(null);
    const currentMedia = mediaFiles[currentIndex];

    const preloadMedia = useCallback(async () => {
        setIsLoading(true);
        const total = mediaFiles.length;
        let loaded = 0;

        const loadResource = (src, type) => new Promise(resolve => {
            if (['mp4', 'mov', 'avi'].includes(type)) {
                const video = document.createElement('video');
                video.src = src;
                video.preload = 'auto';
                video.onloadeddata = () => {
                    loaded++;
                    setLoadingProgress(Math.round((loaded / total) * 100));
                    resolve();
                };
                video.onerror = resolve;
            } else {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    loaded++;
                    setLoadingProgress(Math.round((loaded / total) * 100));
                    resolve();
                };
                img.onerror = resolve;
            }
        });

        const loadBatch = async (start) => {
            const batch = mediaFiles.slice(start, start + PRELOAD_CONCURRENCY);
            await Promise.all(batch.map(file => loadResource(file.src, file.type)));
        };

        for (let i = 0; i < mediaFiles.length; i += PRELOAD_CONCURRENCY) {
            await loadBatch(i);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            const video = videoRef.current;
            const isVideo = ['mp4', 'mov', 'avi'].includes(currentMedia.type);

            if (isVideo) {
                video.load();
                const playPromise = video.play().catch(() => {});
                const handleEnd = () => !isSlidingPaused && navigationHandler('next');
                
                video.addEventListener('ended', handleEnd);
                return () => {
                    video.pause();
                    video.removeEventListener('ended', handleEnd);
                };
            }
        }
    }, [currentIndex, isSlidingPaused]);

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

    const navigationHandler = useCallback((direction) => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        
        setCurrentIndex(prev => {
            let newIndex = direction === 'next' 
                ? (prev + 1) % mediaFiles.length 
                : (prev - 1 + mediaFiles.length) % mediaFiles.length;
            return newIndex;
        });
    }, []);

    const closeModal = useCallback(() => {
        setShowModal(false);
        setViewedMedia(new Set([currentIndex]));
        setHasCompleted(false);
    }, [currentIndex]);

    useEffect(() => {
        if (isSlidingPaused || showModal || isLoading || 
           ['mp4', 'mov', 'avi'].includes(currentMedia?.type)) return;

        const timer = setInterval(() => {
            navigationHandler('next');
        }, SLIDER_INTERVAL);

        return () => clearInterval(timer);
    }, [isSlidingPaused, showModal, isLoading, currentMedia]);

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
                
                {isLoading && (
                    <div className="loading-bar">
                        <div className="loading-progress" 
                             style={{ width: `${loadingProgress}%` }} />
                    </div>
                )}
            </header>

            <section className="slider">
                <div className="sliderItem">
                    {['mp4', 'mov', 'avi'].includes(currentMedia.type) ? (
                        <video
                            ref={videoRef}
                            className="mediaElement"
                            controls
                            muted
                            playsInline
                            onPlay={() => setIsSlidingPaused(true)}
                            onPause={() => setIsSlidingPaused(false)}
                            onError={handleMediaError}
                        >
                            <source 
                                src={currentMedia.src} 
                                type={`video/${currentMedia.type}`} 
                            />
                            {t('fotografias.videoNotSupported')}
                        </video>
                    ) : (
                        <img
                            src={currentMedia.src}
                            alt={t(`fotografias.imageAlt${currentIndex + 1}`, {
                                defaultValue: t('fotografias.imageAlt')
                            })}
                            className="mediaElement"
                            loading="lazy"
                            decoding="async"
                            onError={handleMediaError}
                        />
                    )}
                    <div className="mediaBadge">
                        {['mp4', 'mov', 'avi'].includes(currentMedia.type) ? '🎥' : '📷'}
                    </div>
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