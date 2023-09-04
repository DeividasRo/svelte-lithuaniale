<script lang="ts">
	import GuessCard from '../lib/components/GuessCard.svelte';
	import LTMap from '$lib/assets/lt.svg';
	import { resetGuessStore, addToGuessStore, guessStore } from '$lib/stores/guess-store';
	import cities from '$lib/assets/lt.json';
	import { calcDistance } from '$lib/utility';

	let currentGuess = '';
	let correctGuess = 'Vilnius';

	function getCityData(cityName: string) {
		const cityPosition = cities.findIndex((city) => {
			return city.city == cityName;
		});
		return cities[cityPosition];
	}

	function handleInput() {
		const guessCityData = getCityData(currentGuess);
		const correctCityData = getCityData(correctGuess);
		const distance = calcDistance(
			Number(guessCityData.lat),
			Number(guessCityData.lng),
			Number(correctCityData.lat),
			Number(correctCityData.lng)
		);
		console.log(distance);
		addToGuessStore(currentGuess, Math.round(distance));
		currentGuess = '';
	}
</script>

<div class="container mx-auto flex h-full flex-col items-center justify-start">
	<img class="max-w-md pt-20" src={LTMap} alt="Map of Lithuania" />
	<input
		class="input my-10 h-12 max-w-md p-4 text-center text-xl drop-shadow-xl"
		placeholder="Enter a city in Lithuania..."
		bind:value={currentGuess}
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				handleInput();
			}
		}}
	/>

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
	- Display guesses dynamically
	- Distance to correct city calculation using the formula:
		acos(sin(lat1)*sin(lat2)+cos(lat1)*cos(lat2)*cos(lon2-lon1))*6371
	- Dropdown selection menu for available guesses
	- Try to implement guessed cities onto the map
	- Guess list and correct guess animations
	- Hint system
	- Server/Client side modifications
	- Deployment on Vercel
-->
