<script lang="ts">
  import ColorCell from "../common/ColorCell.svelte"
  import {
    isLocationEqual,
    locationKey,
    type SuggestionEntry,
  } from "../common/utils/SuggestionList.svelte"
  import Window from "../common/Window.svelte"
  import ScrollableList from "../common/ScrollableList.svelte"

  interface SuggestionsProps {
    suggestions: SuggestionEntry[]
    selectedSuggestion?: SuggestionEntry
  }

  let { suggestions, selectedSuggestion = $bindable() }: SuggestionsProps =
    $props()
</script>

<Window class="suggestions">
  <ScrollableList>
    {#snippet contents(attachContents)}
      <ul role="listbox" {@attach attachContents}>
        {#each suggestions as suggestion (locationKey(suggestion.location))}
          <li
            role="option"
            aria-selected={selectedSuggestion &&
              isLocationEqual(selectedSuggestion.location, suggestion.location)}
          >
            <ColorCell color={suggestion.color} />
            <span class="name">{suggestion.location.name}</span>
            <span class="score">{(suggestion.score * 10).toFixed(2)}</span>
          </li>
        {/each}
      </ul>
    {/snippet}
  </ScrollableList>
</Window>
