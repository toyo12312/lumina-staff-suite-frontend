import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['uk', 'en', 'pl', 'de', 'fr', 'ro'],
    debug: false, // Вимикаємо для чистоти консолі

    detection: {
      order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie', 'localStorage'],
    },

    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },

    // --- ОСНОВНА ЗМІНА: Вмикаємо Suspense ---
    // Це дозволить нашому <Suspense> в App.tsx "чекати" на завантаження перекладів
    react: {
      useSuspense: true,
    },
  });

export default i18n;
