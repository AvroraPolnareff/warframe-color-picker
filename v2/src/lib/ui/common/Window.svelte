<script lang="ts">
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  interface WindowProps {
    class?: ClassValue
    width?: string
    height?: string
    children?: Snippet
  }
  let {
    class: className,
    width = "init",
    height = "init",
    children,
  }: WindowProps = $props()
</script>

<section
  class={["window", className]}
  style:--window-width={width}
  style:--window-height={height}
>
  <div class="content">{@render children?.()}</div>
</section>
