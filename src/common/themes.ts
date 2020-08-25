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
    warning: "#e8dba5",
    darken: {
      primary: Color("#A5E8E8").darken(0.2).toString(),
      secondary: Color("#DADADA").darken(0.2).toString(),
      tertiary: Color("#ebebeb").darken(0.2).toString(),
      quaternary: "",
      danger: Color("#dba3a3").darken(0.2).toString(),
      success: Color("#A3DBA3").darken(0.2).toString(),
      warning: Color("#e8dba5").darken(0.2).toString(),
    },
    
    badge: "#dadada",
    badgeText: "#ffffff",
    border: "#ebebeb",
    defaultButton: "#a5e8e8",
    manualButton: "#e8dfa5",
    buttonText: "#ffffff",
    divider: "#ebebeb",
    primaryText: "#d1d1d1",
    targetSchemeHeader: "#e8a5a5",
    windowBackground: "#ffffff",
    
    switch: {
      background: "#E4E4E4",
      front: "#A5E8E8",
      leftText: "#ffffff",
      rightText: "#ffffff",
    }
  }
  
}