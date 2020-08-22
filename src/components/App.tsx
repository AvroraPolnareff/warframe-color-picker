import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import TargetScheme from "./TargetScheme";
import {ColorPicker} from "./ColorPicker";
import Color from "color";
import {findClosestColors, useStickyState} from "../common/helpers";
import {palettes} from "../common/palettes";
import {MatchedColor, Suggestions} from "./Suggestions";
import {SelectedColor} from "./SelectedColor";


function App() {
  const initManualColors = [
    "#5BCEFA", "#A3A3DB", "#5BCEFA", "#A3A3DB", "#5BCEFA", "#A3A3DB", "#5BCEFA", "#A3A3DB",
    "#F5A9B8", "#5BCEFA", "#F5A9B8", "#5BCEFA", "#F5A9B8", "#5BCEFA", "#F5A9B8", "#5BCEFA",
    "#F4F4F4", "#F5A9B8", "#F4F4F4", "#F5A9B8", "#F4F4F4", "#F5A9B8", "#F4F4F4", "#F5A9B8",
    "#F5A9B8", "#F4F4F4", "#F5A9B8", "#F4F4F4", "#F5A9B8", "#F4F4F4", "#F5A9B8", "#F4F4F4",
    "#5BCEFA", "#F5A9B8", "#5BCEFA", "#F5A9B8", "#5BCEFA", "#F5A9B8", "#5BCEFA", "#F5A9B8",
    "#A3A3DB", "#5BCEFA", "#A3A3DB", "#5BCEFA", "#A3A3DB", "#5BCEFA", "#A3A3DB", "#5BCEFA",
  ]
  const initDefaultColors = ["#f8f5ed", "#525757", '#a64731', "#c0cbcf", "#dffefb", "#53bcb1", "#dffefb", "#53bcb1"]
  const initMatchedColor = {distance: 0, color: "#000000", paletteName: "Classic", position: {x: 0, y: 0}, uid: "3274823"}
  
  const [defaultColors, setDefaultColors] = useStickyState(initDefaultColors, "defaultColors")
  const [manualColors, setManualColors] = useStickyState(initManualColors, "manualColors")
  const [currentColors, setCurrentColors] = useState({default: 0, manual: 0})
  const [matchedColors, setMatchedColors] = useState<MatchedColor[]>([])
  const [selectedColor, setSelectedColor] = useState<MatchedColor>(initMatchedColor)
  const [switched, setSwitched] = useState(false)
  
  const getCurrentColor = () : string => {
    if (switched) {
      return manualColors[currentColors.manual]
    } else {
      return defaultColors[currentColors.default]
    }
  }
  
  useEffect(() => {
    const closestColors = findClosestColors(getCurrentColor(), palettes, 8)
    setMatchedColors(closestColors)
  }, [defaultColors, manualColors, currentColors])
  
  const onColorChange = (color: Color) => {
    if (!switched) {
      const newColors = defaultColors.slice()
      newColors[currentColors.default] = color.hex()
      setDefaultColors(newColors)
    } else {
      const newColors = manualColors.slice()
      newColors[currentColors.manual] = color.hex()
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
  
  const onImportClick = () => {
    navigator.clipboard.readText().then(
      clipText => {
        const importData = JSON.parse(clipText)
        if (!importData) {
          alert("wrong data!")
          return
        }
        setDefaultColors(importData.default)
        setManualColors(importData.manual)
      }
    ).catch(() => {alert("error!")})
  }
  
  const onExportClick = () => {
    const exportData = JSON.stringify({default: defaultColors, manual: manualColors})
    navigator.clipboard.writeText(exportData).then(() => {
      alert("copied!")
    }).catch(() => {alert("error!")})
  }
  
  return (
    <StyledApp>
      <div/>
      <div style={{display: "flex", alignItems: "start", justifyContent: "center", marginTop: "2rem"}}>
        <ColorPicker color={Color().hex(getCurrentColor())} onColorChange={onColorChange}/>
        <div style={{display: "flex", flexDirection: "column"}}>
          <TargetScheme
            switched={switched} onSwitch={onSwitch}
            defaultColors={defaultColors} manualColors={manualColors}
            onCellChange={onCellChange} onImportClick={onImportClick}
            onExportClick={onExportClick}
          />
          <Suggestions matchedColors={matchedColors} onSuggestionClick={onSuggestionClick}/>
        </div>
        <SelectedColor paletteName={selectedColor.paletteName} colorPosition={selectedColor.position}/>
      </div>
      
    </StyledApp>
  );
}

export const StyledApp = styled.div`
    height: 100vh;
    font-size: 14px;
    letter-spacing: 0.015em;
    font-weight: bold;
    margin: 0;
    font-family: "Gilroy", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`

export default App;
