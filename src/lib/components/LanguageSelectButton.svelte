<script lang="ts">
	import Icon from '@iconify/svelte';
	import { languageStore, setLanguageStore } from '$lib/stores/languageStore';

	let innerWidth: number;
	let iconWidth = 80;

	$: if (innerWidth < 640) {
		iconWidth = 52;
	} else {
		iconWidth = 80;
	}
</script>

<button
	class="md:w-80px top absolute right-2 drop-shadow-md hover:scale-110 active:scale-90 sm:right-5 sm:top-2"
	style="-webkit-tap-highlight-color: transparent;"
	on:click={() => {
		if ($languageStore == 'lithuania') {
			setLanguageStore('united-kingdom');
		} else if ($languageStore == 'united-kingdom') {
			setLanguageStore('lithuania');
		}
	}}
>
	<Icon width={iconWidth} icon="openmoji:flag-{$languageStore}" /></button
>

<svelte:window bind:innerWidth />
