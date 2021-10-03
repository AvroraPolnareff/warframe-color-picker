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
import {NextSeo} from "next-seo"

const GlobalStyle = createGlobalStyle`
  html {
    font-family: "Gilroy", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    text-shadow: rgba(0, 0, 0, .1) 0 0 1px
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
              <NextSeo
                additionalLinkTags={[
                  {rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png"},
                  {rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5"},
                  {rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png"},
                  {rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png"},
                  {rel: "manifest", href: "/site.webmanifest"},
                  {rel:"shortcut icon", href: "/favicon.ico", type:"image/x-icon"}
                ]}
                additionalMetaTags={[
                  {name: "msapplication-TileColor", content: "#5bbad5"},
                  {name: "theme-color", content: "#000000"},
                  {name: "yandex-verification", content: "b316278f5276b429"}
                ]}
              />
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
