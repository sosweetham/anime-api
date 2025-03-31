<script lang="ts">
import { page } from "$app/state";
import { Button } from "$lib/components/ui/button";
import * as Sidebar from "$lib/components/ui/sidebar/index.js";
import { Flame, type Icon, Newspaper } from "@lucide/svelte";
import LightSwitch from "./LightSwitch.svelte";
import { authClient } from "$lib/auth-client";
import NavUser from "./NavUser.svelte";
import { runtime } from "$lib/controllers/runtime.svelte";

const supported: {
    icon: typeof Icon;
    text: string;
    href: string;
}[] = [
    {
        icon: Newspaper,
        text: "latest",
        href: "/latest",
    },
    {
        icon: Flame,
        text: "trending",
        href: "/trending",
    },
];

const getSessionData = async () => {
    const { data, error } = await authClient.getSession();
    if (error) {
        runtime.signedIn = false;
        return;
    }
    runtime.signedIn = !!data?.user;
    return data;
};

const handleSignOut = async () => {
    if ((await getSessionData())?.user) await authClient.signOut();
    runtime.signedIn = false;
};
</script>

<Sidebar.Root>
	<Sidebar.Header>
		<div class="flex items-center justify-center">
			<a href="/">
				<h1 class="scroll-m-20 text-xl font-extrabold tracking-tight">ANIME-API</h1>
			</a>
		</div>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Categories</Sidebar.GroupLabel>
			<div class="flex flex-col gap-1">
				{#each supported as item}
					<Sidebar.MenuButton
						isActive={item.href.split('/')[1] === page.url.pathname.split('/')[1]}
					>
						{#snippet child({ props })}
							{@const Icon = item.icon}
							<a href={item.href} {...props}>
								<Icon />
								<span class="capitalize">{item.text}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				{/each}
			</div>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<div class="flex justify-end items-center mb-1 gap-1">
			<div>
                {#await getSessionData()}
                    <Button href="/sign-in">Sign In</Button>
                    {:then session}
                    {#if runtime.signedIn && session?.user}
                        <!-- <Button onclick={() => handleSignOut()}>Sign Out</Button> -->
                        <NavUser user={
                            {
                                name: session?.user.name,
                                email: session?.user.email,
                                avatar: session?.user.image as string,
                            }
                        } {handleSignOut} />
                    {:else}
                        <Button href="/sign-in">Sign In</Button>
                    {/if}
                    {:catch}
                        <Button href="/sign-in">Sign In</Button>
                {/await}
            </div>
			<div>
				<LightSwitch />
			</div>
            <Sidebar.Trigger />
		</div>
	</Sidebar.Footer>
</Sidebar.Root>
