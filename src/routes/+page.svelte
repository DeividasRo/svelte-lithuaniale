<script lang="ts">
	import MapGame from '$lib/components/MapGame.svelte';
	let currentGame = 1;
</script>

<div class="container mx-auto flex h-full flex-col items-center justify-start">
	{#if currentGame == 1}
		<MapGame />
	{/if}
</div>
