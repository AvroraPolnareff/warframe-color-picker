import * as culori from "culori"
import palettes from "#lib/assets/palettes.json"
import type { ColorPickerColor } from "#lib/types/palettes.ts"

const toOklch = culori.converter("oklch")
const toHsv = culori.converter("hsv")

export type HsvColor = Extract<ColorPickerColor, { kind: "hsv" }>
export type CuloriHsv = culori.Hsv & { h: number }

function hexToCuloriHsv(hex: string): CuloriHsv | undefined {
  if (!hex) return
  const hsv = toHsv(hex.startsWith("#") ? hex : `#${hex}`)
  return hsv ? { ...hsv, h: hsv.h ?? 0 } : undefined
}

export function hsvToHex(color: HsvColor): string {
  return culori.formatHex({
    mode: "hsv",
    h: color.h,
    s: color.s / 100,
    v: color.v / 100,
  })
}

export function hexToHsv(hex: string): HsvColor | undefined {
  const hsv = hexToCuloriHsv(hex)
  return hsv
    ? { kind: "hsv", h: hsv.h ?? 0, s: hsv.s * 100, v: hsv.v * 100 }
    : undefined
}

/** Converts ColorPickerColor percentages to Culori's normalized HSV channels. */
export function colorToHsv(
  color: ColorPickerColor | string | { kind: "hex"; hex: string },
): CuloriHsv | undefined {
  if (typeof color === "string") return hexToCuloriHsv(color)
  switch (color.kind) {
    case "hsv":
      return { mode: "hsv", h: color.h, s: color.s / 100, v: color.v / 100 }
    case "hex":
      return hexToCuloriHsv(color.hex)
    case "warframe": {
      const palette = palettes.warframes.find(
        (palette) => palette.name.toLowerCase() === color.palette.toLowerCase(),
      )
      const hex = palette?.colors.find(
        ({ position }) =>
          position.x === color.position.x && position.y === color.position.y,
      )?.hex
      return hex ? hexToCuloriHsv(hex) : undefined
    }
    case "pet": {
      const hex = palettes.pets.find(
        (pet) => pet.name.toLowerCase() === color.name.toLowerCase(),
      )?.colorCode
      return hex ? hexToCuloriHsv(hex) : undefined
    }
  }
}

export function darken(input: string, amount: number): string {
  const color = toOklch(input)
  if (!color) return input

  const factor = 1 - Math.min(1, Math.max(amount))
  return culori.formatHex(
    culori.clampChroma({
      ...color,
      l: color.l * factor,
    }),
  )
}
