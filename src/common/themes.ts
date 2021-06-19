import {DefaultTheme} from 'styled-components'
import Color from "color";
export const defaultTheme : DefaultTheme = {
  colors: {
    primary: "#A5E8E8",
    secondary: "#DADADA",
    tertiary: "#ebebeb",
    quaternary: "",
    danger: "#dba3a3",
    success: "#A3DBA3",
    link: "#A0A2EB",
    warning: "#e8dba5",
    targetSchemeHeader: "#e8a5a5",
    background: "#ffffff",

    darken: {
      primary: Color("#A5E8E8").darken(0.2).toString(),
      secondary: Color("#DADADA").darken(0.2).toString(),
      tertiary: Color("#ebebeb").darken(0.07).toString(),
      quaternary: "",
      danger: Color("#dba3a3").darken(0.2).toString(),
      success: Color("#A3DBA3").darken(0.2).toString(),
      link: Color("#A0A2EB").darken(0.2).toString(),
      warning: Color("#e8dba5").darken(0.2).toString(),
      targetSchemeHeader: "#e8a5a5",
      background: "#ffffff",
    },
  }

}
