<script lang="ts">
	import { browser } from '$app/environment';

	export let name: string;
	export let population: number;
	export let lat: number;
	export let lon: number;
	export let guessed: boolean;

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
		yd = smallScreen ? 2.55 : 2.42;
		xd = smallScreen ? 5.9 : 5.44;
		y = Math.round(((lat - 53.91) / yd) * (smallScreen ? 237 : 320));
		x = Math.round(((lon - 20.99) / xd) * (smallScreen ? 319 : 413));
		if (population < 5000) {
			h = smallScreen ? 6 : 8;
			w = smallScreen ? 6 : 8;
		} else if (population < 12500) {
			h = smallScreen ? 8 : 10;
			w = smallScreen ? 8 : 10;
		} else if (population < 25000) {
			h = smallScreen ? 10 : 13;
			w = smallScreen ? 10 : 13;
		} else if (population < 40000) {
			h = smallScreen ? 12 : 16;
			w = smallScreen ? 12 : 16;
		} else {
			h = smallScreen ? 16 : 20;
			w = smallScreen ? 16 : 20;
		}
	}

	let bgColor: string;
	if (guessed) {
		bgColor = '#ed1123';
	} else {
		bgColor = '#83c294';
	}
</script>

<div
	class="absolute rounded-full border border-[#0b491c]"
	style={`bottom: ${y}px; left: ${x}px; height:${h}px; width:${w}px; background-color: ${bgColor}`}
/>

<svelte:window bind:innerWidth />
