import React, {useContext} from "react";
import {CurrentScreenContext, Screen} from "../providers/CurrentScreenProvider";
import {Layout, SettingsContext} from "../providers/SettingsProvider";
import {Classic} from "./layouts/Classic";
import {Expanded} from "./layouts/Expanded";
import {Interface} from "./screens/Interface";
import {Languages} from "./screens/Languages";
import {useTransition} from "react-transition-state";
import styled, { useTheme } from "styled-components";
import {SchemeImport} from "./screens/SchemeImport";


export const ScreensSwitcher = () => {
  const {screen} = useContext(CurrentScreenContext);
  const {layout} = useContext(SettingsContext);

  const [state, toggle] = useTransition({
    timeout: 250,
    unmountOnExit: true,
    initialEntered: true,
    preEnter: true
  });
  const [displayScreen, setDisplayScreen] = React.useState(screen);

  React.useEffect(() => {
    if (screen !== displayScreen) {
      toggle(false);
    }
  }, [screen, displayScreen, toggle]);

  React.useEffect(() => {
    if (state.status === "unmounted") {
      setDisplayScreen(screen);
      toggle(true);
    }
  }, [state.status, screen, toggle]);

  return (
    <FadeDiv state={state.status}>
      {displayScreen === Screen.COLOR_PICKER && <AppDivider />}
      <StyledScreenSwitcher>
        {
          displayScreen === Screen.COLOR_PICKER ? <CurrentLayout layout={layout}/> :
          displayScreen === Screen.LAYOUT_SELECTION ? <Interface/> :
          displayScreen === Screen.LANGUAGE_SELECTION ? <Languages/> :
          displayScreen === Screen.SCHEME_IMPORT && <SchemeImport/>
        }
      </StyledScreenSwitcher>
    </FadeDiv>
  )
}

const AppDivider = () => {
  const {colors} = useTheme()
  return <AppDividerWrapper>
    <AppDividerInner>
      <DividerDot style={{backgroundColor: colors.misc}}/>
      <DividerLine style={{backgroundColor: colors.misc}}/>
      <DividerDot style={{backgroundColor: colors.misc}}/>
    </AppDividerInner>
  </AppDividerWrapper>
}

const AppDividerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.8em;
`

const AppDividerInner = styled.div`
  width: 44em;
  display: flex;
  gap: 0.3em;
  align-items: center;
`

const DividerDot = styled.div`
  height: 0.4em;
  width: 0.4em;
  border-radius: 0.11em;
`

const DividerLine = styled.div`
  height: 0.227em;
  width: 100%;
  border-radius: 0.11em;
`

const StyledScreenSwitcher = styled.div`
  position: relative;
  left: -1em;
`

const FadeDiv = styled.div<{state: string; children?: React.ReactNode}>`
  transition: 0.3s ease;
  opacity: ${({ state }) => (state === "entering" || state === "entered" ? 1 : 0)};
`;


const CurrentLayout = (
  {
    layout
  }: {
    layout: Layout
  }
) => {
  switch (layout) {
    case Layout.CLASSIC: return <Classic/>
    case Layout.EXPANDED: return <Expanded/>
  }
}
