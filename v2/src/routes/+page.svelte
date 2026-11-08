<script lang="ts">
  import Draggable from "#lib/ui/common/Draggable.svelte"
  import { m } from "#lib/paraglide/messages.js"
  import ColorPicker from "../lib/ui/windows/ColorPicker.svelte"
  import TargeteScheme from "#lib/ui/windows/TargeteScheme.svelte"
  import SelectedColorWarframe from "#lib/ui/windows/SelectedColorWarframe.svelte"
  import Suggestions from "#lib/ui/windows/Suggestions.svelte"
  import {
    SuggestionList,
    type SuggestionEntry,
  } from "#lib/ui/common/utils/SuggestionList.svelte.ts"
  import { debounce } from "lodash-es"
  import Collections from "#lib/ui/windows/Collections.svelte"
  import { ColorSelection } from "#lib/ui/common/utils/Selection.svelte.ts"
  import { CollectionList } from "#lib/ui/common/utils/CollectionList.svelte.ts"

  const collectionList = new CollectionList({ initCollection: true })
  const colorSelection = new ColorSelection(collectionList)

  const debounced = debounce((fn: () => void) => fn(), 150, {
    trailing: true,
    leading: false,
  })
  let suggestions = new SuggestionList()
  let selectedSuggestion: SuggestionEntry | undefined = $state()
  let position = $derived(
    selectedSuggestion?.location.kind === "warframe"
      ? selectedSuggestion?.location.position
      : { x: 0, y: 0 },
  )
</script>

<svelte:head>
  <title>{m.menu_color_picker()}</title>
</svelte:head>

<Draggable left={300} top={200}>
  <TargeteScheme
    palette={colorSelection.palette}
    bind:selected={colorSelection.colorIndex}
    onColorChange={(color) => {
      suggestions.findSimilar(color.hsvColor, colorSelection.paletteColor.mode)
      selectedSuggestion = suggestions.suggestions[0]
    }}
  />
</Draggable>
<Draggable left={700} top={100}>
  <ColorPicker
    mode={colorSelection.paletteColor.mode}
    color={colorSelection.color}
    onColorChange={(color) => {
      const paletteColor = colorSelection.paletteColor
      if (colorSelection.colorIndex.secondary) {
        paletteColor.secondaryColor = color
      } else {
        paletteColor.color = color
      }
      debounced(() =>
        suggestions.findSimilar(color.hsvColor, paletteColor.mode),
      )
    }}
  />
</Draggable>
<Draggable>
  <Suggestions suggestions={suggestions.suggestions} bind:selectedSuggestion />
</Draggable>
<Draggable>
  <Collections {collectionList} {colorSelection} />
</Draggable>
<Draggable left={700} top={100}>
  <SelectedColorWarframe
    paletteName={selectedSuggestion?.location.name ?? "Classic"}
    selectedColor={position}
  />
</Draggable>
<p class="credentials">
  Have questions? Head to our <a href="https://discord.gg/ZyHZES6BCY">Discord</a
  >!<br />last upd.: 2026-06-20 | Updated palettes selection screen!
</p>
