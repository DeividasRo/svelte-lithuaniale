<script lang="ts">
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
	import { answerStore, resetAnswerStore } from '$lib/stores/answerStore';
	import { gameStateStore, setGameStateStore } from '$lib/stores/gameStateStore';

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
			setGameStateStore('won');
		} else {
			currentGuess = '';
		}
	}
</script>

<div class="container mx-auto flex h-full flex-col items-center justify-start">
	<div class="relative mt-5 md:mt-10">
		<img class="max-w-xs drop-shadow-md md:max-w-md" src={LTMap} alt="Map of Lithuania" />
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
	{#if $gameStateStore == 'in progress'}
		<GuessInput bind:inputValue={currentGuess} options={$cityNamesStore} on:input={handleInput} />
	{:else if $gameStateStore == 'won'}
		<p class="my-6 text-center text-xl md:my-8 md:text-2xl">
			Congratulations!<br /> The answer was <span class="font-bold">{$answerStore}</span>!
		</p>
	{/if}

	<!-- Dynamically increasing list of guesses below the input field -->
	<ul class="list w-7/12 max-w-xs space-y-3">
		{#each $guessesStore as guess}
			<div
				in:fly={{
					delay: 0,
					duration: 400,
					x: 0,
					y: 35,
					opacity: 0.5,
					easing: quintOut
				}}
				out:fly={{
					delay: 0,
					duration: 400,
					x: 100,
					y: 0,
					opacity: 0,
					easing: quintOut
				}}
			>
				<GuessCard {guess} />
			</div>
		{/each}
	</ul>

	<button
		class="variant-filled-secondary btn absolute right-10 my-5 text-lg"
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
	- map points, winning text, winning point animations
	- Deployment on Vercel
	- Max guess count, losing text
	- Select correct city every day (global timer), remove reset button
	- Hint system (first letter, population)
	- Server/Client side modifications
-->
