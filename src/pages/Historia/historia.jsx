import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../pages/Historia/historia.css';
import ReactPlayer from 'react-player';
import image4 from '../../assets/imagenes/Image4.jpg';

const videoConfig = {
  en: [
    {
      id: 1,
      url: '/videos/Video1.mp4',
      titleKey: 'historia.titleVideo1',
      isLocal: true
    },
    {
      id: 2,
      url: 'https://youtu.be/EN_VIDEO_2',
      titleKey: 'historia.titleVideo2'
    },
    {
      id: 3,
      url: 'https://youtu.be/EN_VIDEO_3',
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
      url: 'https://youtu.be/ES_VIDEO_2',
      titleKey: 'historia.titleVideo2'
    },
    {
      id: 3,
      url: 'https://youtu.be/ES_VIDEO_3',
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
      url: 'https://youtu.be/FR_VIDEO_2',
      titleKey: 'historia.titleVideo2'
    },
    {
      id: 3,
      url: 'https://youtu.be/FR_VIDEO_3',
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
      url: 'https://youtu.be/PT_VIDEO_2',
      titleKey: 'historia.titleVideo2'
    },
    {
      id: 3,
      url: 'https://youtu.be/PT_VIDEO_3',
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
      if (video.isLocal) {
        return (
          <div className="localVideoThumbnail">
            <div className="videoOverlay">
              <span className="playIcon">&#9658;</span>
            </div>
          </div>
        );
      }
      
      const videoId = video.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
      return videoId && (
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
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