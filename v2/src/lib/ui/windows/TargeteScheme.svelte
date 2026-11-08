<script lang="ts">
  import ColorCell from "../common/ColorCell.svelte"
  import Divider from "../common/Divider.svelte"
  import type { Color } from "../common/utils/Color.svelte"
  import type { Palette } from "../common/utils/Palette.svelte"
  import Window from "../common/Window.svelte"

  interface TargetSchemeProps {
    palette: Palette
    selected: { index: number; secondary: boolean }
    onColorChange: (color: Color) => void
  }

  let {
    palette,
    selected = $bindable(),
    onColorChange,
  }: TargetSchemeProps = $props()

  const onCellClick = (index: number, secondary: boolean) => {
    if (selected.index !== index || selected.secondary !== secondary) {
      selected.index = index
      selected.secondary = secondary
      const paletteColor = palette.paletteColors[index]
      onColorChange(
        secondary ? paletteColor.secondaryColor! : paletteColor.color,
      )
    }
  }
</script>

<Window class="target-scheme">
  <!-- <h2>{palette}</h2> -->
  <Divider />
  {#each palette.paletteColors as paletteColor, index (paletteColor.name)}
    <div class="color-entry">
      <ColorCell
        label={`${paletteColor.name}`}
        color={paletteColor.color}
        selected={selected.index === index && !selected.secondary}
        onClick={(e) => {
          e.preventDefault()
          onCellClick(index, false)
        }}
      />
      {#if paletteColor.secondaryColor}
        <ColorCell
          label={`${paletteColor.name} 2`}
          color={paletteColor.secondaryColor}
          selected={selected.index === index && selected.secondary}
          onClick={(e) => {
            e.preventDefault()
            onCellClick(index, true)
          }}
        />
      {/if}
      <span>{paletteColor.name}{paletteColor.secondaryColor && ` 1, 2`}</span>
    </div>
  {/each}
</Window>
