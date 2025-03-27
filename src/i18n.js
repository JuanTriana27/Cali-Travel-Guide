import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import esTranslation from './locales/es/translation.json';
import enTranslation from './locales/en/translation.json';
import frTranslation from './locales/fr/translation.json';
import ptTranslation from './locales/pt/translation.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            es: { translation: esTranslation },
            en: { translation: enTranslation },
            fr: { translation: frTranslation },
            pt: { translation: ptTranslation },
        },
        lng: 'es',
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
