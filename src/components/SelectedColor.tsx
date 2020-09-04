import React, {FC} from "react"
import {Window} from "./shared/Window";
import {FlexColumnCenter} from "./shared/FlexColumnCenter";
import styled, {css, keyframes} from "styled-components";
import {Position} from "../common/Palette";
import {palettes} from "../common/palettes";
import waves from "../assets/waves.svg"
import {WarframePalette} from "./shared/WarframePalette";

interface SelectedColorProps {
  paletteName: string,
  colorPosition: Position
}

export const SelectedColor: FC<SelectedColorProps> = ({paletteName, colorPosition}) => {
  return (
    <Window width={11}>
      <FlexColumnCenter>
        <img src={waves} style={{
          width: "8.7em",
          marginTop: "0.2em",
          marginBottom: "0.1em",
          pointerEvents: "none",
          userSelect: "none"
        }}/>
        <Header>SELECTED COLOR</Header>
        <img src={waves} style={{
          width: "8.7em",
          marginTop: "0",
          marginBottom: "0.5em",
          pointerEvents: "none",
          userSelect: "none"
        }}/>
        <PaletteName>{paletteName}</PaletteName>
        
        <WarframePalette size={1.75} paletteName={paletteName} colorPosition={colorPosition}/>
      
      </FlexColumnCenter>
    </Window>
  )
}

const Header = styled.div`
    font-weight: 300;
    font-size: 1.75em;
    letter-spacing: 0.001em;
    line-height: 1em;
    margin: 0 0;
    text-align: center;
    background: rgb(233,165,165);
    background: linear-gradient(90deg, rgba(233,165,165,1) 0%, rgba(184,193,192,1) 25%, rgba(101,192,224,1) 50%, rgba(174,162,219,1) 75%, rgba(129,193,217,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    pointer-events: none;
    user-select: none;
`

const PaletteName = styled.div`
    text-align: center;
    font-weight: 900;
    padding: 0.6em 0 0.4em 0;
    margin-bottom: 0.5em;
    width: 95%;
    font-size: 0.8em;
    border: 0.15em solid ${props => props.theme.colors.tertiary};
    border-radius: 0.5em;
    text-transform: uppercase;
`




