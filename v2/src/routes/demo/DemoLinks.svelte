<script lang="ts">
  import { resolve } from "$app/paths"
  import { localizeHref } from "#lib/paraglide/runtime.js"

  const demos = [{ name: "paraglide", href: resolve("/demo/paraglide") }]
</script>

<!--
	@component
	Lists the add-on demos in `/demo/<add-on>`. Added by `sv add`.

	To remove: delete `<DemoLinks />` and its import, then `demo/DemoLinks.svelte`.
-->

<div class="sv-demo-links">
  <p>sv addon demos</p>

  <ul>
    {#each demos as demo (demo.href)}
      <li><a href={localizeHref(demo.href)}>{demo.name}</a></li>
    {/each}
  </ul>

  <a class="home" href={localizeHref(resolve("/"))}>home</a>
</div>

<style>
  .sv-demo-links {
    position: fixed;
    right: 27.5px;
    bottom: 27.5px;
    z-index: 9999;
    min-width: 242px;
    max-width: 352px;
    padding: 22px 24.75px 19.25px;
    background: linear-gradient(to bottom, #fff9b0, #fff176);
    color: #3d3500;
    font:
      14px/1.5 system-ui,
      sans-serif;
    text-align: left;
    box-shadow:
      0 1px 2px rgb(0 0 0 / 0.15),
      0 10px 24px -6px rgb(0 0 0 / 0.35);
    transform: rotate(-1.5deg);
  }

  p {
    margin: 0;
    font-weight: 700;
    letter-spacing: 0.28px;
  }

  ul {
    margin: 11px 0 0;
    padding: 0;
    list-style: none;
  }

  li {
    padding: 2.75px 0;
  }

  a {
    color: #1a4fd6;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  a:visited {
    color: #6b6420;
  }

  a:hover {
    color: #0b2f8a;
  }

  .home {
    display: block;
    margin-top: 11px;
    padding-top: 8.25px;
    border-top: 1px dashed rgb(61 53 0 / 0.3);
    text-align: right;
    font-size: 12px;
  }

  .home,
  .home:visited {
    color: #6b6420;
  }
</style>
