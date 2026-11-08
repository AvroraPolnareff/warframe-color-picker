<script lang="ts">
  import type { PaletteColorPosition } from "#lib/types/palettes.ts"
  import WarframePalette from "../common/WarframePalette.svelte"
  import Window from "../common/Window.svelte"

  interface SelectedColorProps {
    paletteName: string
    selectedColor: PaletteColorPosition
  }

  let hoverPosition: PaletteColorPosition | undefined = $state()

  let { paletteName, selectedColor = $bindable() }: SelectedColorProps =
    $props()
</script>

<Window class="selected-color">
  <div class="palette-name">
    {hoverPosition
      ? `X: ${hoverPosition.x}, Y: ${hoverPosition.y}`
      : paletteName}
  </div>
  <WarframePalette
    {paletteName}
    bind:selectedColor
    size="35px"
    onColorHover={(position) => (hoverPosition = position)}
  />
</Window>
