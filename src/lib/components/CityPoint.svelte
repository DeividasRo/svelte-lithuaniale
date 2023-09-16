<script lang="ts">
	export let lat: number;
	export let lon: number;
	export let mapHeight: number;
	export let mapWidth: number;

	let y = Math.round(((lat - 53.95) / 2.45) * mapHeight);
	let x = Math.round(((lon - 20.98) / 5.43) * mapWidth);
</script>

<div
	class="absolute h-2 w-2 rounded-full border border-[#6cbd82] bg-[#54755d]"
	style={`bottom: ${y}px; left: ${x}px`}
/>
