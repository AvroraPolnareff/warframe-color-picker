import React, {FC, useContext} from "react";
import styled, {ThemeContext} from "styled-components/macro";
import {Divider} from "../shared/Divider";
import headerImage from "../../assets/languages-header.png"
import {useTranslation} from "react-i18next";
import {Language, SettingsContext} from "../../providers/SettingsProvider";

export const Languages: FC = ({}) => {
  const {t} = useTranslation()
  const {language, setLanguage} = useContext(SettingsContext)
  return (
    <StyledLanguages>
      <HeaderImage src={headerImage}/>
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

      <ListCheckbox onClick={() => setLanguage(Language.ENGLISH)} enabled={language === Language.ENGLISH}>English</ListCheckbox>
      <ListCheckbox onClick={() => setLanguage(Language.RUSSIAN)} enabled={language === Language.RUSSIAN}>Русский</ListCheckbox>
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

const ListCheckbox: FC<{enabled?: boolean, onClick?: (e: React.MouseEvent) => void}> = ({enabled, onClick, children}) => {
  const theme = useContext(ThemeContext)
  const currentColor = enabled ? theme.colors.primary : theme.colors.tertiary
  return (
    <StyledListCheckbox onClick={onClick}>
      <TextContainer>
        <CheckboxText>
          <span>{children}</span>
        </CheckboxText>
      </TextContainer>

      <CheckboxSvg width="343" height="35" viewBox="0 0 343 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect className="border" x="308" y="-3.8147e-06" width="35" height="35" rx="17.2987" fill="#E3E3E3"/>
        <rect className="border" x="5" y="15" width="333" height="5" rx="2.5" fill="#E3E3E3"/>
        <rect className="border" x="35" y="35" width="35" height="35" rx="17.2987" transform="rotate(-180 35 35)" fill="#E3E3E3"/>
        <rect x="30" y="30" width="25" height="25" rx="12.5" transform="rotate(-180 30 30)" fill="white"/>
        <rect className="checkbox" x="27" y="27" width="19" height="19" rx="9.5" transform="rotate(-180 27 27)" fill={currentColor}/>
        <rect  x="338" y="30" width="25" height="25" rx="12.5" transform="rotate(-180 338 30)" fill="white"/>
        <rect className="checkbox" x="335" y="27" width="19" height="19" rx="9.5" transform="rotate(-180 335 27)" fill={currentColor}/>
      </CheckboxSvg>
    </StyledListCheckbox>
  )
}

const CheckboxText = styled.div`
  color: ${({theme}) => theme.colors.buttonText};
  background: ${({theme}) => theme.colors.switch.background};
  transition: background-color 0.5s ease;
  font-size: 1.5em;
  font-weight: 600;
  border-radius: 0.6em;
  padding: 0.1em 0.8em;
  margin-bottom: 0.15em;
`

const StyledListCheckbox = styled.div`
  position: relative;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  margin-bottom: 1em;
  :hover {
    .border {
      fill: ${({theme}) => theme.colors.darken.tertiary}
    }
    ${CheckboxText} {
      background: ${({theme}) => theme.colors.darken.tertiary};
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
    fill: ${({theme}) => theme.colors.switch.background}
  }
`