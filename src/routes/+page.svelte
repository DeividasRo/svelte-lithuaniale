<script lang="ts">
	import GuessInput from '../lib/components/GuessInput.svelte';
	import GuessCard from '../lib/components/GuessCard.svelte';
	import LTMap from '$lib/assets/lt.svg';
	import { resetGuessStore, addToGuessStore, guessStore } from '$lib/stores/guess-store';
	import { calcDistance } from '$lib/utility';
	import {
		citiesStore,
		cityNamesStore,
		getCityData,
		setCityGuessStatus,
		removeCityStoreName,
		resetCitiesStore
	} from '$lib/stores/cities-store';
	import CityPoint from '$lib/components/CityPoint.svelte';

	let correctGuess: string = 'Vilnius';
	let currentGuess: string = '';
	let cityNames: string[];

	function handleInput() {
		const guessCityData = getCityData(currentGuess);
		const correctCityData = getCityData(correctGuess);

		const distance = calcDistance(
			Number(guessCityData.lat),
			Number(guessCityData.lng),
			Number(correctCityData.lat),
			Number(correctCityData.lng)
		);

		addToGuessStore(guessCityData.city, Math.round(distance));
		setCityGuessStatus(guessCityData.city, true);
		removeCityStoreName(guessCityData.city);
		currentGuess = '';
	}
</script>

<div class="container mx-auto flex h-full flex-col items-center justify-start">
	<div class="relative mt-5 md:mt-10">
		<img class="max-w-xs md:max-w-md" src={LTMap} alt="Map of Lithuania" />
		{#key { $citiesStore }}
			{#each $citiesStore as city}
				<CityPoint
					name={city.city}
					population={Number(city.population)}
					lat={Number(city.lat)}
					lon={Number(city.lng)}
					guessed={city.guessed}
				/>
			{/each}
		{/key}
	</div>
	<GuessInput bind:inputValue={currentGuess} options={$cityNamesStore} on:input={handleInput} />

	<!-- Dynamically increasing list of guesses below the input field -->
	<ul class="list w-7/12 max-w-sm space-y-3">
		{#each $guessStore as guess}
			<GuessCard {guess} />
		{/each}
	</ul>

	<button
		class="variant-filled-secondary btn my-6 text-2xl"
		on:click={() => {
			resetGuessStore();
			resetCitiesStore();
			currentGuess = '';
		}}>Reset</button
	>
</div>

<!--
	TODO:
	- Game loop, select correct word with global timer
	- Guess list, map points animations
	- Deployment on Vercel
	- Hint system (first letter, population)
	- Server/Client side modifications
-->
