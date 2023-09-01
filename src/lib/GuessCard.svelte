<script lang="ts">
	import { fly } from 'svelte/transition';

	export let guess: Guess;
</script>

<section class="card flex w-full select-none justify-between p-3">
	<p class="text-lg font-bold">{guess.name}</p>
	<p class="text-lg font-bold">{guess.distance} km</p>
</section>
