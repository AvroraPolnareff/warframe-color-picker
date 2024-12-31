import {Colors, DefaultTheme, Mode} from 'styled-components'
import Color from "color";

type ColorsWithMode = {colors: Colors, mode: Mode}

export const dayTheme: ColorsWithMode = {
  mode: "light",
  colors: {
    primary: "#4DE2E3",

    textOnBackground: "#888888",
    textOnButtons: "#ffffff",
    buttons: "#A0A0A0",
    misc: "#BABABA",
    danger: "#E47272",
    success: "#83E472",
    link: "#7874E4",
    warning: "#e8dba5",
    targetSchemeHeader: "#D47574",
    exportText: "#888888",
    selectedColorHeader: "linear-gradient(90deg, rgba(233,165,165,1) 0%, rgba(184,193,192,1) 25%, rgba(101,192,224,1) 50%, rgba(174,162,219,1) 75%, rgba(129,193,217,1) 100%)",
    colorCellGradient: "linear-gradient(rgb(228, 114, 114) 0%, rgb(131, 228, 114) 33%, rgb(120, 116, 228) 67%, rgb(228, 114, 114) 100%)",
    background: "#ffffff",
    rootBackground: "#F4F4F4"
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
    targetSchemeHeader: "#B45F5E",
    selectedColorHeader: "linear-gradient(256.94deg, #66D1C5 22.98%, #CF8C67 69.24%, #D28C64 69.24%)",
    colorCellGradient: "linear-gradient(rgb(166, 91, 90) 0%, rgb(112, 179, 97) 33%, rgb(96, 95, 181) 67%, rgb(166, 91, 90) 100%)",
    exportText: "#FFFFFF",
    background: "#242424",
    rootBackground: "#242424"
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

