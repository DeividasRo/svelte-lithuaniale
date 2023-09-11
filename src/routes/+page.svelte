<script lang="ts">
	import GuessInput from '../lib/components/GuessInput.svelte';
	import GuessCard from '../lib/components/GuessCard.svelte';
	import LTMap from '$lib/assets/lt.svg';
	import { resetGuessStore, addToGuessStore, guessStore } from '$lib/stores/guess-store';
	import { calcDistance } from '$lib/utility';
	import cities from '$lib/assets/lt.json';

	let correctGuess: string = 'Vilnius';
	let currentGuess: string = '';

	let cityNames: string[] = cities.map((value) => value.city).sort();

	function getCityData(cityName: string) {
		const cityPosition = cities.findIndex((city) => {
			return city.city.toLowerCase() == cityName.toLowerCase();
		});
		return cities[cityPosition];
	}

	function handleInput() {
		const guessCityData = getCityData(currentGuess);
		if (guessCityData == null) return;
		const correctCityData = getCityData(correctGuess);

		const distance = calcDistance(
			Number(guessCityData.lat),
			Number(guessCityData.lng),
			Number(correctCityData.lat),
			Number(correctCityData.lng)
		);
		addToGuessStore(guessCityData.city, Math.round(distance));
		currentGuess = '';
	}
</script>

<div class="container mx-auto flex h-full flex-col items-center justify-start">
	<img class="max-w-md pt-20" src={LTMap} alt="Map of Lithuania" />
	<GuessInput bind:inputValue={currentGuess} options={cityNames} on:input={handleInput} />

	<!-- Dynamically increasing list of guesses below the input field -->
	<ul class="list w-7/12 max-w-sm space-y-3">
		{#each $guessStore as guess}
			<GuessCard {guess} />
		{/each}
	</ul>

	<button class="variant-filled-secondary btn my-6 text-2xl" on:click={() => resetGuessStore()}
		>Reset</button
	>
</div>

<!--
	TODO:
	- Add input button instead of Enter (input group with input field)
	- Remove option from options list after guessing it
	- Game loop, select correct word with global timer
	- Try to implement guessed cities onto the map
	- Guess list and correct guess animations
	- Hint system (first letter, population)
	- Server/Client side modifications
	- Deployment on Vercel
-->
