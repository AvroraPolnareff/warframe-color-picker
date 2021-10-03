import React, {useContext, useEffect} from 'react';
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {AppBar, Container, Entry} from 'src/components/AppBar';
import {ScreensSwitcher} from "src/components/ScreensSwitcher"
import {CurrentScreenContext, Screen} from "src/providers/CurrentScreenProvider";
import {SettingsContext} from "src/providers/SettingsProvider";

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
          <Entry><a href="https://github.com/AvroraPolnareff/warframe-color-picker/blob/master/README.md" style={{textDecoration: "none", color: "inherit"}}>{t("menu.help")}</a></Entry>
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
  left: 2%;
  text-align: right;
  font-size: 1.25rem;
`

export const StyledApp = styled.div`
  position: relative;
  color: ${props => props.theme.colors.secondary};
  margin: 0;
`

export default App;
