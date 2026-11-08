import type { HTMLAttributes } from "svelte/elements"
import type ReinventedColorWheel from "reinvented-color-wheel"
import type { ReinventedColorWheelOptions } from "reinvented-color-wheel"
import type { ReinventedColorWheelElement } from "reinvented-color-wheel/webcomponents"

interface WheelAttriibutes extends Omit<
  HTMLAttributes<ReinventedColorWheelElement>,
  "onchange"
> {
  hex?: ReinventedColorWheel["hex"]
  hsv?: string
  hsl?: string
  rgb?: string
  "wheel-diameter"?: ReinventedColorWheelOptions["wheelDiameter"]
  "wheel-thickness"?: ReinventedColorWheelOptions["wheelThickness"]
  "handle-diameter"?: ReinventedColorWheelOptions["handleDiameter"]
  "wheel-reflects-saturation"?: "true" | "false"
  onchange?: (event: CustomEvent<ReinventedColorWheel>) => void
}

declare module "svelte/elements" {
  interface SvelteHTMLElements {
    "reinvented-color-wheel": WheelAttriibutes
  }
}
