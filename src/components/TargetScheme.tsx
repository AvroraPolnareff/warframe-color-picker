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
  defaultColors: string[];
  manualColors: string[];
  onCellChange: (colorPosition: number) => void;
  switched: boolean;
  onSwitch: () => void;
  onImportClick: () => void;
}

const TargetScheme: FC<TargetSchemeProps> = (
  { defaultColors, manualColors,
    onCellChange, switched,
    onSwitch, onImportClick}) => {
  
  const [exportButton, setExportButton] = useState("export")
  
  const onExportClick = () => {
    const exportData = convertColorsToExportString(defaultColors, manualColors)
    navigator.clipboard.writeText(exportData).then(() => {
      setExportButton("copied!")
      setTimeout(() => {
        setExportButton("export")
      }, 2000)
    }).catch(() => {alert("error!")})
  }
  
  
  
  return (
    <Window width={14.321} style={{zIndex: 1}}>
      
      <FlexColumnCenter>
        <Header>TARGET SCHEME</Header>
        <div style={{marginBottom: "0.3em", }}>
          <Switch switched={switched} width={11.13} onClick={onSwitch} leftText={"default"} rightText={"manual"}/>
        </div>
        <Divider/>
      </FlexColumnCenter>
      {switched
        ? <Manual colors={manualColors} onCellChange={onCellChange}/> :
        <Default colors={defaultColors} onCellChange={onCellChange}/>
      }
      <Divider/>
      <div style={{textAlign: "right", marginTop: "0.5em", marginBottom: "0.2em"}}>
        <Button round small onClick={onImportClick} primary>import</Button>
        <Button round small onClick={onExportClick} style={{width: "4.7em", marginLeft: "0.5em"}} success={"copied!" === exportButton}>{exportButton}</Button>
      </div>
    </Window>
  )
}

interface ManualProps {
  colors: string[],
  onCellChange: (colorPosition: number) => void
}

const Manual : FC<ManualProps> = ({colors, onCellChange}) => {
  const [currentCell, setCurrentCell] = useState(0)
  
  const isSelected = (number: number) => currentCell === number;
  
  const onCellClick = (number: number) => {
    setCurrentCell(number)
    onCellChange(number)
  }
  
  return (
    <StyledManual style={{height: "9.2em", paddingBottom: "0.25em", marginTop: "0.2em"}}>
      
      {colors.map((color, key) => <ColorCell color={color} outline={isSelected(key)} onClick={() => onCellClick(key)}/>)}
    </StyledManual>
  )
}

const StyledManual = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  row-gap: 0.15em;
`

interface DefaultProps {
  colors: string[],
  onCellChange: (colorPosition: number) => void
}

const Default: FC<DefaultProps> = ({colors, onCellChange}) => {
  
  const [currentCell, setCurrentCell] = useState(0)
  
  const isSelected = (number: number) => currentCell === number;
  
  const onCellClick = (number: number) => {
    setCurrentCell(number)
    onCellChange(number)
  }
  
  return (
    <div style={{height: "9.2em", paddingBottom: "0.25em", marginTop: "0.2em"}}>
      <ColorEntry text="PRIMARY" selected={isSelected(0)}
                  onClick={() => onCellClick(0)} color={colors[0]}/>
      <ColorEntry text="SECONDARY" selected={isSelected(1)}
                  onClick={() => onCellClick(1)} color={colors[1]}/>
      <ColorEntry text="TERTIARY" selected={isSelected(2)}
                  onClick={() => onCellClick(2)} color={colors[2]}/>
      <ColorEntry text="QUATERNARY" selected={isSelected(3)}
                  onClick={() => onCellClick(3)} color={colors[3]}/>
      <Divider style={{marginTop: "0.09em"}}/>
      
      <StyledColorEntry >
        <ColorCell outline={isSelected(4)} color={colors[4]} onClick={() => onCellClick(4)}/>
        <ColorCell outline={isSelected(5)} color={colors[5]} onClick={() => onCellClick(5)}/>
        <ColorName>EMISSIVE 1, 2</ColorName>
      </StyledColorEntry>
      
      <StyledColorEntry>
        <ColorCell onClick={() => onCellClick(6)} outline={isSelected(6)} color={colors[6]}/>
        <ColorCell onClick={() => onCellClick(7)} outline={isSelected(7)} color={colors[7]}/>
        <ColorName>ENERGY 1, 2</ColorName>
      </StyledColorEntry>
    </div>
  )
}

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


const Header = styled.h2`
    font-weight: 900;
    color: ${props => props.theme.colors.targetSchemeHeader};
    margin-bottom: 0.15rem; margin-top: 0 ;
    font-size: 1.6rem
    pointer-events: none;
    user-select: none;
`

export default TargetScheme