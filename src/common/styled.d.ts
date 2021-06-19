import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
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

      darken: {
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
      }
    }
  }
}
