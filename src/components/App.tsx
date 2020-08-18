import React, {useState} from 'react';
import styled from "styled-components";
import TargetScheme from "./TargetScheme";
import {ColorPicker} from "./ColorPicker";
import Color from "color";


function App() {
  const initColors = ["#f8f5ed", "#525757", '#a64731', "#c0cbcf", "#dffefb", "#53bcb1", "#dffefb", "#53bcb1"]
  const [colors, setColors] = useState(initColors)
  const [currentColor, setCurrentColor] = useState(0)
  
  const onColorChange = (color: Color) => {
    const newColors = colors.slice()
    newColors[currentColor] = color.hex()
    setColors(newColors)
  }
  
  
  return (
    <StyledApp style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>
      <ColorPicker color={Color().hex(colors[currentColor])} onColorChange={onColorChange}/>
      <TargetScheme colors={colors} onCellChange={setCurrentColor}/>
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
