import React, {useContext} from "react";
import {CurrentScreenContext, Screen} from "../providers/CurrentScreenProvider";
import {Layout, SettingsContext} from "../providers/SettingsProvider";
import {Classic} from "./layouts/Classic";
import {Expanded} from "./layouts/Expanded";
import {Interface} from "./screens/Interface";
import {Languages} from "./screens/Languages";
import {SwitchTransition, Transition} from "react-transition-group";
import styled, { useTheme } from "styled-components";
import {TransitionProps} from "react-transition-group/Transition";
import {SchemeImport} from "./screens/SchemeImport";
import { Box } from "@mui/system";

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

      {screen === Screen.COLOR_PICKER && <AppDivider />}
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

const AppDivider = () => {
  const {colors} = useTheme()
  return <Box width="100%" display="flex" justifyContent="center" alignItems="center" mb="0.8em">
    <Box width="44em" display="flex" gap="0.3em" alignItems="center">
      <Box height="0.4em" width="0.4em" bgcolor={colors.misc} borderRadius="0.11em" />
      <Box height="0.227em" width="100%" bgcolor={colors.misc} borderRadius="0.11em" />
      <Box height="0.4em" width="0.4em" bgcolor={colors.misc} borderRadius="0.11em" />
    </Box>
  </Box>
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
