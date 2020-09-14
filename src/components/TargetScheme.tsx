import React, {FC, useState} from "react";
import styled from "styled-components";
import {Window} from "./shared/Window";
import {FlexColumnCenter} from "./shared/FlexColumnCenter";
import {Button} from "./shared/Button";
import {Divider} from "./shared/Divider";
import {ColorCell} from "./shared/ColorCell";
import {Switch} from "./shared/Switch";
import {convertColorsToExportString} from "../common/helpers";

interface TargetSchemeProps {
  paletteColors: string[]
  onCellClick: (colorPosition: number) => void;
  onImportClick: () => void;
}

const TargetScheme: FC<TargetSchemeProps> = ({paletteColors, onCellClick, onImportClick}) => {
  
  const [exportButton, setExportButton] = useState("export")
  const [switched, setSwitched] = useState(false)
  const [selectedCell, setSelectedCell] = useState(0)
  
  const onExportClick = () => {
    const exportData = convertColorsToExportString(paletteColors)
    navigator.clipboard.writeText(exportData).then(() => {
      setExportButton("copied!")
      setTimeout(() => {
        setExportButton("export")
      }, 2000)
    }).catch(() => {
      alert("error!")
    })
  }
  
  const onCellChange = (index: number) => {
    setSelectedCell(index)
    onCellClick(index)
  }
  
  return (
    <Window width={14.321} style={{zIndex: 1}}>
      <FlexColumnCenter>
        <Header>TARGET SCHEME</Header>
        <div style={{marginBottom: "0.3em",}}>
          <Switch
            switched={switched}
            width={11.13}
            onClick={() => setSwitched(!switched)}
            leftText={"default"}
            rightText={"manual"}
          />
        </div>
        <Divider/>
      </FlexColumnCenter>
      {switched
        ? <Manual colors={paletteColors} onCellChange={onCellChange} selectedCell={selectedCell}/> :
        <Default
          colors={paletteColors.slice(Math.floor(selectedCell / 8)* 8, Math.floor(selectedCell / 8 + 1) * 8)}
          onCellChange={(index) => onCellChange(index + Math.floor(selectedCell / 8)* 8)}
          selectedCell={selectedCell % 8}
        />
      }
      <Divider/>
      <div style={{textAlign: "right", marginTop: "0.5em", marginBottom: "0.2em"}}>
        <Button round small onClick={onImportClick} primary>import</Button>
        <Button
          round small
          onClick={onExportClick}
          style={{width: "4.7em", marginLeft: "0.5em"}}
          success={"copied!" === exportButton}
        >
          {exportButton}
        </Button>
      </div>
    </Window>
  )
}

const Header = styled.h2`
    font-weight: 900;
    color: ${props => props.theme.colors.targetSchemeHeader};
    margin-bottom: 0.15em; margin-top: 0 ;
    pointer-events: none;
    user-select: none;
`

interface DefaultProps {
  colors: string[],
  onCellChange: (colorIndex: number) => void,
  selectedCell: number
}

const Default: FC<DefaultProps> = ({colors, onCellChange, selectedCell}) => {
  
  
  const isSelected = (number: number) => selectedCell === number;
  
  
  return (
    <Wrapper>
      <ColorEntry text="PRIMARY" selected={isSelected(0)}
                  onClick={() => onCellChange(0)} color={colors[0]}/>
      <ColorEntry text="SECONDARY" selected={isSelected(1)}
                  onClick={() => onCellChange(1)} color={colors[1]}/>
      <ColorEntry text="TERTIARY" selected={isSelected(2)}
                  onClick={() => onCellChange(2)} color={colors[2]}/>
      <ColorEntry text="QUATERNARY" selected={isSelected(3)}
                  onClick={() => onCellChange(3)} color={colors[3]}/>
      <Divider style={{marginTop: "0.09em"}}/>
      
      <StyledColorEntry>
        <ColorCell outline={isSelected(4)} color={colors[4]} onClick={() => onCellChange(4)}/>
        <ColorCell outline={isSelected(5)} color={colors[5]} onClick={() => onCellChange(5)}/>
        <ColorName>EMISSIVE 1, 2</ColorName>
      </StyledColorEntry>
      
      <StyledColorEntry>
        <ColorCell onClick={() => onCellChange(6)} outline={isSelected(6)} color={colors[6]}/>
        <ColorCell onClick={() => onCellChange(7)} outline={isSelected(7)} color={colors[7]}/>
        <ColorName>ENERGY 1, 2</ColorName>
      </StyledColorEntry>
    </Wrapper>
  )
}

interface ManualProps {
  colors: string[],
  onCellChange: (colorIndex: number) => void,
  selectedCell: number
}

const Manual: FC<ManualProps> = ({colors, onCellChange, selectedCell}) => {
  
  
  return (
    <Wrapper>
      <StyledManual>
        {colors.map((color, key) => (
          <ColorCell
            color={color}
            outline={selectedCell === key}
            onClick={() => onCellChange(key)}
          />))}
      </StyledManual>
    </Wrapper>
  )
}

const StyledManual = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(8, 1fr);
  row-gap: 0.15em;
  
`

const Wrapper = styled.div`
  height: 9.2em;
  padding-bottom: 0.25em;
  margin-top: 0.2em;
`

interface ColorEntryProps {
  text: string,
  color: string,
  selected: boolean,
  onClick: () => void
}

const ColorEntry: FC<ColorEntryProps> = ({text, color, selected, onClick}) => {
  return (
    <StyledColorEntry onClick={onClick}>
      <ColorCell outline={selected} color={color}/>
      <ColorName>{text}</ColorName>
    </StyledColorEntry>
  )
}

const ColorName = styled.span`
    font-weight: normal;
    font-size: 1em;
    letter-spacing: 0.05em;
    &:before {
        margin-right: 0.3em;
        content: "•";
        margin-left: 0.4em;
    }
`

const StyledColorEntry = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 0.11em;
`

export default TargetScheme