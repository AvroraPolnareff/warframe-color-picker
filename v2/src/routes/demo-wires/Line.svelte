<script lang="ts">
  import { BoundingRect } from "#lib/ui/common/utils/BoundingRect.svelte.ts"

  interface LineProps {
    from: HTMLElement
    to: HTMLElement
  }
  let { from, to }: LineProps = $props()
  let fromRect = new BoundingRect(() => from)
  let toRect = new BoundingRect(() => to)

  type Rect = {
    x: number
    y: number
    width: number
    height: number
  }

  type Point = {
    x: number
    y: number
  }

  function getIntersection(from: Rect, to: Rect): Point {
    const cx = from.x + from.width / 2
    const cy = from.y + from.height / 2

    const tx = to.x + to.width / 2
    const ty = to.y + to.height / 2

    const dx = tx - cx
    const dy = ty - cy

    const halfWidth = from.width / 2
    const halfHeight = from.height / 2

    if (!halfWidth || !halfHeight || (!dx && !dy)) {
      return { x: cx, y: cy }
    }

    const scale =
      1 / Math.max(Math.abs(dx) / halfWidth, Math.abs(dy) / halfHeight)

    return {
      x: cx + dx * scale,
      y: cy + dy * scale,
    }
  }
  let line = $derived({
    from: getIntersection(fromRect.rect, toRect.rect),
    to: getIntersection(toRect.rect, fromRect.rect),
  })
  function getBezierPath(from: Point, to: Point) {
    const dx = to.x - from.x

    const offset = Math.abs(dx) * 0.5

    return `
      M ${from.x} ${from.y}
      C ${from.x + offset} ${from.y},
        ${to.x - offset} ${to.y},
        ${to.x} ${to.y}
    `
  }
</script>

<svg class="line">
  <path
    d={getBezierPath(line.from, line.to)}
    stroke="red"
    stroke-width="2"
    fill="none"
  />
  <line
    stroke="red"
    x1={line.from.x}
    y1={line.from.y}
    x2={line.to.x}
    y2={line.to.y}
  />
</svg>

<style>
  .line {
    position: fixed;
    width: 100%;
    height: 100%;
    /*background: black;*/
  }
</style>
