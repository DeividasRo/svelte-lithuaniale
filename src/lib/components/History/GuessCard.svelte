<script lang="ts">
	import Icon from '@iconify/svelte';
	import { languageStore } from '$lib/stores/languageStore';
	import languagesJson from '$lib/assets/languages.json';
	export let guess: HistoryGuess;

	let innerWidth: number;
	let iconWidth: number;
	$: if (innerWidth >= 640) {
		iconWidth = 28;
	} else {
		iconWidth = 24;
	}
</script>

<section class="card card-hover flex max-w-sm select-none justify-between px-4 py-2">
	<p class="text-md font-bold sm:text-xl">
		{guess.year}
		{@html languagesJson[$languageStore]['year-short']}
	</p>
	<p>
		<!-- Change to up/down arrow icon -->
		{#if guess.difference > 0}
			<Icon color="#dcfde1" width={iconWidth} icon="line-md:arrow-down" />
		{:else if guess.difference < 0}
			<Icon color="#dcfde1" width={iconWidth} icon="line-md:arrow-up" />
		{/if}
	</p>
</section>

<svelte:window bind:innerWidth />
