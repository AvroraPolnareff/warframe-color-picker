import React, {FC, useState} from "react";
import styled, {DefaultTheme, withTheme} from "styled-components";
import {Window} from "./shared/Window";
import {FlexColumnCenter} from "./shared/FlexColumnCenter";
import {Button} from "./shared/Button";
import {Divider} from "./shared/Divider";
import {ColorCell} from "./shared/ColorCell";
import {Switch} from "./shared/Switch";

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
    const exportData = JSON.stringify({default: defaultColors, manual: manualColors})
    navigator.clipboard.writeText(exportData).then(() => {
      setExportButton("copied!")
      setTimeout(() => {
        setExportButton("export")
      }, 2000)
    }).catch(() => {alert("error!")})
  }
  
  
  
  return (
    <Window width={11.1}>
      
      <FlexColumnCenter>
        <Header>TARGET SCHEME</Header>
        <div style={{marginBottom: "0.2rem", }}>
          <Switch switched={switched} width={9.5} onClick={onSwitch} leftText={"default"} rightText={"manual"}/>
        </div>
        <Divider/>
      </FlexColumnCenter>
      {switched
        ? <Manual colors={manualColors} onCellChange={onCellChange}/> :
        <Default colors={defaultColors} onCellChange={onCellChange}/>
      }
      <Divider/>
      <div style={{textAlign: "right"}}>
        <Button round small onClick={onImportClick} primary>import</Button>
        <Button round small onClick={onExportClick} style={{width: "4em"}} success={"copied!" === exportButton}>{exportButton}</Button>
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
    <StyledManual style={{height: "8.2rem", paddingBottom: "0.25rem"}}>
      
      {colors.map((color, key) => <ColorCell color={color} outline={isSelected(key)} onClick={() => onCellClick(key)}/>)}
    </StyledManual>
  )
}

const StyledManual = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  row-gap: 0.21rem;
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
    <div style={{height: "8.2rem", paddingBottom: "0.25rem"}}>
      <ColorEntry text="PRIMARY" selected={isSelected(0)}
                  onClick={() => onCellClick(0)} color={colors[0]}/>
      <ColorEntry text="SECONDARY" selected={isSelected(1)}
                  onClick={() => onCellClick(1)} color={colors[1]}/>
      <ColorEntry text="TERTIARY" selected={isSelected(2)}
                  onClick={() => onCellClick(2)} color={colors[2]}/>
      <ColorEntry text="QUATERNARY" selected={isSelected(3)}
                  onClick={() => onCellClick(3)} color={colors[3]}/>
      <Divider/>
      
      <StyledColorEntry >
        <ColorCell outline={isSelected(4)} color={colors[4]} onClick={() => onCellClick(4)}/>
        <ColorCell outline={isSelected(5)} color={colors[5]} onClick={() => onCellClick(5)}/>
        <ColorName>EMISSIVE 1, 2</ColorName>
      </StyledColorEntry>
      
      <StyledColorEntry>
        <ColorCell onClick={() => onCellClick(6)} outline={isSelected(6)} color={colors[6]}/>
        <ColorCell onClick={() => onCellClick(7)} outline={isSelected(7)} color={colors[7]}/>
        <ColorName>"ENERGY 1, 2"</ColorName>
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
    &:before {
        margin-right: 0.3rem;
        content: "•";
        margin-left: 0.3rem;
    }
`

const StyledColorEntry = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 0;
    padding: 1px;
`


const Header = styled.h2`
    font-weight: 900;
    color: ${props => props.theme.colors.targetSchemeHeader};
    margin-bottom: 0.2rem; margin-top: 0 ;
    //margin: 0.2rem 0;
    font-size: 1.4rem
`

export default TargetScheme