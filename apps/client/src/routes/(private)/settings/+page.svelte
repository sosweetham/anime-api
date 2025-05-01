<script lang="ts">
import { runtime } from "$lib/controllers/runtime.svelte";

runtime.signedIn = false;
console.log(runtime.signedIn);
setTimeout(() => {
    console.log(runtime.signedIn);
}, 1000);
</script>

<h1>
    <span class="text-2xl font-bold">Account Settings</span>
</h1>
<span class="text-sm text-gray-500"
    >Manage your account settings and preferences</span
>
