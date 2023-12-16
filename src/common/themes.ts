import {Colors, DefaultTheme, Mode} from 'styled-components'
import Color from "color";

type ColorsWithMode = {colors: Colors, mode: Mode}

export const dayTheme: ColorsWithMode = {
  mode: "light",
  colors: {
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
    selectedColorHeader: "linear-gradient(90deg, rgba(233,165,165,1) 0%, rgba(184,193,192,1) 25%, rgba(101,192,224,1) 50%, rgba(174,162,219,1) 75%, rgba(129,193,217,1) 100%)",
    background: "#ffffff",
  }
}

export const nightTheme: ColorsWithMode = {
  mode: "dark",
  colors: {
    primary: "#00C0C0",
    textOnBackground: "#c8c8c8",
    textOnButtons: "#ffffff",
    buttons: "#424242",
    misc: "#424242",
    danger: "#B25858",
    success: "#329632",
    link: "#5C60B9",
    warning: "#c2ab5c",
    targetSchemeHeader: "#C25C5C",
    selectedColorHeader: "linear-gradient(256.94deg, #66D1C5 22.98%, #CF8C67 69.24%, #D28C64 69.24%)",
    background: "#242424",
  }
}

export const createTheme = ({colors, mode}: ColorsWithMode) : DefaultTheme => {
  const toDarken = (color: string) => {
    try {
      return Color(color).darken(0.2).hex().toString()
    } catch {
      return color
    }
  }
  const darken = Object.entries(colors).map(([key, value]) => [key, toDarken(value)])
  return ({
    colors: {
      ...colors,
      darken: Object.fromEntries(darken)
    },
    mode
  })
}

