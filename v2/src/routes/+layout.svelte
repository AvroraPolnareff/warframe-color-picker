<script lang="ts">
  import DemoLinks from "./demo/DemoLinks.svelte"
  import type { Path } from "$app/types"
  import { resolve } from "$app/paths"
  import { page } from "$app/state"
  import { locales, localizeHref } from "#lib/paraglide/runtime.js"
  import "./layout.css"
  import "#lib/assets/fonts/stylesheet.css"
  import favicon from "#lib/assets/favicon.svg"
  import type { LayoutProps } from "./$types"

  let { children }: LayoutProps = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<div style="display:none">
  {#each locales as locale (locale)}
    <a
      href={resolve(localizeHref(page.url.pathname, { locale }) as Path)}
      data-sveltekit-reload>{locale}</a
    >
  {/each}
</div>

<DemoLinks />
