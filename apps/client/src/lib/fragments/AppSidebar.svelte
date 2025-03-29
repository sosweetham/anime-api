<script lang="ts">
import { page } from "$app/state";
import { toast } from "svelte-sonner";
import * as Sidebar from "$lib/components/ui/sidebar/index.js";
import {
    Cpu,
    Flame,
    type Icon,
    Newspaper,
    Paintbrush,
    Piano,
    Podcast,
} from "@lucide/svelte";
import LightSwitch from "./LightSwitch.svelte";
    import { Button } from "$lib/components/ui/button";

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
    {
        icon: Cpu,
        text: "tech",
        href: "/tech",
    },
    {
        icon: Paintbrush,
        text: "design",
        href: "/design",
    },
    {
        icon: Piano,
        text: "music",
        href: "/music",
    },
    {
        icon: Podcast,
        text: "podcast",
        href: "/podcast",
    },
];
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
        <Button onclick={() => toast("Hello world")}>Show toast</Button>
		<div class="flex justify-between">
			<div></div>
			<div>
				<LightSwitch />
			</div>
		</div>
	</Sidebar.Footer>
</Sidebar.Root>
