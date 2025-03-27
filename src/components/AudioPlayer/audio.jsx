import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

// Componente para reproducción de audio usando forwardRef
const AudioPlayer = forwardRef(({ soundUrl }, ref) => {
    const audioRef = useRef(null);

    // Efecto para cargar el audio cuando cambia soundUrl
    useEffect(() => {
        if (audioRef.current && soundUrl) {
            const audioElement = audioRef.current;
            
            // Crear URL absoluta para evitar problemas con rutas relativas
            const absoluteUrl = new URL(soundUrl, window.location.origin).href;
            audioElement.src = absoluteUrl;
            
            // Precargar el audio automáticamente
            audioElement.preload = 'auto';
            
            // Configurar volumen inicial (60%)
            audioElement.volume = 0.6;
            
            // Manejador de errores para fallos de carga
            audioElement.onerror = () => {
                console.error('Error cargando audio:', absoluteUrl);
            };

            // Forzar la carga del nuevo recurso de audio
            audioElement.load();
        }
    }, [soundUrl]); // Se ejecuta cuando cambia soundUrl

    // Exponer métodos
    useImperativeHandle(ref, () => ({
        play: () => {
            if (audioRef.current) {
                // Intentar reproducir y capturar posibles errores
                audioRef.current.play().catch(error => {
                    console.error('Error al reproducir:', error);
                });
            }
        }
    }));

    // Elemento audio oculto en la interfaz
    return <audio ref={audioRef} style={{ display: 'none' }} />;
});

export default AudioPlayer;