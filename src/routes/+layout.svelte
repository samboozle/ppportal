<script lang="ts">
    import "../app.css";
    import { Footer, SidebarPage } from "$lib";
    import { sillyText } from "$lib/stores";

    $: menuOpen = false;
</script>

<main>
    <div class="flex flex-row h-screen">
        <SidebarPage {menuOpen}>
            <div class="flex flex-col">
                <div class="os-bar">
                    <label for="sidebar-drawer" class="os-button">{$sillyText("menu")}</label>
                    <button class="os-button" on:click={sillyText.randomize}>
                        {$sillyText("bored?")}
                    </button>
                </div>
                <div class="main-content">
                    <slot />
                </div>
            </div>
        </SidebarPage>
    </div>

    <Footer />
</main>

<style>
    .os-bar {
        @apply bg-base-200 w-full flex flex-row border-b border-b-neutral-900;
    }

    .os-button {
        @apply btn btn-ghost rounded-none text-sm normal-case font-normal w-16;
    }

    .main-content {
        @apply p-2;
    }
</style>
