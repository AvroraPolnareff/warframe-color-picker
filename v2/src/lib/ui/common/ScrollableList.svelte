<script lang="ts">
  import { Svrollbar } from "svrollbar"
  import type { Snippet } from "svelte"
  import type { Attachment } from "svelte/attachments"

  interface ScrollableListProps {
    contents: Snippet<[Attachment<Element>]>
  }

  let { contents }: ScrollableListProps = $props()
  let viewport: Element | undefined = $state()
  let contentsElement: Element | undefined = $state()
  let scrollProgress = $state(0)

  export const getViewport = () => {
    return viewport
  }

  const handleScroll = (e: Event) => {
    const el = e.currentTarget as HTMLElement
    const maxScroll = el.scrollHeight - el.clientHeight
    scrollProgress = maxScroll > 0 ? el.scrollTop / maxScroll : 0
  }

  const attachContents: Attachment<Element> = (node) => {
    node.classList.add("contents")
    contentsElement = node
    return () => {
      if (contentsElement === node) contentsElement = undefined
    }
  }
</script>

<div class="scroll-list" style:--scroll-progress={scrollProgress}>
  <div bind:this={viewport} class="viewport" onscroll={handleScroll}>
    {@render contents(attachContents)}
  </div>
  <Svrollbar {viewport} contents={contentsElement} initiallyVisible />
</div>

<style lang="scss">
  :global(:where(.scroll-list)) {
    position: relative;
    width: var(--viewport-width);
  }
  :global(:where(.scroll-list > .viewport)) {
    position: relative;
    width: var(--viewport-width);
    height: var(--viewport-height);
    overflow: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    &:first-child {
      position: relative;
    }
  }
</style>
