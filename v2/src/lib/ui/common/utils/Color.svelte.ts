import type { ColorPickerColor } from "#lib/types/palettes.ts"
import { Bounds } from "#lib/util/bounds.ts"
import { colorToHsv, type CuloriHsv } from "#lib/util/color.ts"
import {
  convertHsvToRgb,
  convertRgbToHsv,
  formatHex,
  formatHsl,
  formatRgb,
} from "culori"

export type ColorComponent = "r" | "g" | "b" | "h" | "s" | "v"

export class Color {
  private cpColor: ColorPickerColor = $state({
    kind: "warframe",
    palette: "Classic",
    position: { x: 0, y: 0 },
  })

  readonly colorComponentBounds: Record<ColorComponent, Bounds> = {
    r: new Bounds(0, 255),
    g: new Bounds(0, 255),
    b: new Bounds(0, 255),
    h: new Bounds(0, 359),
    s: new Bounds(0, 100),
    v: new Bounds(0, 100),
  }

  constructor(color: ColorPickerColor) {
    this.cpColor = color
  }

  get value(): ColorPickerColor {
    return this.cpColor
  }

  set value(color: ColorPickerColor) {
    this.cpColor = color
  }

  setColorComponent(colorComponent: ColorComponent, value: number) {
    const bounds = this.colorComponentBounds[colorComponent]
    if (!bounds.inside(value)) return
    let color = this.hsvColor
    switch (colorComponent) {
      case "h": {
        const prevValue = this.hsvColor[colorComponent]
        if (Math.round(prevValue) === value) return
        color[colorComponent] = value
        break
      }
      case "s":
      case "v": {
        const prevValue = bounds.apply(this.hsvColor[colorComponent])
        if (Math.round(prevValue) === value) return
        color[colorComponent] = bounds.toFloat(value)
        break
      }
      case "r":
      case "g":
      case "b": {
        const prevValue = bounds.apply(this.rgbColor[colorComponent])
        if (Math.round(prevValue) === value) return
        color = convertRgbToHsv({
          ...this.rgbColor,
          [colorComponent]: bounds.toFloat(value),
        }) as CuloriHsv
        break
      }
    }
    this.cpColor = {
      kind: "hsv",
      h: color.h ?? 0,
      s: this.colorComponentBounds.s.apply(color.s),
      v: this.colorComponentBounds.v.apply(color.v),
    }
  }

  getColorComponent(colorComponent: ColorComponent): number {
    switch (colorComponent) {
      case "h":
        return this.hsvColor[colorComponent]
      case "s":
      case "v":
        return this.colorComponentBounds[colorComponent].apply(
          this.hsvColor[colorComponent],
        )
      case "r":
      case "g":
      case "b":
        return this.colorComponentBounds[colorComponent].apply(
          this.rgbColor[colorComponent],
        )
    }
  }

  format = (format: "rgb" | "hsl" | "hex"): string => {
    switch (format) {
      case "rgb":
        return formatRgb(this.hsvColor)
      case "hsl":
        return formatHsl(this.hsvColor)
      case "hex":
        return formatHex(this.hsvColor)
    }
  }

  get hsvColor() {
    return colorToHsv(this.cpColor)!
  }

  set hsvColor(value) {
    this.cpColor = { ...value, kind: "hsv" }
  }

  get rgbColor() {
    return convertHsvToRgb(this.hsvColor)
  }
}
