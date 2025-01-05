<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';

	export let mode: number;
	export let currentGame: number;
	export let icon: string;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('switch', { mode });
	}
</script>

<button
	class="cursor-pointer rounded-full border-4 p-2 text-lg {currentGame === mode
		? 'border-green-400 bg-green-700 text-white'
		: 'border-gray-300 bg-green-800 text-gray-300 hover:border-white hover:text-white'}"
	on:click={handleClick}
	tabindex="0"
	on:keydown={(e) => e.key === 'Enter' && handleClick()}
>
	<Icon class="h-8 w-8 sm:h-12 sm:w-12" {icon} width="48" />
</button>
