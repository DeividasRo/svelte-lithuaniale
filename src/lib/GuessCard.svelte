<script lang="ts">
	export let guess: Guess;
</script>

<section class="card card-hover flex w-full select-none justify-between px-3 py-2">
	<p class="text-xl font-bold">{guess.name}</p>
	<p class="text-lg font-bold">{guess.distance} km</p>
</section>
