<script lang="ts">
  import { page } from "$app/stores";
  export let href: string;
  export let text: string;

  $: active = $page.url.pathname.split("/").slice(0, 2).join("/") === href;
</script>

<a class={"p-1 " + (active ? "active" : "")} {href}> {text} </a>

<style>
  a {
    @apply text-sm p-1;
  }

  .active {
    @apply bg-base-200;
  }

  a:hover {
    @apply bg-base-100;
  }
</style>
