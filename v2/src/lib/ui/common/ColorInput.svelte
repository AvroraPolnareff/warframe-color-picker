<script lang="ts">
  import { untrack } from "svelte"
  import palettes from "#lib/assets/palettes.json"
  import type { HighlightRanges, FuzzyResult } from "@nozbe/microfuzz"
  import {
    parseColorInput,
    resolveColorInput,
    formatPaletteInput,
    formatColorPickerColor,
    sameColorPickerColor,
  } from "#lib/util/color-input.ts"
  import type { PaletteColorMode } from "#lib/types/palettes.ts"
  import { Color } from "./utils/Color.svelte"
  import Autocomplete from "./Autocomplete.svelte"
  import Highlight from "./Highlight.svelte"
  import Window from "./Window.svelte"

  interface Props {
    color: Color
    onColorChange: (color: Color) => void
    kind: PaletteColorMode
    label?: string
  }
  type Suggestion = {
    name: string
    swatch?: string
    ranges: HighlightRanges | null
  }
  let { color, onColorChange, kind, label = "Color" }: Props = $props()
  let inputField = $state(untrack(() => formatColorPickerColor(color.value)))
  let help: HTMLDivElement
  let helper: HTMLButtonElement
  const id = $props.id()
  const parsed = $derived(parseColorInput(inputField))
  const valid = $derived(!inputField.trim() || parsed !== undefined)
  const paletteInput = $derived(parsed?.type === "palette" ? parsed : undefined)
  const items = $derived(
    kind === "warframe" ? palettes.warframes : palettes.pets,
  )
  const searchValue = $derived(
    kind === "warframe"
      ? (paletteInput?.palette ?? "")
      : kind === "pet" && parsed?.type === "pet"
        ? parsed.color
        : "",
  )
  const getText = (item: { name: string }) => [item.name]

  $effect(() => {
    const nextColor = color.value
    const text = formatColorPickerColor(nextColor)
    untrack(() => {
      const draft = parseColorInput(inputField)
      if (
        (nextColor.kind === "hsv" && draft?.type !== "hex") ||
        !sameColorPickerColor(nextColor, resolveColorInput(draft))
      ) {
        inputField = text
      }
    })
  })

  function mapResultItem(
    result: FuzzyResult<(typeof items)[number]>,
  ): Suggestion {
    const item = result.item
    return {
      name: item.name,
      swatch:
        "colors" in item
          ? item.colors[
              (paletteInput?.column ?? 0) + (paletteInput?.row ?? 0) * 5
            ]?.hex
          : item.colorCode,
      ranges: result.matches[0],
    }
  }
  function getItemValue(item: Suggestion) {
    return paletteInput
      ? formatPaletteInput(paletteInput, item.name)
      : item.name
  }
  function commit() {
    const nextColor = resolveColorInput(parseColorInput(inputField))
    if (nextColor && !sameColorPickerColor(color.value, nextColor)) {
      onColorChange(new Color(nextColor))
    }
  }
  function showHelp() {
    const rect = helper.getBoundingClientRect()
    help.showPopover()
    help.style.left = `${Math.max(4, Math.min(rect.left - 20, window.innerWidth - help.offsetWidth - 4))}px`
    help.style.top = `${
      rect.bottom + 4 + help.offsetHeight < window.innerHeight
        ? rect.bottom + 4
        : Math.max(4, rect.top - help.offsetHeight - 4)
    }px`
  }
</script>

<div
  class="color-input"
  onpointerdown={(event) => event.stopPropagation()}
  onmousedown={(event) => event.stopPropagation()}
  role="none"
>
  <button
    bind:this={helper}
    type="button"
    class="color-input-helper"
    class:error={!valid}
    aria-label={valid
      ? "Color input formats"
      : "Invalid color: show input formats"}
    aria-controls={`${id}-help`}
    popovertarget={`${id}-help`}
    onpointerenter={showHelp}
    onpointerleave={() => help.hidePopover()}
    onfocus={showHelp}
    onblur={() => help.hidePopover()}
    onclick={(event) => {
      event.preventDefault()
      showHelp()
    }}><span aria-hidden="true">{valid ? "?" : "!"}</span></button
  >
  <Autocomplete
    value={inputField}
    {searchValue}
    {items}
    {getText}
    {mapResultItem}
    {getItemValue}
    {valid}
    {label}
    onChange={(value) => {
      inputField = value
    }}
    onSelect={() => commit()}
    onBlur={() => commit()}
    onEnter={() => commit()}
  >
    {#snippet itemRender(item: Suggestion)}
      <span
        class="color-input-swatch"
        style:background-color={item.swatch}
        aria-hidden="true"
      ></span>
      <span><Highlight text={item.name} ranges={item.ranges} /></span>
    {/snippet}
  </Autocomplete>
</div>
<div
  bind:this={help}
  id={`${id}-help`}
  class="color-input-help"
  popover="auto"
  role="note"
>
  <Window width="255px" height="auto">
    <h3>Example formats:</h3>
    <ul>
      <li>Hex Code: <b>#412073</b></li>
      {#if kind === "warframe"}
        <li>Position: <b>D17 Hallow's Eve</b></li>
        <li>Position (alt.): <b>C4R17 Hallow's Eve</b></li>
      {:else if kind === "pet"}
        <li>Pet color: <b>Alchemy Black</b></li>
      {:else}
        <li>HSV: <b>HSV 270 50 80</b></li>
      {/if}
    </ul>
  </Window>
</div>
