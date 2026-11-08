<script lang="ts">
  import { Color } from "./utils/Color.svelte"
  import { formatHsl, type Color as CuloriColor } from "culori"
  interface ColorCellProps {
    color: Color | CuloriColor
    selected?: boolean
    onClick?: (e: MouseEvent) => void
    label?: string
  }
  let { color, selected, onClick, label }: ColorCellProps = $props()
  const formattedColor = $derived.by(() => {
    if (color instanceof Color) {
      return color.format("hsl")
    }
    return formatHsl(color)
  })
</script>

<button
  aria-label={label}
  style:--color={formattedColor}
  class={["color-cell", { selected }]}
  tabindex={selected === undefined ? -1 : 0}
  onclick={onClick}
></button>
