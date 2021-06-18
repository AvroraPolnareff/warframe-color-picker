import en from "../translations/en";
import 'react-i18next';
import ru from "../translations/ru";
import cn from "../translations/cn";

declare module 'react-i18next' {
  interface Resources {
    en: typeof en
    ru: typeof ru
    cn: typeof cn
  }
}