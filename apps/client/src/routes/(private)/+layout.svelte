<script lang="ts">
import { goto } from "$app/navigation";
import { getSessionData } from "$lib/auth-client";
import { runtime } from "$lib/controllers/runtime.svelte";
import { untrack } from "svelte";

import { useSidebar } from "$lib/components/ui/sidebar";
const sidebar = useSidebar();

let { children } = $props();

$effect(() => {
    if (!runtime.signedIn) {
        untrack(async () => {
            await getSessionData();
            if (!runtime.signedIn) {
                await goto("/sign-in");
            }
        });
    }
});
</script>

<div
    class={`container mt-8 ${!sidebar.isMobile && sidebar.open ? "ml-64" : ""} transition-[margin] duration-100 ease-in-out`}
>
    {@render children()}
</div>
