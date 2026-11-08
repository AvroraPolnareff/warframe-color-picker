<script lang="ts">
  import type { ChangeEventHandler } from "svelte/elements"
  import { Color, type ColorComponent } from "./utils/Color.svelte"

  // prettier-ignore
  export type ColorPartName =
      | "red" | "green" | "blue"
      | "hue" | "saturation" | "brightness"

  type ColorPartInputProps = {
    name: ColorPartName
    color: Color
    onColorChange: (color: Color) => void
  }

  const nameToColorComponentMap: Record<ColorPartName, ColorComponent> = {
    red: "r",
    green: "g",
    blue: "b",
    hue: "h",
    saturation: "s",
    brightness: "v",
  }

  const fields: Record<ColorPartName, string> = {
    red: "R",
    green: "G",
    blue: "B",
    hue: "H",
    saturation: "S",
    brightness: "V",
  }

  const uid = $props.id()
  let { name, color, onColorChange }: ColorPartInputProps = $props()

  const changeColorComponent = (value: number) => {
    const nextColor = new Color(color.value)
    nextColor.setColorComponent(nameToColorComponentMap[name], value)
    if (nextColor.value !== color.value) onColorChange(nextColor)
  }

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = Number(e.currentTarget.value)
    if (isNaN(value)) return
    changeColorComponent(value)
  }

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      changeColorComponent(
        color.getColorComponent(nameToColorComponentMap[name]) -
          (e.shiftKey ? 5 : 1),
      )
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      changeColorComponent(
        color.getColorComponent(nameToColorComponentMap[name]) +
          (e.shiftKey ? 5 : 1),
      )
    }
  }
</script>

<div class="color-part-input">
  <label for={`${uid}-${name}`}>{fields[name]}</label>
  <input
    {name}
    style:--background-color=""
    id={`${uid}-${name}`}
    value={Math.round(color.getColorComponent(nameToColorComponentMap[name]))}
    onchange={inputChangeHandler}
    onkeydown={keyDownHandler}
  />
</div>
