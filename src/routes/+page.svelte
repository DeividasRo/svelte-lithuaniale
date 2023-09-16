<script lang="ts">
	import GuessInput from '../lib/components/GuessInput.svelte';
	import GuessCard from '../lib/components/GuessCard.svelte';
	import LTMap from '$lib/assets/lt.svg';
	import { resetGuessStore, addToGuessStore, guessStore } from '$lib/stores/guess-store';
	import { calcDistance } from '$lib/utility';
	import {
		citiesStore,
		getCityNames,
		getCityData,
		removeFromCityStore,
		resetCitiesStore
	} from '$lib/stores/cities-store';
	import CityPoint from '$lib/components/CityPoint.svelte';

	let correctGuess: string = 'Vilnius';
	let currentGuess: string = '';
	let cityNames: string[];
	$: $citiesStore, (cityNames = getCityNames());

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
		removeFromCityStore(guessCityData.city);
		currentGuess = '';
	}
</script>

<div class="container mx-auto flex h-full flex-col items-center justify-start">
	<div class="relative mt-5 md:mt-10">
		<img class="max-w-xs md:max-w-md" src={LTMap} alt="Map of Lithuania" />
		{#each $citiesStore as city}
			<CityPoint lat={Number(city.lat)} lon={Number(city.lng)} mapHeight={328} mapWidth={413} />
		{/each}
	</div>
	<GuessInput bind:inputValue={currentGuess} options={cityNames} on:input={handleInput} />

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
	- Try to implement guessed cities onto the map:
		point size depends on population
		two different coordinates for each city (dekstop and mobile size map)
		not guessed city points are grey
		guessed city points are red with on hover popup displaying their name
	- Game loop, select correct word with global timer
	- Guess list and correct guess animations
	- Hint system (first letter, population)
	- Server/Client side modifications
	- Deployment on Vercel
	- Adjustments for mobile
-->
