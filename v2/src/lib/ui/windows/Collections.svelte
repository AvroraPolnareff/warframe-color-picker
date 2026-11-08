<script lang="ts">
  import type { PaletteColorMode } from "#lib/types/palettes.ts"
  import ColorCell from "../common/ColorCell.svelte"
  import ScrollableList from "../common/ScrollableList.svelte"
  import {
    Collection,
    CollectionList,
  } from "../common/utils/CollectionList.svelte"
  import { Palette } from "../common/utils/Palette.svelte"
  import { ColorSelection } from "../common/utils/Selection.svelte"
  import Window from "../common/Window.svelte"

  interface CollectionsProps {
    collectionList: CollectionList,
    colorSelection: ColorSelection
  }
  let { collectionList, colorSelection }: CollectionsProps = $props()
  const paletteKindToShort: Record<PaletteColorMode, string> = {
    pet: "P",
    warframe: "W",
  }
</script>

{#snippet paletteItem(
  palette: Palette,
  paletteIndex: number,
  collectionIndex: number,
)}
  {let selected = paletteIndex === colorSelection.paletteIndex && collectionIndex === colorSelection.collectionIndex}
  <div
    role="option"
    onclick={() => {
      colorSelection.paletteIndex = paletteIndex
      colorSelection.collectionIndex = collectionIndex
    }}
    tabindex="0"
    class="palette"
    aria-selected={selected}
    onkeydown={() => {}}
    onkeyup={() => {}}
  >
    <div class="kind">
      <span>{paletteKindToShort[palette.paletteKind]}</span>
    </div>
    {#each palette.paletteColors as paletteColor, index (index)}
      <ColorCell color={paletteColor.color} />
      {#if paletteColor.secondaryColor}
        <ColorCell color={paletteColor.secondaryColor} />
      {/if}
    {/each}
  </div>
{/snippet}
{#snippet collectionItem(collection: Collection, collectionIndex: number)}
  <li>
    <h2 class="collection-name">{collection.name}</h2>
    {#each collection.palettes as palette, paletteIndex (palette.id)}
      {@render paletteItem(palette, paletteIndex, collectionIndex)}
    {/each}
  </li>
{/snippet}
<Window class="collections">
  <button onclick={() => collectionList.insertCollection({})}
    >add collection</button
  >
  <ScrollableList>
    {#snippet contents(attachment)}
      <!--> TODO do proper roles and stuff </-->
      <ul role="listbox" {@attach attachment}>
        {#each collectionList.collections as collection, index (collection.id)}
          {@render collectionItem(collection, index)}
        {/each}
      </ul>
    {/snippet}
  </ScrollableList>
</Window>
