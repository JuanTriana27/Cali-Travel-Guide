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
import image7 from '../../assets/imagenes/DSC05220.JPG';
import image8 from '../../assets/imagenes/DSC05223.JPG';
import image9 from '../../assets/imagenes/DSC05227.JPG';
import image10 from '../../assets/imagenes/DSC05229.JPG'
import image11 from '../../assets/imagenes/DSC05236.JPG';
import image12 from '../../assets/imagenes/DSC05237.JPG';
import image13 from '../../assets/imagenes/DSC05242.JPG';
import image14 from '../../assets/imagenes/DSC05244.JPG';
import image15 from '../../assets/imagenes/DSC05253.JPG';  

import image16 from '../../assets/imagenes/DSC05255.JPG';
import image17 from '../../assets/imagenes/DSC05258.JPG';
import image18 from '../../assets/imagenes/DSC05267.JPG';
import image19 from '../../assets/imagenes/DSC05275.JPG';

import image20 from '../../assets/imagenes/DSC05298.JPG';
import image21 from '../../assets/imagenes/DSC05299.JPG';
import image22 from '../../assets/imagenes/DSC05308.JPG';
import image23 from '../../assets/imagenes/DSC05314.JPG';
import image24 from '../../assets/imagenes/DSC05319.JPG';
import image25 from '../../assets/imagenes/DSC05323.JPG';
import image26 from '../../assets/imagenes/DSC05335.JPG';
import image27 from '../../assets/imagenes/DSC05348.JPG';
import image28 from '../../assets/imagenes/DSC05353.JPG';
import image29 from '../../assets/imagenes/DSC05358.JPG';
import image30 from '../../assets/imagenes/DSC05367.JPG';
import image31 from '../../assets/imagenes/DSC05370.JPG';
import image32 from '../../assets/imagenes/DSC05374.JPG';
import image33 from '../../assets/imagenes/DSC05376.JPG';
import image34 from '../../assets/imagenes/DSC05378.JPG';
import image35 from '../../assets/imagenes/DSC05388.JPG';
import image36 from '../../assets/imagenes/DSC05403.JPG';
import image37 from '../../assets/imagenes/DSC05406.JPG';
import image38 from '../../assets/imagenes/DSC05408.JPG';
import image39 from '../../assets/imagenes/DSC05411.JPG';
import image40 from '../../assets/imagenes/DSC05415.JPG';
import image41 from '../../assets/imagenes/DSC05416.JPG';
import image42 from '../../assets/imagenes/DSC05417.JPG';
import image43 from '../../assets/imagenes/DSC05420.JPG';
import image44 from '../../assets/imagenes/DSC05425.JPG';
import image45 from '../../assets/imagenes/DSC05436.JPG';
import image46 from '../../assets/imagenes/DSC05440.JPG';
import image47 from '../../assets/imagenes/DSC05448.JPG';
import image48 from '../../assets/imagenes/DSC05469.JPG';
import image49 from '../../assets/imagenes/DSC05501.JPG';
import image50 from '../../assets/imagenes/DSC05502.JPG';
import image51 from '../../assets/imagenes/DSC05512.JPG';
import image52 from '../../assets/imagenes/DSC05513.JPG';
import image53 from '../../assets/imagenes/DSC05514.JPG';
import image54 from '../../assets/imagenes/DSC05515.JPG';
import image55 from '../../assets/imagenes/DSC05516.JPG';
import image56 from '../../assets/imagenes/DSC05517.JPG';
import image57 from '../../assets/imagenes/DSC05518.JPG';
import image58 from '../../assets/imagenes/DSC05519.JPG';
import image59 from '../../assets/imagenes/DSC05520.JPG';
import image60 from '../../assets/imagenes/DSC05521.JPG';
import image61 from '../../assets/imagenes/DSC05522.JPG';
import image62 from '../../assets/imagenes/DSC05523.JPG';
import image63 from '../../assets/imagenes/DSC05524.JPG';
import image64 from '../../assets/imagenes/DSC05525.JPG';
import image65 from '../../assets/imagenes/DSC05526.JPG';
import image66 from '../../assets/imagenes/DSC05527.JPG';
import image67 from '../../assets/imagenes/DSC05528.JPG';
import image68 from '../../assets/imagenes/DSC05529.JPG';
import image69 from '../../assets/imagenes/DSC05532.JPG';
import image70 from '../../assets/imagenes/DSC05536.JPG';
import image71 from '../../assets/imagenes/DSC05539.JPG';
import image72 from '../../assets/imagenes/DSC05543.JPG';

const Fotografias = () => {
    const { t } = useTranslation();

    const images = [
        { src: image1, alt: t('fotografias.imageAlt1') },
        { src: image2, alt: t('fotografias.imageAlt2') },
        { src: image3, alt: t('fotografias.imageAlt3') },
        { src: image4, alt: t('fotografias.imageAlt4') },
        { src: image5, alt: t('fotografias.imageAlt5') },
        { src: image6, alt: t('fotografias.imageAlt6') },
        { src: image7, alt: t('fotografias.imageAlt7') },
        { src: image8, alt: t('fotografias.imageAlt8') },
        { src: image9, alt: t('fotografias.imageAlt9') },
        { src: image10, alt: t('fotografias.imageAlt10') },
        { src: image11, alt: t('fotografias.imageAlt11') },
        { src: image12, alt: t('fotografias.imageAlt12') },
        { src: image13, alt: t('fotografias.imageAlt13') },
        { src: image14, alt: t('fotografias.imageAlt14') },
        { src: image15, alt: t('fotografias.imageAlt15') },
        { src: image16, alt: t('fotografias.imageAlt16') },
        { src: image17, alt: t('fotografias.imageAlt17') },
        { src: image18, alt: t('fotografias.imageAlt18') },
        { src: image19, alt: t('fotografias.imageAlt19') },
        { src: image20, alt: t('fotografias.imageAlt20') },
        { src: image21, alt: t('fotografias.imageAlt21') },
        { src: image22, alt: t('fotografias.imageAlt22') },
        { src: image23, alt: t('fotografias.imageAlt23') },
        { src: image24, alt: t('fotografias.imageAlt24') },
        { src: image25, alt: t('fotografias.imageAlt25') },
        { src: image26, alt: t('fotografias.imageAlt26') },
        { src: image27, alt: t('fotografias.imageAlt27') },
        { src: image28, alt: t('fotografias.imageAlt28') },
        { src: image29, alt: t('fotografias.imageAlt29') },
        { src: image30, alt: t('fotografias.imageAlt30') },
        { src: image31, alt: t('fotografias.imageAlt31') },
        { src: image32, alt: t('fotografias.imageAlt32') },
        { src: image33, alt: t('fotografias.imageAlt33') },
        { src: image34, alt: t('fotografias.imageAlt34') },
        { src: image35, alt: t('fotografias.imageAlt35') },
        { src: image36, alt: t('fotografias.imageAlt36') },
        { src: image37, alt: t('fotografias.imageAlt37') },
        { src: image38, alt: t('fotografias.imageAlt38') },
        { src: image39, alt: t('fotografias.imageAlt39') },
        { src: image40, alt: t('fotografias.imageAlt40') },
        { src: image41, alt: t('fotografias.imageAlt41') },
        { src: image42, alt: t('fotografias.imageAlt42') },
        { src: image43, alt: t('fotografias.imageAlt43') },
        { src: image44, alt: t('fotografias.imageAlt44') },
        { src: image45, alt: t('fotografias.imageAlt45') },
        { src: image46, alt: t('fotografias.imageAlt46') },
        { src: image47, alt: t('fotografias.imageAlt47') },
        { src: image48, alt: t('fotografias.imageAlt48') },
        { src: image49, alt: t('fotografias.imageAlt49') },
        { src: image50, alt: t('fotografias.imageAlt50') },
        { src: image51, alt: t('fotografias.imageAlt51') },
        { src: image52, alt: t('fotografias.imageAlt52') },
        { src: image53, alt: t('fotografias.imageAlt53') },
        { src: image54, alt: t('fotografias.imageAlt54') },
        { src: image55, alt: t('fotografias.imageAlt55') },
        { src: image56, alt: t('fotografias.imageAlt56') },
        { src: image57, alt: t('fotografias.imageAlt57') },
        { src: image58, alt: t('fotografias.imageAlt58') },
        { src: image59, alt: t('fotografias.imageAlt59') },
        { src: image60, alt: t('fotografias.imageAlt60') },
        { src: image61, alt: t('fotografias.imageAlt61') },
        { src: image62, alt: t('fotografias.imageAlt62') },
        { src: image63, alt: t('fotografias.imageAlt63') },
        { src: image64, alt: t('fotografias.imageAlt64') },
        { src: image65, alt: t('fotografias.imageAlt65') },
        { src: image66, alt: t('fotografias.imageAlt66') },
        { src: image67, alt: t('fotografias.imageAlt67') },
        { src: image68, alt: t('fotografias.imageAlt68') },
        { src: image69, alt: t('fotografias.imageAlt69') },
        { src: image70, alt: t('fotografias.imageAlt70') },
        { src: image71, alt: t('fotografias.imageAlt71') },
        { src: image72, alt: t('fotografias.imageAlt72') },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const newVisited = new Set();
        for (let i = 0; i <= currentIndex; i++) {
            newVisited.add(i);
        }
        if (newVisited.size === images.length) {
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
            </section>

            {/* Modal */}
            {showModal && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <h2>{t('fotografias.congratulations')}</h2>
                        <p>{t('fotografias.modalMessage')}</p>
                        <button className="closeButton" onClick={closeModal}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Fotografias;
