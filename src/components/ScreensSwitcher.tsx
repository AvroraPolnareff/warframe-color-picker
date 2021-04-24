import React, {useContext} from "react";
import {CurrentScreenContext} from "../providers/CurrentScreenProvider";
import {Layout, SettingsContext} from "../providers/SettingsProvider";
import {Classic} from "./layouts/Classic";
import {Expanded} from "./layouts/Expanded";
import {Layouts} from "./screens/Layouts";
import {Screen} from "../providers/CurrentScreenProvider";
import {Languages} from "./screens/Languages";
import {SwitchTransition, Transition} from "react-transition-group";
import styled from "styled-components/macro";
import {TransitionProps} from "react-transition-group/Transition";

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
          screen === Screen.LAYOUT_SELECTION ? <Layouts/> :
          screen === Screen.LANGUAGE_SELECTION && <Languages/>
        }
        </StyledScreenSwitcher>
      </FadeTransition>
    </SwitchTransition>
  )
}

const StyledScreenSwitcher = styled.div`
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
  {state => <FadeDiv state={state}>{children}</FadeDiv>}
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
