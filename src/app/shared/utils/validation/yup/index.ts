import * as yup from 'yup';
import lang from './lang';
import i18n from 'i18next';

i18n.on('initialized', () => {
  if (i18n.language === 'es') {
    yup.setLocale(lang.ES);
  } else if (i18n.language === 'en') {
    yup.setLocale(lang.EN);
  }
});

export default yup;
