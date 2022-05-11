import {Colors, DefaultTheme, ThemeColors} from 'styled-components'
import Color from "color";

export const colors: Colors = {
  primary: "#A5E8E8",
  secondary: "#DADADA",
  tertiary: "#ebebeb",
  quaternary: "#ebebeb",
  danger: "#dba3a3",
  success: "#A3DBA3",
  link: "#A0A2EB",
  warning: "#e8dba5",
  targetSchemeHeader: "#e8a5a5",
  background: "#ffffff",
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

