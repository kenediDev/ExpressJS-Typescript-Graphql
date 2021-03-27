import { InitOptions } from 'i18next';
import en from '../prefix/translate/en/translation.json';
import id from '../prefix/translate/id/translation.json';

export const i18nINIT: InitOptions = {
  fallbackLng: ['en'],
  lng: 'en',
  debug: true,
  keySeparator: false,
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
