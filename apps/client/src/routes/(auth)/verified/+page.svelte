<script lang="ts">
import * as Card from "$lib/components/ui/card";
import { goto } from "$app/navigation";
import { onMount } from "svelte";

onMount(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    goto("/sign-in");
});
</script>

<div class="flex h-screen w-full items-center justify-center px-4">
    <Card.Root class="mx-auto max-w-sm p-4">
        <Card.Header>
            <Card.Title class="text-2xl">Email Verified</Card.Title>
            <Card.Description>Redirecting to Sign In</Card.Description>
        </Card.Header>
    </Card.Root>
</div>
