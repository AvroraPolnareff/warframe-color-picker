import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primaryText: string;
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      danger: string;
      success: string;
      link: string;
      warning: string;
      
      darken: {
        primary: string;
        secondary: string;
        tertiary: string;
        quaternary: string;
        danger: string;
        success: string;
        link: string;
        warning: string;
      }
      
      border: string;
      windowBackground: string;
      divider: string;
      
      targetSchemeHeader: string;
      defaultButton: string;
      manualButton: string;
      buttonText: string;
      
      badge: string;
      badgeText: string;
      
      switch: {
        background: string;
        rightText: string;
        leftText: string;
        front: string;
      }
    }
  }
}