import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import auth from '../locales/es-MX/auth.json';
import booking from '../locales/es-MX/booking.json';
import common from '../locales/es-MX/common.json';
import communication from '../locales/es-MX/communication.json';
import analytics from '../locales/es-MX/analytics.json';
import marketplace from '../locales/es-MX/marketplace.json';
import payment from '../locales/es-MX/payment.json';
import profile from '../locales/es-MX/profile.json';
import reviews from '../locales/es-MX/reviews.json';
import verification from '../locales/es-MX/verification.json';

const resources = {
  'es-MX': {
    analytics,
    auth,
    booking,
    common,
    communication,
    marketplace,
    payment,
    profile,
    reviews,
    verification,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.locale ?? 'es-MX',
  fallbackLng: 'es-MX',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v4',
});

export default i18n;
