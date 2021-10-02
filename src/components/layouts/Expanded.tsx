import React, {useContext} from "react";
import {useColorPickerLogic} from "../../hooks/useColorPickerLogic";
import {PalettesModal} from "../PalettesModal";
import {ImportModal} from "../ImportModal";
import TargetScheme from "../TargetScheme";
import {ColorPicker} from "../ColorPicker";
import Color from "color";
import {Link} from "../shared/Link";
import {Suggestions} from "../Suggestions";
import {SelectedColor} from "../SelectedColor";
import { Wires } from "../Wires";
import {Header} from "../Header";
import {SettingsContext} from "../../providers/SettingsProvider";
import {StyledLayout} from "./Classic";
import {useTranslation} from "react-i18next";

export const Expanded = () => {
  const {
    availablePalettes,
    showPalettesModal,
    setShowPalettesModal,
    onPaletteClick,
    clearAvailablePalettes,
    showAllAvailablePalettes,

    showImportModal,
    onAcceptImport,
    setShowImportModal,
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
  } = useColorPickerLogic();

  const {enableMOTD} = useContext(SettingsContext)
  const {t} = useTranslation()

  return (
    <>
      <Header/>
      {showPalettesModal ?
        <PalettesModal
          availablePalettes={availablePalettes}
          show={showPalettesModal}
          onPaletteClick={onPaletteClick}
          onDisableAll={clearAvailablePalettes}
          onEnableAll={showAllAvailablePalettes}
          onExit={() => setShowPalettesModal(false)}
        />
        : null
      }

      <ImportModal
        show={showImportModal}
        onAccept={onAcceptImport}
        onExit={() => {
          setShowImportModal(false)
        }}
        onScreenshotImport={onScreenshotImport}
      />
      <StyledLayout slide={enableMOTD}>

        <div style={{display: 'flex', alignItems: "flex-start"}}>
          <div style={{display: 'flex', flexDirection: "column", alignItems: "flex-end", marginRight: "0.6em"}}>
            <Wires src="/images/Wires (Col Pic -_ Tar Sch).svg" style={{right: "-1.2em", top: "3.2em", width: "2.1em"}}>
              <Wires src="/images/Wires (Tar Sch -_ Col Pic).svg" style={{bottom: "-1.8em", right: "2em", width: "4.3em"}}>
                <TargetScheme
                  paletteColors={paletteColors}
                  onCellClick={onCellClick}
                  onImportClick={() => setShowImportModal(true)}
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
              href="https://github.com/AvroraPolnareff/warframe-color-picker/blob/master/README.md#how-to-use"
              height={2.3}
              width={11}>{t("colorPicker.howToUse")}</Link>
            <div style={{display: "flex"}}>
              <Link href={"#"} icon="/images/wf-logo.svg" width={2.3} height={2.3}/>
              <Link href={"https://discord.gg/WWBYuY3"} icon="/images/discord-logo.svg" width={2.3} height={2.3}/>
              <Link href={"https://github.com/AvroraPolnareff/warframe-color-picker-ts"} icon="/images/github-logo.svg" width={2.3}
                    height={2.3}/>
            </div>
          </div>
          <div style={{marginRight: "0.6em", zIndex: 1}}>
            <Wires style={{top: "8.5em", right: "-1.2em", width: "2.1em"}} src="/images/Wires (Sugg -_ Sel Col).svg">
              <Suggestions matchedColors={matchedColors}
                           onSuggestionClick={onSuggestionClick}
                           onPalettesClick={() => setShowPalettesModal(true)}
                           isSuggestionsUpdating={isColorChanging}
                           onSwapColor={onOverrideColor}
              />
            </Wires>
          </div>
          <div style={{zIndex: 2}}>
            <SelectedColor
              paletteName={selectedColor.paletteName}
              colorPosition={selectedColor.position}
              onColorChange={onColorChange}
            />
          </div>
        </div>
      </StyledLayout>
    </>
  );
}


