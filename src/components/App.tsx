import React, {useContext, useEffect} from 'react';
import styled from "styled-components";
import {AppBar, Container, Entry} from './AppBar';
import {ScreensSwitcher} from "./ScreensSwitcher";
import {CurrentScreenContext, Screen} from "../providers/CurrentScreenProvider";
import {SettingsContext} from "../providers/SettingsProvider";
import {useTranslation} from "react-i18next";

function App() {
  const {setScreen, screen} = useContext(CurrentScreenContext);
  const {language} = useContext(SettingsContext);
  const {t, i18n} = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(language).catch(e => console.log(e))
  }, [language, i18n])
  return (
    <StyledApp>
      <AppBar>
        <Container>
        </Container>
        <Container>
          <Entry
            onClick={() => setScreen(Screen.COLOR_PICKER)}
            active={screen === Screen.COLOR_PICKER}
          >
            {t("menu.colorPicker")}
          </Entry>
          <Entry
            onClick={() => setScreen(Screen.LAYOUT_SELECTION)}
            active={screen === Screen.LAYOUT_SELECTION}
          >
            {t("menu.layoutSwitch")}
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
          <Credentials><span>Hippothoe & Morisabeau</span></Credentials>
      }

    </StyledApp>
  );
}

const Credentials = styled.div`
  position: fixed;
  bottom: 2%;
  left: 2%;
  text-align: right;
  font-size: 1.25rem;

  a {
    color: ${({theme}) => theme.colors.link}
  }
`

const Attention = styled.div`
  width: 100%;
  font-size: 1.25rem;
  text-align: center;
  display: flex;
  
`

export const StyledApp = styled.div`
  position: relative;
  color: ${props => props.theme.colors.secondary};
  margin: 0;
  font-family: "Gilroy", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

export default App;
