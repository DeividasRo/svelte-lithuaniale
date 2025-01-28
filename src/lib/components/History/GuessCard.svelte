<script lang="ts">
	import Icon from '@iconify/svelte';
	export let guess: HistoryGuess;
</script>

<section class="card card-hover flex max-w-sm select-none justify-between px-4 py-2">
	<p class="text-xl font-bold">{guess.year} m.</p>
	<p>
		<!-- Change to up/down arrow icon -->
		{#if guess.difference > 0}
			<Icon color="#dcfde1" width="28" icon="line-md:arrow-down" />
		{:else if guess.difference < 0}
			<Icon color="#dcfde1" width="28" icon="line-md:arrow-up" />
		{/if}
	</p>
</section>
