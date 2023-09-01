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
	<input class="input my-10 max-w-xl" />
	<!-- Dynamically increasing list of guesses below the input field -->
	<ul class="list w-9/12 max-w-xl space-y-2">
		{#each guesses as guess}
			<GuessCard {guess} />
		{/each}
	</ul>
</div>
