<script lang="ts">
	export let guess: MapGuess;
</script>

<section class="card card-hover flex w-full select-none justify-between px-4 py-2">
	<p class="text-md font-bold sm:text-xl">{guess.name}</p>
	<p class="text-md font-bold text-[#dcfde1] sm:text-lg">{guess.distance} km</p>
</section>
