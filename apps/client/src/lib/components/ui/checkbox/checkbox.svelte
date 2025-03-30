<script lang="ts">
import { Checkbox as CheckboxPrimitive, type CheckboxRootProps } from "bits-ui";
import Check from "@lucide/svelte/icons/check";
import Minus from "@lucide/svelte/icons/minus";
import { cn } from "$lib/utils";

let {
    class: className = $bindable(undefined),
    checked = $bindable(false),
    indeterminate = $bindable(false),
    ...restProps
}: CheckboxRootProps = $props();
</script>

<CheckboxPrimitive.Root
    class={cn(
        "border-primary ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer box-content h-4 w-4 shrink-0 rounded-sm border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50",
        className
    )}
    bind:checked
    {...restProps}
    >
    {#snippet children({checked, indeterminate})}
        <div class="flex w-4 h-4 items-center justify-center text-current">
            {#if checked}
                <Check class="h-3.5 w-3.5" />
            {:else if indeterminate}
                <Minus class="h-3.5 w-3.5" />
            {/if}
        </div>
    {/snippet}
</CheckboxPrimitive.Root>

