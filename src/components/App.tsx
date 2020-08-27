import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import TargetScheme from "./TargetScheme";
import {ColorPicker} from "./ColorPicker";
import Color from "color";
import {findClosestColors, useStickyState} from "../common/helpers";
import {palettes} from "../common/palettes";
import {MatchedColor, Suggestions} from "./Suggestions";
import {SelectedColor} from "./SelectedColor";
import {Header} from "./Header";
import {ImportModal} from "./ImportModal";
import {PalettesModal} from "./shared/PalettesModal";


function App() {
  const initManualColors = [
    "#5BCEFA", "#A3A3DB", "#5BCEFA", "#A3A3DB", "#5BCEFA", "#A3A3DB", "#5BCEFA", "#A3A3DB",
    "#F5A9B8", "#5BCEFA", "#F5A9B8", "#5BCEFA", "#F5A9B8", "#5BCEFA", "#F5A9B8", "#5BCEFA",
    "#F4F4F4", "#F5A9B8", "#F4F4F4", "#F5A9B8", "#F4F4F4", "#F5A9B8", "#F4F4F4", "#F5A9B8",
    "#F5A9B8", "#F4F4F4", "#F5A9B8", "#F4F4F4", "#F5A9B8", "#F4F4F4", "#F5A9B8", "#F4F4F4",
    "#5BCEFA", "#F5A9B8", "#5BCEFA", "#F5A9B8", "#5BCEFA", "#F5A9B8", "#5BCEFA", "#F5A9B8",
    "#A3A3DB", "#5BCEFA", "#A3A3DB", "#5BCEFA", "#A3A3DB", "#5BCEFA", "#A3A3DB", "#5BCEFA",
  ]
  
  const initAvailablePalettes = [
    'Agony',             'Beach',
    'Classic Saturated', 'Classic',
    'Conquest',          'Corpus',
    'Darkness',          'Daybreak',
    'Discord',           'Dojo',
    'Easter',            'Eminence',
    'Eximus',            'Fear',
    'Fire',              'Grineer',
    'Halloween',         'Hatred',
    'Ice',               'Infested',
    "Ki'Teer",           'Lotus',
    'Orokin',            'Rollers',
    'Rot',               'Shamrock',
    'Smoke Colors',      'Storm',
    'Tenno II',          'Tenno',
    'Transmission',      'Twilight',
    'Undying',           'Valentine'
  ]
  
  const initDefaultColors = ["#f8f5ed", "#525757", '#a64731', "#c0cbcf", "#dffefb", "#53bcb1", "#dffefb", "#53bcb1"]
  const initMatchedColor = {distance: 0, color: "#000000", paletteName: "Classic", position: {x: 0, y: 0}, uid: "3274823"}
  
  const [defaultColors, setDefaultColors] = useStickyState(initDefaultColors, "defaultColors")
  const [manualColors, setManualColors] = useStickyState(initManualColors, "manualColors")
  const [currentColors, setCurrentColors] = useState({default: 0, manual: 0})
  const [matchedColors, setMatchedColors] = useState<MatchedColor[]>([])
  const [selectedColor, setSelectedColor] = useState<MatchedColor>(initMatchedColor)
  const [switched, setSwitched] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [showPalettesModal, setShowPalettesModal] = useState(false)
  const [availablePalettes, setAvailablePalettes] = useStickyState<string[]>(initAvailablePalettes, "availablePalettes")
  
  
  
  const getCurrentColor = () : string => {
    if (switched) {
      return manualColors[currentColors.manual]
    } else {
      return defaultColors[currentColors.default]
    }
  }
  
  useEffect(() => {
    const filteredPalettes = palettes.filter(palette => availablePalettes.indexOf(palette.name) !== -1)
    const closestColors = findClosestColors(getCurrentColor(), filteredPalettes, 100)
    setMatchedColors(closestColors)
    setSelectedColor(closestColors[0])
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
    return setSelectedColor(filteredColor);
    
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
    const importData = JSON.parse(data)
    if (!importData) {
      alert("wrong data!")
      return
    }
    setDefaultColors(importData.default)
    setManualColors(importData.manual)
    setShowImportModal(false)
  }
  
  const onPaletteClick = (paletteName: string) => {
    const isExists = availablePalettes.indexOf(paletteName) !== -1
    if (isExists) {
      if(availablePalettes.length === 1) {
        setAvailablePalettes(["Classic"])
        return
      }
      setAvailablePalettes(availablePalettes.filter((el: string) => el !== paletteName))
    } else {
      setAvailablePalettes([...availablePalettes, paletteName])
    }
  }

  
  return (
    <StyledApp>
      <Header/>
      <div/>
      {showPalettesModal ?
        <PalettesModal availablePalettes={availablePalettes} show={showPalettesModal}
                       onPaletteClick={onPaletteClick} onDisableAll={() => setAvailablePalettes(["Classic"])}
                       onEnableAll={() => setAvailablePalettes(initAvailablePalettes)}
                       onExit={() =>setShowPalettesModal(false)}/>
                       : null
      }
      
      <ImportModal show={showImportModal} onAccept={onAcceptImport} onExit={() => {setShowImportModal(false)}}/>
      <div style={{display: "flex", alignItems: "start", justifyContent: "center", marginTop: "2rem"}}>
        <ColorPicker color={Color(getCurrentColor())} onColorChange={onColorChange}/>
        <div style={{display: "flex", flexDirection: "column"}}>
          <TargetScheme
            switched={switched} onSwitch={onSwitch}
            defaultColors={defaultColors} manualColors={manualColors}
            onCellChange={onCellChange} onImportClick={() => setShowImportModal(true)}
          />
          <Suggestions matchedColors={matchedColors}
                       onSuggestionClick={onSuggestionClick}
                       onPalettesClick={() => setShowPalettesModal(true)}/>
        </div>
        <SelectedColor paletteName={selectedColor.paletteName} colorPosition={selectedColor.position}/>
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
