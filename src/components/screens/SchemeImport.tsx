import styled from "styled-components";
import React, {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Divider} from "../shared/Divider";
import {Checkbox, DescriptionBlock, HeaderImage, Text} from "./Layouts";
import {ColorCell} from "../shared/ColorCell";
import {UrlPaletteContext} from "../../providers/UrlColorsProvider";
import {Button} from "../shared/Button";
import {css} from "styled-components";
import {CurrentScreenContext, Screen} from "../../providers/CurrentScreenProvider";

enum SelectedPalette {
  NEW,
  CURRENT
}

export const SchemeImport = () => {
  const {t} = useTranslation()
  const [selectedPalette, setSelectedPalette] = useState(SelectedPalette.CURRENT)
  const [currentColors, setCurrentColors] = useState<string[]>([])
  const {colors: importedColors, confirmPalette} = useContext(UrlPaletteContext)
  const {setScreen} = useContext(CurrentScreenContext)

  const handleConfirm = () => {
    confirmPalette(selectedPalette === SelectedPalette.NEW)
    setScreen(Screen.COLOR_PICKER);
  }

  useEffect(() => {
    if (typeof localStorage === "undefined") return
    const colors = JSON.parse(localStorage.getItem("manualColors") ?? "{}") as string[]
    setCurrentColors(colors)
  }, [])

  return (
    <StyledSchemeImport>
      <HeaderImage src={t("schemeImport.headerImage")}/>
      <DescriptionBlock>
        <Divider/>
        <Text><span>{t("schemeImport.headerText")}</span></Text>
        <Divider/>
      </DescriptionBlock>
      <PaletteChooser>
        <PaletteChooserEntry
          onClick={() => setSelectedPalette(SelectedPalette.CURRENT)}
          enabled={selectedPalette === SelectedPalette.CURRENT}
        >
          <PalleteName>{t("schemeImport.currentScheme")}</PalleteName>
          <Divider/>
          <Palette colors={currentColors}/>
          <Checkbox />
        </PaletteChooserEntry>
        <PaletteChooserEntry
          onClick={() => setSelectedPalette(SelectedPalette.NEW)}
          enabled={selectedPalette === SelectedPalette.NEW}
        >
          <PalleteName>{t("schemeImport.newScheme")}</PalleteName>
          <Divider/>
          <Palette colors={importedColors}/>
          <Checkbox/>
        </PaletteChooserEntry>
      </PaletteChooser>
      <ButtonContainer>
        <Button round big onClick={handleConfirm}>{t("schemeImport.confirm")}</Button>
      </ButtonContainer>
      <DescriptionBlock>
        <Divider/>
        <Text><span>{t("schemeImport.bottomText")}</span></Text>
        <Divider/>
      </DescriptionBlock>
    </StyledSchemeImport>
  );
}

const StyledSchemeImport = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PaletteChooser = styled.div`
  display: flex;
  margin-bottom: 2em;
`



const Palette = ({colors}: {colors: string[]}) => {

  return (
    <StyledPalette>
      {colors.map((color, index) => <ColorCell key={index} color={color} outline={true}/> )}
    </StyledPalette>
  );
}

const PalleteName = styled.h2`
  color: ${({theme}) => theme.colors.secondary};
  margin: 0 auto;
`

const StyledPalette = styled.div`
  background-color: ${({theme}) => theme.colors.tertiary};
  border-radius: 1em;
  padding: 0.5em;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(6, 1fr);
  row-gap: 0.15em;
  column-gap: 0.15em;
  margin: 0.5em auto 1.5em auto;
  transition: background-color 0.15s linear;
`

const PaletteChooserEntry = styled.div<{enabled?: boolean}>`
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
    ${StyledPalette} {
      background-color: ${({theme}) => theme.colors.darken.tertiary};
    }
  }
  
  & + & {
    margin-left: 2em;
  }
`

const ButtonContainer = styled.div`

`
