import React, {useContext} from "react";
import styled, { css } from "styled-components";
import {CurrentScreenContext, Screen} from "../providers/CurrentScreenProvider";
import {SettingsContext} from "../providers/SettingsProvider";
import {TransitionProps} from "react-transition-group/Transition";
import {Transition} from "react-transition-group";
import {useTranslation} from "react-i18next";

export const Header = () => {
  const {screen} = useContext(CurrentScreenContext)
  const {enableMOTD} = useContext(SettingsContext)
  const showMOTD = screen === Screen.COLOR_PICKER
  const {t} = useTranslation()
  return (
    <FadeTransition
      in={enableMOTD && showMOTD}
      timeout={250}
    >
      <StyledHeader>
        <TipOfADay/>
        <TipWrapper hidden={!enableMOTD}>
          {t("colorPicker.motd")}
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

const TipOfADay = styled.img.attrs(() => ({src: "/images/tipOfADay.svg", alt: ""}))`
  width: 14.7em;
  height: 4.83em;
`

const TipWrapper = styled.div<{hidden?: boolean}>`
  ${({hidden}) => hidden && css`
    user-select: none;
    cursor: default;
  `}
  
  font-size: 1.3rem;
  margin: 0.35em auto auto 0.35em;
  width: 39em;
  color: ${props => props.theme.colors.secondary};
  line-height: 1;
`
