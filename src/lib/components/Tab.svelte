<script lang="ts">
  import { page } from "$app/stores";

  export let href: string;

  $: tabClass = "tab tab-lifted" + (href === $page.url.pathname ? " tab-active" : "");
</script>

<a class={tabClass} {href}>
  <slot />
</a>
