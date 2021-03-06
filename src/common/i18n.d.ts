import en from "../translations/en";
import 'react-i18next';

declare module 'react-i18next' {
  interface Resources {
    en: typeof en
  }
}