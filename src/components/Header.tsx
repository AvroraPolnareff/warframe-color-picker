import React, {useContext} from "react";
import styled from "styled-components/macro";
import tipOfADay from "../assets/tipOfADay.svg"
import {CurrentScreenContext, Screen} from "../providers/CurrentScreenProvider";
import {SettingsContext} from "../providers/SettingsProvider";
import {TransitionProps} from "react-transition-group/Transition";
import {Transition} from "react-transition-group";

export const Header = () => {
  const {screen} = useContext(CurrentScreenContext);
  const {enableMOTD} = useContext(SettingsContext);
  const showMOTD = screen === Screen.COLOR_PICKER
  return (
    <FadeTransition
      in={enableMOTD && showMOTD}
      timeout={250}
    >
      <StyledHeader>
        <TipOfADay/>
        <TipWrapper>
          Join our Discord at: discord.gg/WWBYuY3! This place is not only limited to Warframe, so feel free to hop in
          even if you’re on a break. Our community is still growing, and we’re actively looking for new people. Hope
          to see you around!
        </TipWrapper>
      </StyledHeader>
    </FadeTransition>
  )
}

const FadeDiv = styled.div<{state: string}>`
  transition: 0.3s ease;
  opacity: ${({ state }) => (state === "entered" ? 1 : "exiting" ? 0 : "exited" ? 0 : "entering" && 0)};
`;

const FadeTransition = (
  {
    children,
    ...rest
  }: TransitionProps
) => <Transition {...rest}>
  {state => <FadeDiv state={state}>{children}</FadeDiv>}
</Transition>;



const StyledHeader = styled.header`
  margin: -0.5em auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: start;
  width: fit-content;
`

const TipOfADay = styled.img.attrs(() => ({src: tipOfADay}))`
  width: 14.7em;
  height: 4.83em;
`

const TipWrapper = styled.div`
  font-size: 1.3rem;
  margin: 0.35em auto auto 0.35em;
  width: 39em;
  color: ${props => props.theme.colors.secondary};
  line-height: 1;
`
