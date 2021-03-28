import { InitOptions } from 'i18next';
import en from '../prefix/locale/en/translation.json';
import id from '../prefix/locale/id/translation.json';

export const i18nINIT: InitOptions = {
  fallbackLng: ['en', 'id'],
  lng: 'en',
  debug: false,
  keySeparator: false,
  preload: ['id', 'en'],
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: en[0],
    },
    id: {
      translation: id[0],
    },
  },
};
