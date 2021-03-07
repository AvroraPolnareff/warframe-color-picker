import React, {FC, useContext, useState} from "react";
import styled, {ThemeContext} from "styled-components/macro";
import {ClassicLayoutIcon} from "../../assets/ClassicLayoutIcon"
import {ExpandedLayoutIcon} from "../../assets/ExpandedLayoutIcon"
import acceptIcon from "../../assets/accept.svg"
import {Divider} from "../shared/Divider";
import {Layout, SettingsContext} from "../../providers/SettingsProvider";
import {CurrentScreenContext, Screen} from "../../providers/CurrentScreenProvider";
import {useTranslation} from "react-i18next";

export const Layouts : FC<{}> = () => {
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
        <LayoutChooserEntry onClick={() => setLayout(Layout.EXPANDED)}>
          <ExpandedLayoutIcon/>
          <Checkbox enabled={layout === Layout.EXPANDED}/>
        </LayoutChooserEntry>
        <LayoutChooserEntry onClick={() => setLayout(Layout.CLASSIC)}>
          <ClassicLayoutIcon/>
          <Checkbox enabled={layout === Layout.CLASSIC}/>
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

const HeaderImage = styled.img`
  width: 35em;
  height: 9em;
`;

const DescriptionBlock = styled.div`
  margin: 1em 0;
  width: 32em;
  font-size: 1.3rem;
  font-weight: 500;
`

const Text = styled.div`
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const LayoutsChooser = styled.div`
  display: flex;
  margin-top: 3em;
`

const LayoutChooserEntry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({theme}) => theme.colors.tertiary};
  :hover {
    .svg-background {
      fill: ${({theme}) => theme.colors.darken.tertiary};
    }
    #border {
      fill: ${({theme}) => theme.colors.darken.tertiary};
    }
  }
`

const Link = styled.a`
  text-decoration: none;
  color: ${({theme}) => theme.colors.link};
`


const BottomBlock = styled.div`
  margin-top: 3em;
`


const Checkbox: FC<{enabled: boolean}> = ({enabled}) => {
  const theme = useContext(ThemeContext)
  const color = enabled ? theme.colors.primary : theme.colors.tertiary

  return (
    <StyledCheckbox>
      <CheckboxBackground viewBox="0 0 128 48">
        <rect id="border" x="40" width="48" height="48" rx="24" fill="currentColor"/>
        <rect id="border" y="21" width="128" height="6" rx="3" fill="currentColor"/>
        <rect x="48" y="8" width="32" height="32" rx="16" fill="white"/>
        <rect id="choose-circle" x="51" y="11" width="26" height="26" rx="16" fill={color}/>
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

const RoundButton: FC<{onClick?: (e: React.MouseEvent) => void, src?: string}> = ({onClick, src}) => {
  return (
    <StyledButton onClick={onClick}>
      <ImageContainer>
        <ButtonImage src={src}/>
      </ImageContainer>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  background: ${({theme}) => theme.colors.windowBackground};
  border-radius: 50%;
  width: 2.6em;
  height: 2.6em;
  padding: 0;
  border: solid 0.3em ${({theme}) => theme.colors.tertiary};
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
  transition: border-color 0.4s ease;
  
  &:hover {
    border-color: ${({theme}) => theme.colors.darken.tertiary};
  }
`

const ImageContainer = styled.div`
  background: ${({theme}) => theme.colors.primary};
  width: 1.7em;
  height: 1.7em;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease;
`

const ButtonImage = styled.img`
  width: 1.2em;
`