import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import TargetScheme from "./TargetScheme";
import {ColorPicker} from "./ColorPicker";
import Color from "color";
import {findClosestColors} from "../common/helpers";
import {palettes} from "../common/palettes";
import {MatchedColor, Suggestions} from "./Suggestions";
import {SelectedColor} from "./SelectedColor";


function App() {
  const initColors = ["#f8f5ed", "#525757", '#a64731', "#c0cbcf", "#dffefb", "#53bcb1", "#dffefb", "#53bcb1"]
  const initMatchedColor = {distance: 0, color: "#000000", paletteName: "Classic", position: {x: 0, y: 0}}
  
  const [colors, setColors] = useState(initColors)
  const [currentColor, setCurrentColor] = useState(0)
  const [matchedColors, setMatchedColors] = useState<MatchedColor[]>([])
  const [selectedColor, setSelectedColor] = useState<MatchedColor>(initMatchedColor)
  
  useEffect(() => {
    const closestColors = findClosestColors(colors[currentColor], palettes, 8)
    setMatchedColors(closestColors)
  }, [colors, currentColor])
  
  const onColorChange = (color: Color) => {
    const newColors = colors.slice()
    newColors[currentColor] = color.hex()
    setColors(newColors)
    
  }
  const onSuggestionClick = (key: string) => {
    const filteredColor = matchedColors.filter(({paletteName, color}) => paletteName + color === key)[0]
    return setSelectedColor(filteredColor);
    
  }
  
  return (
    <StyledApp>
      <div/>
      <div style={{display: "flex", alignItems: "start", justifyContent: "center", marginTop: "2rem"}}>
        <ColorPicker color={Color().hex(colors[currentColor])} onColorChange={onColorChange}/>
        <div style={{display: "flex", flexDirection: "column"}}>
          <TargetScheme colors={colors} onCellChange={setCurrentColor}/>
          <Suggestions matchedColors={matchedColors} onSuggestionClick={onSuggestionClick}/>
        </div>
        <SelectedColor paletteName={selectedColor.paletteName} colorPosition={selectedColor.position}/>
      </div>
    </StyledApp>
  );
}

export const StyledApp = styled.div`
    height: 100vh;
    font-size: 12px;
    font-weight: 700;
    margin: 0;
    font-family: "Gilroy", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`

export default App;
