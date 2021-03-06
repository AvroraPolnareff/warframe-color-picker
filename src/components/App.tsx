import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components/macro";
import {AppBar, CenterContainer, Entry} from './AppBar';
import {Header} from "./Header";
import {ScreensSwitcher} from "./ScreensSwitcher";
import {useStickyState} from "../hooks/useStickyState";
import {CurrentScreenContext, Screen} from "../providers/CurrentScreenProvider";
import {SettingsContext} from "../providers/SettingsProvider";
import {useTranslation} from "react-i18next";

function App() {
  const [showMOTD, setShowMOTD] = useStickyState(true, "motd");
  const {setScreen} = useContext(CurrentScreenContext);
  const {language} = useContext(SettingsContext);
  const {t, i18n} = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])
  return (
    <StyledApp>
      <AppBar>
        <CenterContainer>
          <Entry onClick={() => setShowMOTD(!showMOTD)}>{showMOTD ? "Show" : "Hide"} MOTD</Entry>
          <Entry onClick={() => setScreen(Screen.COLOR_PICKER)}>{t("menu.colorPicker")}</Entry>
          <Entry onClick={() => setScreen(Screen.LAYOUT_SELECTION)}>{t("menu.layoutSwitch")}</Entry>
          <Entry onClick={() => setScreen(Screen.LANGUAGE_SELECTION)}>{t("menu.languageSwitch")}</Entry>
          <Entry>{t("menu.help")}</Entry>
        </CenterContainer>
      </AppBar>
      {showMOTD && <Header/>}
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
