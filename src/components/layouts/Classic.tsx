import React, {CSSProperties, FC} from "react";
import {useColorPickerLogic} from "../../hooks/color-picker-logic";
import {PalettesModal} from "../PalettesModal";
import {ImportModal} from "../ImportModal";
import targetSchemeToSuggestions from "../../assets/Wires (Col Pic -_ Tar Sch).svg";
import targetSchemeToColorPicker from "../../assets/Wires (Tar Sch -_ Col Pic).svg";
import TargetScheme from "../TargetScheme";
import {ColorPicker} from "../ColorPicker";
import Color from "color";
import {Link} from "../shared/Link";
import warframeLogo from "../../assets/wf-logo-DADADA 1.svg";
import discordLogo from "../../assets/discord-logo.svg";
import githubLogo from "../../assets/github-logo.svg";
import suggestionsToSelectedColor from "../../assets/Wires (Sugg -_ Sel Col).svg";
import {Suggestions} from "../Suggestions";
import {SelectedColor} from "../SelectedColor";
import styled from "styled-components";

export const Classic = () => {
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

  return (
    <>
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
      <div style={{width: 'max-content', margin: "0.5em auto"}}>

        <div style={{display: 'flex', alignItems: "flex-start"}}>
          <div style={{display: 'flex', flexDirection: "column", alignItems: "flex-end", marginRight: "0.6em"}}>
            <Wires src={targetSchemeToSuggestions} style={{right: "-1.2em", top: "3.2em", width: "2.1em"}}>
              <Wires src={targetSchemeToColorPicker} style={{bottom: "-1.8em", right: "2em", width: "4.3em"}}>
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
              />
            </div>
            <Link
              href="https://github.com/AvroraPolnareff/warframe-color-picker#what-are-the-main-features"
              height={2.3}
              width={11}>HOW TO USE</Link>
            <div style={{display: "flex"}}>
              <Link href={"#"} icon={warframeLogo} width={2.3} height={2.3}/>
              <Link href={"https://discord.gg/WWBYuY3"} icon={discordLogo} width={2.3} height={2.3}/>
              <Link href={"https://github.com/AvroraPolnareff/warframe-color-picker-ts"} icon={githubLogo} width={2.3}
                    height={2.3}/>
            </div>
          </div>
          <div style={{marginRight: "0.6em", zIndex: 1}}>
            <Wires style={{top: "8.5em", right: "-1.2em", width: "2.1em"}} src={suggestionsToSelectedColor}>
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
            />
          </div>
        </div>
      </div>
    </>
  );
}

const Wires: FC<{ style: CSSProperties, src: string }> = ({children, style, src}) => (
  <div style={{position: 'relative'}}>
    {children}
    <StyledWires style={style} src={src}/>
  </div>
)

const StyledWires = styled.img`
  position: absolute;
  user-select: none;
  pointer-events: none
`
