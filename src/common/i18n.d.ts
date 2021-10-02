import en from "../translations/en";
import 'react-i18next';
import ru from "../translations/ru";
import zh_CN from "../translations/zh_CN";

declare module 'react-i18next' {
  interface Resources {
    en: typeof en
    ru: typeof en
    zh_CN: typeof en
  }
  // interface Resources {
  //   en: Any
  //   ru: Any
  //   zh_CN: Any
  // }
}
