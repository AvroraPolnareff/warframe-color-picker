import React, {useContext, useEffect} from 'react';
import styled, {Colors, createGlobalStyle} from "styled-components";
import {AppBar, Container, Entry} from './AppBar';
import {ScreensSwitcher} from "./ScreensSwitcher";
import {CurrentScreenContext, Screen} from "../providers/CurrentScreenProvider";
import {SettingsContext} from "../providers/SettingsProvider";
import {useTranslation} from "react-i18next";
import Color from "color";
import {Window} from "./shared/Window";
import {useRouter} from "next/router";

const ThemePanel = () => {
  const {colors, setColors} = useContext(SettingsContext);
  const setColor = (name: string, color: string) => {
    try {
      new Color(color)
      setColors((prev) => ({...prev, [name]: color}))
    } catch {}
  }
  return (
    <div style={{position: "fixed", bottom: 0, left: 0, zIndex: 100}}>
      <Window >
        {Object.entries(colors).map(([name, value]) => (
          <div>
            {name}{value}{<input type="color" value={value} onChange={(e) => setColor(name, e.target.value)}/>}
          </div>
        ))}
      </Window>
    </div>
  )
}

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({theme}) => theme.colors.rootBackground};
  }
`

function App() {
  const {setScreen, screen} = useContext(CurrentScreenContext);
  const {language} = useContext(SettingsContext);
  const {t, i18n} = useTranslation();
  const router = useRouter()
  const showPanel = router.asPath.includes("moriska")
  useEffect(() => {
    i18n.changeLanguage(language).catch(e => console.log(e))
  }, [language, i18n])
  return (
    <StyledApp>
      <GlobalStyles/>
      <AppBar>
        <Container>
        </Container>
        <Container>
          <Entry
            onClick={() => setScreen(Screen.COLOR_PICKER)}
            active={screen === Screen.COLOR_PICKER}
          >
            {t("menu.colorPicker", {defaultValue: "Color Picker"})}
          </Entry>
          <Entry
            onClick={() => setScreen(Screen.LAYOUT_SELECTION)}
            active={screen === Screen.LAYOUT_SELECTION}
          >
            {t("menu.interface")}
          </Entry>
          <Entry
            onClick={() => setScreen(Screen.LANGUAGE_SELECTION)}
            active={screen === Screen.LANGUAGE_SELECTION}
          >
            {t("menu.languageSwitch")}
          </Entry>
          <Entry><a href={t("links.guide")} style={{textDecoration: "none", color: "inherit"}}>{t("menu.help")}</a></Entry>
        </Container>
        <Container/>
      </AppBar>
      <ScreensSwitcher/>
      {
        !process.env.index ?
          <Credentials><a href="https://www.warframecolorpicker.app/">Hooray, we've gotten a new link!</a>Please follow <a href="https://github.com/AvroraPolnareff/warframe-color-picker/blob/master/README.md">this guide</a> to move your old palettes.</Credentials> :
          <Credentials>Have questions? Head to our <a href="https://discord.gg/ZyHZES6BCY">Discord</a>!<br/>last upd.: 4/10/2024</Credentials>
      }
      {showPanel && <ThemePanel />}
    </StyledApp>
  );
}

const Credentials = styled.div`
  position: fixed;
  bottom: 2%;
  left: 2%;
  text-align: left;
  font-size: 1.125rem;

  a {
    color: ${({theme}) => theme.colors.link}
  }
`

export const StyledApp = styled.div`
  position: relative;
  color: ${props => props.theme.colors.textOnBackground};
  margin: 0;
  font-family: "Gilroy", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

export default App;
