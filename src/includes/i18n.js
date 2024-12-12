import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import fr from '@/locales/fr.json'
import my from '@/locales/my.json'
import th from '@/locales/th.json'

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    fr,
    my,
    th,
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD',
      },
    },
    ja: {
      currency: {
        style: 'currency',
        currency: 'JPY',
      },
    },
    my: {
      currency: {
        style: 'currency',
        currency: 'MMK',
      },
    },
    th: {
      currency: {
        style: 'currency',
        currency: 'BHT',
      },
    },
  },
})
