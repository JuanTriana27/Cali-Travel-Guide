import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../pages/Fotografias/fotografias.css';

const Fotografias = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Función para importar todas las imágenes de la carpeta
  const importAll = (r) =>
    r.keys().map((key) => ({
      src: r(key),
      // Se extrae el nombre del archivo para poder ordenar o usar en el alt si lo deseas
      name: key.replace('./', '')
    }));

  // Importa todas las imágenes de la carpeta '../../assets/imagenes'
  const imagesImported = importAll(
    require.context('../../assets/imagenes', false, /\.(png|jpe?g|JPG)$/)
  );

  // Ordena las imágenes según el nombre (ajusta la función de comparación si requieres otro orden)
  const images = imagesImported.sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    // Muestra el modal cuando se llega a la última imagen
    if (currentIndex === images.length - 1) {
      setShowModal(true);
    }
  }, [currentIndex, images.length]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="fotografias">
      <header className="fotografiasHeader">
        <h1 className="fotografiasTitle">{t('fotografias.title')}</h1>
        <p className="fotografiasSubtitle">{t('fotografias.subtitle')}</p>
      </header>

      <section className="slider">
        <div className="sliderItem">
          <img
            src={images[currentIndex].src}
            alt={t(`fotografias.imageAlt${currentIndex + 1}`)}
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
      </section>

      {/* Modal */}
      {showModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>{t('fotografias.congratulations')}</h2>
            <p>{t('fotografias.modalMessage')}</p>
            <button className="closeButton" onClick={closeModal}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fotografias;
