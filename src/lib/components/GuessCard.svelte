<script lang="ts">
	export let guess: Guess;
</script>

<section class="card card-hover flex w-full select-none justify-between px-4 py-2">
	<p class="text-md font-bold md:text-xl">{guess.name}</p>
	<p class="text-md font-bold md:text-lg">{guess.distance} km</p>
</section>
