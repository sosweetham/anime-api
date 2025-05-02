<script lang="ts">
import { onMount } from "svelte";
import "../app.css";
import * as Sidebar from "$lib/components/ui/sidebar";
import { Toaster } from "$lib/components/ui/sonner";
import { runtime } from "$lib/controllers/runtime.svelte";
import type { Theme } from "$lib/controllers/theme";
import AppSidebar from "$lib/fragments/AppSidebar.svelte";

let { children } = $props();

onMount(async () => {
    const { runtime } = await import("$lib/controllers/runtime.svelte");
    window.addEventListener("setTheme", (event: Event) => {
        const customEvent = event as CustomEvent<{ theme: Theme }>;
        runtime.themeManager.theme = customEvent.detail.theme;
    });
    const theme = localStorage.getItem("theme") as Theme;
    if (theme) {
        runtime.themeManager.theme = theme;
    }
});
</script>

<Toaster />
<Sidebar.Provider bind:open={runtime.sidebarIsOpen} class="overflow-x-hidden">
    <div class="absolute">
        <AppSidebar />
    </div>
    {#if !runtime.sidebarIsOpen}
        <div class="fixed bottom-[22px] left-[18px] z-50">
            <Sidebar.Trigger />
        </div>
    {/if}
    {@render children()}
</Sidebar.Provider>
