export interface Palette {
  name: string,
  colors: {
    hex: string,
    position: Position
  }
}

export interface Position {
  x: number,
  y: number
}