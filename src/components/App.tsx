import React, {useState} from 'react';
import styled from "styled-components/macro";
import {Header} from "./Header";
import {AppBar, CenterContainer, Entry} from './AppBar';
import {Classic} from "./layouts/Classic";
import {Expanded} from "./layouts/Expanded";
import {LayoutsScreen} from "./layouts/LayoutsScreen";

function App() {
  const [showMOTD, setShowMOTD] = useState(true);
  const [layout, setLayout] = useState(false);
  return (
    <StyledApp>
      <AppBar>
        <CenterContainer>
          <Entry onClick={() => setShowMOTD(!showMOTD)}>{showMOTD ? "Show" : "Hide"} MOTD</Entry>
          <Entry onClick={() => setLayout(!layout)}>Layout Switch</Entry>
          <Entry>Language</Entry>
          <Entry>Help</Entry>
        </CenterContainer>
      </AppBar>
      {<LayoutsScreen/>}
      {/*{showMOTD && <Header/>}*/}
      {/*{layout ? <Classic/> : <Expanded/>}*/}
      {/*<Credentials><span>Hippothoe & Morisabeau</span></Credentials>*/}
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
