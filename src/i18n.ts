import i18n from "i18next";
import en from "./translations/en";
import {initReactI18next} from "react-i18next";
import ru from "./translations/ru";
import cn from "./translations/cn";


const resources = {
  en: {translation: en},
  ru: {translation: ru},
  cn: {translation: cn}
}

i18n.use(initReactI18next)
  .init({
    resources,
    interpolation: {
      escapeValue: false,
    }
  }).catch(e => console.log(e))

export default i18n;
