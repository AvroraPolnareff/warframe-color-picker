import React, {useContext} from "react";
import styled, { css } from "styled-components";
import {CurrentScreenContext, Screen} from "../providers/CurrentScreenProvider";
import {SettingsContext} from "../providers/SettingsProvider";
import {useTransition} from "react-transition-state";
import {useTranslation} from "react-i18next";

export const Header = () => {
  const {screen} = useContext(CurrentScreenContext)
  const {enableMOTD} = useContext(SettingsContext)
  const showMOTD = screen === Screen.COLOR_PICKER
  const {t} = useTranslation()

  const [state, toggle] = useTransition({
    timeout: 250,
    preEnter: true,
  });

  React.useEffect(() => {
    toggle(enableMOTD && showMOTD);
  }, [enableMOTD, showMOTD, toggle]);

  return (
    <FadeDiv state={state.status}>
      <StyledHeader>
        <TipOfADay/>
        <TipWrapper hidden={!enableMOTD}>
          {t("colorPicker.motd")}
        </TipWrapper>
      </StyledHeader>
    </FadeDiv>
  )
}

const FadeDiv = styled.div<{state: string; children?: React.ReactNode}>`
  transition: 0.3s ease;
  opacity: ${({ state }) => (state === "entering" || state === "entered" ? 1 : 0)};
`;



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
  color: ${props => props.theme.colors.textOnBackground};
  line-height: 1;
`
