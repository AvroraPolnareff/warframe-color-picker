// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app"
import {createGlobalStyle, ThemeProvider} from "styled-components";
import React from "react";
import {colors, createTheme} from "../src/common/themes";
import {CurrentScreenProvider} from "../src/providers/CurrentScreenProvider";
import {SettingsProvider} from "../src/providers/SettingsProvider";
import {UrlPaletteContextProvider} from "../src/providers/UrlColorsProvider";
import {I18nextProvider, Resources, useSSR} from "react-i18next";
import i18n from "../src/i18n";
import "public/fonts/stylesheet.css"
import "public/css/normalize.css"


const GlobalStyle = createGlobalStyle`
  html {
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: rgba(0, 0, 0, .1) 0 0 1px
  }

  @media (min-width: 1400px) {
    html {
      font-size: 20px;
    }
  }

  * {
    box-sizing: border-box;
    
  }
`

function MyApp({ Component, pageProps }: AppProps<{langResources: Resources}>) {
  // TODO: change to dynamic ssr translations
  useSSR(pageProps.langResources, "en")
  return (
    <ThemeProvider theme={createTheme(colors)}>
      <CurrentScreenProvider>
        <SettingsProvider>
          <UrlPaletteContextProvider>
            <I18nextProvider i18n={i18n}>
              <GlobalStyle/>
              <Component {...pageProps} />
            </I18nextProvider>
          </UrlPaletteContextProvider>
        </SettingsProvider>
      </CurrentScreenProvider>
    </ThemeProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp
