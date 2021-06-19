import en from "../translations/en";
import 'react-i18next';
import ru from "../translations/ru";
import zh_CN from "../translations/zh_CN";

declare module 'react-i18next' {
  interface Resources {
    en: typeof en
    ru: typeof ru
    zh_CN: typeof zh_CN
  }
}