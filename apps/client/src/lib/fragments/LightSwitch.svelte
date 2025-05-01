<script lang="ts">
import Moon from "@lucide/svelte/icons/moon";
import Sun from "@lucide/svelte/icons/sun";

import { buttonVariants } from "$lib/components/ui/button/index.js";
import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
import { runtime } from "$lib/controllers/runtime.svelte";
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger
        class={buttonVariants({ variant: "ghost", size: "icon" })}
    >
        <Sun
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end">
        <DropdownMenu.Item
            onclick={() => (runtime.themeManager.theme = "light")}
            >Light</DropdownMenu.Item
        >
        <DropdownMenu.Item onclick={() => (runtime.themeManager.theme = "dark")}
            >Dark</DropdownMenu.Item
        >
        <DropdownMenu.Item
            onclick={() => (runtime.themeManager.theme = "system")}
            >System</DropdownMenu.Item
        >
    </DropdownMenu.Content>
</DropdownMenu.Root>
