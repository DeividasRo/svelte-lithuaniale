<script lang="ts">
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
	import GuessCard from '../lib/components/GuessCard.svelte';
	import LTMap from '$lib/assets/lt.svg';
	import { resetGuessStore, addToGuessStore, guessStore } from '$lib/stores/guess-store';
	import cities from '$lib/assets/lt.json';
	import { calcDistance } from '$lib/utility';

	let currentGuess: string = '';
	let correctGuess: string = 'Vilnius';

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
		addToGuessStore(currentGuess, Math.round(distance));
		currentGuess = '';
	}

	console.log(cities.map((value) => value.city));
	let cityNames: string[] = cities.map((value) => value.city).sort();

	const flavorOptions: AutocompleteOption[] = [];

	cityNames.forEach((cityName) => flavorOptions.push({ label: cityName, value: cityName }));

	function onFlavorSelection(event: CustomEvent<AutocompleteOption>): void {
		currentGuess = event.detail.label;
	}

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};
</script>

<div class="container mx-auto flex h-full flex-col items-center justify-start">
	<img class="max-w-md pt-20" src={LTMap} alt="Map of Lithuania" />
	<input
		type="search"
		name="autocomplete-search"
		class="input my-10 h-12 max-w-md p-4 text-center text-xl outline-none drop-shadow-xl"
		placeholder="Enter a city in Lithuania..."
		bind:value={currentGuess}
		use:popup={popupSettings}
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				console.log(e.key);
				handleInput();
			}
		}}
	/>
	<div
		class="card -mt-2 max-h-48 w-full max-w-sm overflow-y-auto rounded-none rounded-b-lg p-2 font-bold"
		tabindex="-1"
		data-popup="popupAutocomplete"
	>
		<Autocomplete
			bind:input={currentGuess}
			options={flavorOptions}
			on:selection={onFlavorSelection}
		/>
	</div>

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
	- Put input stuff into a component
	- Game loop, select correct word with global timer
	- Styling, colors fixes
	- Auto focus on keydown
	- Try to implement guessed cities onto the map
	- Guess list and correct guess animations
	- Hint system (first letter, population)
	- Server/Client side modifications
	- Deployment on Vercel
-->
