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
        "peer box-content h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[disabled=true]:opacity-50",
        className,
    )}
    bind:checked={checked}
    {...restProps}
>
    {#snippet children({ checked, indeterminate })}
        <div class="flex h-4 w-4 items-center justify-center text-current">
            {#if checked}
                <Check class="h-3.5 w-3.5" />
            {:else if indeterminate}
                <Minus class="h-3.5 w-3.5" />
            {/if}
        </div>
    {/snippet}
</CheckboxPrimitive.Root>
