import type { AppProps } from "next/app"
import {Colors, createGlobalStyle, ThemeProvider} from "styled-components";
import React, {ReactNode, useContext, useEffect, useState} from "react";
import {CurrentScreenProvider} from "../src/providers/CurrentScreenProvider";
import {SettingsContext, SettingsProvider} from "../src/providers/SettingsProvider";
import {UrlPaletteContextProvider} from "../src/providers/UrlColorsProvider";
import {I18nextProvider, useSSR} from "react-i18next";
import i18n from "../src/i18n";
import "public/fonts/stylesheet.css"
import "public/css/normalize.css"
import { Resource } from "i18next";
import en from "locales/en/translation.json";
import ru from "locales/ru/translation.json";
import zh_CN from "locales/zh_CN/translation.json";


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
      font-size: 22px;
    }
  }

  * {
    box-sizing: border-box;
  }
`

const AppThemeProvider = (props: {children: ReactNode}) => {
  const {colors} = useContext(SettingsContext)
  return (
      <ThemeProvider theme={colors}>
        {props.children}
      </ThemeProvider>
  )
}

function MyApp({ Component, pageProps }: AppProps<{langResources: Resource}>) {
  useSSR({
    en: {translation: en},
    ru: {translation: ru},
    zh_CN: {translation: zh_CN}
  }, "en")

  return (
    <I18nextProvider i18n={i18n}>
      <CurrentScreenProvider>
        <SettingsProvider>
          <AppThemeProvider>
            <UrlPaletteContextProvider>
              <GlobalStyle/>
              <Component {...pageProps} />
            </UrlPaletteContextProvider>
          </AppThemeProvider>
        </SettingsProvider>
      </CurrentScreenProvider>
    </I18nextProvider>


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
