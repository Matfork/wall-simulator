import NextI18Next from 'next-i18next';

const i18Next = new NextI18Next({
  defaultLanguage: 'es',
  otherLanguages: ['en'],
  lng: 'es',
  fallbackLng: {
    default: ['en', 'es']
  },
  interpolation: {
    escapeValue: true
  },
  debug: process.env.NODE_ENV === 'development'
});

export default i18Next;

export const {
  appWithTranslation,
  Link,
  Router,
  i18n,
  withNamespaces
} = i18Next;
