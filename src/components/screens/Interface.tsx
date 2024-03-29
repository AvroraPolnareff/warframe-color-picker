import React, {useContext} from "react";
import styled, {useTheme} from "styled-components";
import {ClassicLayoutIcon} from "../../assets/ClassicLayoutIcon"
import {ExpandedLayoutIcon} from "../../assets/ExpandedLayoutIcon"
import {Divider} from "../shared/Divider";
import {Layout, SettingsContext} from "../../providers/SettingsProvider";
import {Trans, useTranslation} from "react-i18next";
import {css} from "styled-components";
import {Day} from "../../assets/Day";
import {Night} from "../../assets/Night";
import InlineSVG from "react-inlinesvg";

export const Interface = () => {
  const {theme, setTheme, layout, setLayout} = useContext(SettingsContext);
  const {t} = useTranslation()

  return (
    <StyledLayoutsScreen>
      <HeaderImage>
        <InlineSVG src={t("interfaceScreen.headerImage")}/>
      </HeaderImage>
      <DescriptionBlock small>
        <Divider/>
        <Text><span>{t("interfaceScreen.themeHint")}</span></Text>
        <Divider/>
      </DescriptionBlock>
      <OptionChooser>
        <OptionChooserEntry onClick={() => setTheme("day")} enabled={theme === "day"}>
          <Day/>
          <Checkbox />
        </OptionChooserEntry>
        <OptionChooserEntry onClick={() => setTheme("night")} enabled={theme === "night"}>
          <Night/>
          <Checkbox/>
        </OptionChooserEntry>
      </OptionChooser>
      <DescriptionBlock small>
        <Divider/>
        <Text><span>{t("interfaceScreen.layoutHint")}</span></Text>
        <Divider/>
      </DescriptionBlock>
      <OptionChooser>
        <OptionChooserEntry onClick={() => setLayout(Layout.EXPANDED)} enabled={layout === Layout.EXPANDED}>
          <ExpandedLayoutIcon/>
          <Checkbox />
        </OptionChooserEntry>
        <OptionChooserEntry onClick={() => setLayout(Layout.CLASSIC)} enabled={layout === Layout.CLASSIC}>
          <ClassicLayoutIcon/>
          <Checkbox/>
        </OptionChooserEntry>
      </OptionChooser>
      <BottomBlock>
        <DescriptionBlock>
          <Divider/>
          <Text>
            <span>
              <Trans i18nKey={`interfaceScreen.bottomText`}>
                More customization options are on the way! Hop onto our 
                <Link target="_blank" href="https://discord.gg/WWBYuY3">
                  Discord
                </Link>
                so we can cooperate.
              </Trans>
            </span>
          </Text>
          <Divider/>
        </DescriptionBlock>
      </BottomBlock>
    </StyledLayoutsScreen>
  )
}

const StyledLayoutsScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const HeaderImage = styled.div`
  svg {
    width: 30em;
    height: 8em;
    & .background-stroke {
      stroke: ${({theme}) => theme.colors.background}
    }
    & .lines-stroke {
      stroke: ${({theme}) => theme.colors.misc}
    }
  }
  
`;

export const DescriptionBlock = styled.div<{small?: boolean}>`
  margin: 0 0 0.5em 0;
  width: ${({small}) => small ? "25em" : "32em"};
  font-size: 1.3rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Text = styled.div`
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

export const OptionChooser = styled.div`
  display: flex;
`

export const OptionChooserEntry = styled.div<{enabled?: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({theme}) => theme.colors.buttons};
  #choose-circle {
    fill: ${({theme}) => theme.colors.textOnBackground};
  }
  ${({enabled}) => enabled && css`
      #choose-circle {
        fill: ${({theme}) => theme.colors.primary};
      }
    `}
  :hover {
    .svg-fill {
      fill: ${({theme}) => theme.colors.darken.buttons};
    }
    .svg-stroke {
      stroke: ${({theme}) => theme.colors.darken.buttons};
    }
    #border {
      fill: ${({theme}) => theme.colors.darken.buttons};
    }
    ${({enabled}) => !enabled && css`
      #choose-circle {
        fill: ${({theme}) => theme.colors.darken.textOnBackground};
      }
    `}
  }
  
  & + & {
    margin-left: 2em;
  }
`

const Link = styled.a`
  text-decoration: none;
  color: ${({theme}) => theme.colors.link};
`


const BottomBlock = styled.div`
  margin-top: 3em;
`


export const Checkbox = () => {
  const {colors} = useTheme()
  return (
    <StyledCheckbox>
      <CheckboxBackground viewBox="0 0 128 48">
        <rect id="border" x="40" width="48" height="48" rx="24" fill="currentColor"/>
        <rect id="border" y="21" width="128" height="6" rx="3" fill="currentColor"/>
        <rect x="48" y="8" width="32" height="32" rx="16" fill={colors.background}/>
        <rect id="choose-circle" x="51" y="11" width="26" height="26" rx="16"/>
      </CheckboxBackground>
    </StyledCheckbox>
  )
}

const StyledCheckbox = styled.div`
  position: relative;
  margin: 0.7em 0;
`

const CheckboxBackground = styled.svg`
  width: 5.5em;
  & > #choose-circle {
    transition: fill 0.2s ease;
  }
  & > #border {
    transition: fill 0.5s ease;
  }
`
