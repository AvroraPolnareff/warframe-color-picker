<script lang="ts">
  import { onMount } from "svelte"
  import type { ClassValue } from "svelte/elements"
  import type { ReinventedColorWheelElement } from "reinvented-color-wheel/webcomponents"
  import { Color } from "./utils/Color.svelte"

  interface ColorWheelProps {
    color: Color
    onColorChange: (color: Color) => void
    class?: ClassValue
    wheelDiameter?: number
    wheelThickness?: number
    handleDiameter?: number
    wheelReflectsSaturation?: boolean
  }

  let {
    color,
    onColorChange,
    class: className,
    wheelDiameter = 200,
    wheelThickness = 20,
    handleDiameter = 16,
    wheelReflectsSaturation = true,
  }: ColorWheelProps = $props()

  let ready = $state(false)
  let wheel = $state<ReinventedColorWheelElement>()
  let syncingWheel = false

  $effect(() => {
    const hex = color.format("hex")
    if (!wheel) return

    syncingWheel = true
    try {
      wheel.setAttribute("hex", hex)
    } finally {
      syncingWheel = false
    }
  })

  onMount(() => {
    void import("reinvented-color-wheel/webcomponents").then(() => {
      ready = true
    })
  })
</script>

<!-- TODO add ssr support (just prerender an image and display it instead) -->
{#if ready}
  <reinvented-color-wheel
    bind:this={wheel}
    class={className}
    wheel-diameter={wheelDiameter}
    wheel-thickness={wheelThickness}
    handle-diameter={handleDiameter}
    wheel-reflects-saturation={wheelReflectsSaturation ? "true" : "false"}
    onchange={(event) => {
      if (syncingWheel) return
      const [h, s, v] = event.detail.hsv
      const nextColor = new Color(color.value)
      nextColor.hsvColor = { mode: "hsv" as const, h, s, v }
      onColorChange(nextColor)
    }}
  ></reinvented-color-wheel>
{/if}
