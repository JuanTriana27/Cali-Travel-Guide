import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../pages/Historia/historia.css';
import ReactPlayer from 'react-player';
import DSC05469 from '../../assets/imagenes/DSC05469.jpg';

// Arreglo con los videos y su respectivo idioma
const videoConfig = {
  en: [
    {
      id: 1,
      url: '/videos/Video1_En.mp4',
      titleKey: 'historia.titleVideo1',
      isLocal: true
    },
    {
      id: 2,
      url: '/videos/Video2_En.mp4',
      titleKey: 'historia.titleVideo2'
    },
    {
      id: 3,
      url: '/videos/Video3_En.mp4',
      titleKey: 'historia.titleVideo3'
    }
  ],
  es: [
    {
      id: 1,
      url: '/videos/Video1_Es.mp4',
      titleKey: 'historia.titleVideo1',
      isLocal: true
    },
    {
      id: 2,
      url: '/videos/Video2_Es.mp4',
      titleKey: 'historia.titleVideo2'
    },
    {
      id: 3,
      url: '/videos/Video3_Es.mp4',
      titleKey: 'historia.titleVideo3'
    }
  ],
  fr: [
    {
      id: 1,
      url: '/videos/Video1_Fr.mp4',
      titleKey: 'historia.titleVideo1',
      isLocal: true
    },
    {
      id: 2,
      url: '/videos/Video2_Fr.mp4',
      titleKey: 'historia.titleVideo2'
    },
    {
      id: 3,
      url: '/videos/Video3_Fr.mp4',
      titleKey: 'historia.titleVideo3'
    }
  ],
  pt: [
    {
      id: 1,
      url: '/videos/Video1_Pt.mp4',
      titleKey: 'historia.titleVideo1',
      isLocal: true
    },
    {
      id: 2,
      url: '/videos/Video2_Pt.mp4',
      titleKey: 'historia.titleVideo2'
    },
    {
      id: 3,
      url: '/videos/Video3_Pt.mp4',
      titleKey: 'historia.titleVideo3'
    }
  ]
};

const Historia = () => {
  const { t, i18n } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const getVideoContent = (video) => {
    if (selectedVideo?.id === video.id) {
      return (
        <div className="inlineVideoPlayer">
          <ReactPlayer
            url={video.isLocal ? `${process.env.PUBLIC_URL}${video.url}` : video.url}
            controls
            playing
            width="100%"
            height="100%"
            className="react-player"
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload'
                }
              }
            }}
          />
          <button
            className="closeInlineButton"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedVideo(null);
            }}
          >
            &times;
          </button>
        </div>
      );
    }

    const getThumbnail = () => {
      return (
        <img
          src="/banner/fondo.png"
          alt={t(video.titleKey)}
          className="thumbnailImage"
        />
      );
    };

    return (
      <>
        {getThumbnail()}
        <div className="videoOverlay">
          <span className="playIcon">&#9658;</span>
        </div>
      </>
    );
  };

  const currentLanguage = i18n.language.split('-')[0];
  const videos = videoConfig[currentLanguage] || videoConfig.es;

  return (
    <div className="historia">
      <header className="historiaHeader">
        <h1 className="historiaTitle">{t('historia.title')}</h1>
        <p className="historiaSubtitle">{t('historia.subtitle')}</p>
      </header>

      <section className="historiaContent">
        <div className="historiaImageContainer">
          <img
            src={DSC05469}
            alt={t('historia.title')}
            style={{ width: '600px', height: '350px' }}
            className="historiaImage"
          />
        </div>

        <div className="historiaText">
          <h2>{t('historia.historyHeading')}</h2>
          <p>{t('historia.historyParagraph1')}</p>
          <p>{t('historia.historyParagraph2')}</p>
        </div>
      </section>

      <section className="videoSection">
        <h2>{t('historia.videoGallery')}</h2>
        <div className="videoGrid">
          {videos.map((video) => (
            <div
              key={video.id}
              className={`videoThumbnail ${selectedVideo?.id === video.id ? 'active' : ''}`}
              onClick={() => setSelectedVideo(selectedVideo?.id === video.id ? null : video)}
            >
              <div className="videoThumbnailWrapper">
                {getVideoContent(video)}
              </div>
              <p className="videoTitle">{t(video.titleKey)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Historia;