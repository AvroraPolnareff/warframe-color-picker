import i18n from "i18next";
import en from "./translations/en";
import {initReactI18next} from "react-i18next";
import ru from "./translations/ru";
import zh_CN from "./translations/zh_CN";


const resources = {
  en: {translation: en},
  ru: {translation: ru},
  zh_CN: {translation: zh_CN}
}

i18n.use(initReactI18next)
  .init({
    resources,
    interpolation: {
      escapeValue: false,
    }
  }).catch(e => console.log(e))

export default i18n;
