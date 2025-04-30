<script lang="ts">
import * as Avatar from "$lib/components/ui/avatar";
import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
import * as Sidebar from "$lib/components/ui/sidebar";
import { useSidebar } from "$lib/components/ui/sidebar";
import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
import LogOut from "@lucide/svelte/icons/log-out";
import Settings from "@lucide/svelte/icons/settings";
// import BadgeCheck from "@lucide/svelte/icons/badge-check";
// import Bell from "@lucide/svelte/icons/bell";
// import CreditCard from "@lucide/svelte/icons/credit-card";
// import Sparkles from "@lucide/svelte/icons/sparkles";
import Github from "@lucide/svelte/icons/github";

let {
    user,
    handleSignOut,
}: {
    user: { name: string; email: string; avatar: string };
    handleSignOut: () => void | Promise<void>;
} = $props();
const sidebar = useSidebar();
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						{...props}
					>
						<Avatar.Root class="h-8 w-8 rounded-lg">
							<Avatar.Image src={user.avatar} alt={user.name} />
							<Avatar.Fallback class="rounded-lg">{user.name.slice(0,2).toUpperCase()}</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">{user.name}</span>
							<span class="truncate text-xs">{user.email}</span>
						</div>
						<ChevronsUpDown class="ml-auto size-4" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-[var(--bits-dropdown-menu-anchor-width)] min-w-56 rounded-lg"
				side={sidebar.isMobile ? "bottom" : "right"}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar.Root class="h-8 w-8 rounded-lg">
							<Avatar.Image src={user.avatar} alt={user.name} />
							<Avatar.Fallback class="rounded-lg">{user.name.slice(0,2).toUpperCase()}</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">{user.name}</span>
							<span class="truncate text-xs">{user.email}</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
                    <a href="https://github.com/sosweetham/anime-api" target="_blank">
                        <DropdownMenu.Item>
                            <Github />
                            Visit Repo
                        </DropdownMenu.Item>
                    </a>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
                    <a href="settings">
                        <DropdownMenu.Item>
                            <Settings />
                            Settings
                        </DropdownMenu.Item>
                    </a>
					<!-- <DropdownMenu.Item>
						<CreditCard />
						Billing
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<Bell />
						Notifications
					</DropdownMenu.Item> -->
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item onclick={() => handleSignOut()}>
					<LogOut />
					Sign Out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
