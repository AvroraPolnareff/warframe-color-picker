export interface PaletteColorPosition {
  x: number
  y: number
}

export interface PaletteColor {
  hex: string
  position: PaletteColorPosition
}

export interface WarframePalette {
  name: string
  colors: PaletteColor[]
}

export interface PetPalette {
  name: string
  colorCode: string
  price: string
  event: string
  type: string
  imageName: string
  bundleName: string
}

export interface Palettes {
  warframes: WarframePalette[]
  pets: PetPalette[]
}

export type ColorKind = "warframe" | "pet" | "hsl"
export type PaletteColorMode = "warframe" | "pet"

export type ColorPickerColor =
  | { kind: "hsv"; h: number; s: number; v: number }
  | { kind: "pet"; name: string }
  | { kind: "warframe"; palette: string; position: PaletteColorPosition }
