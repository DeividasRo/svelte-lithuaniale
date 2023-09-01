<script lang="ts">
	import GuessCard from '../lib/GuessCard.svelte';
	import LTMap from '$lib/assets/lt.svg';

	const guesses: Guess[] = [
		{ name: 'Vilnius', distance: 130 },
		{ name: 'Kaunas', distance: 45 }
	];
</script>

<div class="container mx-auto flex h-full flex-col items-center justify-start">
	<img class="max-w-md pt-20" src={LTMap} alt="Map of Lithuania" />
	<input class="input my-10 h-12 max-w-md p-4 text-center text-xl drop-shadow-xl" />

	<!-- Dynamically increasing list of guesses below the input field -->
	<ul class="list w-7/12 max-w-sm space-y-3">
		{#each guesses as guess}
			<GuessCard {guess} />
		{/each}
	</ul>
</div>

<!--
	TODO:
	Display guess dynamically
	Dropdown selection menu for available guesses
	Try to implement guessed cities onto the map
	
-->
