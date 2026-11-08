import { untrack } from "svelte"

export class BoundingRect {
  element: HTMLElement | undefined = $state()

  rect = $state({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    width: 0,
    top: 0,
    x: 0,
    y: 0,
  })

  private frame?: number

  constructor(element?: () => HTMLElement) {
    $effect(() => {
      if (element && !this.element) this.element = element()
      const update = () => {
        if (this.element) {
          const next = this.element.getBoundingClientRect()
          untrack(() => {
            for (const key of Object.keys(
              this.rect,
            ) as (keyof typeof this.rect)[]) {
              if (this.rect[key] !== next[key]) {
                this.rect[key] = next[key]
              }
            }
          })
          this.frame = requestAnimationFrame(update)
        }
      }
      update()
      return () => this.frame && cancelAnimationFrame(this.frame)
    })
  }
}
