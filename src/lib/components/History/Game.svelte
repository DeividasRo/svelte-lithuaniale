<script lang="ts">
	import { browser } from '$app/environment';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import GuessCard from '$lib/components/History/GuessCard.svelte';
	import GuessInput from '$lib/components/History/GuessInput.svelte';
	import {
		resetGuessesStore,
		addToGuessesStore,
		guessesStore
	} from '$lib/stores/history/guessesStore';
	import { eventYearsStore, getEventData, resetEventsStore } from '$lib/stores/history/eventsStore';
	import { answerStore, setAnswerStore } from '$lib/stores/history/answerStore';
	import { gameStateStore, setGameStateStore } from '$lib/stores/history/gameStateStore';
	import { startDateStore, savedDateStore, updateSavedDateStore } from '$lib/stores/dateStore';
	import { languageStore } from '$lib/stores/languageStore';
	import languagesJson from '$lib/assets/languages.json';

	let currentGuess: string = '';
	let maxGuessCount: number = 7;

	const getEventIndexForToday = (startDate: Date, options: number[]) => {
		const timeDiff = new Date().getTime() - startDate.getTime();
		return Math.floor(Math.abs(timeDiff / (1000 * 3600 * 24))) % options.length;
	};

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
		resetEventsStore();
		resetGuessesStore();
		setAnswerStore($eventYearsStore, getEventIndexForToday($startDateStore, $eventYearsStore));
		updateSavedDateStore();
		setGameStateStore('in progress');
	}

	function handleInput() {
		const answerEventData = getEventData($answerStore);
		const difference = Number(currentGuess) - answerEventData.year;
		addToGuessesStore(Number(currentGuess), difference);

		if (Number(currentGuess) == $answerStore) {
			setGameStateStore('won');
		} else if ($guessesStore.length == maxGuessCount) {
			setGameStateStore('lost');
		} else {
			currentGuess = '';
		}
	}
</script>

<div class="container mx-auto flex h-full flex-col items-center justify-start caret-transparent">
	<div class="card h3 mb-5 mt-10 max-w-lg p-4 text-center font-bold drop-shadow-md">
		{#if $languageStore == 'lithuania'}
			{getEventData($answerStore).event_lt}
		{:else if $languageStore == 'united-kingdom'}
			{getEventData($answerStore).event}
		{/if}
	</div>
	{#if $gameStateStore == 'in progress' && browser}
		<GuessInput bind:inputValue={currentGuess} placeholderText="2025" on:input={handleInput} />
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
			<p class="my-4 h-12 text-center text-xl sm:my-8 sm:text-2xl">
				{@html languagesJson[$languageStore]['won-message']}<span class="font-bold"
					>{$answerStore} {@html languagesJson[$languageStore]['year-short']}
				</span>
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
			<p class="my-4 h-12 text-center text-xl sm:my-8 sm:text-2xl">
				{@html languagesJson[$languageStore]['lost-message']}
				<span class="font-bold"
					>{$answerStore} {@html languagesJson[$languageStore]['year-short']}</span
				>
			</p>
		</div>
	{/if}

	<!-- Dynamically increasing list of guesses below the input field -->
	<ul class="list mx-auto my-4 w-52 max-w-md space-y-3">
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
