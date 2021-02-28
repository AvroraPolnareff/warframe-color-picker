import React, {FC, useMemo, useState} from "react";
import styled, {css, DefaultTheme, Keyframes, keyframes} from "styled-components/macro";
import {Window} from "./shared/Window";
import {FlexColumnCenter} from "./shared/FlexColumnCenter";
import {Button} from "./shared/Button";
import {Divider} from "./shared/Divider";
import {ColorCell} from "./shared/ColorCell";
import {Switch} from "./shared/Switch";
import {convertColorsToExportString} from "../common/helpers";
import _ from "lodash";

interface TargetSchemeProps {
  paletteColors: string[]
  onCellClick: (colorPosition: number, e: React.MouseEvent) => void;
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
  
  const onCellChange = (index: number, e: React.MouseEvent) => {
    e.preventDefault()
    if (e.nativeEvent.button === 2) {
      onCellClick(index, e)
    } else {
      setSelectedCell(index)
      onCellClick(index, e)
    }
  }
  
  return (
    <Window width={14.321} style={{zIndex: 0}}>
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
          colors={paletteColors.slice(Math.floor(selectedCell / 8) * 8, Math.floor(selectedCell / 8 + 1) * 8)}
          onCellChange={(index, e) => onCellChange(index + Math.floor(selectedCell / 8) * 8, e)}
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
    margin-bottom: 0.12em; margin-top: 0 ;
    font-size: 1.6rem;
    pointer-events: none;
    user-select: none;
`

interface DefaultProps {
  colors: string[],
  onCellChange: (colorIndex: number, e: React.MouseEvent) => void,
  selectedCell: number
}

const Default: FC<DefaultProps> = ({colors, onCellChange, selectedCell}) => {
  
  
  const isSelected = (number: number) => selectedCell === number;
  
  const onCellClick = (index: number, e: React.MouseEvent) => {
    onCellChange(index, e);
  }
  
  return (
    <Wrapper>
      <ColorEntry text="PRIMARY" selected={isSelected(0)}
                  onClick={(e) => onCellClick(0, e)} color={colors[0]}/>
      <ColorEntry text="SECONDARY" selected={isSelected(1)}
                  onClick={(e) => onCellClick(1, e)} color={colors[1]}/>
      <ColorEntry text="TERTIARY" selected={isSelected(2)}
                  onClick={(e) => onCellClick(2, e)} color={colors[2]}/>
      <ColorEntry text="QUATERNARY" selected={isSelected(3)}
                  onClick={(e) => onCellClick(3, e)} color={colors[3]}/>
      <div style={{marginTop: "0.65em"}}>
        <StyledColorEntry>
          <ColorCell outline={isSelected(4)} color={colors[4]} onClick={(e) => onCellClick(4, e)}/>
          <ColorCell outline={isSelected(5)} color={colors[5]} onClick={(e) => onCellClick(5, e)}/>
          <ColorName>EMISSIVE 1, 2</ColorName>
        </StyledColorEntry>
        <StyledColorEntry>
          <ColorCell outline={isSelected(6)} color={colors[6]} onClick={(e) => onCellClick(6, e)}/>
          <ColorCell outline={isSelected(7)} color={colors[7]} onClick={(e) => onCellClick(7, e)}/>
          <ColorName>ENERGY 1, 2</ColorName>
        </StyledColorEntry>
      </div>
    </Wrapper>
  )
}

interface ManualProps {
  colors: string[],
  onCellChange: (colorIndex: number, e: React.MouseEvent) => void,
  selectedCell: number
}

const Manual: FC<ManualProps> = ({colors, onCellChange, selectedCell}) => {
  const cellsRows = useMemo(() => {
    const indexed = colors.map((color, index) => ({index, color}))
    return _.chunk(indexed, 8)
  }, [colors])
  
  const selectedRow = useMemo(() => Math.floor(selectedCell / 8), [selectedCell])
  
  return (
    <Wrapper>
      <StyledManual>
        {cellsRows.map((row, index) => (
          <CellsRow selected={selectedRow === index}>
            {row.map((cell) => (
              <ColorCell
                color={cell.color}
                outline={selectedCell === cell.index}
                onClick={(e) => onCellChange(cell.index, e)}
              />
            ))}
          </CellsRow>
        ))
        }
        {/*{colors.map((color, key) => (
          <ColorCell
            color={color}
            outline={selectedCell === key}
            onClick={() => onCellChange(key)}
          />))}*/}
      </StyledManual>
    </Wrapper>
  )
}

const StyledManual = styled.div`
  //display: grid;
  //grid-template-rows: repeat(6, 1fr);
  //grid-template-columns: repeat(8, 1fr);
  //row-gap: 0.15em;
  
`

const Wrapper = styled.div`
  height: 9.35em;
  padding-bottom: 0.25em;
`

const CellsRow = styled.div<{selected?: boolean}>`
  display: flex;
  justify-content: space-between;
  height: 1.55em;
  border: 2px dashed transparent;
  border-radius: 0.4em;
  ${({selected}) => selected && css`
    animation-duration: 2s;
    animation-name: ${props => animation(props)};
    
  `}
`

const animation: ({theme}: { theme: DefaultTheme }) => Keyframes = ({theme}) => keyframes`
  0% {
    border-color: transparent;
  }
  17% {
    border-color: ${theme.colors.secondary};;
  }
  35% {
    border-color: transparent;
  }
  50% {
     border-color: ${theme.colors.secondary};;
  }
  67% {
    border-color: transparent;
  }
  84% {
     border-color: ${theme.colors.secondary};;
  }
  100 % {
    border-color: transparent;
  }
`

interface ColorEntryProps {
  text: string,
  color: string,
  selected: boolean,
  onClick: (e: React.MouseEvent) => void
}

const ColorEntry: FC<ColorEntryProps> = ({text, color, selected, onClick}) => {
  return (
    <StyledColorEntry onClick={onClick}>
      <ColorCell outline={selected} color={color} onClick={onClick}/>
      <ColorName>{text}</ColorName>
    </StyledColorEntry>
  )
}

const ColorName = styled.span`
    font-weight: normal;
    font-size: 1rem;
    letter-spacing: 0.05em;
    &:before {
        margin-right: 0.3em;
        content: "•";
        margin-left: 0.2em;
    }
`

const StyledColorEntry = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 0.11em;
`

export default TargetScheme
