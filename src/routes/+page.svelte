<script lang="ts">
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
	import { gameStateStore } from '$lib/stores/gameStateStore';
	import { answerStore, resetAnswerStore } from '$lib/stores/answerStore';
	import { setGameStateStore } from '$lib/stores/gameStateStore';

	let currentGuess: string = '';

	console.log($answerStore);

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
			console.log('VICTORY');
			setGameStateStore('won');
		} else {
			currentGuess = '';
		}
	}
</script>

<div class="container mx-auto flex h-full flex-col items-center justify-start">
	<div class="relative mt-5 md:mt-10">
		<img class="max-w-xs drop-shadow-md md:max-w-md" src={LTMap} alt="Map of Lithuania" />
		{#key { $citiesStore }}
			{#each $citiesStore as city}
				{#if !city.guessed}
					<CityPoint
						name={city.city}
						population={Number(city.population)}
						lat={Number(city.lat)}
						lon={Number(city.lng)}
						isAnswer={city.city == $answerStore}
					/>
				{/if}
			{/each}
		{/key}
	</div>
	<span class="mb-5 md:mb-10" />
	{#if $gameStateStore == 'in progress'}
		<GuessInput bind:inputValue={currentGuess} options={$cityNamesStore} on:input={handleInput} />
	{/if}

	<!-- Dynamically increasing list of guesses below the input field -->
	<ul class="list mt-5 w-7/12 max-w-xs space-y-3 md:mt-10">
		{#each $guessesStore as guess}
			<GuessCard {guess} />
		{/each}
	</ul>

	<button
		class="variant-filled-secondary btn my-5 text-2xl"
		on:click={() => {
			resetGuessesStore();
			resetCitiesStore();
			resetAnswerStore($cityNamesStore);
			setGameStateStore('in progress');
			currentGuess = '';
		}}>Reset</button
	>
</div>

<!--
	TODO:
	- Winning text in place of input field
	- Guess list, map points, winning text animations
	- Deployment on Vercel
	- Max guess count, losing text
	- Select correct city every day (global timer)
	- Hint system (first letter, population)
	- Server/Client side modifications
-->
