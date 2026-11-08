import { Color } from "./Color.svelte"

export interface PaletteColor {
  name: string
  mode: "warframe" | "pet"
  color: Color
  secondaryColor?: Color
}

export class Palette {
  id = crypto.randomUUID()
  paletteColors: PaletteColor[] = $state([])
  paletteKind: "warframe" | "pet" = $state("warframe")
  constructor(opts: { name: string; palette: "warframe" | "pet" }) {
    this.paletteKind = opts.palette
    switch (opts.palette) {
      case "warframe":
        this.paletteColors = createWarframePalette()
        break
      case "pet":
        this.paletteColors = createPetPalette()
        break
    }
  }
}

const createWarframePalette = (): PaletteColor[] => [
  {
    name: "Primary",
    color: new Color({
      kind: "warframe",
      palette: "Classic",
      position: { x: 0, y: 0 },
    }),
    mode: "warframe",
  },
  {
    name: "Secondary",
    color: new Color({
      kind: "warframe",
      palette: "Classic",
      position: { x: 0, y: 0 },
    }),
    mode: "warframe",
  },
  {
    name: "Tertiary",
    color: new Color({
      kind: "warframe",
      palette: "Classic",
      position: { x: 0, y: 0 },
    }),
    mode: "warframe",
  },
  {
    name: "Accents",
    color: new Color({
      kind: "warframe",
      palette: "Classic",
      position: { x: 0, y: 0 },
    }),
    mode: "warframe",
  },
  {
    name: "Emmissive",
    color: new Color({
      kind: "warframe",
      palette: "Classic",
      position: { x: 0, y: 0 },
    }),
    secondaryColor: new Color({
      kind: "warframe",
      palette: "Classic",
      position: { x: 0, y: 0 },
    }),
    mode: "warframe",
  },
  {
    name: "Energy",
    color: new Color({
      kind: "warframe",
      palette: "Classic",
      position: { x: 0, y: 0 },
    }),
    secondaryColor: new Color({
      kind: "warframe",
      palette: "Classic",
      position: { x: 0, y: 0 },
    }),
    mode: "warframe",
  },
]

const createPetPalette = (): PaletteColor[] => [
  {
    name: "Primary",
    color: new Color({
      kind: "pet",
      name: "",
    }),
    mode: "pet",
  },
  {
    name: "Secondary",
    color: new Color({
      kind: "pet",
      name: "",
    }),
    mode: "pet",
  },
  {
    name: "Tertiary",
    color: new Color({
      kind: "pet",
      name: "",
    }),
    mode: "pet",
  },
  {
    name: "Accents",
    color: new Color({
      kind: "pet",
      name: "",
    }),
    mode: "pet",
  },
  {
    name: "Emmissive",
    color: new Color({
      kind: "pet",
      name: "",
    }),
    mode: "pet",
  },
  {
    name: "Energy",
    color: new Color({
      kind: "warframe",
      palette: "Classic",
      position: { x: 0, y: 0 },
    }),
    mode: "warframe",
  },
]
