import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primaryText: string;
      borders: string;
      windowsBackground: string;
      dividers: string;
      
      targetSchemeHeader: string;
      defaultButton: string;
      manualButton: string;
      
      badges: string;
      badgesText: string;
    }
  }
}