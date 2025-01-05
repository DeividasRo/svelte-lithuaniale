<script lang="ts">
	import MapGame from '$lib/components/MapGame.svelte';
	import LanguageSelectButton from '$lib/components/LanguageSelectButton.svelte';
	import GameModeButton from '$lib/components/GameModeButton.svelte';
	import { gameModeStore } from '$lib/stores/gameModeStore';
	import { get } from 'svelte/store';

	let currentGame = get(gameModeStore);

	function switchGameMode(event: CustomEvent<{ mode: number }>) {
		const { mode } = event.detail;
		gameModeStore.set(mode);
		currentGame = mode;
	}
</script>

<div class="container mx-auto flex h-full flex-col items-center justify-start">
	<div class="mb-1 mt-8 flex space-x-10 caret-transparent sm:space-x-16">
		<GameModeButton mode={1} {currentGame} icon="humbleicons:location" on:switch={switchGameMode} />
		<GameModeButton mode={2} {currentGame} icon="humbleicons:calendar" on:switch={switchGameMode} />
	</div>
	{#if currentGame == 1}
		<MapGame />
	{:else if currentGame == 2}
		<div class="h2 mt-24 font-bold caret-transparent">Coming soon</div>
	{/if}
	<LanguageSelectButton />
</div>
