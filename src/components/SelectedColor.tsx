import React, {FC, useEffect, useRef} from "react"
import {Window} from "./shared/Window";
import {FlexColumnCenter} from "./shared/FlexColumnCenter";
import styled from "styled-components";
import {Position} from "../common/Palette";
import {palettes} from "../common/palettes";
import Color from "color";

interface SelectedColorProps {
  paletteName: string,
  colorPosition: Position
}

export const SelectedColor : FC<SelectedColorProps> = ({paletteName, colorPosition}) => {
  return (
    <Window>
      <FlexColumnCenter>
        <Header>SELECTED <br /> COLOR</Header>
        <PaletteName>{paletteName}</PaletteName>
        <StyledWarframePalette>
          <WarframePalette size={29} paletteName={paletteName} colorPosition={colorPosition}/>
        </StyledWarframePalette>
      </FlexColumnCenter>
    </Window>
  )
}

const StyledWarframePalette = styled.div`
    border-radius: 0.5rem;
    overflow: hidden;
    border: 3px solid ${props => props.theme.colors.border};
    height:522px;
`

const Header = styled.h2`
    font-weight: 300;
    font-size: 2.1rem;
    text-align: center;
    background: rgb(233,165,165);
    background: linear-gradient(90deg, rgba(233,165,165,1) 0%, rgba(184,193,192,1) 25%, rgba(101,192,224,1) 50%, rgba(174,162,219,1) 75%, rgba(129,193,217,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

const PaletteName = styled.div`
    text-align: center;
    font-weight: 500;
    padding: 0.4rem 0;
    margin-bottom: 0.5rem;
    width: 95%;
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: 0.3rem;
    text-transform: uppercase;
`

interface WarframePaletteProps {
  size: number,
  paletteName: string,
  colorPosition: Position
}

const WarframePalette : FC<WarframePaletteProps> = ({ size, paletteName, colorPosition }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      const palette = palettes.filter(palette => palette.name === paletteName)[0];
      for (const color of palette.colors) {
        if (colorPosition.x === color.position.x && colorPosition.y === color.position.y) {
          ctx.fillStyle = color.hex
          ctx.fillRect(
            size * color.position.x + 2,
            size * color.position.y + 2,
            size - 4,
            size - 4
          );
          ctx.strokeStyle = Color().hex(color.hex).negate().hex();
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        else {
          ctx.fillStyle = color.hex;
          ctx.fillRect(size * color.position.x, size * color.position.y, size, size);
        }
      }
    }
  });
  
  return (
    <div>
      <canvas ref={canvasRef} width={5 * size} height={18 * size} style={{ maxHeight: 18 * size }} />
    </div>
  );
};
