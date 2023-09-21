<script lang="ts">
	import { browser } from '$app/environment';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	export let name: string;
	export let population: number;
	export let lat: number;
	export let lon: number;
	export let isAnswer: boolean;

	let innerWidth: number;
	let smallScreen: boolean;

	let y: number;
	let x: number;
	let yd: number;
	let xd: number;
	let h: number;
	let w: number;

	$: if (innerWidth >= 768) {
		smallScreen = false;
		calcSizes();
	} else {
		smallScreen = true;
		calcSizes();
	}

	function calcSizes() {
		if (!browser) {
			return;
		}
		yd = smallScreen ? 2.52 : 2.42;
		xd = smallScreen ? 5.9 : 5.44;
		y = Math.round(((lat - 53.93) / yd) * (smallScreen ? 237 : 320));
		x = Math.round(((lon - 20.99) / xd) * (smallScreen ? 319 : 413));
		if (population < 5000) {
			h = smallScreen ? 7 : 9;
			w = smallScreen ? 7 : 9;
		} else if (population < 12500) {
			h = smallScreen ? 9 : 11;
			w = smallScreen ? 9 : 11;
		} else if (population < 25000) {
			h = smallScreen ? 11 : 14;
			w = smallScreen ? 11 : 14;
		} else if (population < 40000) {
			h = smallScreen ? 13 : 17;
			w = smallScreen ? 13 : 17;
		} else {
			h = smallScreen ? 16 : 21;
			w = smallScreen ? 16 : 21;
		}
	}

	let bgColor: string;
	if (isAnswer) {
		bgColor = '#02e63e';
	} else {
		bgColor = '#83c294';
	}

	let popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover' + name,
		placement: 'bottom',
		middleware: {
			autoPlacement: { allowedPlacements: ['bottom'] }
		}
	};
</script>

<div
	tabindex="-1"
	class="absolute rounded-full border border-[#0b491c] md:border-2 [&>*]:pointer-events-none"
	style={`bottom: ${y}px; left: ${x}px; height:${h}px; width:${w}px; background-color: ${bgColor}`}
	use:popup={popupHover}
/>

<div class="card variant-filled-secondary z-50 px-2 py-1" data-popup={`popupHover${name}`}>
	<p class="md:text-md whitespace-nowrap text-sm font-semibold">{name}</p>
	<div class="variant-filled-secondary arrow" />
</div>

<svelte:window bind:innerWidth />
