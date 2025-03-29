<script lang="ts">
import { onMount } from "svelte";
import { fade } from "svelte/transition";

let ready = $state(false);
onMount(() => {
    ready = true;
});
</script>

{#if ready}
	<div class="bg-[url('/images/bg.jpeg')] h-[75vh] w-screen bg-no-repeat bg-cover -scale-x-100">
		<div
			in:fade={{ delay: 700 }}
			class="bg-[url('/images/rem.png')] h-[75vh] w-full bg-no-repeat bg-right-bottom bg-contain -scale-x-100"
		>
			⠀
		</div>
	</div>
	<div id="stripe-bound">
		<div id="stripe-container">
			<div id="stripe-pattern"></div>
		</div>
	</div>
	<div
		in:fade={{ delay: 300 }}
		id="content-container"
		class="text-white font-black flex flex-col w-full h-full items-center justify-center gap-4 md:flex-row lg:justify-between lg:ml-4 lg:pr-8"
	>
		<div class="text-stroke text-3xl text-center mix-blend-multiply md:text-6xl lg:text-8xl">
			ANIME-API
			<span class="block text-xl md:text-2xl md:inline lg:text-3xl"> (coming soon) </span>
		</div>
		<a
			in:fade={{ delay: 500 }}
			id="join-discord"
			class="rounded-md"
			target="_blank"
			href="https://discord.gg/aZhtbMHCrZ"
		>
			<button class="text-white relative p-4 flex gap-2 items-center overflow-hidden">
				<img
					id="emilia-sticker"
					class="absolute h-1/2 aspect-square rotate-180 -scale-x-100 opacity-0 translate-x-6 -translate-y-11"
					src="/images/emilia-sticker.png"
					alt=""
				/>
				<img class="w-10 h-10" src="/images/discord-mark-white.svg" alt="discord" />
				Join the Server!
			</button>
		</a>
	</div>
{/if}

<style lang="postcss">
	#join-discord {
		background-color: #5865f2;
		/* &:hover {
			#emilia-sticker {
				opacity: 1;
				animation: sticker 1s ease-in-out infinite;
			}
		} */
		&:hover #emilia-sticker {
			opacity: 1;
			translate: 0 26px;
			transition: all 0.5s ease-in;
		}
	}
	.text-stroke {
		text-shadow:
			-1px -1px 0 #eb459e,
			1px -1px 0 #eb459e,
			-1px 1px 0 #eb459e,
			1px 1px 0 #eb459e;
	}
	:root {
		--primary-stripe-rgb: 230 230 230;
		--secondary-stripe-rgb: 240 240 240;
	}

	@keyframes pan {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 100% 0%;
		}
	}
	#content-container {
		position: absolute;
		height: 25vh;
		min-height: 200px;
		bottom: 0px;
		width: 100%;
	}
	#stripe-bound {
		overflow-x: clip;
		width: 100vw;
	}
	#stripe-container {
		position: absolute;
		left: 50%;
		bottom: 0px;
		translate: -50% 0%;
		height: 28vh;
		min-height: 240px;
		width: 100%;
		background-color: rgb(var(--stripe-primary-rgb));
		min-width: 2000px;
		clip-path: polygon(
			0% 5%,
			1.25% 0%,
			2.5% 5%,
			3.75% 0%,
			5% 5%,
			6.25% 0%,
			7.5% 5%,
			8.75% 0%,
			10% 5%,
			11.25% 0%,
			12.5% 5%,
			13.75% 0%,
			15% 5%,
			16.25% 0%,
			17.5% 5%,
			18.75% 0%,
			20% 5%,
			21.25% 0%,
			22.5% 5%,
			23.75% 0%,
			25% 5%,
			26.25% 0%,
			27.5% 5%,
			28.75% 0%,
			30% 5%,
			31.25% 0%,
			32.5% 5%,
			33.75% 0%,
			35% 5%,
			36.25% 0%,
			37.5% 5%,
			38.75% 0%,
			40% 5%,
			41.25% 0%,
			42.5% 5%,
			43.75% 0%,
			45% 5%,
			46.25% 0%,
			47.5% 5%,
			48.75% 0%,
			50% 5%,
			51.25% 0%,
			52.5% 5%,
			53.75% 0%,
			55% 5%,
			56.25% 0%,
			57.5% 5%,
			58.75% 0%,
			60% 5%,
			61.25% 0%,
			62.5% 5%,
			63.75% 0%,
			65% 5%,
			66.25% 0%,
			67.5% 5%,
			68.75% 0%,
			70% 5%,
			71.25% 0%,
			72.5% 5%,
			73.75% 0%,
			75% 5%,
			76.25% 0%,
			77.5% 5%,
			78.75% 0%,
			80% 5%,
			81.25% 0%,
			82.5% 5%,
			83.75% 0%,
			85% 5%,
			86.25% 0%,
			87.5% 5%,
			88.75% 0%,
			90% 5%,
			91.25% 0%,
			92.5% 5%,
			93.75% 0%,
			95% 5%,
			96.25% 0%,
			97.5% 5%,
			98.75% 0%,
			100% 5%,
			100% 100%,
			0% 100%
		);
	}

	#stripe-pattern {
		height: 100%;
		width: 100%;
		background-size: 18px 18px;
		background-image: linear-gradient(
			-45deg,
			rgb(var(--primary-stripe-rgb)) 25%,
			rgb(var(--secondary-stripe-rgb)) 25%,
			rgb(var(--secondary-stripe-rgb)) 50%,
			rgb(var(--primary-stripe-rgb)) 50%,
			rgb(var(--primary-stripe-rgb)) 75%,
			rgb(var(--secondary-stripe-rgb)) 75%,
			rgb(var(--secondary-stripe-rgb)) 100%
		);
		box-shadow: inset 0rem 0.5rem 2rem 0.25rem rgb(0 0 0 / 40%);
		animation: pan 360s linear infinite;
	}
</style>
