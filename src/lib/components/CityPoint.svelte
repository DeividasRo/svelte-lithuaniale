<script lang="ts">
	export let name: string;
	export let population: number;
	export let lat: number;
	export let lon: number;
	export let guessed: boolean;
	export let mapHeight: number;
	export let mapWidth: number;

	let y: number = Math.round(((lat - 53.91) / 2.42) * mapHeight);
	let x: number = Math.round(((lon - 20.99) / 5.44) * mapWidth);

	let h: number;
	let w: number;
	if (population < 5000) {
		h = 7;
		w = 7;
	} else if (population < 10000) {
		h = 9;
		w = 9;
	} else if (population < 20000) {
		h = 11;
		w = 11;
	} else if (population < 40000) {
		h = 13;
		w = 13;
	} else {
		h = 17;
		w = 17;
	}

	let bgColor: string;
	if (guessed) {
		bgColor = '#ed1123';
	} else {
		bgColor = '#83c294';
	}
</script>

<div
	class="absolute rounded-full border-2 border-[#0b491c]"
	style={`bottom: ${y}px; left: ${x}px; height:${h}px; width:${w}px; background-color: ${bgColor}`}
/>
