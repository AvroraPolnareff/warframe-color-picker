export interface Palette {
  name: string,
  colors: PaletteColor[]
}

export interface PaletteColor {
  hex: string,
  position: Position
}

export interface Position {
  x: number,
  y: number
}