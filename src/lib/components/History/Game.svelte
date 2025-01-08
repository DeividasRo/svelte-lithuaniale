<script lang="ts">
	import { browser } from '$app/environment';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import GuessCard from '$lib/components/History/GuessCard.svelte';
	import {
		resetGuessesStore,
		addToGuessesStore,
		guessesStore
	} from '$lib/stores/history/guessesStore';
	import { answerStore, setAnswerStore } from '$lib/stores/history/answerStore';
	import { gameStateStore, setGameStateStore } from '$lib/stores/history/gameStateStore';
	import { startDateStore, savedDateStore, updateSavedDateStore } from '$lib/stores/dateStore';
	import { languageStore } from '$lib/stores/languageStore';
	import languagesJson from '$lib/assets/languages.json';

	let currentGuess: number = 0;
	let maxGuessCount: number = 7;

	const isStateUpdateRequired = (savedDate: Date, startDate: Date) => {
		const savedIndex = Math.floor(
			Math.abs((savedDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
		);
		const currentIndex = Math.floor(
			Math.abs((new Date().getTime() - startDate.getTime()) / (1000 * 3600 * 24))
		);
		return savedIndex !== currentIndex;
	};

	if (
		$gameStateStore != 'starting' &&
		isStateUpdateRequired(new Date($savedDateStore), $startDateStore)
	) {
		setGameStateStore('starting');
	}

	if ($gameStateStore == 'starting') {
		resetGuessesStore();
		updateSavedDateStore();
		setGameStateStore('in progress');
	}

	function handleInput() {}
</script>

<div class="container mx-auto flex h-full flex-col items-center justify-start caret-transparent">
	{#if $gameStateStore == 'in progress' && browser}
		<!-- Short input field with values from 1 to 2025 (maybe add skeleton UI range slider later)-->
		<input />
	{:else if $gameStateStore === 'won' && browser}
		<div
			in:fly={{
				delay: 0,
				duration: 1000,
				x: 30,
				y: 0,
				opacity: 0,
				easing: quintOut
			}}
		>
			<p class=" my-5 h-12 text-center text-xl sm:my-8 sm:text-2xl">
				{@html languagesJson[$languageStore]['won-message']}<span class="font-bold"
					>{$answerStore}</span
				>!
			</p>
		</div>
	{:else if $gameStateStore === 'lost' && browser}
		<div
			in:fly={{
				delay: 0,
				duration: 1000,
				x: 30,
				y: 0,
				opacity: 0,
				easing: quintOut
			}}
		>
			<p class="my-5 h-12 text-center text-xl sm:my-9 sm:text-2xl">
				{@html languagesJson[$languageStore]['lost-message']}
				<span class="font-bold">{$answerStore}</span>!
			</p>
		</div>
	{/if}

	<!-- Dynamically increasing list of guesses below the input field -->
	<ul class="list mb-4 w-72 max-w-md space-y-3 sm:w-7/12 sm:max-w-xs">
		{#each $guessesStore as guess}
			<div
				in:fly={{
					delay: 0,
					duration: 400,
					x: 0,
					y: 20,
					opacity: 0.5,
					easing: quintOut
				}}
			>
				<GuessCard {guess} />
			</div>
		{/each}
	</ul>
</div>
