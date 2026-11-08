<script lang="ts">
  import type { Snippet } from "svelte"
  import {
    Spring,
    type SpringOptions,
    Tween,
    type TweenOptions,
  } from "svelte/motion"

  export type DraggableProps = {
    ref?: HTMLElement
    left?: number
    top?: number
    children?: Snippet
  }

  let {
    left = $bindable(0),
    top = $bindable(0),
    ref = $bindable(),
    children,
  }: DraggableProps = $props()
  let moving = $state(false)

  const springOptions: SpringOptions = {
    // stiffness: 0.1,
    // damping: 0.1,
    stiffness: 1,
    damping: 1,
  }
  const tweenOptions: TweenOptions<number> = {
    // delay: 0.5,
    // duration: 0.4,
    delay: 1,
    duration: 1,
  }

  let leftSpring = Spring.of(() => left, springOptions)
  let topSpring = Spring.of(() => top, springOptions)

  const leftTween = Tween.of(
    () => 1 + (leftSpring.target - leftSpring.current) * 0.01,
    tweenOptions,
  )
  const topTween = Tween.of(
    () => 1 + (topSpring.target - topSpring.current) * 0.01,
    tweenOptions,
  )

  let transform = $derived(`transform: scale(
    ${leftTween.current},
    ${topTween.current}
  );`)

  function onMouseDown() {
    moving = true
  }

  function onMouseMove(e: MouseEvent) {
    if (moving) {
      left += e.movementX
      top += e.movementY
    }
  }

  function onMouseUp() {
    moving = false
  }
</script>

<div
  bind:this={ref}
  onmousedown={onMouseDown}
  style="
    left: {leftSpring.current}px;
    top: {topSpring.current}px;
    {transform}
    "
  class="draggable"
  role="none"
>
  {@render children?.()}
</div>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
  .draggable {
    user-select: none;
    cursor: move;
    position: absolute;
  }
</style>
