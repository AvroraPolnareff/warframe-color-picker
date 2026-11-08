<script lang="ts">
  import { setLocale } from "#lib/paraglide/runtime.js"
  import { m } from "#lib/paraglide/messages.js"
</script>

<h1>{m.menu_color_picker()}</h1>
<p>{m.palettes_modal_description()}</p>

<div>
  <button onclick={() => setLocale("en")}>en</button>
  <button onclick={() => setLocale("ru")}>ru</button>
  <button onclick={() => setLocale("zh-cn")}>zh-cn</button>
</div>

<p>
  If you use VSCode, install the

  <a
    href="https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension"
    target="_blank">Sherlock i18n extension</a
  >

  for a better i18n experience.
</p>
