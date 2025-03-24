import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AudioPlayer from '../../components/AudioPlayer/audio';
import '../../pages/Fauna/fauna.css';

const faunaData = [
    {
        id: 1,
        nameKey: 'fauna.animal1.name',
        infoKey: 'fauna.animal1.info',
        image: '/fauna/mono ardilla.jpg',
        sound: '/audio/mono.mp3'
    },
    {
        id: 2,
        nameKey: 'fauna.animal2.name',
        infoKey: 'fauna.animal2.info',
        image: '/fauna/garrapatero pico liso.jpeg',
        sound: '/audio/garrapatero.mp3'
    },
    {
        id: 3,
        nameKey: 'fauna.animal3.name',
        infoKey: 'fauna.animal3.info',
        image: '/fauna/murcielago de lengua larga.jpg',
        sound: '/audio/murcielago.mp3'
    },
    {
        id: 4,
        nameKey: 'fauna.animal4.name',
        infoKey: 'fauna.animal4.info',
        image: '/fauna/olinguito.jpg'
    },
    {
        id: 5,
        nameKey: 'fauna.animal5.name',
        infoKey: 'fauna.animal5.info',
        image: '/fauna/pinchaflor enmascarado.jpeg',
        sound: '/audio/pinchaflor.mp3'
    },
    {
        id: 6,
        nameKey: 'fauna.animal6.name',
        infoKey: 'fauna.animal6.info',
        image: '/fauna/sicalis canario azafranado.jpeg',
        sound: '/audio/sicalis.mp3'
    },
    {
        id: 7,
        nameKey: 'fauna.animal7.name',
        infoKey: 'fauna.animal7.info',
        image: '/fauna/tarantula.png'
    },
    {
        id: 8,
        nameKey: 'fauna.animal8.name',
        infoKey: 'fauna.animal8.info',
        image: '/fauna/tayra.jpg'
    },
    {
        id: 9,
        nameKey: 'fauna.animal9.name',
        infoKey: 'fauna.animal9.info',
        image: '/fauna/torito cabecirrojo.jpg',
        sound: '/audio/torito.mp3'
    },
    {
        id: 10,
        nameKey: 'fauna.animal10.name',
        infoKey: 'fauna.animal10.info',
        image: '/fauna/tororoi volador.jpg',
        sound: '/audio/tororoi.mp3'
    },
    {
        id: 11,
        nameKey: 'fauna.animal11.name',
        infoKey: 'fauna.animal11.info',
        image: '/fauna/trogon collarejo.jpeg',
        sound: '/audio/trogon.mp3'
    }
];

const Fauna = () => {
    const { t } = useTranslation();
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    // Guarda las referencias de cada AudioPlayer (clave: id del animal)
    const audioRefs = useRef({});

    // Invoca el método play del AudioPlayer correspondiente
    const handlePlaySound = (animal) => {
        if (animal.sound && audioRefs.current[animal.id]) {
            console.log("Reproduciendo sonido para animal id:", animal.id);
            audioRefs.current[animal.id].play();
        } else {
            console.warn("No se encontró la referencia de audio para el animal:", animal);
        }
    };

    return (
        <div className="fauna">
            <header className="faunaHeader">
                <h1 className="faunaTitle">{t('fauna.title')}</h1>
                <p className="faunaSubtitle">{t('fauna.subtitle')}</p>
            </header>

            <section className="faunaGrid">
                {faunaData.map(animal => (
                    <div
                        key={animal.id}
                        className={`faunaCard ${selectedAnimal?.id === animal.id ? 'active' : ''}`}
                        onClick={() => setSelectedAnimal(selectedAnimal?.id === animal.id ? null : animal)}
                    >
                        <div className="faunaCardWrapper">
                            <img
                                src={animal.image}
                                alt={t(animal.nameKey)}
                                className="faunaThumbnail"
                            />
                            {selectedAnimal?.id !== animal.id && (
                                <div className="faunaOverlay">
                                    <span className="infoIcon">&#9432;</span>
                                </div>
                            )}
                        </div>
                        <p className="faunaName">{t(animal.nameKey)}</p>
                        {selectedAnimal?.id === animal.id && (
                            <div className="animalInfo">
                                <button
                                    className="closeInfoButton"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedAnimal(null);
                                    }}
                                >
                                    &times;
                                </button>
                                <p>{t(animal.infoKey)}</p>
                                {animal.sound && (
                                    <>
                                        <button
                                            className="playAudioButton"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePlaySound(animal);
                                            }}
                                        >
                                            Reproducir Audio
                                        </button>
                                        {/* Se monta el componente AudioPlayer para el audio respectivo */}
                                        <AudioPlayer
                                            soundUrl={animal.sound}
                                            ref={ref => {
                                                if (ref) {
                                                    audioRefs.current[animal.id] = ref;
                                                    console.log(`Referencia asignada para animal id ${animal.id}`);
                                                }
                                            }}
                                        />
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Fauna;
