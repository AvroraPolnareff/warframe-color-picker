import React, {useEffect, useRef, useState} from 'react';
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
import {Modal} from "./shared/Modal";
import {Button} from "./shared/Button";
import discordLogo from "../assets/discord-logo-DADADA 1.svg"
import githubLogo from "../assets/github-logo-DADADA.png"
import warframeLogo from "../assets/wf-logo-DADADA 1.png"
import {Link} from "./shared/Link";
import {debounce} from "lodash"

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
  const [isColorChanging, setIsColorChanging] = useState(false)
  const [selectedColor, setSelectedColor] = useState<MatchedColor>(initMatchedColor)
  const [switched, setSwitched] = useState(false)
  
  const [showImportModal, setShowImportModal] = useState(false)
  const [showOverrideModal, setShowOverrideModal] = useState(false)
  const [showPalettesModal, setShowPalettesModal] = useState(false)
  const [availablePalettes, setAvailablePalettes] = useStickyState<string[]>(initAvailablePalettes, "availablePalettes")
  
  const debounced = useRef(debounce((fn: () => void) => fn(), 200, {trailing: true, leading: false}))
  
  
  const getCurrentColor = () : string => {
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
    if (!isColorChanging){setIsColorChanging(true)}
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
    if (filteredColor.uid === selectedColor.uid) {
      setShowOverrideModal(true);
    } else {
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
  
  const onOverrideColor = () => {
    onColorChange(Color(selectedColor.color))
    setShowOverrideModal(false)
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
      <Modal width={34} show={showOverrideModal} name={"SELECTED COLOR"} description={"OVERWRITE TARGET SCHEME"} onExit={() => setShowOverrideModal(false)}>
        Warning: this action will overwrite your <b>Target Scheme</b> selected color. <b>The Suggestions</b> tab will be updated accordingly.
        <div style={{textAlign: "right", marginTop: "0.2em"}}>
          <Button round small warning onClick={() => setShowOverrideModal(false)} style={{marginRight: '0.4em'}}>clear</Button>
          <Button round small primary onClick={() => onOverrideColor()}>accept</Button>
        </div>
      </Modal>
      <ImportModal show={showImportModal} onAccept={onAcceptImport} onExit={() => {setShowImportModal(false)}}/>
      <div style={{display: "flex", alignItems: "start", justifyContent: "center", marginTop: "2rem"}}>
        <div style={{display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
          <ColorPicker color={Color(getCurrentColor())} onColorChange={onColorChange}/>
          <div style={{display: "flex"}}>
            <Link href={"#"} icon={warframeLogo} width={3} height={3}/>
            <Link href={"https://discord.gg/WWBYuY3"} icon={discordLogo} width={3} height={3}/>
          </div>
          <Link href={"https://github.com/AvroraPolnareff/warframe-color-picker-ts"} icon={githubLogo} width={3} height={3}/>
        </div>
        <div style={{display: "flex", flexDirection: "column"}}>
          <TargetScheme
            switched={switched} onSwitch={onSwitch}
            defaultColors={defaultColors} manualColors={manualColors}
            onCellChange={onCellChange} onImportClick={() => setShowImportModal(true)}
          />
          <Suggestions matchedColors={matchedColors}
                       onSuggestionClick={onSuggestionClick}
                       onPalettesClick={() => setShowPalettesModal(true)}
                       isSuggestionsUpdating={isColorChanging}
          />
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
