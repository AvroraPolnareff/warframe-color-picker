import React, {useContext} from "react";
import styled from "styled-components";
import {ClassicLayoutIcon} from "../../assets/ClassicLayoutIcon"
import {ExpandedLayoutIcon} from "../../assets/ExpandedLayoutIcon"
import {Divider} from "../shared/Divider";
import {Layout, SettingsContext} from "../../providers/SettingsProvider";
import {useTranslation} from "react-i18next";
import {css} from "styled-components";

export const Layouts = () => {
  const {layout, setLayout} = useContext(SettingsContext);
  const {t} = useTranslation()

  return (
    <StyledLayoutsScreen>
      <HeaderImage src={t("layoutSelection.headerImage")}/>
      <DescriptionBlock>
        <Divider/>
        <Text><span>{t("layoutSelection.headerText")}</span></Text>
        <Divider/>
      </DescriptionBlock>
      <LayoutsChooser>
        <LayoutChooserEntry onClick={() => setLayout(Layout.EXPANDED)} enabled={layout === Layout.EXPANDED}>
          <ExpandedLayoutIcon/>
          <Checkbox />
        </LayoutChooserEntry>
        <LayoutChooserEntry onClick={() => setLayout(Layout.CLASSIC)} enabled={layout === Layout.CLASSIC}>
          <ClassicLayoutIcon/>
          <Checkbox/>
        </LayoutChooserEntry>
      </LayoutsChooser>
      <BottomBlock>
        <DescriptionBlock>
          <Divider/>
          <Text>
            <span>
              {t("layoutSelection.bottomText", {returnObjects: true})[0]}
              <Link target="_blank" href="https://discord.gg/WWBYuY3">
                {t("layoutSelection.bottomText", {returnObjects: true})[1]}
              </Link>
              {t("layoutSelection.bottomText", {returnObjects: true})[2]}
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

export const HeaderImage = styled.img`
  width: 35em;
  height: 9em;
`;

export const DescriptionBlock = styled.div`
  margin: 1em 0;
  width: 32em;
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

export const LayoutsChooser = styled.div`
  display: flex;
  margin-top: 3em;
`

export const LayoutChooserEntry = styled.div<{enabled?: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({theme}) => theme.colors.tertiary};
  #choose-circle {
    fill: ${({theme}) => theme.colors.darken.tertiary};
  }
  ${({enabled}) => enabled && css`
      #choose-circle {
        fill: ${({theme}) => theme.colors.primary};
      }
    `}
  :hover {
    .svg-background {
      fill: ${({theme}) => theme.colors.darken.tertiary};
    }
    #border {
      fill: ${({theme}) => theme.colors.darken.tertiary};
    }
    ${({enabled}) => !enabled && css`
      #choose-circle {
        fill: ${({theme}) => theme.colors.darken.tertiary};
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
  return (
    <StyledCheckbox>
      <CheckboxBackground viewBox="0 0 128 48">
        <rect id="border" x="40" width="48" height="48" rx="24" fill="currentColor"/>
        <rect id="border" y="21" width="128" height="6" rx="3" fill="currentColor"/>
        <rect x="48" y="8" width="32" height="32" rx="16" fill="white"/>
        <rect id="choose-circle" x="51" y="11" width="26" height="26" rx="16"/>
      </CheckboxBackground>
    </StyledCheckbox>
  )
}

const StyledCheckbox = styled.div`
  position: relative;
`

const CheckboxBackground = styled.svg`
  width: 6em;
  & > #choose-circle {
    transition: fill 0.2s ease;
  }
  & > #border {
    transition: fill 0.5s ease;
  }
`
