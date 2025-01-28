<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';

	const dispatch = createEventDispatcher();

	export let inputValue: number;
	export let placeholderText: string;

	function onInput() {
		const numValue = inputValue;
		if (!isNaN(numValue) && numValue > 0 && numValue <= 2025) {
			dispatch('input');
		}
	}
</script>

<div
	class="input-group input-group-divider my-6 h-12 min-h-[3rem] w-40 max-w-sm grid-cols-[70%_30%] drop-shadow-xl sm:my-9"
>
	<input
		type="search"
		min="1"
		max="2025"
		name="input"
		class="pl-10 text-left text-lg font-semibold outline-none sm:text-xl"
		placeholder={placeholderText}
		bind:value={inputValue}
	/>
	<button
		class="variant-filled-secondary !pl-3 !pr-2 outline-none active:opacity-80"
		on:click={() => {
			onInput();
		}}
	>
		<Icon color="#035c09" width="32" icon="akar-icons:send" />
	</button>
</div>
