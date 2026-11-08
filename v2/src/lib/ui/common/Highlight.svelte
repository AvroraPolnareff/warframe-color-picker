<script lang="ts">
  import type { HighlightRanges } from "@nozbe/microfuzz"
  let { text, ranges = [] }: { text: string; ranges?: HighlightRanges | null } =
    $props()
  const parts = $derived.by(() => {
    const parts: { text: string; matched: boolean }[] = []
    let cursor = 0
    for (const [start, end] of ranges ?? []) {
      if (start > cursor)
        parts.push({ text: text.slice(cursor, start), matched: false })
      parts.push({ text: text.slice(start, end + 1), matched: true })
      cursor = end + 1
    }
    if (cursor < text.length)
      parts.push({ text: text.slice(cursor), matched: false })
    return parts
  })
</script>

{#each parts as part, i (i)}
  {#if part.matched}<strong>{part.text}</strong>{:else}{part.text}{/if}
{/each}
