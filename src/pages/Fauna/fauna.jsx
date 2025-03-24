import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../pages/Fauna/fauna.css';

// Datos de fauna con la ruta del sonido de cada animal
const faunaData = [
    {
        id: 1,
        nameKey: 'fauna.animal1.name',
        infoKey: 'fauna.animal1.info',
        image: '/assets/animales/animal1.jpg',
        sound: '/assets/sounds/animal1.mp3'
    },
    {
        id: 2,
        nameKey: 'fauna.animal2.name',
        infoKey: 'fauna.animal2.info',
        image: '/assets/animales/animal2.jpg',
        sound: '/assets/sounds/animal2.mp3'
    },
    {
        id: 3,
        nameKey: 'fauna.animal3.name',
        infoKey: 'fauna.animal3.info',
        image: '/assets/animales/animal3.jpg',
        sound: '/assets/sounds/animal3.mp3'
    }
];

const Fauna = () => {
    const { t } = useTranslation();
    const [selectedAnimal, setSelectedAnimal] = useState(null);

    const playSound = (soundUrl) => {
        const audio = new Audio(soundUrl);
        audio.play();
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
                                <div className="cardOverlay">
                                    <span className="infoIcon">&#9432;</span>
                                </div>
                            )}
                            {/* Botón de sonido */}
                            <button
                                className="soundButton"
                                onClick={(e) => {
                                    e.stopPropagation(); // Evita que se active la selección de la tarjeta
                                    playSound(animal.sound);
                                }}
                                aria-label={t('fauna.playSound')}
                            >
                                <i className="fas fa-volume-up"></i>
                            </button>
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
                            </div>
                        )}
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Fauna;
