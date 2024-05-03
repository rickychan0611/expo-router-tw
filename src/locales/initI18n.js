import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";
const isHermes = !!global.HermesInternal;

if (isAndroid || isHermes) {
  require("@formatjs/intl-locale/polyfill");

  require("@formatjs/intl-pluralrules/polyfill");
  require("@formatjs/intl-pluralrules/locale-data/en");
  require("@formatjs/intl-pluralrules/locale-data/es");

  require("@formatjs/intl-displaynames/polyfill");
  require("@formatjs/intl-displaynames/locale-data/en");
  require("@formatjs/intl-displaynames/locale-data/es");
}

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Could be anything that returns default preferred language
import { getLocales } from "expo-localization";

// Import all the languages you want here
import en from "./en/common.json";
import cn from "./cn/common.json";

i18n.use(initReactI18next).init({
  // Add any imported languages here
  resources: {
    en: {
      common: en,
    },
    cn: {
      common: cn,
    }
  },
  lng: getLocales()[0]?.languageCode || "en",
  fallbackLng: "en",  // This is the default language if none of the users preffered languages are available
  interpolation: {
    escapeValue: false, // https://www.i18next.com/translation-function/interpolation#unescape
  },
  returnNull: false,
})