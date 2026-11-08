<script lang="ts">
  import { onMount } from "svelte"
  import ColorInput from "#lib/ui/common/ColorInput.svelte"
  import { Color } from "#lib/ui/common/utils/Color.svelte.ts"
  let ready = $state(false)
  onMount(() => {
    ready = true
  })
  let paletteColor = $state(
    new Color({
      kind: "warframe",
      palette: "Hallow's Eve",
      position: { x: 3, y: 16 },
    }),
  )
  let petColor = $state(
    new Color({
      kind: "pet",
      name: "Alchemy Black",
    }),
  )
  let hsvColor = $state(new Color({ kind: "hsv", h: 270, s: 50, v: 80 }))
</script>

<svelte:head><title>Color input</title></svelte:head>

<main data-ready={ready}>
  <h1>Color input</h1>
  <section aria-label="Palette color">
    <h2>Palette</h2>
    <ColorInput
      color={paletteColor}
      onColorChange={(color) => (paletteColor = color)}
      kind="warframe"
      label="Palette color"
    />
    <output aria-label="Selected palette color"
      >{JSON.stringify(paletteColor.value)}</output
    >
    <button
      type="button"
      onclick={() => {
        paletteColor.value = {
          kind: "warframe",
          palette: "Classic",
          position: { x: 0, y: 0 },
        }
      }}>Set Classic A1</button
    >
  </section>
  <section aria-label="Pet color">
    <h2>Pet</h2>
    <ColorInput
      color={petColor}
      onColorChange={(color) => (petColor = color)}
      kind="pet"
      label="Pet color"
    />
    <output aria-label="Selected pet color"
      >{JSON.stringify(petColor.value)}</output
    >
  </section>
  <section aria-label="HSV color">
    <h2>HSV</h2>
    <ColorInput
      color={hsvColor}
      onColorChange={(color) => (hsvColor = color)}
      kind="warframe"
      label="HSV color"
    />
    <output aria-label="Selected HSV color"
      >{JSON.stringify(hsvColor.value)}</output
    >
    <button
      type="button"
      onclick={() => {
        hsvColor.value = { kind: "hsv", h: 120, s: 100, v: 100 }
      }}>Set HSV green</button
    >
    <button
      type="button"
      onclick={() => {
        if (hsvColor.value.kind === "hsv") {
          hsvColor.value.h = 240
          hsvColor.value.s = 100
          hsvColor.value.v = 100
        }
      }}>Set HSV blue</button
    >
  </section>
</main>

<style>
  main {
    padding: 44px;
  }
  section {
    margin: 33px;
  }
  output {
    display: block;
    margin: 11px 0;
    overflow-wrap: anywhere;
    font-size: 0.7rem;
  }
</style>
