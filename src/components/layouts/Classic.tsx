import React, {useContext} from "react"
import {useColorPickerLogic} from "../../hooks/useColorPickerLogic"
import {PalettesModal} from "../PalettesModal"
import {ImportModal} from "../ImportModal"
import TargetScheme from "../TargetScheme"
import {ColorPicker} from "../ColorPicker"
import Color from "color"
import {Link} from "../shared/Link"

import {Suggestions} from "../Suggestions"
import {SelectedColor} from "../SelectedColor"
import {Wires} from "../Wires"
import {Header} from "../Header"
import styled from "styled-components"
import {SettingsContext} from "../../providers/SettingsProvider"
import {useTranslation} from "react-i18next"

export const Classic = () => {
  const {
    availablePalettes,
    showPalettesModal,
    setShowPalettesModal,
    onPaletteClick,
    clearAvailablePalettes,
    showAllAvailablePalettes,

    onScreenshotImport,

    paletteColors,
    onCellClick,

    getCurrentColor,
    onColorChange,

    matchedColors,
    onSuggestionClick,
    isColorChanging,
    onOverrideColor,

    selectedColor,
  } = useColorPickerLogic()

  const {enableMOTD, theme} = useContext(SettingsContext)
  const {t} = useTranslation()

  return (
    <>
      <Header/>
      {showPalettesModal &&
      <PalettesModal
        availablePalettes={availablePalettes}
        show={showPalettesModal}
        onPaletteClick={onPaletteClick}
        onDisableAll={clearAvailablePalettes}
        onEnableAll={showAllAvailablePalettes}
        onExit={() => setShowPalettesModal(false)}
      />
      }

      <StyledLayout slide={enableMOTD}>

        <div style={{display: 'flex', alignItems: "flex-start"}}>
          <div style={{
            display: 'flex',
            flexDirection: "column",
            alignItems: "flex-end",
            marginRight: "0.6em",
            marginTop: "2.5em",
          }}>
            <Wires src="/images/Wires (Col Pic -_ Tar Sch).svg"
                   style={{right: "-1.2em", top: "3.2em", width: "2.1em", height: "12em", transform: "scaleY(-1)"}}>
              <div style={{marginTop: "0.6em", zIndex: 1}}>
                <ColorPicker
                  color={Color(getCurrentColor())}
                  onColorChange={onColorChange}
                />
              </div>
            </Wires>
            <Link
              href="https://github.com/AvroraPolnareff/warframe-color-picker/blob/master/docs/GUIDE.md#how-to-use"
              height={2.3}
              width={11}>{t("colorPicker.howToUse")}</Link>
            <div style={{display: "flex"}}>
              <Link href={"#"} icon={`/images/wf-logo-${theme}.svg`} width={2.3} height={2.3}/>
              <div style={{display: "flex", flexDirection: "column"}}>
                <Link href={"https://discord.gg/WWBYuY3"} icon={`/images/discord-logo-${theme}.svg`} width={2.3} height={2.3}/>
                <Link href={"https://github.com/AvroraPolnareff/warframe-color-picker-ts"}
                      icon={`/images/github-logo-${theme}.svg`} width={2.3}
                      height={2.3}/>
              </div>

            </div>
          </div>
          <div style={{marginRight: "0.6em", zIndex: 1}}>
            <div style={{marginBottom: "1.5em"}}>
              <Wires src="/images/Wires (Tar Sch -_ Col Pic).svg"
                     style={{bottom: "-1.8em", right: "2em", width: "4.3em", height: "2.2em"}}>
                <TargetScheme
                  paletteColors={paletteColors}
                  onCellClick={onCellClick}
                  onImportClick={onScreenshotImport}
                />
              </Wires>
            </div>
            <Wires style={{top: "1.2em", right: "-1.2em", width: "2.1em", height: "13em"}} src="/images/Wires (Sugg -_ Sel Col).svg">
              <Suggestions
                matchedColors={matchedColors}
                onSuggestionClick={onSuggestionClick}
                onPalettesClick={() => setShowPalettesModal(true)}
                isSuggestionsUpdating={isColorChanging}
                onSwapColor={onOverrideColor}
                height={"20em"}
              />
            </Wires>

          </div>
          <div style={{zIndex: 2, marginTop: "2.5em"}}>
            <SelectedColor
              paletteName={selectedColor.paletteName}
              colorPosition={selectedColor.position}
              onColorChange={onColorChange}
            />
          </div>
        </div>
      </StyledLayout>
    </>
  )
}

export const StyledLayout = styled.div<{ slide: boolean }>`
  transform: translateY(${({slide}) => slide ? "0%" : "-5.5em"});
  transition: transform 0.5s ease;
  width: max-content;
  margin: 0.5em auto;
`


