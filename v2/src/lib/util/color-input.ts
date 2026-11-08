import palettes from "#lib/assets/palettes.json"
import type { ColorPickerColor } from "#lib/types/palettes.ts"
import { hexToHsv, hsvToHex } from "#lib/util/color.ts"

export type ParsedColorInput =
  | { type: "hex"; color: string }
  | {
      type: "palette"
      format: "wd" | "CdRd"
      column?: number
      row?: number
      palette: string
    }
  | { type: "pet"; color: string }
  | { type: "hsv"; h: number; s: number; v: number }

export function parseColorInput(value: string): ParsedColorInput | undefined {
  const input = value.trim()
  if (/^#?[\da-f]{6}$/i.test(input)) {
    return { type: "hex", color: input }
  }
  const hsv = input.match(/^hsv\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)$/i)
  if (hsv) {
    const [h, s, v] = hsv.slice(1).map(Number)
    if (
      [h, s, v].every(Number.isFinite) &&
      h >= 0 &&
      h < 360 &&
      s >= 0 &&
      s <= 100 &&
      v >= 0 &&
      v <= 100
    ) {
      return { type: "hsv", h, s, v }
    }
    return
  }
  if (/^#[\da-f]{0,5}$/i.test(input)) return { type: "hex", color: "" }

  const alternate = input.match(/^c(\d{1,2})?r(\d{1,2})?(?:\s+(.*))?$/i)
  const letter = input.match(/^([a-e])(\d{1,2})?(?:\s+(.*))?$/i)
  if (alternate || letter) {
    const match = alternate ?? letter!
    const column = alternate
      ? match[1]
        ? Number(match[1]) - 1
        : undefined
      : match[1].toUpperCase().charCodeAt(0) - 65
    const row = match[2] ? Number(match[2]) - 1 : undefined
    if (
      (column !== undefined && (column < 0 || column > 4)) ||
      (row !== undefined && (row < 0 || row > 17))
    )
      return
    return {
      type: "palette",
      format: alternate ? "CdRd" : "wd",
      column,
      row,
      palette: match[3]?.trim() ?? "",
    }
  }
  if (/^[\da-f]{1,5}$/i.test(input)) return { type: "hex", color: "" }
  if (
    !input ||
    input.startsWith("#") ||
    /^[a-e]\d/i.test(input) ||
    /^c\d*r\d/i.test(input)
  )
    return
  if (/^[\p{L}\p{N}][\p{L}\p{N}\s'’-]*$/u.test(input)) {
    return { type: "pet", color: input }
  }
}

export function formatPaletteInput(
  input: Extract<ParsedColorInput, { type: "palette" }>,
  palette = input.palette,
): string {
  const column = input.column ?? 0
  const row = (input.row ?? 0) + 1
  return input.format === "CdRd"
    ? `C${column + 1}R${row} ${palette}`
    : `${String.fromCharCode(65 + column)}${row} ${palette}`
}

export function resolveColorInput(
  input?: ParsedColorInput,
): ColorPickerColor | undefined {
  if (!input) return
  switch (input.type) {
    case "hex":
      return hexToHsv(input.color)
    case "hsv":
      return { kind: "hsv", h: input.h, s: input.s, v: input.v }
    case "palette": {
      const palette = palettes.warframes.find(
        (palette) => palette.name.toLowerCase() === input.palette.toLowerCase(),
      )
      const position = { x: input.column ?? 0, y: input.row ?? 0 }
      if (palette?.colors[position.x + position.y * 5]) {
        return { kind: "warframe", palette: palette.name, position }
      }
      return
    }
    case "pet": {
      const pet = palettes.pets.find(
        (color) => color.name.toLowerCase() === input.color.toLowerCase(),
      )
      return pet ? { kind: "pet", name: pet.name } : undefined
    }
  }
}

export function formatColorPickerColor(color: ColorPickerColor): string {
  switch (color.kind) {
    case "warframe":
      return formatPaletteInput({
        type: "palette",
        format: "wd",
        palette: color.palette,
        column: color.position.x,
        row: color.position.y,
      })
    case "pet":
      return color.name
    case "hsv":
      return hsvToHex(color)
  }
}

export function sameColorPickerColor(
  a: ColorPickerColor,
  b?: ColorPickerColor,
): boolean {
  if (!b) return false
  switch (a.kind) {
    case "warframe":
      return (
        b.kind === "warframe" &&
        a.palette === b.palette &&
        a.position.x === b.position.x &&
        a.position.y === b.position.y
      )
    case "pet":
      return b.kind === "pet" && a.name === b.name
    case "hsv":
      return b.kind === "hsv" && a.h === b.h && a.s === b.s && a.v === b.v
  }
}
