<script lang="ts">
    import SidebarLink from "./SidebarLink.svelte";

    export let menuOpen: boolean;

    const sidebarLinks = [
        { text: "home", href: "/" },
        { text: "about", href: "/about" },
        { text: "projects", href: "/projects" }
    ];
</script>

<div class="drawer drawer-mobile w-full">
    <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" bind:checked={menuOpen} />
    <div class="drawer-content flex flex-col bg-base-100">
        <slot />
    </div>
    <div class="drawer-side">
        <label for="sidebar-drawer" class="drawer-overlay" />
        <ul
            class={"menu w-24 bg-base-300 text-base-content border-r border-r-neutral-900" +
                (menuOpen ? "" : " hidden")}
        >
            {#each sidebarLinks as { href, text }}
                <SidebarLink {href} {text} />
            {/each}
        </ul>
    </div>
</div>
