import i18n from "i18next";
import en from "./translations/en";
import {initReactI18next} from "react-i18next";


const resources = {
  en: {translation: en}
}

i18n.use(initReactI18next)
  .init({
    resources,
    interpolation: {
      escapeValue: false,
    }
  })

export default i18n;