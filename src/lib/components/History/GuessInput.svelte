<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';

	const dispatch = createEventDispatcher();

	export let inputValue: string;
	export let placeholderText: string;

	function onInput() {
		const numValue = Number(inputValue);
		if (!isNaN(numValue) && numValue >= 1 && numValue <= 2025) {
			dispatch('input');
		}
	}
	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target && target.value.length > 4) {
			target.value = target.value.slice(0, 4);
		}
		target.value = String(Number(target.value));
		if (Number(target.value) > 2025) {
			target.value = '2025';
			inputValue = '2025';
		}
		if (Number(target.value) < 1) {
			target.value = '1';
			inputValue = '1';
		}
	}
</script>

<div
	class="input-group input-group-divider my-6 h-12 min-h-[3rem] w-40 max-w-sm grid-cols-[70%_30%] drop-shadow-xl sm:my-9"
>
	<input
		type="number"
		name="input"
		min="1"
		max="2025"
		class="no-arrows pl-10 text-left text-lg font-semibold outline-none sm:text-xl"
		placeholder={placeholderText}
		bind:value={inputValue}
		on:input={handleInput}
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
