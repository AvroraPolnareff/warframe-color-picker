import React, {CSSProperties, FC, useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import TargetScheme from "./TargetScheme";
import {ColorPicker} from "./ColorPicker";
import Color from "color";
import {
  convertExportStringToColors,
  findClosestColors,
  useStickyState
} from "../common/helpers";
import {palettes} from "../common/palettes";
import {MatchedColor, Suggestions} from "./Suggestions";
import {SelectedColor} from "./SelectedColor";
import {Header} from "./Header";
import {ImportModal} from "./ImportModal";
import {PalettesModal} from "./PalettesModal";
import discordLogo from "../assets/discord-logo.svg"
import githubLogo from "../assets/github-logo.svg"
import warframeLogo from "../assets/wf-logo-DADADA 1.svg"
import {Link} from "./shared/Link";
import {debounce} from "lodash"
import targetSchemeToSuggestions from "../assets/Wires (Col Pic -_ Tar Sch).svg"
import targetSchemeToColorPicker from "../assets/Wires (Tar Sch -_ Col Pic).svg"
import suggestionsToSelectedColor from "../assets/Wires (Sugg -_ Sel Col).svg"
import { AppBar } from './AppBar';
import {useColorPickerLogic} from "../hooks/color-picker-logic";
import {Classic} from "./layouts/Classic";

function App() {
  return (
    <StyledApp>
      <AppBar/>
      {<Header/>}
      <Classic/>
      <Credentials><span>Hippothoe & Morisabeau</span></Credentials>
    </StyledApp>
  );
}

const Credentials = styled.div`
  position: absolute;
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
