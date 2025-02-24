import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ch from "./locales/ch.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ch: { translation: ch },
  },
  lng: localStorage.getItem("language") || "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already prevents XSS
  },
});

export default i18n;
