import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import enCommon from "./locales/en/common.json";
import frCommon from "./locales/fr/common.json";

const resources = {
  en: {
    common: enCommon,
  },
  fr: {
    common: frCommon,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  supportedLngs: ["en", "fr"],
  defaultNS: "common",
  fallbackNS: "common",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
