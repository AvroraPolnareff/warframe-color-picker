import {Position} from "../../common/Palette";
import React from "react";
import {palettes} from "../../common/palettes";
import styled, {css, keyframes} from "styled-components/macro";

interface WarframePaletteProps {
  size: number,
  paletteName: string,
  colorPosition?: Position,
  onColorHover?: (colorPosition?: Position) => void,
  onColorClick?: (colorHex?: string) => void
}

export const WarframePalette = (
  {
    size,
    paletteName,
    colorPosition,
    onColorHover,
    onColorClick
  }: WarframePaletteProps
) => {
  const palette = palettes.filter(palette => palette.name === paletteName)[0]

  return (
    <StyledWarframePalette size={size} onMouseLeave={() => onColorHover && onColorHover()}>
      {palette.colors.map((color, index) => (
        <PaletteCell
          key={index}
          selected={color.position.x === colorPosition?.x && colorPosition?.y === color.position.y}
          color={color.hex}
          size={size}
          onHover={() => onColorHover && onColorHover(color.position)}
          onClick={() => onColorClick && onColorClick(color.hex)}
        />
      ))}
    </StyledWarframePalette>
  )
}

const StyledWarframePalette = styled.div<{ size: number }>`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(18, 1fr);
  justify-items: center;
  align-items: center;
  border: 0.2em solid ${props => props.theme.colors.tertiary};
  border-radius: 0.633em;
  overflow: hidden;
`

interface PaletteCellProps {
  size: number,
  color: string,
  selected: boolean,
  onHover: () => void,
  onClick: ()=>void
}

const PaletteCell = (
  {
    size,
    color,
    selected,
    onHover,
    onClick
  }: PaletteCellProps
) => {
  return (
    <>
      {selected
        ? <BackgroundGradient size={size} onMouseOver={() => onHover()} onClick={() => onClick()}>
          <StyledPaletteCell size={size} color={color} selected={selected}/>
        </BackgroundGradient>

        : <StyledPaletteCell size={size} color={color} selected={selected} onMouseOver={() => onHover()} onClick={() => onClick()}/>
      }

    </>
  )
}

const StyledPaletteCell = styled.div.attrs(props => ({style: {backgroundColor: props.color}}))
  < {size: number, color: string, selected: boolean} > `
  height: ${props => props.size}em;
  width: ${props => props.size}em;
  transition: background-color 0.3s linear;
  ${props => props.selected && css`
    max-height: ${props.size - 0.4}em;
    max-width: ${props.size - 0.4}em;
  `}
`

const moveGradient = keyframes`
  50% {
    background-position: 100% 50%;
  }
`

const BackgroundGradient = styled.div<{ size: number }>`
  height: ${props => props.size}em;
  width: ${props => props.size}em;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
      60deg,
      rgba(233,165,165,1) 0%,
      rgba(184,193,192,1) 25%, rgba(101,192,224,1) 50%,
      rgba(174,162,219,1) 75%, rgba(129,193,217,1) 100%
    );
  background-size: 300% 300%;
  background-position: 0 50%;
  animation: ${moveGradient} 4s alternate infinite;
`
