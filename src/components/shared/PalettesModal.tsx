import React, {FC, useState} from "react"
import styled from "styled-components";
import {Modal} from "./Modal";
import {palettes} from "../../common/palettes";
import {Button} from "./Button";
import {Divider} from "./Divider";
import {WarframePalette} from "../SelectedColor";

interface PalettesModalProps {
  show: boolean,
  availablePalettes: string[],
  onPaletteClick: (paletteName: string) => void,
  onDisableAll: () => void,
  onEnableAll: () => void,
  onExit: () => void
}

export const PalettesModal : FC<PalettesModalProps> = (
  {show, availablePalettes, onPaletteClick, onDisableAll, onEnableAll, onExit}
  ) => {
  const [hoveredPalette, setHoveredPalette] = useState("Classic")
  
  
  return (
    <Modal
      show={show} width={27} name={"Palettes"}
      description={"Customize your suggestions"} onExit={onExit}
    >
      <div style={{position: "relative"}}>
        <HoveredPalette>
          <PaletteName>{hoveredPalette}</PaletteName>
          <PaletteWrapper>
            <WarframePalette size={21} paletteName={hoveredPalette} />
          </PaletteWrapper>
          
        </HoveredPalette>
      
      <Grid>
        <ColumnHead>STANDARD</ColumnHead><ColumnHead>EXCLUSIVE</ColumnHead>
        <ColumnHead>EVENT</ColumnHead><ColumnHead>LEGACY</ColumnHead>
        {palettes.map(({name}) => <Button round small
          onClick={() => onPaletteClick(name)} onMouseOver={() => setHoveredPalette(name)}
          success={availablePalettes.indexOf(name) !== -1}
        >
          {name.slice(0, 12) + (name.length > 13 ? "." : "")}
        </Button>)}
      </Grid>
      <Divider/>
      <div style={{textAlign: "right", marginTop: "0.5rem"}}>
        <Button round small warning onClick={onDisableAll}>disable all</Button>
        <Button round small warning onClick={onEnableAll}>enable all</Button>
      </div>
      </div>
      
    </Modal>
    
  )
}

const HoveredPalette  = styled.div`
  position: absolute;
  right: -10rem; top: -2rem;
  border: 4px solid ${props => props.theme.colors.tertiary};
  padding: 0.4rem 0.6rem;
  background-color: white;
  border-radius: 0.8rem;
`

const PaletteName = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.secondary};
  font-size: 0.6rem;
  text-transform: uppercase;
  border: 2px solid ${props => props.theme.colors.tertiary};
  border-radius: 0.5rem;
  padding: 0.3rem 0;
  margin-bottom: 0.5em;
`

const PaletteWrapper = styled.div`
  overflow: hidden;
  height: ${21 * 18}px;
  border: 3px solid ${props => props.theme.colors.tertiary};
  border-radius: 0.5rem;
`

const Grid = styled.div`
  color: ${props => props.theme.colors.secondary};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 0.2em;
  justify-items: start;
  margin-bottom: 0.8rem;
`

const ColumnHead = styled.div`
  margin-bottom: 0.2rem;
  &:before {
    content: "•";
    margin: auto 0.2rem;
  }
`
