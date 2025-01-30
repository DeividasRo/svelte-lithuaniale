<script lang="ts">
	import MapGame from '$lib/components/Map/Game.svelte';
	import HistoryGame from '$lib/components/History/Game.svelte';
	import LanguageSelectButton from '$lib/components/LanguageSelectButton.svelte';
	import GameModeButton from '$lib/components/GameModeButton.svelte';
	import { gameModeStore } from '$lib/stores/gameModeStore';
	import { get } from 'svelte/store';
	import { startDateStore, savedDateStore, updateSavedDateStore } from '$lib/stores/dateStore';
	import { setHistoryGameStateStore } from '$lib/stores/history/gameStateStore';
	import { setMapGameStateStore } from '$lib/stores/map/gameStateStore';

	let currentGame = get(gameModeStore);
	const isStateUpdateRequired = (savedDate: Date, startDate: Date) => {
		const savedIndex = Math.floor(
			Math.abs((savedDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
		);
		const currentIndex = Math.floor(
			Math.abs((new Date().getTime() - startDate.getTime()) / (1000 * 3600 * 24))
		);
		return savedIndex !== currentIndex;
	};

	if (isStateUpdateRequired(new Date($savedDateStore), $startDateStore)) {
		setMapGameStateStore('starting');
		setHistoryGameStateStore('starting');
		updateSavedDateStore();
	}

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
		<HistoryGame />
	{/if}
	<LanguageSelectButton />
</div>
