<script lang="ts">
import { onMount } from "svelte";
import "../app.css";
import * as Sidebar from "$lib/components/ui/sidebar";
import { Toaster } from "$lib/components/ui/sonner";
import type { Theme } from "$lib/controllers/theme";
import AppSidebar from "$lib/fragments/AppSidebar.svelte";
let { children } = $props();
onMount(async () => {
    const { runtime } = await import("$lib/controllers/runtime.svelte");
    window.addEventListener("setTheme", (event: Event) => {
        event as CustomEvent<{ theme: Theme }>;
    });

    const theme = localStorage.getItem("theme") as Theme;
    if (theme) {
        runtime.themeManager.theme = theme;
    }
});
</script>

<Toaster />
<Sidebar.Provider open={false} class="overflow-x-hidden">
    <div class="absolute">
        <AppSidebar />
    </div>
	<div class="fixed bottom-4 left-5 z-50">
		<Sidebar.Trigger />
	</div>
    {@render children()}
</Sidebar.Provider>
