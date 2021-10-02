import React, {ReactNode, useContext} from "react";
import styled from "styled-components";
import {Divider} from "../shared/Divider";
import {useTranslation} from "react-i18next";
import {Language, SettingsContext} from "../../providers/SettingsProvider";
import {css} from "styled-components";
import Color from "color";

export const Languages = () => {
  const {t} = useTranslation()
  const {language, setLanguage} = useContext(SettingsContext)
  return (
    <StyledLanguages>
      <HeaderImage src="/images/languages-header.png" alt="header"/>
      <DescriptionBlock>
        <Divider/>
        <Text>
          <span>
            <Danger>{t("languageSelection.headerText", {returnObjects: true})[0]}</Danger>
            {t("languageSelection.headerText", {returnObjects: true})[1]}
          </span>
        </Text>
        <Divider/>
      </DescriptionBlock>

      <ListCheckbox onClick={() => setLanguage(Language.ENGLISH)} enabled={language === Language.ENGLISH}>
        English
      </ListCheckbox>
      <ListCheckbox onClick={() => setLanguage(Language.RUSSIAN)} enabled={language === Language.RUSSIAN}>
        Русский
      </ListCheckbox>
      <ListCheckbox onClick={() => setLanguage(Language.CHINESE)} enabled={language === Language.CHINESE}>
        中文(简体)
      </ListCheckbox>
      <BottomBlock>
        <DescriptionBlock>
          <Divider/>
          <Text>
            <span>
              {t("languageSelection.bottomText", {returnObjects: true})[0]}
              <Link target="_blank" href="https://discord.gg/WWBYuY3">
                {t("languageSelection.bottomText", {returnObjects: true})[1]}
              </Link>
              {t("languageSelection.bottomText", {returnObjects: true})[2]}
            </span>
          </Text>
          <Divider/>
        </DescriptionBlock>
      </BottomBlock>
    </StyledLanguages>
  )
}

const StyledLanguages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HeaderImage = styled.img`
  width: 35em;
  height: 9em;
  image-rendering: crisp-edges;
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

const Danger = styled.span`
  color: ${({theme}) => theme.colors.danger};
`

const Link = styled.a`
  text-decoration: none;
  color: ${({theme}) => theme.colors.link};
`

const BottomBlock = styled.div`
  margin-top: 15em;
`

const ListCheckbox = (
  {
    enabled,
    onClick,
    children
  }: {
    enabled?: boolean,
    onClick?: (e: React.MouseEvent) => void,
    children: ReactNode
  }
) => {
  return (
    <StyledListCheckbox onClick={onClick} enabled={enabled}>
      <TextContainer>
        <CheckboxText>
          <span>{children}</span>
        </CheckboxText>
      </TextContainer>

      <CheckboxSvg width="343" height="35" viewBox="0 0 343 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect className="border" x="308" y="-3.8147e-06" width="35" height="35" rx="17.2987"/>
        <rect className="border" x="5" y="15" width="333" height="5" rx="2.5"/>
        <rect className="border" x="35" y="35" width="35" height="35" rx="17.2987" transform="rotate(-180 35 35)"/>
        <rect x="30" y="30" width="25" height="25" rx="12.5" transform="rotate(-180 30 30)" fill="white"/>
        <rect className="checkbox" x="27" y="27" width="19" height="19" rx="9.5" transform="rotate(-180 27 27)"/>
        <rect  x="338" y="30" width="25" height="25" rx="12.5" transform="rotate(-180 338 30)" fill="white"/>
        <rect className="checkbox" x="335" y="27" width="19" height="19" rx="9.5" transform="rotate(-180 335 27)"/>
      </CheckboxSvg>
    </StyledListCheckbox>
  )
}

const CheckboxText = styled.div`
  color: ${({theme}) => theme.colors.background};
  background: ${({theme}) => theme.colors.tertiary};
  transition: background-color 0.5s ease;
  font-size: 1.5em;
  font-weight: 600;
  border-radius: 0.6em;
  padding: 0.1em 0.8em;
  margin-bottom: 0.15em;
`

const StyledListCheckbox = styled.div<{enabled?: boolean}>`
  position: relative;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  margin-bottom: 1em;
  .border {
    fill: ${({theme}) => theme.colors.tertiary}
  }
  .checkbox {
    fill: ${({theme}) => theme.colors.tertiary};
  }
  ${({enabled}) => enabled && css`
      .checkbox { fill: ${({theme}) => theme.colors.primary}}`
  }
  :hover {
    .border {
      fill: ${({theme}) => Color(theme.colors.tertiary).darken(0.05).toString()}
    }
    ${CheckboxText} {
      background: ${({theme}) => Color(theme.colors.tertiary).darken(0.05).toString()};
    }
  }
`

const TextContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`



const CheckboxSvg = styled.svg`
  width: 17.1em;
  rect {
    transition: fill 0.5s ease;
  }

  .border {
    fill: ${({theme}) => theme.colors.tertiary};
  }
`
