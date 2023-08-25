<script lang="ts">
	import Guess from '../components/Guess.svelte';
	import LTMap from '$lib/assets/lt.svg';
</script>

<div class="container mx-auto flex h-full flex-col items-center justify-start gap-16">
	<img class="max-w-md pt-20" src={LTMap} alt="Map of Lithuania" />
	<input class="input" />
	<!-- Dynamically increasing list of guesses below the input field -->
	<Guess />
</div>
