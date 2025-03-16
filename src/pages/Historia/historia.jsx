import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../pages/Historia/historia.css';
import AudioPlayer from '../../components/AudioPlayer/audioPlayer.jsx';
import historiaAudio from '../../assets/audio/historia.mp3';
import image4 from '../../assets/imagenes/Image4.jpg';

const Historia = () => {
  const { t } = useTranslation();

  return (
    <div className="historia">
      <header className="historiaHeader">
        <h1 className="historiaTitle">{t('historia.title')}</h1>
        <p className="historiaSubtitle">{t('historia.subtitle')}</p>
        <AudioPlayer audioSrc={historiaAudio} />
      </header>

      <section className="historiaContent">
        <div className="historiaImageContainer">
          <img
            src={image4}
            alt={t('historia.title')}
            className="historiaImage"
          />
        </div>

        <div className="historiaText">
          <h2>{t('historia.historyHeading')}</h2>
          <p>{t('historia.historyParagraph1')}</p>
          <p>{t('historia.historyParagraph2')}</p>
        </div>
      </section>
    </div>
  );
};

export default Historia;
