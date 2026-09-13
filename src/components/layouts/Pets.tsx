import React, {useContext, useEffect, useRef, useState} from "react";
import {useColorPickerLogic} from "../../hooks/useColorPickerLogic";
import {PalettesModal} from "../PalettesModal";
import petColors from "../../common/pet_colors.json"
import TargetScheme from "../TargetScheme";
import {ColorPicker} from "../ColorPicker";
import Color from "color";
import {Link} from "../shared/Link";
import {MatchedColor, Suggestions} from "../Suggestions";
import {SelectedColor} from "../SelectedColor";
import { Wires } from "../Wires";
import {Header} from "../Header";
import {SettingsContext} from "../../providers/SettingsProvider";
import {StyledLayout} from "./Classic";
import {useTranslation} from "react-i18next";
import { useStickyState } from "src/hooks/useStickyState";
import { UrlColorsState, UrlPaletteContext } from "src/providers/UrlColorsProvider";
import { CurrentScreenContext, Screen } from "../../providers/CurrentScreenProvider";
import { debounce } from "lodash";
import { findClosestColors } from "src/common/helpers";
import { SelectedPetColor } from "../SelectedPetColor";

export const initColors: string[] = Array(48).fill("")
export const initAvailablePetColors = petColors.map((petColor) => petColor.name)

const initMatchedColor: MatchedColor = {
  kind: "pet",
  petColor: petColors[0],
  color: "#000000",
  name: "",
  distance: 0,
  uid: "3274823"
}

export const Pets = () => {
  const [paletteColors, setPaletteColors] = useStickyState(initColors, "petManualColors")
  const [currentColorIndex, setCurrentColorIndex] = useState(0)
  const [isColorChanging, setIsColorChanging] = useState(false)
  const [matchedColors, setMatchedColors] = useState<MatchedColor[]>([])
  const [selectedColor, setSelectedColor] = useState<MatchedColor>(initMatchedColor)

  const debounced = useRef(debounce((fn: () => void) => fn(), 150, { trailing: true, leading: false }))

  const { screen, setScreen } = useContext(CurrentScreenContext)
  const { hookState, colors: importedColors, paletteImported } = useContext(UrlPaletteContext)

  useEffect(() => {
    if (hookState === UrlColorsState.LOADED && screen !== Screen.SCHEME_IMPORT) {
      setScreen(Screen.SCHEME_IMPORT);
    }
    if (hookState === UrlColorsState.CONFIRMED) {
      setPaletteColors(importedColors)
      paletteImported();
    }
  }, [hookState, setPaletteColors, screen, setScreen])


  const {enableMOTD, theme} = useContext(SettingsContext)
  const {t} = useTranslation()

  const onCellClick = (index: number, e: React.MouseEvent) => {
    if (e.type === "contextmenu") {
      const newPaletteColors = [...paletteColors]
      newPaletteColors[index] = ""
      setPaletteColors(newPaletteColors)
    }
    setCurrentColorIndex(index)
  }
  const onScreenshotImport = (colors: string[]) => {
    // TODO PET
    setPaletteColors([
      ...paletteColors.slice(0, Math.floor(currentColorIndex / 8) * 8),
      ...colors,
      ...paletteColors.slice(Math.floor(currentColorIndex / 8 + 1) * 8)
    ]);
  }

  const getCurrentColor = (): string => {
    const color = paletteColors[currentColorIndex]
    if (color === "") return "#000000"
    return color
  }

  const onColorChange = (color: Color) => {
    const newColors = [...paletteColors]
    newColors[currentColorIndex] = color.toString()
    setPaletteColors(newColors)
  }

  const onSuggestionClick = (key: string) => {
    const filteredColor = matchedColors.filter(({ uid }) => uid === key)[0]
    if (filteredColor.uid !== selectedColor.uid) {
      setSelectedColor(filteredColor);
    }
  }

  const onOverrideColor = () => {
    onColorChange(Color(selectedColor.color))
  }

  const updateSuggestions = () => {
    const closestColors = findClosestColors("pet", getCurrentColor(), petColors, 50)
    setMatchedColors(closestColors)
    setSelectedColor(closestColors[0])
    setIsColorChanging(false)
  }

  useEffect(() => {
    updateSuggestions()
  }, [])

  useEffect(() => {
    if (!isColorChanging) {
      setIsColorChanging(true)
    }
    debounced.current(updateSuggestions)
  }, [paletteColors, currentColorIndex, setIsColorChanging])

  return (
    <>
      <Header/>
      <StyledLayout slide={enableMOTD}>

        <div style={{display: 'flex', alignItems: "flex-start"}}>
          <div style={{display: 'flex', flexDirection: "column", alignItems: "flex-end", marginRight: "0.6em"}}>
            <Wires
              src="/images/Wires (Col Pic -_ Tar Sch).svg"
              style={{right: "-1.2em", top: "3.2em", width: "2.1em", height: "12em"}}
            >
              <Wires
                src="/images/Wires (Tar Sch -_ Col Pic).svg"
                style={{bottom: "-1.8em", right: "2em", width: "4.3em", height: "2.2em"}}
              >
                <TargetScheme
                  paletteColors={paletteColors}
                  onCellClick={onCellClick}
                  onImportClick={onScreenshotImport}
                  kind="pet"
                />
              </Wires>
            </Wires>
            <div style={{marginTop: "0.6em", zIndex: 1}}>
              <ColorPicker
                color={Color(getCurrentColor())}
                onColorChange={onColorChange}
                compact
              />
            </div>
            <Link
              href="https://github.com/AvroraPolnareff/warframe-color-picker/blob/master/docs/GUIDE.md#how-to-use"
              height={2.3}
              width={11}>{t("colorPicker.howToUse")}</Link>
            <div style={{display: "flex"}}>
              <Link href={"https://discord.gg/WWBYuY3"} icon={`/images/discord-logo-${theme}.svg`} width={2.3} height={2.3}/>
              <Link href={"https://github.com/AvroraPolnareff/warframe-color-picker-ts"} icon={`/images/github-logo-${theme}.svg`} width={2.3}
                    height={2.3}/>
            </div>
          </div>
          <div style={{marginRight: "0.6em", zIndex: 1}}>
            <Wires style={{top: "8.5em", right: "-1.2em", width: "2.1em", height: "13em"}} src="/images/Wires (Sugg -_ Sel Col).svg">
              <Suggestions matchedColors={matchedColors}
                           onSuggestionClick={onSuggestionClick}
                           isSuggestionsUpdating={isColorChanging}
                           onSwapColor={onOverrideColor}
              />
            </Wires>
          </div>
          <div style={{zIndex: 2}}>
            <SelectedPetColor matchedColor={selectedColor}/>
            {/*<SelectedColor
              paletteName={selectedColor.paletteName}
              colorPosition={selectedColor.position}
              onColorChange={onColorChange}
            />*/}
          </div>
        </div>
      </StyledLayout>
    </>
  );
}
