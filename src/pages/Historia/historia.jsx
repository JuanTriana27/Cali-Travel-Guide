import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../pages/Historia/historia.css';
import ReactPlayer from 'react-player';
import image4 from '../../assets/imagenes/Image4.jpg';

const videoConfig = {
  en: [
    { id: 1, url: 'https://youtu.be/EN_VIDEO_1', titleKey: 'historia.titleVideo1' },
    { id: 2, url: 'https://youtu.be/EN_VIDEO_2', titleKey: 'historia.titleVideo2' },
    { id: 3, url: 'https://youtu.be/EN_VIDEO_3', titleKey: 'historia.titleVideo3' }
  ],
  es: [
    { id: 1, url: 'https://youtu.be/quexwWHsVUQ', titleKey: 'historia.titleVideo1' },
    { id: 2, url: 'https://youtu.be/ES_VIDEO_2', titleKey: 'historia.titleVideo2' },
    { id: 3, url: 'https://youtu.be/ES_VIDEO_3', titleKey: 'historia.titleVideo3' }
  ],
  fr: [
    { id: 1, url: 'https://youtu.be/FR_VIDEO_1', titleKey: 'historia.titleVideo1' },
    { id: 2, url: 'https://youtu.be/FR_VIDEO_2', titleKey: 'historia.titleVideo2' },
    { id: 3, url: 'https://youtu.be/FR_VIDEO_3', titleKey: 'historia.titleVideo3' }
  ],
  pt: [
    { id: 1, url: 'https://youtu.be/PT_VIDEO_1', titleKey: 'historia.titleVideo1' },
    { id: 2, url: 'https://youtu.be/PT_VIDEO_2', titleKey: 'historia.titleVideo2' },
    { id: 3, url: 'https://youtu.be/PT_VIDEO_3', titleKey: 'historia.titleVideo3' }
  ]
};

const Historia = () => {
  const { t, i18n } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const getVideoId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : null;
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
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
          {videos.map((video) => {
            const videoId = getVideoId(video.url);
            return (
              <div
                key={video.id}
                className="videoThumbnail"
                onClick={() => handleVideoClick(video)}
              >
                <div className="videoThumbnailWrapper">
                  {videoId && (
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                      alt={t(video.titleKey)}
                      className="thumbnailImage"
                    />
                  )}
                  <div className="videoOverlay">
                    <span className="playIcon">&#9658;</span>
                  </div>
                </div>
                <p className="videoTitle">{t(video.titleKey)}</p>
              </div>
            );
          })}
        </div>

        {selectedVideo && (
          <div className="videoPlayerModal">
            <div className="videoPlayerContent">
              <button
                className="closeButton"
                onClick={() => setSelectedVideo(null)}
              >
                &times;
              </button>
              <div className="videoPlayerAspectRatio">
                <ReactPlayer
                  className="react-player"
                  url={selectedVideo.url}
                  controls
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Historia;