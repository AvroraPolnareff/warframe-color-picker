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
      show={show} width={32} name={"Palettes"}
      description={"Customize your suggestions"} onExit={onExit}
    >
      <div style={{position: "relative"}}>
        <HoveredPalette>
          <PaletteName>{hoveredPalette}</PaletteName>

            <WarframePalette size={1.5} paletteName={hoveredPalette} />

          
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
        <Button round small warning onClick={onDisableAll} style={{marginRight: '0.4em'}}>disable all</Button>
        <Button round small warning onClick={onEnableAll}>enable all</Button>
      </div>
      </div>
      
    </Modal>
    
  )
}

const HoveredPalette  = styled.div`
  position: absolute;
  right: -10.2em;
  top: -1.9em;
  border: 4px solid ${props => props.theme.colors.secondary};
  padding: 0.4rem 0.6rem;
  background-color: white;
  border-radius: 0.8rem;
`

const PaletteName = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.secondary};
  font-size: 0.655em;
  text-transform: uppercase;
  border: 0.15em solid ${props => props.theme.colors.tertiary};
  border-radius: 0.5em;
  padding: 0.5em 0;
  margin-bottom: 0.5em;
  margin-top: 0.4em;
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
