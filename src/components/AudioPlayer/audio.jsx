import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const AudioPlayer = forwardRef(({ soundUrl }, ref) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current && soundUrl) {
            const audioElement = audioRef.current;
            const absoluteUrl = new URL(soundUrl, window.location.origin).href;
            audioElement.src = absoluteUrl;
            audioElement.preload = 'auto';

            // Ajusta el volumen
            audioElement.volume = 0.6;

            audioElement.onerror = () => {
                console.error('Error cargando audio:', absoluteUrl);
            };

            audioElement.load();
        }
    }, [soundUrl]);

    useImperativeHandle(ref, () => ({
        play: () => {
            if (audioRef.current) {
                audioRef.current.play().catch(error => {
                    console.error('Error al reproducir:', error);
                });
            }
        }
    }));

    return <audio ref={audioRef} style={{ display: 'none' }} />;
});

export default AudioPlayer;
