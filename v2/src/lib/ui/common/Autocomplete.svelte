<script lang="ts" generics="Item, MappedItem">
  import { untrack, type Snippet } from "svelte"
  import microfuzz, { type FuzzyResult } from "@nozbe/microfuzz"

  // CommonJS exposes a nested default in dev/Node, but a function in the build.
  const createFuzzySearch =
    typeof microfuzz === "function"
      ? microfuzz
      : (microfuzz as unknown as { default: typeof microfuzz }).default

  interface Props {
    value: string
    searchValue: string
    items: Item[]
    getText: (item: Item) => string[]
    mapResultItem: (result: FuzzyResult<Item>) => MappedItem
    getItemValue: (item: MappedItem) => string
    itemRender: Snippet<[MappedItem]>
    onChange: (value: string) => void
    onSelect: (item: MappedItem) => void
    onEnter?: () => void
    onFocus?: () => void
    onBlur?: () => void
    label?: string
    valid?: boolean
    limit?: number
  }
  let {
    value,
    searchValue,
    items,
    getText,
    mapResultItem,
    getItemValue,
    itemRender,
    onChange,
    onSelect,
    onEnter,
    onFocus,
    onBlur,
    label = "Color",
    valid = true,
    limit = 5,
  }: Props = $props()
  const id = $props.id()
  let input: HTMLInputElement
  let popup: HTMLUListElement
  let focused = $state(false)
  let dismissed = $state(false)
  let activeIndex = $state(-1)
  let placement = $state({ left: 0, top: 0, minWidth: 0, maxHeight: 240 })
  const search = $derived(createFuzzySearch(items, { getText }))
  const results = $derived(
    searchValue.trim()
      ? search(searchValue).slice(0, limit).map(mapResultItem)
      : [],
  )
  const open = $derived(focused && !dismissed && results.length > 0)

  function positionPopup() {
    if (!input || !popup) return
    const rect = input.getBoundingClientRect()
    const below = window.innerHeight - rect.bottom - 8
    const above = rect.top - 8
    const flip = below < Math.min(popup.scrollHeight, 240) && above > below
    const next = {
      left: Math.max(
        4,
        Math.min(rect.left, window.innerWidth - popup.offsetWidth - 4),
      ),
      top: flip
        ? Math.max(4, rect.top - Math.min(popup.scrollHeight, above, 240) - 2)
        : rect.bottom + 2,
      minWidth: rect.width,
      maxHeight: Math.max(40, Math.min(flip ? above : below, 240)),
    }
    if (
      next.left !== placement.left ||
      next.top !== placement.top ||
      next.minWidth !== placement.minWidth ||
      next.maxHeight !== placement.maxHeight
    )
      placement = next
  }

  $effect(() => {
    void results
    activeIndex = -1
  })
  $effect(() => {
    if (!popup) return
    if (open) {
      popup.showPopover()
      untrack(positionPopup)
      let frame: number
      const update = () => {
        positionPopup()
        frame = requestAnimationFrame(update)
      }
      frame = requestAnimationFrame(update)
      return () => {
        cancelAnimationFrame(frame)
        popup.hidePopover()
      }
    }
    popup.hidePopover()
  })
  $effect(() => {
    if (activeIndex >= 0)
      popup?.children[activeIndex]?.scrollIntoView({ block: "nearest" })
  })

  function select(item: MappedItem) {
    dismissed = true
    onChange(getItemValue(item))
    onSelect(item)
    activeIndex = -1
  }
  function keydown(event: KeyboardEvent) {
    if (event.isComposing) return
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (!results.length) return
      event.preventDefault()
      dismissed = false
      activeIndex =
        event.key === "ArrowDown"
          ? (activeIndex + 1) % results.length
          : activeIndex <= 0
            ? results.length - 1
            : activeIndex - 1
    } else if (event.key === "Enter") {
      event.preventDefault()
      if (open && activeIndex >= 0) select(results[activeIndex])
      else {
        dismissed = true
        onEnter?.()
      }
    } else if (event.key === "Escape") {
      if (open) event.preventDefault()
      dismissed = true
      activeIndex = -1
    }
  }
</script>

<input
  bind:this={input}
  class="autocomplete-input"
  type="text"
  spellcheck="false"
  autocomplete="off"
  {value}
  role="combobox"
  aria-label={label}
  aria-autocomplete="list"
  aria-expanded={open}
  aria-controls={`${id}-results`}
  aria-invalid={!valid}
  aria-activedescendant={open && activeIndex >= 0
    ? `${id}-option-${activeIndex}`
    : undefined}
  oninput={(event) => {
    dismissed = false
    activeIndex = -1
    onChange(event.currentTarget.value)
  }}
  onkeydown={keydown}
  onfocus={() => {
    focused = true
    dismissed = false
    onFocus?.()
  }}
  onblur={() => {
    focused = false
    activeIndex = -1
    onBlur?.()
  }}
/>
<ul
  bind:this={popup}
  id={`${id}-results`}
  popover="manual"
  class="autocomplete-results"
  role="listbox"
  aria-label={`${label} suggestions`}
  style:left={`${placement.left}px`}
  style:top={`${placement.top}px`}
  style:min-width={`${placement.minWidth}px`}
  style:max-height={`${placement.maxHeight}px`}
>
  {#each results as item, index (getItemValue(item))}
    <li
      id={`${id}-option-${index}`}
      role="option"
      aria-selected={activeIndex === index}
      onpointerdown={(event) => event.preventDefault()}
      onpointermove={() => {
        activeIndex = index
      }}
      onclick={() => select(item)}
      onkeydown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          select(item)
        }
      }}
    >
      {@render itemRender(item)}
    </li>
  {/each}
</ul>
