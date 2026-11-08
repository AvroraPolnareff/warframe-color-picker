<script lang="ts">
  import type { PaletteColorPosition } from "#lib/types/palettes.ts"
  import type { WarframePalette, PaletteColor } from "#lib/types/palettes.ts"
  import palettes from "#lib/assets/palettes.json"
  import { chunk } from "lodash-es"

  interface WarframePaletteProps {
    size?: string
    paletteName: string
    selectedColor?: PaletteColorPosition
    onColorHover?: (colorPosition?: PaletteColorPosition) => void
    onColorSelect?: (selectedColor?: PaletteColor) => void
  }
  let {
    size,
    paletteName,
    selectedColor = $bindable(),
    onColorHover,
    onColorSelect,
  }: WarframePaletteProps = $props()

  const palette: WarframePalette = $derived.by(
    () =>
      palettes.warframes.filter((palette) => palette.name === paletteName)[0],
  )
  const paletteColorsByRows: PaletteColor[][] = $derived(
    chunk(palette.colors, 5),
  )
  const onClickHandler = (color: PaletteColor) => {
    onColorSelect?.(color)
    selectedColor = color.position
  }
  const onKeyDownHandler = (
    e: KeyboardEvent,
    { hex, position }: PaletteColor,
  ) => {
    const button = e.currentTarget as HTMLDivElement
    const grid = button.closest('[role="grid"]')
    const rows = grid?.querySelectorAll<HTMLDivElement>('[role="row"]')
    let nextPosition: PaletteColorPosition | undefined = undefined
    switch (e.key) {
      case "ArrowLeft":
        if (position.x > 0) nextPosition = { x: position.x - 1, y: position.y }
        break
      case "ArrowRight":
        if (position.x < paletteColorsByRows[position.y].length - 1)
          nextPosition = { x: position.x + 1, y: position.y }
        break
      case "ArrowUp":
        if (position.y > 0) nextPosition = { x: position.x, y: position.y - 1 }
        break
      case "ArrowDown":
        if (position.y < paletteColorsByRows.length - 1)
          nextPosition = { x: position.x, y: position.y + 1 }
        break
      case "Home":
        nextPosition = { x: 0, y: 0 }
        break
      case "End":
        nextPosition = {
          x: paletteColorsByRows[paletteColorsByRows.length - 1].length - 1,
          y: paletteColorsByRows.length - 1,
        }
        break
      case "Enter":
      case " ":
        e.preventDefault()
        onColorHover?.(position)
        onClickHandler({ hex, position })
        return
      default:
        return
    }
    e.preventDefault()
    if (nextPosition && rows) {
      const cell =
        rows[nextPosition.y]?.querySelectorAll<HTMLDivElement>(
          '[role="gridcell"]',
        )[nextPosition.x]
      if (cell) {
        cell.focus()
        onColorHover?.(nextPosition)
      }
    }
  }
</script>

<section
  class="warframe-palette"
  style:--warframe-palette-size={size}
  role="grid"
  tabindex={-1}
  onmouseleave={() => onColorHover?.()}
>
  {#each paletteColorsByRows as colorRow, i (i)}
    <div role="row" class="palette-row">
      {#each colorRow as color (color.hex)}
        {let selected =
          color.position.x === selectedColor?.x &&
          color.position.y === selectedColor?.y}
        <div
          class="palette-cell"
          style:background-color={color.hex}
          style:--palette-cell-size={size}
          role="gridcell"
          aria-selected={color.position.x === selectedColor?.x &&
            color.position.y === selectedColor?.y}
          onkeydown={(e) => onKeyDownHandler(e, color)}
          onmouseenter={() => onColorHover?.(color.position)}
          onclick={() => onClickHandler(color)}
          tabindex={selected ||
          (!selectedColor && i === 0 && color.position.x === 0)
            ? 0
            : -1}
        ></div>
      {/each}
    </div>
  {/each}
</section>
