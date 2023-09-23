<script lang="ts">
	import { browser } from '$app/environment';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import GuessInput from '$lib/components/GuessInput.svelte';
	import GuessCard from '$lib/components/GuessCard.svelte';
	import CityPoint from '$lib/components/CityPoint.svelte';
	import LTMap from '$lib/assets/lt.svg';
	import { calcDistance } from '$lib/utility';
	import { resetGuessesStore, addToGuessesStore, guessesStore } from '$lib/stores/guesses-store';
	import {
		citiesStore,
		cityNamesStore,
		getCityData,
		setCityGuessStatus,
		removeCityStoreName,
		resetCitiesStore
	} from '$lib/stores/cities-store';
	import { answerStore, setAnswerStore } from '$lib/stores/answerStore';
	import { gameStateStore, setGameStateStore } from '$lib/stores/gameStateStore';
	import { startDateStore, savedDateStore, updateSavedDateStore } from '$lib/stores/dateStore';
	import { getTheCityIndexForToday, isStateUpdateRequired } from './page';

	let currentGuess: string = '';
	let maxGuessCount: number = 7;

	if (
		$gameStateStore != 'starting' &&
		isStateUpdateRequired(new Date($savedDateStore), $startDateStore)
	) {
		setGameStateStore('starting');
		updateSavedDateStore();
	}

	if ($gameStateStore == 'starting') {
		resetGuessesStore();
		resetCitiesStore();
		setAnswerStore($cityNamesStore, getTheCityIndexForToday($startDateStore, $cityNamesStore));
		setGameStateStore('in progress');
	}

	function handleInput() {
		const guessCityData = getCityData(currentGuess);
		const answerCityData = getCityData($answerStore);

		const distance = calcDistance(
			Number(guessCityData.lat),
			Number(guessCityData.lng),
			Number(answerCityData.lat),
			Number(answerCityData.lng)
		);

		addToGuessesStore(guessCityData.city, Math.round(distance));
		setCityGuessStatus(guessCityData.city, true);
		removeCityStoreName(guessCityData.city);

		if (currentGuess == $answerStore) {
			setGameStateStore('won');
		} else if ($guessesStore.length == maxGuessCount) {
			setGameStateStore('lost');
			setCityGuessStatus($answerStore, true);
		} else {
			currentGuess = '';
		}
	}
</script>

<div class="container mx-auto flex h-full flex-col items-center justify-start">
	<div class="relative mt-5 sm:mt-10">
		<img
			class=" max-w-xs select-none drop-shadow-md sm:max-w-md"
			src={LTMap}
			alt="Map of Lithuania"
		/>
		{#each $citiesStore as city}
			{#if city.guessed}
				<CityPoint
					name={city.city}
					population={Number(city.population)}
					lat={Number(city.lat)}
					lon={Number(city.lng)}
					isAnswer={city.city == $answerStore}
				/>
			{/if}
		{/each}
	</div>
	{#if $gameStateStore == 'in progress' && browser}
		<GuessInput bind:inputValue={currentGuess} options={$cityNamesStore} on:input={handleInput} />
	{:else if $gameStateStore === 'won' && browser}
		<div
			in:fly={{
				delay: 0,
				duration: 600,
				x: 40,
				y: 0,
				opacity: 0,
				easing: quintOut
			}}
		>
			<p class=" my-5 h-12 text-center text-xl sm:my-8 sm:text-2xl">
				Congratulations!<br /> The answer was <span class="font-bold">{$answerStore}</span>!
			</p>
		</div>
	{:else if $gameStateStore === 'lost' && browser}
		<div
			in:fly={{
				delay: 0,
				duration: 600,
				x: 40,
				y: 0,
				opacity: 0,
				easing: quintOut
			}}
		>
			<p class="my-5 h-12 text-center text-xl sm:my-9 sm:text-2xl">
				You ran out of guesses...<br /> The right answer was
				<span class="font-bold">{$answerStore}</span>!
			</p>
		</div>
	{/if}

	<!-- Dynamically increasing list of guesses below the input field -->
	<ul class="list w-72 max-w-md space-y-3 sm:w-7/12 sm:max-w-xs">
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
				out:fly={{
					delay: 0,
					duration: 400,
					x: 30,
					y: 0,
					opacity: 0,
					easing: quintOut
				}}
			>
				<GuessCard {guess} />
			</div>
		{/each}
	</ul>
	<!--
	<button
		class="variant-filled-secondary btn absolute right-4 mt-4 text-lg"
		on:click={() => {
			resetGuessesStore();
			resetCitiesStore();
			setAnswerStore($cityNamesStore);
			setGameStateStore('in progress');
			currentGuess = '';
		}}>Reset</button
	>
	-->
</div>

<!--
	TODO:
	- Show time until next word
	- LT and EN version
	- Help button that pops up a window that contains:
		time left until next word
		amount of wins and losses
		win lose ratio
-->
