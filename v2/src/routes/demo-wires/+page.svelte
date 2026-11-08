<script lang="ts">
  import Draggable from "#lib/ui/common/Draggable.svelte"
  import { BoundingRect } from "#lib/ui/common/utils/BoundingRect.svelte.ts"
  import Window from "#lib/ui/common/Window.svelte"
  import Line from "./Line.svelte"

  let leftRect = new BoundingRect()
  let rightRect = new BoundingRect()
  let fields = $derived(Object.entries(leftRect.rect))
</script>

<Draggable>
  {#each fields as [key, value] (key)}
    <li><code>{key}: {value}</code></li>
  {/each}
</Draggable>
<Line from={leftRect.element!} to={rightRect.element!} />
<Draggable bind:ref={leftRect.element}><Window /></Draggable>
<Draggable bind:ref={rightRect.element} left={300}><Window /></Draggable>
