<script lang="ts">
	export let guess: HistoryGuess;
</script>

<section class="card card-hover flex w-full select-none justify-between px-4 py-2">
	<p class="text-md font-bold sm:text-xl">{guess.year} m.</p>
	<p class="text-md font-bold sm:text-lg">{guess.difference > 0 ? 'up' : 'down'}</p>
	<!-- Change difference to use an arrow pointing up or down -->
</section>
