<script lang="ts">
  import Window from "../common/Window.svelte"
  import ColorInput from "../common/ColorInput.svelte"
  import ColorWheel from "../common/ColorWheel.svelte"
  import ColorPartInput from "../common/ColorPartInput.svelte"
  import type { PaletteColorMode } from "#lib/types/palettes.ts"
  import Divider from "../common/Divider.svelte"
  import type { Color } from "../common/utils/Color.svelte"

  interface ColorPickerProps {
    color: Color
    mode: PaletteColorMode
    onColorChange: (color: Color) => void
  }
  let { mode, color, onColorChange }: ColorPickerProps = $props()
</script>

<Window class="color-picker">
  <ColorWheel
    {color}
    {onColorChange}
    class="color-wheel"
    wheelDiameter={160}
    wheelThickness={15}
    wheelReflectsSaturation={false}
  />
  <div class="color-picker-input">
    <ColorInput {color} {onColorChange} kind={mode} />
  </div>
  <Divider />

  <ColorPartInput name="red" {color} {onColorChange} />
  <ColorPartInput name="green" {color} {onColorChange} />
  <ColorPartInput name="blue" {color} {onColorChange} />
  <ColorPartInput name="hue" {color} {onColorChange} />
  <ColorPartInput name="saturation" {color} {onColorChange} />
  <ColorPartInput name="brightness" {color} {onColorChange} />
</Window>
