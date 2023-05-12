<script lang="ts">
    import "../app.css";
    import { Footer, SidebarPage } from "$lib";
    import { io } from "socket.io-client";
    import { page } from "$app/stores";

    const socket = io();

    socket.on("handshake", (message) => {
        console.log(message);
    });

    socket.on("heardChange", (message) => {
        console.log(message);
    });

    $: {
        socket.emit("routeChange", $page.url.pathname);
    }

    $: menuOpen = false;
</script>

<main>
    <div class="flex flex-row h-screen">
        <SidebarPage {menuOpen}>
            <div class="flex flex-col h-full overflow-y-hidden">
                <div class="os-bar">
                    <label for="sidebar-drawer" class="os-button">menu</label>
                </div>
                <div class="main-content">
                    <slot />
                </div>
            </div>
        </SidebarPage>
    </div>

    <!-- <Footer /> -->
</main>

<style>
    .os-bar {
        @apply bg-base-200 w-full flex flex-row border-b border-b-neutral-900;
    }

    .os-button {
        @apply btn btn-ghost rounded-none text-sm normal-case font-normal px-2;
    }

    .main-content {
        @apply p-2 h-full;
    }
</style>
