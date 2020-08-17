import React, {FC, useEffect, useState} from "react";
import styled, {DefaultTheme, withTheme} from "styled-components";
import {Window} from "./shared/Window";
import {FlexColumnCenter} from "./shared/FlexColumnCenter";
import {Button} from "./shared/Button";
import {Divider} from "./shared/Divider";
import {ColorCell} from "./shared/ColorCell";

interface TargetSchemeProps {
  theme: DefaultTheme;
  colors: string[];
  onCellChange: (colorPosition: number) => void
}

const TargetScheme: FC<TargetSchemeProps> = ({theme, colors, onCellChange}) => {
  return (
    <Window>
      <Header>TARGET SCHEME</Header>
      <FlexColumnCenter>
        <div>
          <Button selected backgroundColor={theme.colors.defaultButton}>default</Button>
          <Button backgroundColor={theme.colors.manualButton}>manual</Button>
        </div>
        <Divider/>
      </FlexColumnCenter>
      <Default colors={colors} onCellChange={onCellChange}/>
    </Window>
  )
}

interface DefaultProps {
  colors: string[],
  onCellChange: (colorPosition: number) => void
}

const Default: FC<DefaultProps> = ({colors, onCellChange}) => {
  
  const [currentCell, setCurrentCell] = useState(0)
  
  const isSelected = (number: number) => currentCell === number;
  
  const onCellClick = (number: number) => {
    setCurrentCell(number)
    onCellChange(currentCell)
  }
  
  return (
    <div>
      <ColorEntry text="PRIMARY" selected={isSelected(0)}
                  onClick={() => onCellClick(0)} color={colors[0]}/>
      <ColorEntry text="SECONDARY" selected={isSelected(1)}
                  onClick={() => onCellClick(1)} color={colors[1]}/>
      <ColorEntry text="TERTIARY" selected={isSelected(2)}
                  onClick={() => onCellClick(2)} color={colors[2]}/>
      <ColorEntry text="QUATERNARY" selected={isSelected(3)}
                  onClick={() => onCellClick(3)} color={colors[3]}/>
      <Divider/>
      
      <StyledColorEntry onClick={() => onCellClick(4)}>
        <ColorCell outline={isSelected(4)} color={colors[4]}/>
        <ColorCell outline={isSelected(5)} color={colors[5]}/>
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

const ColorEntry: FC<ColorEntryProps> = ({text, color, selected}) => {
  return (
    <StyledColorEntry>
      <ColorCell outline={selected} color={color}/>
      <ColorName>{text}</ColorName>
    </StyledColorEntry>
  )
}



const ColorName = styled.span`
    
    &:before {
        margin-right: 0.3rem;
        content: "•";
    }
`

const StyledColorEntry = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 0.2rem;
    padding: 1px;
`


const Header = styled.h2`
    font-weight: 900;
    color: ${props => props.theme.colors.targetSchemeHeader};
    font-size: 1.4rem
`

export default withTheme(TargetScheme)