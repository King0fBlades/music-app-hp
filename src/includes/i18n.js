import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import bg from '@/locales/bg.json'

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    bg
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD'
      }
    },
    bg: {
      currency: {
        style: 'currency',
        currency: 'BGN'
      }
    }
  }
})
