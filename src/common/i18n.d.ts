import en from "locales/en/translation.json";
import ru from "locales/ru/translation.json";
import zh_CN from "locales/zh_CN/translation.json";
import 'react-i18next';


declare module 'react-i18next' {
  interface Resources {
    en: typeof en
    ru: typeof ru
    zh_CN: typeof zh_CN
  }
}
