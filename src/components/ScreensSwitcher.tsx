import React, {useContext} from "react";
import {CurrentScreenContext, Screen} from "../providers/CurrentScreenProvider";
import {Layout, SettingsContext} from "../providers/SettingsProvider";
import {Classic} from "./layouts/Classic";
import {Expanded} from "./layouts/Expanded";
import {Interface} from "./screens/Interface";
import {Languages} from "./screens/Languages";
import {SwitchTransition, Transition} from "react-transition-group";
import styled from "styled-components";
import {TransitionProps} from "react-transition-group/Transition";
import {SchemeImport} from "./screens/SchemeImport";

export const ScreensSwitcher = () => {
  const {screen} = useContext(CurrentScreenContext);
  const {layout} = useContext(SettingsContext);
  return (
    <SwitchTransition mode={"out-in"}>
      <FadeTransition
        key={screen}
        timeout={250}
        unmountOnExit
        mountOnEnter
      >
        <StyledScreenSwitcher>
        {
          screen === Screen.COLOR_PICKER ? <CurrentLayout layout={layout}/> :
          screen === Screen.LAYOUT_SELECTION ? <Interface/> :
          screen === Screen.LANGUAGE_SELECTION ? <Languages/> :
          screen === Screen.SCHEME_IMPORT && <SchemeImport/>
        }
        </StyledScreenSwitcher>
      </FadeTransition>
    </SwitchTransition>
  )
}

const StyledScreenSwitcher = styled.div`
  position: relative;
  left: -1em;
`

const FadeDiv = styled.div<{state: string}>`
  transition: 0.3s ease;
  opacity: ${({ state }) => (state === "entered" ? 1 : 0)};
  display: ${({ state }) => (state === "exited" ? "none" : "block")};
`;

const FadeTransition = (
  {
    children,
    ...rest
  }: TransitionProps
) => <Transition {...rest}>
  {state => <FadeDiv state={state}>
    {/* @ts-ignore */}
    {children}
  </FadeDiv>}
</Transition>;


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
