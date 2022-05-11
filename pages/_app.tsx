// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app"
import {Colors, createGlobalStyle, ThemeProvider} from "styled-components";
import React, {useState} from "react";
import {colors, createTheme} from "../src/common/themes";
import {CurrentScreenProvider} from "../src/providers/CurrentScreenProvider";
import {SettingsProvider} from "../src/providers/SettingsProvider";
import {UrlPaletteContextProvider} from "../src/providers/UrlColorsProvider";
import {I18nextProvider, Resources, useSSR} from "react-i18next";
import i18n from "../src/i18n";
import "public/fonts/stylesheet.css"
import "public/css/normalize.css"
import {Window} from "../src/components/shared/Window";
import {useRouter} from "next/router";
import Color from "color";


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

const ThemePanel = ({themeColors, setThemeColors}: {themeColors: Colors, setThemeColors:  React.Dispatch<React.SetStateAction<Colors>>}) => {
  const setColor = (name: string, color: string) => {
    try {
      new Color(color)
      setThemeColors((prev) => ({...prev, [name]: color}))
    } catch {}
  }
  return (
    <div style={{position: "fixed", bottom: 0, left: 0, zIndex: 100}}>
      <Window >
        {Object.entries(themeColors).map(([name, value]) => (
          <div>
            {name}{value}{<input type="color" value={value} onChange={(e) => setColor(name, e.target.value)}/>}
          </div>
        ))}
      </Window>
    </div>
  )
}

function MyApp({ Component, pageProps }: AppProps<{langResources: Resources}>) {
  // TODO: change to dynamic ssr translations
  useSSR(pageProps.langResources, "en")
  const [themeColors, setThemeColors] = useState(colors)
  const router = useRouter()
  const showPanel = router.asPath.includes("moriska")
  return (
    <ThemeProvider theme={createTheme(themeColors)}>
      <CurrentScreenProvider>
        <SettingsProvider>
          <UrlPaletteContextProvider>
            <I18nextProvider i18n={i18n}>
              <GlobalStyle/>
              {showPanel && <ThemePanel themeColors={themeColors} setThemeColors={setThemeColors}/>}
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
