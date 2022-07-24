import 'styled-components'

declare module 'styled-components' {
  export type Mode = "light" | "dark"
  export interface DefaultTheme {
    colors: ThemeColors,
    mode: Mode
  }

  export interface ThemeColors {
    primary: string;
    textOnBackground: string;
    textOnButtons: string;
    buttons: string;
    misc: string;
    danger: string;
    success: string;
    link: string;
    warning: string;
    background: string;
    targetSchemeHeader: string;
    selectedColorHeader: string;

    darken: Colors;
  }

  export type Colors = Omit<ThemeColors, "darken">
}
