import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ThemeColors
  }

  export interface ThemeColors {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    danger: string;
    success: string;
    link: string;
    warning: string;
    background: string;
    targetSchemeHeader: string;

    darken: Colors;
  }

  export type Colors = Omit<ThemeColors, "darken">
}
