<script lang="ts" context="module">
import type { FormPathLeaves, SuperForm } from "sveltekit-superforms";
type T = Record<string, unknown>;
type U = FormPathLeaves<T>;
</script>

<script
    lang="ts"
    generics="T extends Record<string, unknown>, U extends FormPathLeaves<T>"
>
import type { HTMLAttributes } from "svelte/elements";
import * as FormPrimitive from "formsnap";
import { cn } from "$lib/utils.js";

type $$Props = FormPrimitive.ElementFieldProps<T, U> &
    HTMLAttributes<HTMLElement>;

export let form: SuperForm<T>;
export let name: U;

let className: $$Props["class"] = undefined;
export { className as class };
</script>

<FormPrimitive.ElementField
    form={form}
    name={name}
    let:constraints
    let:errors
    let:tainted
    let:value
>
    <div class={cn("space-y-2", className)}>
        <slot
            constraints={constraints}
            errors={errors}
            tainted={tainted}
            value={value}
        />
    </div>
</FormPrimitive.ElementField>
