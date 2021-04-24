import React, {useContext, useEffect} from 'react';
import styled from "styled-components/macro";
import {AppBar, Container, Entry} from './AppBar';
import {ScreensSwitcher} from "./ScreensSwitcher";
import {CurrentScreenContext, Screen} from "../providers/CurrentScreenProvider";
import {SettingsContext} from "../providers/SettingsProvider";
import {useTranslation} from "react-i18next";

function App() {
  const {setScreen, screen} = useContext(CurrentScreenContext);
  const {language, enableMOTD, setEnableMOTD} = useContext(SettingsContext);
  const {t, i18n} = useTranslation();
  const showMOTD = screen === Screen.COLOR_PICKER
  useEffect(() => {
    i18n.changeLanguage(language).catch(e => console.log(e))
  }, [language, i18n])
  return (
    <StyledApp>
      <AppBar>
        <Container>
          {showMOTD && enableMOTD && (
            <Entry onClick={() => setEnableMOTD(!enableMOTD)}>
              {enableMOTD ? t("menu.hide") : t("menu.show")} MOTD
            </Entry>
          )}
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
          <Entry>{t("menu.help")}</Entry>
        </Container>
        <Container/>
      </AppBar>
      <ScreensSwitcher/>
      <Credentials><span>Hippothoe & Morisabeau</span></Credentials>
    </StyledApp>
  );
}

const Credentials = styled.div`
  position: fixed;
  bottom: 2%;
  right: 2%;
  text-align: right;
  font-size: 1.25rem;
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
