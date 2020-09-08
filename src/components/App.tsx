import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import TargetScheme from "./TargetScheme";
import {ColorPicker} from "./ColorPicker";
import Color from "color";
import {
  convertExportStringToColors,
  findClosestColors,
  useStickyState
} from "../common/helpers";
import {palettes} from "../common/palettes";
import {MatchedColor, Suggestions} from "./Suggestions";
import {SelectedColor} from "./SelectedColor";
import {Header} from "./Header";
import {ImportModal} from "./ImportModal";
import {PalettesModal} from "./PalettesModal";
import discordLogo from "../assets/discord-logo-DADADA 1.svg"
import githubLogo from "../assets/github-logo-DADADA.svg"
import warframeLogo from "../assets/wf-logo-DADADA 1.svg"
import {Link} from "./shared/Link";
import {debounce} from "lodash"
import colorPickerToTargetScheme from "../assets/Wires (Col Pic -_ Tar Sch).svg"
import targetSchemeToSuggestions from "../assets/Wires (Tar Sch -_ Sugg).svg"
import suggestionsToSelectedColor from "../assets/Wires (Sugg -_ Sel Col).svg"

export const initManualColors = [
  "#5BCEFA", "#A3A3DB", "#5BCEFA", "#A3A3DB", "#5BCEFA", "#A3A3DB", "#5BCEFA", "#A3A3DB",
  "#F5A9B8", "#5BCEFA", "#F5A9B8", "#5BCEFA", "#F5A9B8", "#5BCEFA", "#F5A9B8", "#5BCEFA",
  "#F4F4F4", "#F5A9B8", "#F4F4F4", "#F5A9B8", "#F4F4F4", "#F5A9B8", "#F4F4F4", "#F5A9B8",
  "#F5A9B8", "#F4F4F4", "#F5A9B8", "#F4F4F4", "#F5A9B8", "#F4F4F4", "#F5A9B8", "#F4F4F4",
  "#5BCEFA", "#F5A9B8", "#5BCEFA", "#F5A9B8", "#5BCEFA", "#F5A9B8", "#5BCEFA", "#F5A9B8",
  "#A3A3DB", "#5BCEFA", "#A3A3DB", "#5BCEFA", "#A3A3DB", "#5BCEFA", "#A3A3DB", "#5BCEFA",
]

export const initAvailablePalettes = [
  'Agony', 'Beach',
  'Classic Saturated', 'Classic',
  'Conquest', 'Corpus',
  'Darkness', 'Daybreak',
  'Discord', 'Dojo',
  'Easter', 'Eminence',
  'Eximus', 'Fear',
  'Fire', 'Grineer',
  'Halloween', 'Hatred',
  'Ice', 'Infested',
  "Ki'Teer", 'Lotus',
  'Orokin', 'Rollers',
  'Rot', 'Shamrock',
  'Smoke Colors', 'Storm',
  'Tenno II', 'Tenno',
  'Transmission', 'Twilight',
  'Undying', 'Valentine'
]

export const initDefaultColors = ["#f8f5ed", "#525757", '#a64731', "#c0cbcf", "#dffefb", "#53bcb1", "#dffefb", "#53bcb1"]

function App() {
  
  const initMatchedColor = {
    distance: 0,
    color: "#000000",
    paletteName: "Classic",
    position: {x: 0, y: 0},
    uid: "3274823"
  }
  
  const [defaultColors, setDefaultColors] = useStickyState(initDefaultColors, "defaultColors")
  const [manualColors, setManualColors] = useStickyState(initManualColors, "manualColors")
  const [currentColors, setCurrentColors] = useState({default: 0, manual: 0})
  const [matchedColors, setMatchedColors] = useState<MatchedColor[]>([])
  const [isColorChanging, setIsColorChanging] = useState(false)
  const [selectedColor, setSelectedColor] = useState<MatchedColor>(initMatchedColor)
  const [switched, setSwitched] = useState(false)
  
  const [showImportModal, setShowImportModal] = useState(false)
  const [showPalettesModal, setShowPalettesModal] = useState(false)
  const [availablePalettes, setAvailablePalettes] = useStickyState<string[]>(initAvailablePalettes, "availablePalettes")
  
  const debounced = useRef(debounce((fn: () => void) => fn(), 150, {trailing: true, leading: false}))
  
  
  const getCurrentColor = (): string => {
    if (switched) {
      return manualColors[currentColors.manual]
    } else {
      return defaultColors[currentColors.default]
    }
  }
  
  const updateSuggestions = () => {
    const filteredPalettes = palettes.filter(palette => availablePalettes.indexOf(palette.name) !== -1)
    const closestColors = findClosestColors(getCurrentColor(), filteredPalettes, 50)
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
  }, [defaultColors, manualColors, currentColors, availablePalettes])
  
  const onColorChange = (color: Color) => {
    if (!switched) {
      const newColors = defaultColors.slice()
      newColors[currentColors.default] = color.toString()
      setDefaultColors(newColors)
    } else {
      const newColors = manualColors.slice()
      newColors[currentColors.manual] = color.toString()
      setManualColors(newColors)
    }
  }
  const onSuggestionClick = (key: string) => {
    const filteredColor = matchedColors.filter(({uid}) => uid === key)[0]
    if (filteredColor.uid !== selectedColor.uid) {
      setSelectedColor(filteredColor);
    }
  }
  
  const onCellChange = (key: number) => {
    if (switched) {
      setCurrentColors({...currentColors, manual: key})
    } else {
      setCurrentColors({...currentColors, default: key})
    }
  }
  
  const onSwitch = () => {
    setCurrentColors({default: 0, manual: 0})
    setSwitched(!switched)
  }
  
  const onAcceptImport = (data: string) => {
    try {
      const importData = convertExportStringToColors(data)
      setDefaultColors(importData.defaultColors)
      setManualColors(importData.manualColors)
      setShowImportModal(false)
    } catch (e) {
      console.log(e)
    }
    
  }
  
  const onPaletteClick = (paletteName: string) => {
    const isExists = availablePalettes.indexOf(paletteName) !== -1
    if (isExists) {
      if (availablePalettes.length === 1) {
        setAvailablePalettes(["Classic"])
        return
      }
      setAvailablePalettes(availablePalettes.filter((el: string) => el !== paletteName))
    } else {
      setAvailablePalettes([...availablePalettes, paletteName])
    }
  }
  
  const onOverrideColor = () => {
    onColorChange(Color(selectedColor.color))
  }
  
  return (
    <StyledApp>
      <Header/>
      <div/>
      
      {showPalettesModal ?
        <PalettesModal availablePalettes={availablePalettes} show={showPalettesModal}
                       onPaletteClick={onPaletteClick} onDisableAll={() => setAvailablePalettes(["Classic"])}
                       onEnableAll={() => setAvailablePalettes(initAvailablePalettes)}
                       onExit={() => setShowPalettesModal(false)}/>
        : null
      }
      
      <ImportModal
        show={showImportModal}
        onAccept={onAcceptImport}
        onExit={() => {setShowImportModal(false)}}
        onScreenshotImport={(colors => {setDefaultColors(colors); setShowImportModal(false)})}
      />
      
      <div style={{display: "flex", alignItems: "start", justifyContent: "center", marginTop: "0.5em"}}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          margin: " 2.3em 1em 0 0",
          zIndex: 0
        }}>
          <div style={{position: "relative"}}>
            <ColorPicker color={Color(getCurrentColor())} onColorChange={onColorChange}/>
            <img src={colorPickerToTargetScheme}
                 style={{position: "absolute",
                   top: "2.4em",
                   right: "-1.9em",
                   width: "2.8em",
                   userSelect: "none",
                   pointerEvents: "none"
                 }}
            />
          </div>
          <div style={{display: "flex"}}>
            <Link href={"#"} icon={warframeLogo} width={3} height={3}/>
            <Link href={"https://discord.gg/WWBYuY3"} icon={discordLogo} width={3} height={3}/>
          </div>
          <Link href={"https://github.com/AvroraPolnareff/warframe-color-picker-ts"} icon={githubLogo} width={3}
                height={3}/>
        </div>
        
        <div style={{display: "flex", flexDirection: "column"}}>
          <div style={{position: "relative"}}>
            <TargetScheme
              switched={switched} onSwitch={onSwitch}
              defaultColors={defaultColors} manualColors={manualColors}
              onCellChange={onCellChange} onImportClick={() => setShowImportModal(true)}
            />
            <img src={targetSchemeToSuggestions}
                 style={{position: "absolute",
                   bottom: "-1.9em",
                   right: "2.3em",
                   width: "5.4em",
                   userSelect: "none",
                   pointerEvents: "none"
                 }}
            />
          </div>
          <div style={{marginTop: "1.2em", zIndex: 2, position: "relative"}}>
            <Suggestions matchedColors={matchedColors}
                         onSuggestionClick={onSuggestionClick}
                         onPalettesClick={() => setShowPalettesModal(true)}
                         isSuggestionsUpdating={isColorChanging}
                         onSwapColor={onOverrideColor}
            />
            <img src={suggestionsToSelectedColor}
                 style={{
                   position: "absolute",
                   top: "1.7em",
                   right: "-1.7em",
                   width: "2.6em",
                   userSelect: "none",
                   pointerEvents: "none"
                 }}
            />
          </div>
        </div>
        
        <div style={{zIndex: 3, marginTop: "2.3em", marginLeft: "1em"}}>
          <SelectedColor paletteName={selectedColor.paletteName} colorPosition={selectedColor.position}/>
        </div>
      </div>
    
    </StyledApp>
  );
}

export const StyledApp = styled.div`
    height: 100vh;
    color: ${props => props.theme.colors.secondary};
    margin: 0;
    font-family: "Gilroy", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`

export default App;
