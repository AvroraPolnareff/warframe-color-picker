import React, {FC, useEffect, useState} from "react"
import {Window} from "./shared/Window";
import {FlexColumnCenter} from "./shared/FlexColumnCenter";
import styled from "styled-components/macro";
import {Position} from "../common/Palette";
import waves from "../assets/waves.svg"
import {WarframePalette} from "./shared/WarframePalette";
import {Waves} from "../assets/Waves";

interface SelectedColorProps {
  paletteName: string,
  colorPosition: Position
}

export const SelectedColor: FC<SelectedColorProps> = ({paletteName, colorPosition}) => {
  const [name, setName] = useState("")
  
  useEffect(() => {
    setName(paletteName)
  }, [paletteName])
  
  const onColorHover = (position?: Position) => {
    if (position) {
      setName(`x: ${position.x + 1}, y: ${position.y + 1}`)
    } else {
      setName(paletteName)
    }
  }
  
  return (
    <Window width={10.6}>
      <FlexColumnCenter>
        <Waves style={{
          width: "8.8em",
          marginTop: "0.2em",
          marginBottom: "0.1em",
          pointerEvents: "none",
          userSelect: "none"
        }}/>
        <Header>SELECTED COLOR</Header>
        <Waves style={{
          width: "8.8em",
          marginTop: "0",
          marginBottom: "0.5em",
          pointerEvents: "none",
          userSelect: "none"
        }}/>
        <PaletteName>{name}</PaletteName>
        
        <WarframePalette
          size={1.735}
          paletteName={paletteName}
          colorPosition={colorPosition}
          onColorHover={onColorHover}
        />
      </FlexColumnCenter>
    </Window>
  )
}

const Header = styled.div`
    font-weight: 300;
    font-size: 1.75rem;
    letter-spacing: 0.001em;
    line-height: 0.93em;
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
    width: 100%;
    font-size: 0.8rem;
    border: 0.15em solid ${props => props.theme.colors.tertiary};
    border-radius: 0.5em;
    text-transform: uppercase;
`




