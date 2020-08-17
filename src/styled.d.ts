import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primaryText: string;
      
      border: string;
      windowBackground: string;
      divider: string;
      
      targetSchemeHeader: string;
      defaultButton: string;
      manualButton: string;
      buttonText: string;
      
      badge: string;
      badgeText: string;
    }
  }
}