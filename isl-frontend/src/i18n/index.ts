import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import hi from './locales/hi.json'

export const supportedLanguages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: '\u0939\u093f\u0928\u094d\u0926\u0940' },
] as const

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
  },
  lng: localStorage.getItem('isl-language') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
