import React, {useContext} from "react";
import {useColorPickerLogic} from "../../hooks/color-picker-logic";
import {PalettesModal} from "../PalettesModal";
import {ImportModal} from "../ImportModal";
import wires1 from "../../assets/Wires (Col Pic -_ Tar Sch).svg";
import wires2 from "../../assets/Wires (Tar Sch -_ Col Pic).svg";
import wires3 from "../../assets/Wires (Sugg -_ Sel Col).svg";
import TargetScheme from "../TargetScheme";
import {ColorPicker} from "../ColorPicker";
import Color from "color";
import {Link} from "../shared/Link";
import warframeLogo from "../../assets/wf-logo-DADADA 1.svg";
import discordLogo from "../../assets/discord-logo.svg";
import githubLogo from "../../assets/github-logo.svg";

import {Suggestions} from "../Suggestions";
import {SelectedColor} from "../SelectedColor";
import {Wires} from "../Wires";
import {Header} from "../Header";
import styled from "styled-components/macro";
import {SettingsContext} from "../../providers/SettingsProvider";

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

  const {enableMOTD} = useContext(SettingsContext)

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
          <div style={{
            display: 'flex',
            flexDirection: "column",
            alignItems: "flex-end",
            marginRight: "0.6em",
            marginTop: "2.5em"
          }}>
            <Wires src={wires1} style={{right: "-1.2em", top: "3.2em", width: "2.1em", transform: "scaleY(-1)"}}>
              <div style={{marginTop: "0.6em", zIndex: 1}}>
                <ColorPicker
                  color={Color(getCurrentColor())}
                  onColorChange={onColorChange}
                />
              </div>
            </Wires>
            <Link
              href="https://github.com/AvroraPolnareff/warframe-color-picker#what-are-the-main-features"
              height={2.3}
              width={11}>HOW TO USE</Link>
            <div style={{display: "flex"}}>
              <Link href={"#"} icon={warframeLogo} width={2.3} height={2.3}/>
              <div style={{display: "flex", flexDirection: "column"}}>
                <Link href={"https://discord.gg/WWBYuY3"} icon={discordLogo} width={2.3} height={2.3}/>
                <Link href={"https://github.com/AvroraPolnareff/warframe-color-picker-ts"} icon={githubLogo} width={2.3}
                      height={2.3}/>
              </div>

            </div>
          </div>
          <div style={{marginRight: "0.6em", zIndex: 1}}>
            <div style={{marginBottom: "1.5em"}}>
              <Wires src={wires2} style={{bottom: "-1.8em", right: "2em", width: "4.3em"}}>
                <TargetScheme
                  paletteColors={paletteColors}
                  onCellClick={onCellClick}
                  onImportClick={() => setShowImportModal(true)}
                />
              </Wires>
            </div>
            <Wires style={{top: "1.2em", right: "-1.2em", width: "2.1em"}} src={wires3}>
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
            />
          </div>
        </div>
      </StyledLayout>
    </>
  );
}

export const StyledLayout = styled.div<{slide: boolean}>`
  transform: translateY(${({slide}) => slide ? "0%" : "-13%"});
  transition: transform 0.5s ease;
  width: max-content; 
  margin: 0.5em auto;
`


