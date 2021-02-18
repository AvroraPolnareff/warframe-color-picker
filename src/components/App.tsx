import React, {CSSProperties, FC, useEffect, useRef, useState} from 'react';
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
import targetSchemeToSuggestions from "../assets/Wires (Col Pic -_ Tar Sch).svg"
import targetSchemeToColorPicker from "../assets/Wires (Tar Sch -_ Col Pic).svg"
import suggestionsToSelectedColor from "../assets/Wires (Sugg -_ Sel Col).svg"

export const initManualColors = Array(48).fill("empty")

export const initAvailablePalettes = palettes.map((palette) => palette.name)

function App() {
  
  const initMatchedColor = {
    distance: 0,
    color: "#000000",
    paletteName: "Classic",
    position: {x: 0, y: 0},
    uid: "3274823"
  }
  
  const [paletteColors, setPaletteColors] = useStickyState(initManualColors, "manualColors")
  const [currentColor, setCurrentColor] = useState(0)
  const [matchedColors, setMatchedColors] = useState<MatchedColor[]>([])
  const [isColorChanging, setIsColorChanging] = useState(false)
  const [selectedColor, setSelectedColor] = useState<MatchedColor>(initMatchedColor)
  
  const [showImportModal, setShowImportModal] = useState(false)
  const [showPalettesModal, setShowPalettesModal] = useState(false)
  const [availablePalettes, setAvailablePalettes] = useStickyState<string[]>(initAvailablePalettes, "availablePalettes")
  
  const debounced = useRef(debounce((fn: () => void) => fn(), 150, {trailing: true, leading: false}))
  
  
  const getCurrentColor = (): string => {
    const color = paletteColors[currentColor]
    if (color === "empty") return "#000000"
    return color
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
  }, [paletteColors, currentColor, availablePalettes])
  
  const onCellClick = (index: number, e: React.MouseEvent) => {
    if (e.type === "contextmenu") {
      e.preventDefault();
      const newPaletteColors = [...paletteColors];
      newPaletteColors[index] = "empty";
      setPaletteColors(newPaletteColors);
    }
    setCurrentColor(index);
  }
  
  const onColorChange = (color: Color) => {
    const newColors = [...paletteColors]
    newColors[currentColor] = color.toString()
    setPaletteColors(newColors)
  }
  
  const onSuggestionClick = (key: string) => {
    const filteredColor = matchedColors.filter(({uid}) => uid === key)[0]
    if (filteredColor.uid !== selectedColor.uid) {
      setSelectedColor(filteredColor);
    }
  }
  
  const onAcceptImport = (data: string) => {
    try {
      const importData = convertExportStringToColors(data)
      setPaletteColors(importData)
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
      {/*<Header/>*/}
      {/*<div/>*/}
      
      {showPalettesModal ?
        <PalettesModal
          availablePalettes={availablePalettes}
          show={showPalettesModal}
          onPaletteClick={onPaletteClick}
          onDisableAll={() => setAvailablePalettes(["Classic"])}
          onEnableAll={() => setAvailablePalettes(initAvailablePalettes)}
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
        onScreenshotImport={(colors => {
          setPaletteColors([
            ...paletteColors.slice(0, Math.floor(currentColor / 8) * 8),
            ...colors,
            ...paletteColors.slice(Math.floor(currentColor / 8 + 1) * 8)
          ]);
          setShowImportModal(false)
        })}
      />
      
      {/*<AppBar/>*/}
      <Credentials><span>Hippothoe & Morisabeau</span></Credentials>
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
    </StyledApp>
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

const Credentials = styled.div`
  position: absolute;
  top: 2%;
  right: 2%;
  text-align: right;
  font-size: 1.25rem;
`

export const StyledApp = styled.div`
  position: relative;
  color: ${props => props.theme.colors.secondary};
  margin: 0;
  font-family: "Gilroy", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

export default App;
