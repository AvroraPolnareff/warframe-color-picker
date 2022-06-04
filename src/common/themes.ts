import {Colors, DefaultTheme, ThemeColors} from 'styled-components'
import Color from "color";

export const dayTheme: Colors = {
  primary: "#A5E8E8",
  textOnBackground: "#c8c8c8",
  textOnButtons: "#ffffff",
  buttons: "#c8c8c8",
  misc: "#e6e6e6",
  danger: "#dba3a3",
  success: "#A3DBA3",
  link: "#A0A2EB",
  warning: "#e8dba5",
  targetSchemeHeader: "#e8a5a5",
  background: "#ffffff",
}


export const nightTheme: Colors = {
  primary: "#A5E8E8",
  textOnBackground: "#c8c8c8",
  textOnButtons: "#ffffff",
  buttons: "#424242",
  misc: "#424242",
  danger: "#dba3a3",
  success: "#A3DBA3",
  link: "#A0A2EB",
  warning: "#e8dba5",
  targetSchemeHeader: "#e8a5a5",
  background: "#242424",
}

export const createTheme = (colors: Colors) : DefaultTheme => {
  const darken = Object.entries(colors).map(([key, value]) => [key, Color(value).darken(0.2).hex().toString()])
  return ({
    colors: {
      ...colors,
      darken: Object.fromEntries(darken)
    }
  })
}

